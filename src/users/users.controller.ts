import { Body, Controller, Get, Param, Post, UseGuards, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { ReturnUserDto } from './dtos/return-user.dto';
import { UserRole } from './user-roles.enum';
import { AuthGuard } from 'src/guards/auth.guard';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';

@Controller('users')
export class UsersController {

  constructor(private userService: UsersService,
    ){}


  @Post()
  @UseGuards(JwtAuthGuard)
  async createAdminUser(
    @Body(ValidationPipe) createUserDto: CreateUserDto,
  ): Promise<ReturnUserDto> {
    const user = await this.userService.createAdminUser(createUserDto);
    return {
      user,
      message: 'Admin cadastrado com sucesso',
    };
  }

  // @Get(':id')
  // @Roles(UserRole.ADMIN)
  // async findUserById(@Param('id') id): Promise<ReturnUserDto> {
  //   const user = await this.userService.findOneUser(id);

  //   return {
  //     user,
  //     message: 'Usuário encontrado',
  //   }

  // }


}
