import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Payload } from 'src/common/interfaces';
import { Repository } from 'typeorm';
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
}
