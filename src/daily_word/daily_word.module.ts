import { Module } from '@nestjs/common';
import { DailyWordService } from './daily_word.service';
import { DailyWordController } from './daily_word.controller';

@Module({
  controllers: [DailyWordController],
  providers: [DailyWordService],
})
export class DailyWordModule {}
