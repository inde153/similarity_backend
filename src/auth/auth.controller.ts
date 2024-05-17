import { Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Payload } from 'src/common/interfaces';
import { JwtService } from 'src/jwt/jwt.service';
import { AuthService } from './auth.service';
import { LoginOutputDTO } from './dots/login.dto';
import {
  ApiCreatedResponse,
  ApiExcludeEndpoint,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { RefreshOutputDTO } from './dots/refresh.dto';
import { UserLoginType } from 'src/entities/user.entity';

@Controller('auth')
@ApiTags('Auth API')
export class AuthController {
  constructor(
    private authService: AuthService,
    private jwtService: JwtService,
  ) {}

  @UseGuards(AuthGuard('google'))
  @ApiOperation({
    summary: '유저 로그인 API',
    description: '유저 로그인',
  })
  @ApiCreatedResponse({
    description: '유저 로그인',
    type: LoginOutputDTO,
  })
  @Get('google')
  async googleAuth(@Req() req): Promise<void> {}

  @UseGuards(AuthGuard('google'))
  @ApiExcludeEndpoint()
  @Get('google/callback')
  async googleAuthCallback(
    @Req() req,
    // @Res({ passthrough: true }) res, 리턴 패스
    @Res() res,
  ): Promise<LoginOutputDTO> {
    const userInfo = await this.authService.login(
      req.user,
      UserLoginType.Google,
    );
    const { id, username, loginType, email } = userInfo;

    const payload: Payload = { id, username, loginType, email };

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

  @ApiOperation({
    summary: '키 발급 API',
    description: 'Access key 재 발급',
  })
  @ApiCreatedResponse({
    description: 'Access key 재 발급',
    type: RefreshOutputDTO,
  })
  @Get('refresh')
  async getRefreshToken(
    @Req() req,
    @Res({ passthrough: true }) res,
  ): Promise<RefreshOutputDTO | null> {
    const token = req.cookies?.refresh;

    if (!token) {
      return null;
    }

    const payload: Payload = (({ id, username, loginType, email }) => ({
      id,
      username,
      email,
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

    return {
      loginType: 'Google',
      email: payload.email,
      username: payload.username,
    };
  }

  @ApiOperation({
    summary: '로그아웃 API',
    description: '유저 로그아웃',
  })
  @ApiCreatedResponse({
    description: '유저 로그아웃',
    type: null,
  })
  @Post('logout')
  async logout(@Res({ passthrough: true }) res) {
    res.clearCookie('refresh');
    res.clearCookie('access');

    return {};
  }
}
