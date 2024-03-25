import {
  BadRequestException,
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Headers,
  HttpStatus,
  Post,
  Res,
  UnauthorizedException,
  UseInterceptors,
} from '@nestjs/common';
import { RegisterDto } from '@auth/dto/register.dto';
import { CookieDto, LoginDto } from '@auth/dto';
import { AuthService } from '@auth/auth.service';
import { Tokens } from '../interfaces';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';
import { Cookie, Public, UserAgent } from '@common/decorators';
import { UserResponse } from 'src/auth/responses';
import {
  ApiOperation,
  ApiResponse,
  ApiSecurity,
  ApiTags,
} from '@nestjs/swagger';

const REFRESH_TOKEN = 'refreshToken';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {}

  @ApiOperation({
    summary: 'register user',
    description: 'register with email and password',
  })
  @ApiResponse({ status: 201, description: 'user register successful' })
  @UseInterceptors(ClassSerializerInterceptor)
  @Public()
  @Post('register')
  async register(@Body() dto: RegisterDto) {
    const user = await this.authService.register(dto);
    if (!user) {
      throw new BadRequestException(
        `Cannot register user ${JSON.stringify(dto)}`,
      );
    }
    return new UserResponse(user);
  }

  @ApiOperation({
    summary: 'login',
    description: 'login user',
  })
  @ApiResponse({ status: 201, description: 'user login successful' })
  @Public()
  @Post('login')
  async login(
    @Body() dto: LoginDto,
    @Res() res: Response,
    @UserAgent() agent: string,
  ) {
    const tokens = await this.authService.login(dto, agent);

    if (!tokens) {
      throw new BadRequestException(
        `Access denied with ${JSON.stringify(dto)}`,
      );
    }
    this.setRefreshTokenToCookies(tokens, res);
  }

  @ApiOperation({
    summary: 'check-auth',
    description: 'check auth by token',
  })
  @ApiSecurity('JWT-auth')
  @Get('check-auth')
  async checkAuth(
    @Headers('Authorization') accessToken: string,
    @Res() res: Response,
  ) {
    return this.authService.checkIsAuth(accessToken, res);
  }

  @ApiOperation({
    summary: 'logout',
    description: 'logout user',
  })
  @ApiResponse({ status: 200, description: 'user logout successful' })
  @ApiSecurity('JWT-auth')
  @Get('logout')
  async logout(@Cookie() dto: CookieDto, @Res() res: Response) {
    if (!dto.refreshToken) {
      res.sendStatus(HttpStatus.OK);
      return;
    }
    await this.authService.deleteRefreshToken({
      refreshToken: dto.refreshToken,
    });
    res.cookie(REFRESH_TOKEN, '', {
      httpOnly: true,
      secure: false,
      expires: new Date(),
    });
    res.sendStatus(HttpStatus.OK);
  }

  @ApiOperation({
    summary: 'refresh-token',
    description: 'generate new tokens when get cookie and header auth',
  })
  @ApiResponse({ status: 201, description: 'create new tokens successful' })
  @ApiSecurity('JWT-auth')
  @Public()
  @Get('refresh-tokens')
  async refreshTokens(
    @Cookie() dto: any,
    @Res() res: Response,
    @UserAgent() agent: string,
  ) {
    if (!dto) {
      throw new UnauthorizedException();
    }
    const tokens = await this.authService.refreshTokens(
      dto.refreshToken,
      agent,
    );
    if (!tokens) {
      throw new UnauthorizedException();
    }
    this.setRefreshTokenToCookies(tokens, res);
  }

  private setRefreshTokenToCookies(tokens: Tokens, res: Response) {
    if (!tokens) {
      throw new UnauthorizedException();
    }
    res.cookie(REFRESH_TOKEN, tokens.refreshToken.token, {
      httpOnly: true,
      sameSite: 'lax',
      expires: new Date(tokens.refreshToken.exp),
      secure:
        this.configService.get('NODE_ENV', 'development') === 'production',
      path: '/',
    });

    res.status(201).json({
      accessToken: tokens.accessToken,
      user: new UserResponse(tokens.user),
    });
  }
}
