import { OpenAPIHono } from '@hono/zod-openapi';
import type { Env } from 'hono';
import { injectable } from 'inversify';

@injectable()
export class Server {
	private _hono = new OpenAPIHono();

	get hono(): OpenAPIHono<Env, {}, '/'> {
		return this._hono;
	}
}
