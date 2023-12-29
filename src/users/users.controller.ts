import { Body, Controller, Get, Post, UnprocessableEntityException } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { UserRole } from './user-roles.enum';
import { ReturnUserDto } from './dtos/return-user.dto';

@Controller('users')
export class UsersController {

  constructor(private userService: UsersService){}

  @Get()
  async getUsers() {
    return await this.userService.findAll()
  }

  @Post()
  async createAdminUser(
    @Body() createUserDto: CreateUserDto,
  ): Promise<ReturnUserDto> {
    return await this.userService.createUserAdmin(createUserDto, UserRole.ADMIN)
  }
}
