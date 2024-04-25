import { Test, TestingModule } from '@nestjs/testing';
import { DailyWordController } from './daily_word.controller';
import { DailyWordService } from './daily_word.service';

describe('DailyWordController', () => {
  let controller: DailyWordController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DailyWordController],
      providers: [DailyWordService],
    }).compile();

    controller = module.get<DailyWordController>(DailyWordController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
