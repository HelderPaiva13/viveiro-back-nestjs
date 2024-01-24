import { Body, Controller, Get, Post, UseGuards, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { ReturnUserDto } from './dtos/return-user.dto';
import { UserRole } from './user-roles.enum';
import { AuthGuard } from 'src/guards/auth.guard';
import { Roles } from 'src/auth/decorator/role.decorator';
import { RoleGuard } from 'src/guards/roles.guard';
@Controller('users')
export class UsersController {

  constructor(private userService: UsersService,
    ){}

  @Get()
  async getUsers() {
    return await this.userService.find();
  }

  @Post('admin/signup')
  @Roles(UserRole.ADMIN)
  @UseGuards(AuthGuard, RoleGuard)
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
