import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { Role } from '../../common/enums/rol.enum';


@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector){}
  //reflector = te permite leer los metadatos adjuntos a los controladores o controladores de metodos en tiempo de ejecucion

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role>(ROLES_KEY,[

      context.getHandler(),
      context.getClass(),
    ]);

    if(!requiredRoles){
      return true;
    }

    const { user } = context.switchToHttp().getRequest();

    if(user.role === Role.ADMIN) {
      return true;
    }
    return user.role === requiredRoles;
      
  }
}
