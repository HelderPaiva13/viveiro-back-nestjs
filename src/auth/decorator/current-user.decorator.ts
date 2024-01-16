
import { 
  createParamDecorator,
  ExecutionContext
} from '@nestjs/common';

export const CurrentUser = createParamDecorator(
  (data: never, ctx: ExecutionContext) => {
    console.log('DECORATOR CURRENT-USER....')
    const request = ctx.switchToHttp().getRequest();
    return request.currentUser;
  }
)