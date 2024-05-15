import { IsObject, IsString } from 'class-validator';

export class SetInitInputDTO {
  @IsString()
  username: string;
}

export class SetInitOutputDTO {
  @IsString()
  username: string;

  @IsObject()
  room?: {
    roomId: string;
    roomName: string;
  };
}
