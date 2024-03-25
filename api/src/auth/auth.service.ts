import {
  ConflictException,
  Inject,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginDto, RegisterDto } from '@auth/dto';
import { Tokens } from '../interfaces';
import { compareSync, genSaltSync, hashSync } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Token, User } from '@prisma/client';
import { v4 } from 'uuid';
import { add } from 'date-fns';
import { Response } from 'express';

import { PrismaService } from '@prisma/prisma.service';
import { ConfigService } from '@nestjs/config';
import { UserResponse } from 'src/auth/responses';
import { convertToSecondsUtil } from '@common/utils';
import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly jwtService: JwtService,
    private readonly prismaService: PrismaService,
    private readonly configService: ConfigService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async register(dto: RegisterDto) {
    const user = await this.findOne(dto.email);
    if (user) {
      throw new ConflictException('null');
    } else {
      try {
        return this.save(dto);
      } catch (err) {
        this.logger.error(err);
        return null;
      }
    }
  }

  async login(dto: LoginDto, agent: string): Promise<Tokens> {
    try {
      const user = await this.findOne(dto.email, true);
      if (!user || !compareSync(dto.password, user.password)) {
        throw new UnauthorizedException('Error login or password');
      }
      return this.generateTokens(user, agent);
    } catch (err) {
      this.logger.error(err);
      return null;
    }
  }

  private async generateTokens(
    user: User,
    agent: string,
  ): Promise<{
    accessToken: string;
    user: User;
    refreshToken: Token;
  }> {
    const accessToken =
      'Bearer ' +
      this.jwtService.sign({
        id: user.id,
        email: user.email,
        role: user.roles,
      });
    const refreshToken = await this.getRefreshToken(user.id, agent);
    return { accessToken, refreshToken, user: new UserResponse(user) };
  }

  async refreshTokens(refreshToken: string, agent: string): Promise<Tokens> {
    const token = await this.prismaService.token.findUnique({
      where: {
        token: refreshToken,
      },
    });
    if (!token) {
      throw new UnauthorizedException();
    }
    await this.prismaService.token.delete({ where: { token: refreshToken } });
    if (new Date(token.exp) < new Date()) {
      throw new UnauthorizedException();
    }
    const user = await this.findOne(token.userId);
    const tokens = await this.generateTokens(user, agent);
    return tokens;
  }

  private async getRefreshToken(userId: string, agent: string): Promise<Token> {
    const _token = await this.prismaService.token.findFirst({
      where: {
        userId,
        userAgent: agent,
      },
    });

    const token = _token?.token ?? '';
    return this.prismaService.token.upsert({
      where: { token: token },
      update: {
        token: v4(),
        exp: add(new Date(), {
          weeks: Number(this.configService.get('REFRESH_TOKEN_EXP')),
        }),
        userId: userId,
        userAgent: agent,
      },
      create: {
        token: v4(),
        exp: add(new Date(), {
          weeks: Number(this.configService.get('REFRESH_TOKEN_EXP')),
        }),
        userId: userId,
        userAgent: agent,
      },
    });
  }

  async deleteRefreshToken({ refreshToken }: { refreshToken: string }) {
    return this.prismaService.token.delete({ where: { token: refreshToken } });
  }
  async checkIsAuth(accessToken: string, res: Response) {
    try {
      const [bearer, token] = accessToken.split(' ');
      const jwtPayload = await this.jwtService.verify(token);
      const user = await this.prismaService.user.findUnique({
        where: { id: jwtPayload.id },
      });
      res.status(200).json(new UserResponse(user));
    } catch {
      res.status(401).json({ message: 'Auth Failed' });
    }
  }

  async save(user: Partial<User>) {
    const hashedPassword: string | null = user?.password
      ? this.hashPassword(user.password)
      : null;

    const newUser = await this.prismaService.user.create({
      data: {
        email: user.email,
        password: hashedPassword,
        roles: ['USER'],
      },
    });
    return newUser;
  }

  async findOne(IdOrMail: string, isReset = false) {
    if (isReset) {
      await this.cacheManager.del(IdOrMail);
    }
    const userInCache = await this.cacheManager.get<User>(IdOrMail);
    if (!userInCache) {
      const user = await this.prismaService.user.findFirst({
        where: {
          OR: [{ id: IdOrMail }, { email: IdOrMail }],
        },
      });
      if (!user) {
        return null;
      }
      await this.cacheManager.set(
        IdOrMail,
        user,
        convertToSecondsUtil(this.configService.get('JWT_EXP')),
      );
      return user;
    }
    return userInCache;
  }

  private hashPassword(password: string) {
    return hashSync(password, genSaltSync(10));
  }
}
