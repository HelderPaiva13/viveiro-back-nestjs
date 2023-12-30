import {Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dtos/create-user.dto';
import { UserRole } from './user-roles.enum';

import { ReturnUserDto } from './dtos/return-user.dto';
import { UserRepository } from './user.repository';


@Injectable()
export class UsersService {
  constructor(
    private readonly userRepository: UserRepository,
   
  ){}


  async createAdminUser(createUserDto: CreateUserDto): Promise<User> {
    if(createUserDto.password != createUserDto.passwordConfirmation){
      throw new UnprocessableEntityException('As senhas não conferem');
    } else {
      return this.userRepository.createUser(createUserDto, UserRole.ADMIN);
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
