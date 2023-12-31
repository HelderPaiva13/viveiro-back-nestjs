import {Injectable, UnprocessableEntityException } from '@nestjs/common';

import { User } from './user.entity';
import { CreateUserDto } from './dtos/create-user.dto';
import { UserRole } from './user-roles.enum';
import { UserRepository } from './user.repository';


@Injectable()
export class UsersService {
  constructor(
    private readonly userRepository: UserRepository,
    
  ){}


  async createAdminUser(createUserDto: CreateUserDto, userRole: UserRole): Promise<User> {
    if(createUserDto.password != createUserDto.passwordConfirmation){
      throw new UnprocessableEntityException('As senhas não conferem');
    } else {
      return this.userRepository.createUser(createUserDto, userRole);
    }
  }


  async find(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findById( id: string) {
    return this.userRepository.find({
      select: {
        id: true,
      }
    });
  }

  
}
