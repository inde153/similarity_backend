import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { JwtService } from 'src/jwt/jwt.service';

@Injectable()
export class AccessStrategy extends PassportStrategy(Strategy, 'access') {
  constructor(private readonly jwtService: JwtService) {
    super({
      jwtFromRequest: (req) => {
        const cookie = req.cookies?.refresh;
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
