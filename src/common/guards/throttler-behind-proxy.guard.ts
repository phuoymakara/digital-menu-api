import { ThrottlerGuard } from '@nestjs/throttler';
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class ThrottlerBehindProxyGuard extends ThrottlerGuard {
  private readonly logger = new Logger(ThrottlerBehindProxyGuard.name);
  protected async getTracker(req: Record<string, any>): Promise<string> {
    this.logger.debug(`
      =================
      Extracting IP from request
      ==============: ${req.ips.length ? req.ips[0] : req.ip}`);
    return req.ips.length ? req.ips[0] : req.ip; // individualize IP extraction to meet your own needs
  }
}
