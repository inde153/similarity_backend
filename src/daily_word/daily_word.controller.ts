import { Controller } from '@nestjs/common';
import { DailyWordService } from './daily_word.service';

@Controller('daily-word')
export class DailyWordController {
  constructor(private readonly dailyWordService: DailyWordService) {}
}
