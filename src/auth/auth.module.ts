import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtService } from '@nestjs/jwt';
import { GoogleStrategy } from 'src/common/auth/GoogleStrategy';

@Module({
  controllers: [AuthController],
  providers: [AuthService, GoogleStrategy, JwtService],
})
export class AuthModule {}
