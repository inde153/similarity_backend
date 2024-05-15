import { IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateProfileInputDTO {
  @IsString()
  @ApiProperty({ description: '유저 이름' })
  username: string;
}
