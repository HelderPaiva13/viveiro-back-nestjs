import {
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Injectable
} from '@nestjs/common';
import { AuthService } from '../auth.service';

@Injectable()
export class CurrentUserIterceptor implements NestInterceptor {
  constructor(private readonly authService: AuthService) {
    
  }

  async intercept(context: ExecutionContext, next: CallHandler<any>) {
    console.log('INTERCEPTOR....')
    const request = context.switchToHttp().getRequest();
    const { userToken} = request.session || {};

    if(userToken){
      const user = await this.authService.findMe(userToken);
      request.currentUser = user; 
    }
    return next.handle() ;
  }
}