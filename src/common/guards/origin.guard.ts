import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  SetMetadata,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { ConfigService } from '@nestjs/config';

export const AllowedOrigins = (...origins: string[]) =>
  SetMetadata('allowedOrigins', origins);

@Injectable()
export class OriginGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private config: ConfigService,
  ) {}

  canActivate(ctx: ExecutionContext): boolean {
    const allowed =
      this.reflector.get<string[]>('allowedOrigins', ctx.getHandler()) ??
      this.reflector.get<string[]>('allowedOrigins', ctx.getClass()) ??
      this.config
        .get<string>('ALLOWED_ORIGINS')
        ?.split(',')
        .map((s) => s.trim()) ??
      [];
    console.log('---------', allowed);

    if (allowed.length === 0) return true;
    const req = ctx.switchToHttp().getRequest<Request>();
    const origin =
      (req.headers.origin as string) || (req.headers.referer as string) || '';
    const host = new URL(origin, 'http://localhost').hostname;
    console.log('------Hostname', host);
    if (!allowed.includes(host))
      throw new ForbiddenException('Origin not allowed');
    return true;
  }
}
