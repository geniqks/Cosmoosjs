import { Delete, Get, Patch, Post } from '@cosmosjs/hono-openapi';
import { injectable } from 'inversify';
import type * as hono from 'hono';

@injectable()
export class UserController {
  public setup(): void {
    this.create();
    this.get();
    this.getUsers();
    this.delete();
    this.update();
  }

  @Post({
    path: '/user/',
    responses: {},
  })
  private create(ctx?: hono.Context): unknown {
    if (ctx) {
      return ctx.json('Hello world, back is working fine');
    }
  }

  @Get({
    path: '/user/',
    responses: {},
  })
  private get(ctx?: hono.Context): unknown {
    if (ctx) {
      return ctx.json('Hello world, back is working fine');
    }
  }

  @Get({
    path: '/user/',
    responses: {},
  })
  private getUsers(ctx?: hono.Context): unknown {
    if (ctx) {
      return ctx.json('Hello world, back is working fine');
    }
  }

  @Patch({
    path: '/user/',
    responses: {},
  })
  private update(ctx?: hono.Context): unknown {
    if (ctx) {
      return ctx.json('Hello world, back is working fine');
    }
  }

  @Delete({
    path: '/user/',
    responses: {},
  })
  private delete(ctx?: hono.Context): unknown {
    if (ctx) {
      return ctx.json('Hello world, back is working fine');
    }
  }
}
