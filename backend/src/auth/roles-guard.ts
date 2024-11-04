import { Injectable, CanActivate, ExecutionContext, UnauthorizedException, HttpException, HttpStatus } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";
import { ROLES_KEY } from "./roles-auth.decorator";
import { PayloadUser } from "./PayloadUser";
import { RoleTypes } from "src/role/entities/role.entity";

// roles.guard.ts
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private jwtService: JwtService, private reflector: Reflector) { }

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {

    // console.log('Я дошел до гуарда')

    const req = context.switchToHttp().getRequest();
    try {
      const requiredRoles = this.reflector.getAllAndOverride<RoleTypes[]>(ROLES_KEY, [
        context.getHandler(),
        context.getClass(),
      ]);

      if (!requiredRoles) {
        // console.log('Первое условие')
        return true;
      }

      const authHeader = req.headers.authorization;
      if (!authHeader) {
        throw new UnauthorizedException({ message: 'Пользователь не авторизован' });
      }

      const [bearer, token] = authHeader.split(' ');

      if (bearer !== 'Bearer' || !token) {
        throw new UnauthorizedException({ message: 'Пользователь не авторизован' });
      }

      // console.log('Пользователь авторизован')

      const user: PayloadUser = this.jwtService.verify(token);
      req.user = user;

      const currentYear = req.headers['current-year'];
      
      if (!currentYear) {
        throw new HttpException('Год не предоставлен', HttpStatus.BAD_REQUEST);
      }
      req.year = currentYear;

      // console.log(req.user)

      // Проверка, соответствует ли роль пользователя требуемым ролям
      return requiredRoles.includes(user.role.type); // Роль приходит как строка
    } catch (e) {
      console.log(e);
      throw new HttpException('Нет доступа', HttpStatus.FORBIDDEN);
    }
  }
}
