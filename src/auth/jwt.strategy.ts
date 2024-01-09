import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";

import { Strategy, ExtractJwt } from 'passport-jwt';
import { UsersService } from "src/users/users.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UsersService)
    private readonly userService: UsersService
  ){
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'super-secret',
    });
  }

  async validate(payload: {id: number}) {
    const {id} = payload;
    const user = await this.userService.findOneUser(id);
    if(!user) {
      throw new UnauthorizedException('usuário não encontrado');
    }
    return user;
  }

  
}