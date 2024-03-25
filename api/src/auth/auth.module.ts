import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { options } from './config';
import { STRATEGIES } from '@auth/strategies';
import { GUARDS } from '@auth/guards';
import { HttpModule } from '@nestjs/axios';
import { RssModule } from '@rss/rss.module';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [
    CacheModule.register(),
    PassportModule,
    JwtModule.registerAsync(options()),
    HttpModule,
    RssModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, ...STRATEGIES, ...GUARDS],
})
export class AuthModule {}
