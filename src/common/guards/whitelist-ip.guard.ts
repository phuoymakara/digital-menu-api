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

export const AllowedIps = (...ips: string[]) => SetMetadata('allowedIps', ips);

@Injectable()
export class IpWhitelistGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private config: ConfigService,
  ) {}

  canActivate(ctx: ExecutionContext): boolean {
    const allowedIps =
      this.reflector.get<string[]>('allowedIps', ctx.getHandler()) ??
      this.reflector.get<string[]>('allowedIps', ctx.getClass()) ??
      this.config
        .get<string>('ALLOWED_IPS', '')
        ?.split(',')
        .map((s) => s.trim())
        .filter(Boolean) ??
      [];

    const req = ctx.switchToHttp().getRequest<Request>();
    const xff = (req.headers['x-forwarded-for'] as string) || '';
    const ip = xff.split(',')[0]?.trim() || req.ip;
    console.log('---------', allowedIps, ip);

    if (allowedIps.length === 0) return true; // no restriction configured
    if (!allowedIps.includes(ip))
      throw new ForbiddenException('IP not allowed');
    return true;
  }
}