import { Body, Controller, Get, Post, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { ReturnUserDto } from './dtos/return-user.dto';
import { UserRole } from './user-roles.enum';

@Controller('users')
export class UsersController {

  constructor(private userService: UsersService){}

  @Get()
  async getUsers() {
    return await this.userService.find();
  }

  @Post()
  async createAdminUser(
    @Body(ValidationPipe) createUserDto: CreateUserDto,
  ): Promise<ReturnUserDto> {
    

    const user = await this.userService.createAdminUser(createUserDto, UserRole.ADMIN);
    return {
      user,
      message: 'Admin cadastrado com sucesso',
    }
  }
}
