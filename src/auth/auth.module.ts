import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtService } from '@nestjs/jwt';
import { GoogleStrategy } from 'src/common/auth/google.strategy';
import { UsersModule } from 'src/users/users.module';
import { AccessStrategy } from 'src/common/auth/jwt.strategy';

@Module({
  imports: [UsersModule],
  controllers: [AuthController],
  providers: [AuthService, GoogleStrategy, AccessStrategy, JwtService],
})
export class AuthModule {}
