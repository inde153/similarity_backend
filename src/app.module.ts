import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as Joi from 'joi';
import { WordsModule } from './words/word.module';
import { RecordsModule } from './records/record.module';
import { ChatModule } from './chat/chat.module';
import { AuthModule } from './auth/auth.module';
import { OpenaiModule } from './openai/openai.module';
import { JwtModule } from './jwt/jwt.module';

import { User } from './entities/user.entity';
import { Record } from './entities/record.entity';
import { DailyWord } from './entities/daily-word.entity';
import { Word } from './entities/word.entity';
import { ScoreInfo } from './entities/score-info.entity';
import { EmbeddingModule } from './embedding/embedding.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      //전역적으로 사용할 것인지에 대한 옵션
      isGlobal: true,
      envFilePath: process.env.NODE_ENV === 'dev' ? '.dev.env' : '.test.env',
      //프로덕트 환경일 때 envFilePath무시
      ignoreEnvFile: process.env.NODE_ENV === 'prod',
      //환경변수 밸리데이션
      validationSchema: Joi.object({
        NODE_ENV: Joi.string().valid('dev', 'prod', 'test').required(),
        DB_HOST: Joi.string().required(),
        DB_PORT: Joi.string().required(),
        DB_USERNAME: Joi.string().required(),
        DB_PASSWORD: Joi.string().required(),
        DB_NAME: Joi.string().required(),
        DB_LOGGING: Joi.boolean().required(),
        OPENAI_API_KEY: Joi.string().required(),
        JWT_SECRET_ACCESS_KEY: Joi.string().required(),
        JWT_SECRET_REFRESH_KEY: Joi.string().required(),
        JWT_SECRET_ACCESS_EXPIRATION: Joi.string().required(),
        JWT_SECRET_REFRESH_EXPIRATION: Joi.string().required(),
        GOOGLE_CLIENT_ID: Joi.string().required(),
        GOOGLE_SECRET_KEY: Joi.string().required(),
      }),
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      logging: process.env.DB_LOGGING === 'true' ? true : false,
      synchronize: process.env.DB_SYNCHRONIZE === 'true' ? true : false,
      entities: [User, Word, DailyWord, Record, ScoreInfo],
      extra: {
        postgres: {
          extensions: ['pgvector'],
        },
      },
    }),
    OpenaiModule.forRoot({
      apiKey: process.env.OPENAI_API_KEY,
    }),
    JwtModule.forRoot({
      accessKey: process.env.JWT_SECRET_ACCESS_KEY,
      accessExpiration: process.env.JWT_SECRET_ACCESS_EXPIRATION,
      refreshKey: process.env.JWT_SECRET_REFRESH_KEY,
      refreshExpiration: process.env.JWT_SECRET_REFRESH_EXPIRATION,
    }),
    UsersModule,
    WordsModule,
    RecordsModule,
    ChatModule,
    AuthModule,
    EmbeddingModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
