import {
  ForbiddenException,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { CONFIG_OPTIONS } from 'src/common/common.constants';
import { JwtModuleOptions } from './interfaces';
import { Payload } from 'src/common/interfaces';

@Injectable()
export class JwtService {
  constructor(
    @Inject(CONFIG_OPTIONS) private readonly options: JwtModuleOptions,
  ) {}

  createAccessToken(payload: Payload): string {
    return jwt.sign(payload, this.options.accessKey, {
      expiresIn: this.options.accessExpiration,
    });
  }

  createRefreshToken(payload: Payload): string {
    return jwt.sign(payload, this.options.refreshKey, {
      expiresIn: this.options.refreshExpiration,
    });
  }

  verifyAccessToken(token: string) {
    try {
      return jwt.verify(token, this.options.accessKey);
    } catch (e) {
      throw new ForbiddenException(e.message);
    }
  }

  verifyRefreshToken(token: string): any {
    try {
      return jwt.verify(token, this.options.refreshKey);
    } catch (e) {
      throw new ForbiddenException(e.message);
    }
  }
}
