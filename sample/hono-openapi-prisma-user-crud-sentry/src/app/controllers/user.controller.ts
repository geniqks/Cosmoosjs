import { Delete, Get, Post, Put } from '@cosmosjs/hono-openapi';
import { inject, injectable } from 'inversify';
import type * as hono from 'hono';
import { UserService } from 'src/libs/user/user.service';
import type { Prisma } from '@prisma/client';
import { UserInputSchema } from 'src/libs/user/user.schema';

@injectable()
export class UserController {
  constructor(@inject(UserService) private readonly userService: UserService) {}

  public setup(): void {
    this.create();
    this.get();
    this.getUsers();
    this.delete();
    this.update();
  }

  @Post({
    path: '/user',
    request: {
      body: {
        content: {
          'application/json': {
            schema: UserInputSchema,
          },
        },
      },
    },
    responses: {},
  })
  private async create(ctx?: hono.Context) {
    if (ctx) {
      const body = (await ctx.req.json()) as Prisma.UserUncheckedCreateInput;
      const userCreated = await this.userService.createUser(body);
      return ctx.json(userCreated);
    }
  }

  @Get({
    path: '/user/{userId}',
    responses: {},
  })
  private async get(ctx?: hono.Context): Promise<unknown> {
    if (ctx) {
      const { userId } = ctx.req.param();
      const user = await this.userService.findById(+userId);
      return ctx.json(user);
    }
  }

  @Get({
    path: '/user',
    responses: {},
  })
  private async getUsers(ctx?: hono.Context) {
    if (ctx) {
      const user = await this.userService.getUsers();
      return ctx.json(user);
    }
  }

  @Put({
    path: '/user/{userId}',
    request: {
      body: {
        content: {
          'application/json': {
            schema: UserInputSchema,
          },
        },
      },
    },
    responses: {},
  })
  private async update(ctx?: hono.Context) {
    if (ctx) {
      const { userId } = ctx.req.param();
      const body = (await ctx.req.json()) as Prisma.UserUncheckedUpdateInput;
      const updatedUser = await this.userService.update(+userId, body);
      return ctx.json(updatedUser);
    }
  }

  @Delete({
    path: '/user/{userId}',
    responses: {},
  })
  private async delete(ctx?: hono.Context) {
    if (ctx) {
      const { userId } = ctx.req.param();
      const deleted = await this.userService.delete(+userId);
      return ctx.json(deleted);
    }
  }
}
