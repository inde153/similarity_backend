import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction } from 'express';
import { UsersService } from 'src/users/users.service';
import { JwtService } from 'src/jwt/jwt.service';
import { Response, Request } from 'express';
import { User } from 'src/entities/user.entity';

@Injectable()
export class JwtMiddleware implements NestMiddleware {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}
  //토큰을 받기 위한 미들웨어를 구현
  async use(req: Request, res: Response, next: NextFunction) {
    if (req.cookies.access) {
      const token = req.cookies.access;

      const decoded = this.jwtService.verifyAccessToken(token);
      if (typeof decoded === 'object' && decoded.hasOwnProperty('id')) {
        const user: User = await this.usersService.getUserInfo(decoded['id']);
        req['user'] = user;
      }
    }

    next();
  }
}
