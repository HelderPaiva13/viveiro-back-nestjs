import { ExecutionContext, createParamDecorator } from "@nestjs/common";
import { User } from "src/users/user.entity";

export const GetUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): User => {
    const req = ctx.switchToHttp().getRequest();
    console.log('DECORATOR --- get-user', req.user);
    return req.user;
  }
)