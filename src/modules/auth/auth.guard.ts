import { IS_PUBLIC_KEY } from "@/common/decorators/public.decorator";
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";

import { Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";

import { AppRequest, TokenPayload } from "@/types/global";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwt: JwtService,
    private reflector: Reflector
  ) {}

  async canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest<AppRequest>();
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    const token = (req.cookies?.authToken ||
      req.headers.authorization?.replace("Bearer ", "")) as string;

    if (!token) {
      throw new UnauthorizedException("Unauthorized");
    }

    try {
      const payload: TokenPayload = await this.jwt.verifyAsync(token);
      req.token = payload;

      return true;
    } catch {
      throw new UnauthorizedException("Unauthorized");
    }
  }
}
