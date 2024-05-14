import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Payload } from 'src/common/interfaces';
import { Repository } from 'typeorm';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserLoginType } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async getUserInfoByEmail(email: string): Promise<User> {
    return this.userRepository.findOne({
      where: { email },
    });
  }

  async createUserInfo(email: string, loginType: UserLoginType): Promise<User> {
    const username = email.split('@')[0];
    return await this.userRepository.save(
      this.userRepository.create({ email, loginType, username }),
    );
  }

  async getUserInfo(id: number): Promise<User> {
    return this.userRepository.findOne({ where: { id } });
  }

  async setUserProfile(updateUserDto: UpdateUserDto, user: Payload) {
    await this.userRepository.update(user.id, {
      username: updateUserDto.username,
    });

    return {};
  }
}
