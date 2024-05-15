import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { APIInterceptor } from './common/interceptors/api.interceptor';
import { HttpExceptionFilter } from './common/exception/exception.filter';
import * as cookieParser from 'cookie-parser';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const PORT = 8080;
  const corsOptions: CorsOptions = {
    origin: 'http://localhost:3000',
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

  app.use(cookieParser());
  app.useGlobalInterceptors(new APIInterceptor());
  app.useGlobalFilters(new HttpExceptionFilter());

  await app.listen(PORT);
}
bootstrap();
