import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNumber, IsString } from 'class-validator';

export class ProfileOutputDto {
  @IsString()
  @ApiProperty({ description: '유저 이름' })
  username: string;

  @IsEmail()
  @ApiProperty({ description: '이메일' })
  email: string;

  @IsString()
  @ApiProperty({ description: '로그인 방식' })
  loginType: string;

  @IsNumber()
  @ApiProperty({ description: '유저의 점수' })
  score?: number;
}
