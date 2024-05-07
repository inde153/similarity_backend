import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/common/auth/auth.guard';
import { Role } from 'src/common/auth/role.decorator';
import { GetWordInput, GetWordOutput } from './dtos/get-guess.dto';
import { RecordService } from './record.service';

@Controller('guees')
export class RecordController {
  constructor(private readonly recordService: RecordService) {}

  @Role(['Any'])
  @UseGuards(AuthGuard)
  @Post()
  async getEmbedding(@Body() body: GetWordInput): Promise<GetWordOutput> {
    return this.recordService.getEmbedding(body);
  }
}
