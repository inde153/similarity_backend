import {
  Controller,
  Get,
  Req,
  Res,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { LogginInterceptor } from 'src/common/interceptors/Interceptor';
import { Payload } from 'src/jwt/interfaces';
import { JwtService } from 'src/jwt/jwt.service';
import { AuthService } from './auth.service';
import { LoginOutput } from './dots/login-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private jwtService: JwtService,
  ) {}

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req): Promise<void> {}

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  @UseInterceptors(LogginInterceptor)
  async googleAuthCallback(
    @Req() req,
    @Res({ passthrough: true }) res,
  ): Promise<LoginOutput> {
    const userInfo = await this.authService.login(req.user, 'google');
    const { id, username, loginType } = userInfo;

    const payload: Payload = { id, username, loginType };

    const accessToken: string = this.jwtService.createAccessToken(payload)!;
    const refreshToken: string = this.jwtService.createRefreshToken(payload)!;

    res.cookie('refresh', refreshToken, {
      httpOnly: true,
    });

    return { accessToken };
  }
}
