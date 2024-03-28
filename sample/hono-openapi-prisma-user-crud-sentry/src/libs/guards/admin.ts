import { GuardAbstract } from '@cosmosjs/hono-openapi';
import type { Context } from 'hono';

export class AdminGuard extends GuardAbstract {
  public run(_ctx: Context): void {}
}
