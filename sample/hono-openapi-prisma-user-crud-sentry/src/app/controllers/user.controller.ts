import { Delete, Get, Patch, Post } from '@cosmosjs/hono-openapi';
import type { hono } from '@cosmosjs/hono-openapi';
import { injectable } from 'inversify';

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
    path: '/',
    responses: {},
  })
  private create(ctx?: hono.Context): unknown {
    if (ctx) {
      return ctx.json('Hello world, back is working fine');
    }
  }

  @Get({
    path: '/',
    responses: {},
  })
  private get(ctx?: hono.Context): unknown {
    if (ctx) {
      return ctx.json('Hello world, back is working fine');
    }
  }

  @Get({
    path: '/',
    responses: {},
  })
  private getUsers(ctx?: hono.Context): unknown {
    if (ctx) {
      return ctx.json('Hello world, back is working fine');
    }
  }

  @Patch({
    path: '/',
    responses: {},
  })
  private update(ctx?: hono.Context): unknown {
    if (ctx) {
      return ctx.json('Hello world, back is working fine');
    }
  }

  @Delete({
    path: '/',
    responses: {},
  })
  private delete(ctx?: hono.Context): unknown {
    if (ctx) {
      return ctx.json('Hello world, back is working fine');
    }
  }
  
}
