import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Role } from 'src/common/decorators/role.decorator';
import { RoleGuard } from 'src/common/auth/role.guard';
import { UpdateProfileInputDTO } from './dto/update-user.dto';
import { UsersService } from './users.service';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ProfileOutputDto } from './dto/get.profile.dto';

@Controller('user')
@ApiTags('User API')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Role(['Google'])
  @UseGuards(RoleGuard)
  @ApiOperation({
    summary: '유저 정보 API',
    description: '유저의 정보를 가져온다.',
  })
  @ApiCreatedResponse({
    description: '유저의 정보를 가져온다.',
    type: ProfileOutputDto,
  })
  @Get('/profile')
  async getUserInfo(@Req() req): Promise<ProfileOutputDto> {
    const { user } = req;
    return this.userService.getUserInfo(user.id);
  }

  @Role(['Google'])
  @UseGuards(RoleGuard)
  @ApiOperation({
    summary: '유저 정보 수정 API',
    description: '유저의 정보를 수정한다.',
  })
  @ApiCreatedResponse({
    description: '유저의 정보를 수정한다.',
    type: ProfileOutputDto,
  })
  @Post('/profile')
  async setUserProfile(
    @Req() req,
    @Body() updateProfileInputDto: UpdateProfileInputDTO,
  ): Promise<ProfileOutputDto> {
    const { user } = req;
    await this.userService.setUserProfile(updateProfileInputDto, user);
    return this.getUserInfo(req);
  }
}
