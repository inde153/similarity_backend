import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { WordService } from './word.service';

@Controller('word')
@ApiTags('Word API')
export class WordController {
  constructor(private readonly wordService: WordService) {}

  @Get('')
  async getDailyWord() {
    return this.wordService.getDailyWord();
  }
}
