import { UserLoginType } from 'src/users/entities/user.entity';

export interface Payload {
  id: number;
  username: string;
  loginType: UserLoginType;
}
