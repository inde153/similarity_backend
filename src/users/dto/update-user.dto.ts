import { IsNumber, IsString } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  username: string;

  @IsNumber()
  id: number;
}
