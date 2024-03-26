import { ConfigService } from '@cosmosjs/core';
import { OpenAPIHono } from '@hono/zod-openapi';
import type { Env } from 'hono';
import { inject, injectable } from 'inversify';

@injectable()
export class Server {
  private _hono = new OpenAPIHono();

  constructor(@inject(ConfigService) private readonly configService: ConfigService) {}

  get hono(): OpenAPIHono<Env, {}, '/'> {
    return this._hono;
  }
}
