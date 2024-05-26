import {
  Inject,
  Injectable,
  Logger,
  LoggerService,
  NestMiddleware,
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { winstonLogger } from '../logger';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor() {}

  async use(req: Request, res: Response, next: NextFunction) {
    const { ip, method, originalUrl, headers } = req;
    const userAgent = req.get('user-agent');

    const user = req['user'];

    const userId = user ? user.id : 0;
    const datetime = new Date();

    res.on('finish', () => {
      const { statusCode } = res;
      winstonLogger.log(
        `${datetime} USER-${userId} ${method} ${originalUrl} ${statusCode} ${ip} ${userAgent}`,
      );
    });

    next();
  }
}
