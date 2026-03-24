import { ThrottlerGuard } from '@nestjs/throttler';

export class CustomThrottlerGuard extends ThrottlerGuard {
  protected async getTracker(req: Record<string, any>): Promise<string> {
    return req.headers['x-forwarded-for']?.split(',')[0]?.trim() ?? req.ip;
  }
}
