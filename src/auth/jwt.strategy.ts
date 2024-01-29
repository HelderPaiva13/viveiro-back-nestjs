import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";

import { Strategy, ExtractJwt } from 'passport-jwt';
import { UserRepository } from "src/users/user.repository";
import { jwtConstants } from "./constants";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository
  ){
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(payload: {id: string}) {
    const {id} = payload;
    const user = await this.userRepository.findOne({
      where: {
        id: id
      },
      select: [
        'name', 'email', 'status', 'role',
      ]
    });
    if(!user) {
      throw new UnauthorizedException('usuário não encontrado');
    }
    console.log('USER do jwtStrategy: ', user)
    return user;
  }

  
}