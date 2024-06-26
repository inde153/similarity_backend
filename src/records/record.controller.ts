import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthUser } from 'src/common/auth/auth.user.decorator';
import { RoleGuard } from 'src/common/auth/role.guard';
import { Role } from 'src/common/decorators/role.decorator';
import { User } from 'src/entities/user.entity';
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
    @AuthUser() authUser: User,
    @Body() wordInputDTO: WordInputDTO,
  ): Promise<WordOutputDTO> {
    return this.recordService.getEmbedding(authUser, wordInputDTO);
  }
}
