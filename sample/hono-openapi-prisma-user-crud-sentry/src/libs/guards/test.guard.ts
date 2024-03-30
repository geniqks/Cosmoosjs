import type { Context } from 'hono';
import { GuardAbstract } from '@cosmosjs/hono-openapi';
import { inject, injectable } from 'inversify';
import { LoggerService } from '@cosmosjs/core';

@injectable()
export class TestGuard extends GuardAbstract {
  constructor(@inject(LoggerService) private readonly loggerService: LoggerService) { 
    super()
  }

  public run(_ctx: Context): void {
    this.loggerService.pino.info('Guard triggered')
  }
}
