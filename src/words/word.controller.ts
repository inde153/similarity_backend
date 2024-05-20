import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@Controller('word')
@ApiTags('Word API')
export class WordController {
  constructor() {}
}
