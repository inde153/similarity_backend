import { Body, Controller, Post, UseInterceptors } from '@nestjs/common';
import { LogginInterceptor } from 'src/common/interceptors/Interceptor';
import { GetWordInput, GetWordOutput } from './dtos/get-guess.dto';
import { RecordService } from './record.service';

@Controller('guees')
export class RecordController {
  constructor(private readonly recordService: RecordService) {}

  @Post()
  @UseInterceptors(LogginInterceptor)
  async getEmbedding(@Body() body: GetWordInput): Promise<GetWordOutput> {
    return this.recordService.getEmbedding(body);
  }
}
