import type { Context } from 'hono';

export abstract class GuardAbstract {
  public run(_ctx: Context): void {}
}
