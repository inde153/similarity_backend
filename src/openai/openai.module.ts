import { DynamicModule, Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CONFIG_OPTIONS } from 'src/common/common.constants';
import { Word } from 'src/entities/word.entity';
import { OpenaiModuleOptions } from './interfaces';
import { OpenaiService } from './openai.service';

@Module({})
@Global()
export class OpenaiModule {
  static forRoot(options: OpenaiModuleOptions): DynamicModule {
    return {
      module: OpenaiModule,
      imports: [TypeOrmModule.forFeature([Word])],
      // providers 속성은 해당 모듈에서 사용 가능한 프로바이더(provider)를 정의하는 데 사용됩니다.
      // 프로바이더는 주로 서비스, 리졸버, 팩토리, 헬퍼 등과 같은 의존성 주입(Dependency
      providers: [
        {
          provide: CONFIG_OPTIONS, //공급해줄 이름
          useValue: options, // 공급해줄 값
        },
        OpenaiService,
      ],
      exports: [OpenaiService], //노출 시켜줄 곳
    };
  }
}
