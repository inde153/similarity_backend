import { Controller, Get } from '@nestjs/common';
import { WordService } from './word.service';

@Controller('word')
export class WordController {
  constructor(private readonly wordService: WordService) {}

  @Get('')
  async getDailyWord() {
    const res = await this.wordService.getDailyWord();

    console.log(res);
  }
}
