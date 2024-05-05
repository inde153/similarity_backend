import { Inject, Injectable } from '@nestjs/common';
import { CONFIG_OPTIONS } from 'src/common/common.constants';
import { Profile } from 'passport-google-oauth20';
import { JwtService } from 'src/jwt/jwt.service';
import { Payload } from 'src/jwt/interfaces';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async login(user: Profile) {
    const payload: Payload = { id: user['id'] };
    const accessToken: string = this.jwtService.createAccessToken(payload)!;
    const refreshToken: string = this.jwtService.createRefreshToken(payload)!;

    return { accessToken, refreshToken };
  }
}
