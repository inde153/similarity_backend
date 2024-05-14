import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Role } from 'src/common/auth/role.decorator';
import { RoleGuard } from 'src/common/auth/role.guard';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

@Controller('user')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @UseGuards(AuthGuard('access'))
  @Role(['Google'])
  @UseGuards(RoleGuard)
  @Get('/profile')
  async getUserInfo(@Req() req): Promise<User> {
    return this.userService.getUserInfo(req.user.id);
  }

  @UseGuards(AuthGuard('access'))
  @Role(['Any'])
  @UseGuards(RoleGuard)
  @Post('/profile')
  async setUserProfile(@Body() updateUserDto: UpdateUserDto) {
    await this.userService.setUserProfile(updateUserDto);
    return {};
  }
}
