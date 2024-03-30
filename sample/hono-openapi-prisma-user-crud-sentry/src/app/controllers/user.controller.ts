import type * as hono from 'hono';
import type { Prisma } from '@prisma/client';
import { AuthorizationSchema } from 'src/schemas/header.schema';
import { Delete, Get, Guards, Post, Put, Server } from '@cosmosjs/hono-openapi';
import { JwtMiddleware } from '@app/middlewares/jwt';
import { UserInputSchema } from 'src/libs/user/user.schema';
import { UserService } from 'src/libs/user/user.service';
import { inject, injectable } from 'inversify';
import { StatusCodes } from 'http-status-codes';
import type { UserLoginInput } from 'src/libs/user/user.type';
import { TestGuard } from 'src/libs/guards/test.guard';

@injectable()
export class UserController {
  constructor(
    @inject(UserService) private readonly userService: UserService,
    @inject(JwtMiddleware) private readonly jwtMiddleware: JwtMiddleware,
    @inject(Server) private readonly server: Server,
  ) {}

  public setup(): void {
    this.server.hono.use('/user/me', this.jwtMiddleware.get());
    this.me();
    this.localLogin();
    this.create();
    this.get();
    this.getUsers();
    this.delete();
    this.update();
  }

  @Post({
    path: '/auth/login',
    tags: ['Auth'],
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
  @Guards(TestGuard)
  private async localLogin(ctx?: hono.Context): Promise<unknown> {
    if (ctx) {
      const body = (await ctx.req.json()) as UserLoginInput;
      const createdUser = await this.userService.login(body);
      ctx.status(StatusCodes.OK);
      return ctx.json(createdUser);
    }
  }

  @Get({
    path: '/user/me',
    tags: ['Users'],
    request: {
      headers: AuthorizationSchema,
    },
    responses: {},
  })
  private me(ctx?: hono.Context): unknown {
    if (ctx) {
      const me = ctx.get('jwtPayload');
      return ctx.json({ me });
    }
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
      ctx.status(StatusCodes.CREATED);
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
