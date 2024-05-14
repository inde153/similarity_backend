import { IsNumber, IsString } from 'class-validator';

export class SetInitDTO {
  username: string;
  room: {
    roomId: string;
    roomName: string;
  };
}

export class ChatOutputDTO {
  id: string;
  username: string;
  email: string;
  message: string;
  date: string;
}
