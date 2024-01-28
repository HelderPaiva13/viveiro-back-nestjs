import {ConflictException, Injectable, InternalServerErrorException, UnprocessableEntityException, Session, NotFoundException } from '@nestjs/common';
import { User } from './user.entity';
import { CreateUserDto } from './dtos/create-user.dto';
import { UserRole } from './user-roles.enum';
import { Repository } from 'typeorm';
import * as crypto from 'crypto';
import * as bcrypt from 'bcrypt';
import { CredentialsDto } from 'src/auth/dto/credentials.dto';
import { UserRepository } from './user.repository';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  
  constructor(
    @InjectRepository(UserRepository) 
    private readonly userRepository: UserRepository){
  }

  async createAdminUser(createUserDto: CreateUserDto): Promise<User> {
    if(createUserDto.password != createUserDto.passwordConfirmation){
      throw new UnprocessableEntityException('As senhas não conferem');
    } else {
      return this.userRepository.createUser(createUserDto, UserRole.ADMIN)
    }
  }

  
  private async hashPassword(password:string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }


  
}
