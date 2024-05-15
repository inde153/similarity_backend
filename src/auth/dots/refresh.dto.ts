import { IsEmail, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RefreshOutputDTO {
  @IsString()
  @ApiProperty({ description: '로그인 방식' })
  loginType?: string;

  @IsEmail()
  @ApiProperty({ description: '이메일' })
  email?: string;

  @IsString()
  @ApiProperty({ description: '유저 이름' })
  username?: string;
}
