import { ConfigService } from '@cosmoosjs/core';
import type { MiddlewareHandler } from 'hono';
import { jwt } from 'hono/jwt';
import { inject, injectable } from 'inversify';

@injectable()
export class JwtMiddleware {
  constructor(
    @inject(ConfigService) config: ConfigService,
    private readonly middleware = jwt({
      secret: config.get<string>('JWT_TOKEN'),
    }),
  ) {}

  public get(): MiddlewareHandler {
    return this.middleware;
  }
}
