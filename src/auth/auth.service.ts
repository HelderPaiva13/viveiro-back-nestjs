import {Injectable, UnauthorizedException, UnprocessableEntityException } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dtos/create-user.dto';
import { UserRole } from 'src/users/user-roles.enum';
import { User } from 'src/users/user.entity';
import { UsersService } from 'src/users/users.service';
import { CredentialsDto } from './dto/credentials.dto';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UsersService)
   private readonly userService: UsersService,
   private jwtService: JwtService,
  ){}

  async signUp(createUserDto: CreateUserDto): Promise<User> {
    if (createUserDto.password != createUserDto.passwordConfirmation){
      throw new UnprocessableEntityException('As senhas não conferem');
    } else {
      return await this.userService.createAdminUser(createUserDto, UserRole.USER);
    }
  }
  /*
  aqui verifico as credenciais, pego o id uso o
  jwtService.sign(mandando um objeto jwtPayload com uma chave id)
  para gerar meu token e retorno o token para o authController
  */
  async signIn(credentialsDto: CredentialsDto) {
    const user = await this.userService.checkCredentials(credentialsDto);
    console.log(user);
    
    if(user === null){
      throw new UnauthorizedException('credenciais invalidas');
    }

    const jwtPayload = {
      id: user.id
    }

    const token = this.jwtService.sign(jwtPayload);

    return {token};
  }
  /**
   * faço um destruct no argumento para pegar só a string token
   * vejo se exite, caso não mando um erro 
   * depois chamo o veriry que retorna um objeto, faço novamente 
   * um destruct
   * @param param0 
   * @returns 
   */
  async findMe( {token}: any){
    if(!token){
      throw new UnauthorizedException('Faça login');
    }
    
    const {id} = this.jwtService.verify(token)
    return this.userService.findOneBy({
      id,
    })
  }
}
