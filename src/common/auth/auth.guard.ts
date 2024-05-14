import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from 'src/jwt/jwt.service';
import { AllowedRoles } from '../decorators/role.decorator';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly jwtService: JwtService,
  ) {} //Reflector는 metadata를 get한다.
  //nest js의 ExecutionContext 다
  async canActivate(context: ExecutionContext) {
    const roles = this.reflector.get<AllowedRoles>(
      'roles', //@Role 데코레이터에서 roles라는 키를 가져온다.
      context.getHandler(),
    );
    if (!roles || roles.includes('Any')) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const token = request.headers.cookie.access;

    if (token) {
      const decoded = this.jwtService.verifyAccessToken(token);

      if (typeof decoded === 'object' && decoded.hasOwnProperty('id')) {
        return roles.includes(decoded.loginType);
      }
    }

    return false;
  }
}
