import { CoreOutput } from 'src/common/dtos/output.dto';
import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class WordInputDTO {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsString()
  categoryID: number;
}

export class WordOutputDTO {
  @IsNumber()
  @ApiProperty({ description: '유사도 수치' })
  similarity: number;

  @IsBoolean()
  @ApiProperty({ description: '해결 여부' })
  isSolved?: boolean;
}
