import { CoreOutput } from 'src/common/dtos/output.dto';
import { IsNotEmpty, IsString } from 'class-validator';
import { Word } from 'src/words/entities/word.entity';

export class GetWordInput {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  categoryID: number;
}

export class GetWordOutput {
  similarity: number;
}
