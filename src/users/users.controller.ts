import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Role } from 'src/common/decorators/role.decorator';
import { RoleGuard } from 'src/common/auth/role.guard';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

@Controller('user')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Role(['Google'])
  @UseGuards(RoleGuard)
  @UseGuards(AuthGuard('access'))
  @Get('/profile')
  async getUserInfo(@Req() req): Promise<User> {
    return this.userService.getUserInfo(req.user.id);
  }

  @Role(['Any'])
  @UseGuards(RoleGuard)
  @UseGuards(AuthGuard('access'))
  @Post('/profile')
  async setUserProfile(@Req() req, @Body() updateUserDto: UpdateUserDto) {
    await this.userService.setUserProfile(updateUserDto, req.user);
  }
}
