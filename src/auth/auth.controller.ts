import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Payload } from 'src/common/interfaces';
import { JwtService } from 'src/jwt/jwt.service';
import { UserLoginType } from 'src/users/entities/user.entity';
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
  async googleAuthCallback(
    @Req() req,
    // @Res({ passthrough: true }) res, 리턴 패스
    @Res() res,
  ): Promise<LoginOutput> {
    const userInfo = await this.authService.login(
      req.user,
      UserLoginType.Google,
    );
    const { id, username, loginType } = userInfo;

    const payload: Payload = { id, username, loginType };

    const accessToken: string = this.jwtService.createAccessToken(payload)!;
    const refreshToken: string = this.jwtService.createRefreshToken(payload)!;

    res.cookie('refresh', refreshToken, {
      httpOnly: true,
    });
    res.cookie('access', accessToken, {
      httpOnly: true,
    });

    return res.status(200).redirect(process.env.CLINET_URI);
  }
  // @UseGuards(AuthGuard('refresh'))
  @Get('refresh')
  async getRefreshToken(@Req() req, @Res({ passthrough: true }) res) {
    const token = req.cookies?.refresh;

    if (!token) {
      return { role: 'Guest' };
    }

    const payload: Payload = (({ id, username, loginType }) => ({
      id,
      username,
      loginType,
    }))(this.jwtService.verifyRefreshToken(token));

    const accessToken: string = this.jwtService.createAccessToken(payload)!;
    const refreshToken: string = this.jwtService.createRefreshToken(payload)!;

    res.cookie('refresh', refreshToken, {
      httpOnly: true,
    });
    res.cookie('access', accessToken, {
      httpOnly: true,
    });

    return { role: 'Google' };
  }
}
