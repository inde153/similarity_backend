import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Payload } from '../interfaces';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'access') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false, //토큰 만료 기간을 무시할지? false는 만료된 토큰 자체를 거부한다.
      algorithms: ['HS256'],
      secretOrKey: process.env.JWT_SECRET_ACCESS_KEY,
    });
  }

  async validate(payload: Payload) {
    return { ...payload };
  }
}

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
