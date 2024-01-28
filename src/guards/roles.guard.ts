import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { ROLES_KEY, Roles } from "src/auth/decorator/role.decorator";
import { UserRole } from "src/users/user-roles.enum";

@Injectable()
export class RoleGuard implements CanActivate {
  constructor( private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
      const requiredRoles = this.reflector.
      getAllAndOverride<UserRole[]>(ROLES_KEY, [
        context.getHandler(),
        context.getClass(),
      ]);

      if(!requiredRoles){
        return true;
      }

      const { user } = context.switchToHttp().getRequest();
      console.log('roles.guard.ts:', user.role, requiredRoles)

      /*
      AQUI EU SEGUI O QUE ESTAVA NA DOCUMENTAÇÃO E O ARTIGO DA MEDIUM
      DEU CERTO MAS TIVE QUE MUDAR ALGUMAS COISAS 
      
      POR FIM SEGUI COMO ESTAVA NA DOC E DEU CERTO TBM, MELHOR DEIXAR 
      COMO A DOC ENSINA...
      */
      return requiredRoles.some((role) => user.role?.includes(role));
  }
}