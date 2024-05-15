import { UserLoginType } from 'src/entities/user.entity';

export interface Payload {
  id: number;
  username: string;
  email: string;
  loginType: UserLoginType;
}
