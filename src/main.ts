import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { APIInterceptor } from './common/interceptors/api.interceptor';
import { HttpExceptionFilter } from './common/exception/exception.filter';
import * as cookieParser from 'cookie-parser';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger:
      process.env.NODE_ENV === 'prod'
        ? ['error', 'warn', 'log']
        : ['error', 'warn', 'log', 'debug'],
  });

  const PORT = 8080;
  const corsOptions: CorsOptions = {
    origin: process.env.CLINET_URI,
    methods: 'GET,POST,PUT',
    allowedHeaders: 'Origin,Content-Type,Authorization,Accept',
    credentials: true,
    maxAge: 81600,
  };
  app.enableCors(corsOptions);

  const config = new DocumentBuilder()
    .setTitle('Similarity API')
    .setDescription('The Similarity API description')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.setGlobalPrefix('v1');
  //class-transform 사용
  app.use(cookieParser());

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new APIInterceptor());
  app.useGlobalFilters(new HttpExceptionFilter());

  //쿠키 시크릿 설정
  // app.use(cookieParser(process.env.COOKIE_SECRET));

  await app.init().catch((e) => console.log(e));
  await app.listen(PORT);
}
bootstrap();
