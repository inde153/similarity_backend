import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { APIInterceptor } from './common/interceptors/api.interceptor';
import { HttpExceptionFilter } from './common/exception/exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const PORT = 8080;
  const corsOptions: CorsOptions = {
    origin: '*',
    methods: '*',
    allowedHeaders: 'Content-Type, Authorization',
    credentials: true,
    maxAge: 81600,
  };

  app.enableCors(corsOptions);

  app.useGlobalInterceptors(new APIInterceptor());
  app.useGlobalFilters(new HttpExceptionFilter());

  await app.listen(PORT);
}
bootstrap();
