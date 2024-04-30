import type { Context } from 'hono';
import { injectable } from 'inversify';

@injectable()
export abstract class GuardAbstract {
  public run(_ctx: Context): void {}
}
