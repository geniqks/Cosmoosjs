import { GuardAbstract } from '@cosmoosjs/hono-openapi';
import { inject, injectable } from 'inversify';
import { LoggerService } from '@cosmoosjs/core';

@injectable()
export class TestGuard extends GuardAbstract {
  constructor(@inject(LoggerService) private readonly loggerService: LoggerService) {
    super();
  }

  public run(_ctx: any): void {
    this.loggerService.pino.info('Guard triggered');
  }
}
