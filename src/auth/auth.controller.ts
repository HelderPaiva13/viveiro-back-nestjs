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

  @Post('/signin')
  async signIn(
    @Body(ValidationPipe) credentialsDto: CredentialsDto,
    @Session() session: any
  ): Promise<User> {
    const {user}= await this.authService.signIn(credentialsDto);
    session.userId = user.id
    return user;
  }


  @Get('/me')
  async getMe(@Session() session: any) {
    return await  this.authService.findMe(session.userId);
  }

}
