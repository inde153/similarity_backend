import { Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req): Promise<void> {}

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleAuthCallback(@Req() req, @Res() res) {
    const token = await this.authService.login(req.user);
    return res
      .cookie('access', `${token['accessToken']}`, {
        httpOnly: true,
      })
      .cookie('refresh', `${token['refreshToken']}`, {
        httpOnly: true,
      })
      .json({ ok: true });
  }
}
