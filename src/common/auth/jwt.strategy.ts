import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';

@Injectable()
export class RefreshStrategy extends PassportStrategy(Strategy, 'refresh') {
  constructor() {
    super({
      jwtFromRequest: (req) => {
        const cookie = req.cookies['refresh'];
        return cookie;
      },
      ignoreExpiration: false,
      algorithms: ['HS256'],
      secretOrKey: process.env.JWT_SECRET_REFRESH_KEY,
    });
  }

  async validate(payload: any) {
    return { ...payload };
  }
}
