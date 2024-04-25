import { OpenAPIHono } from '@hono/zod-openapi';
import { injectable } from 'inversify';

@injectable()
export class Server {
  private _hono = new OpenAPIHono();

  get hono() {
    return this._hono;
  }
}
