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

      const { currentUser } = context.switchToHttp().getRequest();
      console.log('roles.guard.ts:', currentUser)
      return requiredRoles === currentUser?.role;
  }
}