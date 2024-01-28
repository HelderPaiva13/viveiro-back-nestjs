import { Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt'){}
//tive que adicionar essa classe, para o @UseGuard pudesse 
//entrar no jwtConstants.strategy.ts