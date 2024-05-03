import { Controller, Get, Post, Query } from '@nestjs/common';
import { RecordService } from './record.service';

@Controller('guees')
export class RecordController {
  constructor(private readonly recordService: RecordService) {}

  @Get()
  async getEmbedding(@Query() query) {
    await this.recordService.getEmbedding(query.name);
  }
}
