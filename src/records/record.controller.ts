import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { RoleGuard } from 'src/common/auth/role.guard';
import { Role } from 'src/common/decorators/role.decorator';
import { Payload } from 'src/common/interfaces';
import { WordInputDTO, WordOutputDTO } from './dtos/get-guess.dto';
import { RecordService } from './record.service';

@Controller('record')
@ApiTags('Record API')
export class RecordController {
  constructor(private readonly recordService: RecordService) {}

  @Role(['Any'])
  @UseGuards(RoleGuard)
  @ApiOperation({
    summary: '추측 단어 API',
    description: '추측 단어를 입력하여 정답 맞추기',
  })
  @ApiCreatedResponse({
    description: '단어의 유사도 및 정답 여부',
    type: WordOutputDTO,
  })
  @Post()
  async getEmbedding(
    @Req() req,
    @Body() wordInputDTO: WordInputDTO,
  ): Promise<WordOutputDTO> {
    const { user } = req;
    return this.recordService.getEmbedding(user, wordInputDTO);
  }
}
