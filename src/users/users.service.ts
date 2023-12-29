import { ConflictException, Injectable, InternalServerErrorException, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dtos/create-user.dto';
import { UserRole } from './user-roles.enum';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import { ReturnUserDto } from './dtos/return-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>
  ){}

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async createUserAdmin( createUserDto: CreateUserDto, role: UserRole, ): Promise<ReturnUserDto> {
    const {email, name, password} = createUserDto;

    const user = this.userRepository.create();
    user.email = email;
    user.name = name;
    user.role = role;
    user.status = true;
    user.confirmationToken = crypto.randomBytes(32).toString('hex');
    user.salt = await bcrypt.genSalt();
    user.password = await this.hashPassword(password, user.salt);

    try {
      if(createUserDto.password != createUserDto.passwordConfirmation) {
        throw new UnprocessableEntityException('as senhas não conferem');
      } else {
        await user.save();
        delete user.password;
        delete user.salt;
        return {
          user, 
          message: 'Adm cadastrado com sucesso'};
      }
     
    } catch (error) {
      if (error.code.toString() === '23505') {
        throw new ConflictException('Endereço de email já está em uso');
      } else {
        throw new InternalServerErrorException(
          'Erro ao salvar o usuário no banco de dados',
        );
      }
    }


  }

  private async hashPassword(password:string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }

  

  
}
