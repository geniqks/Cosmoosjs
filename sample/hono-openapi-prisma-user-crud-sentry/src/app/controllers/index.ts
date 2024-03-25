import { Get } from '@cosmosjs/hono-openapi';
import type { hono } from '@cosmosjs/hono-openapi';
import { inject, injectable } from 'inversify';
import { UserController } from './user.controller';

@injectable()
export class ControllerRoot {
  constructor(@inject(UserController) private readonly userController: UserController) {}

  public setup(): void {
    this.userController.setup();
    this.helloWorld();
  }

  @Get({
    path: '/',
    responses: {},
  })
  private helloWorld(ctx?: hono.Context): unknown {
    if (ctx) {
      return ctx.json('Hello world, back is working fine');
    }
  }
}
