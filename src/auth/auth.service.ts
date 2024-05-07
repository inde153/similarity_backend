import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Profile } from 'passport-google-oauth20';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UsersService) {}

  async login(user: Profile, loginType: string): Promise<User> {
    let userInfo = await this.userService.getUserInfoByEmail(user._json.email);

    if (!userInfo) {
      userInfo = await this.userService.createUserInfo(
        user._json.email,
        loginType,
      );
    }

    return userInfo;
  }
}
