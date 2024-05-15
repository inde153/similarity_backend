import { IsDate, IsEmail, IsNumber, IsObject, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ChatInputDTO {
  @IsString()
  username: string;

  @IsEmail()
  email: string;

  @IsString()
  message: string;
}

export class ChatOutputDTO {
  @IsString()
  id: number;

  @IsString()
  username: string;

  @IsEmail()
  email: string;

  @IsString()
  message: string;

  @IsString()
  date: string;
}
