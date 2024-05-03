import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { GetWordInput, GetWordOutput } from './dtos/get-guess.dto';
import { RecordService } from './record.service';

@Controller('guees')
export class RecordController {
  constructor(private readonly recordService: RecordService) {}

  @Post()
  async getEmbedding(@Body() body: GetWordInput): Promise<GetWordOutput> {
    return this.recordService.getEmbedding(body);
  }
}
