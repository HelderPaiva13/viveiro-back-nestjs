import { Inject, Injectable, UnprocessableEntityException, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from 'src/users/dtos/create-user.dto';
import { UserRole } from 'src/users/user-roles.enum';
import { User } from 'src/users/user.entity';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    @Inject( forwardRef(()=> UsersService))
    private userService: UsersService
  ){}

  async signUp(createUserDto: CreateUserDto): Promise<User> {
    if (createUserDto.password != createUserDto.passwordConfirmation){
      throw new UnprocessableEntityException('As senhas não conferem');
    } else {
      return await this.userService.createAdminUser(createUserDto, UserRole.USER);
    }
  }
}
