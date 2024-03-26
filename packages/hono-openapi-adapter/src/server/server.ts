import { Environment } from '@cosmosjs/core';
import { OpenAPIHono } from '@hono/zod-openapi';
import type { Env } from 'hono';
import { inject, injectable } from 'inversify';

@injectable()
export class Server {
  private _hono = this.init();

  constructor(@inject(Environment) private readonly env: Environment) {}

  get hono(): OpenAPIHono<Env, {}, '/'> {
    return this._hono;
  }

  private init() {
    const app = new OpenAPIHono();

    return app;
  }
}
