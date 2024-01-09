import { Body, Controller, Get, Param, Post, Req, Session, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dtos/create-user.dto';
import { CredentialsDto } from './dto/credentials.dto';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/users/user.entity';
import { GetUser } from './get-user.decorator';
import { JwtStrategy } from './jwt.strategy';
import { session } from 'passport';

@Controller('auth')
export class AuthController {

  constructor (private authService: AuthService){}

  @Post('/signup',)
  async signUp(
    @Body(ValidationPipe) createUserDto: CreateUserDto,
    @Session() session: any
  ): Promise< { message: string} > {
    const user = await this.authService.signUp(createUserDto);
    session.userId = user.id
    console.log("USER", user);
    return {
      message: 'Cadastro realisado com sucesso'
    };
  }


  /* 
    na rota signIn eu recebo email e senha uso o decorator @Body junto
    com ValidationPipe com o dto especifico para pegar erros como: email 
    e/ou senha invalido, vazio chamo o authService.signIn ->

    recebo o token e colocuo no cookie = session.userToken ou poderia fazer de outra 
    maneira retornando ele como estou rs
  */
  @Post('/signin')
  async signIn(
    @Body(ValidationPipe) credentialsDto: CredentialsDto,
    @Session() session: any
  ): Promise<{token: string}> {
    const token = await this.authService.signIn(credentialsDto);
    session.userToken = token
    return token;
  }

  @Post('/signout')
  async signout(@Session() session: any) {
    session.userToken = null
  }

  /**
   * recebo a solicitaçao vou no cookie = session.userToken e 
   * chamo o metodo authService.findMe ->
   * @param session 
   * @returns 
   */
  @Get('/me')
  async getMe(@Session() session: any) {
    console.log(session.userToken)
    return await  this.authService.findMe(session.userToken);
  }
  

}
