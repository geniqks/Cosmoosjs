import { Get } from '@cosmoosjs/hono-openapi';
import { inject, injectable } from 'inversify';
import { UserController } from './user.controller';
import type * as hono from 'hono';
import { HTTPException } from 'hono/http-exception';

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
    throw new HTTPException(500, {
      message: 'Hello my name is error',
    });
  }
}
