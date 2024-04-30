import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const corsOptions: CorsOptions = {
    origin: '*',
    methods: '*',
    allowedHeaders: 'Content-Type, Authorization',
    credentials: true,
    maxAge: 81600,
  };

  app.enableCors(corsOptions);
  await app.listen(3000);
}
bootstrap();
