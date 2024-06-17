import { beforeAll, describe, expect, it } from 'bun:test';
import { type IHttpServe, IocContainer } from '@cosmoosjs/core';
import type { FactoryConfig } from '@customTypes/index';
import { OpenAPIHono, createRoute } from '@hono/zod-openapi';
import { Server } from '@server/server';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import z from 'zod';
import { HttpFactory } from './hono-adapter';

describe.only('HonoAdapter', () => {
  const adapter = HttpFactory;
  const container = IocContainer.container;
  adapter.bindContainers(container);
  const server = container.get(Server);

  beforeAll(() => {
    // Setup routes
    function setErrorRoute(path: string) {
      const route = createRoute({
        method: 'get',
        path,
        responses: {
          200: {
            content: {
              'application/json': {
                schema: z.object({
                  message: z.string(),
                }),
              },
            },
            description: 'ok',
          },
        },
      });
      server.hono.openapi(route, async (_ctx) => {
        throw new Error();
      });
    }

    setErrorRoute('/error');
    setErrorRoute('/');
  });

  it.only('it should get the server', async () => {
    expect(server).toBeTruthy();
    expect(server).toBeInstanceOf(Server);
    expect(server.hono).toBeInstanceOf(OpenAPIHono);
  });

  it.only('it should config and return an object with type IHttpServe', async () => {
    const serverConfig: FactoryConfig = {
      port: 3001,
      metadata: {
        enableSwaggerInProd: false,
        swaggerUrl: 'swagger',
        openapi: {
          url: 'doc',
          config: {
            info: {
              title: 'User Crud Sample',
              version: 'v1',
            },
            openapi: '3.1.0',
            servers: [
              {
                url: 'http://localhost:3001',
              },
            ],
          },
        },
      },
    };

    const HttpServer: IHttpServe = {
      port: 3001,
      fetch: () => console.log('fetch'),
    };

    const httpServerConfig = adapter.listen(serverConfig);
    expect(httpServerConfig).toMatchObject(HttpServer);
    expect(httpServerConfig.port).toEqual(3001);
  });

  it.only('it should return an error', async () => {
    const res = await server.hono.request('/', {
      method: 'get',
      headers: {
        'Content-Type': 'application/text',
      },
    });
    const response = await res.text();
    expect(res.status).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(response).toEqual(ReasonPhrases.INTERNAL_SERVER_ERROR);
  });

  it.only('it should setup a custom error handler', async () => {
    adapter.exceptionHandler((_err, ctx, _logger) => {
      return ctx.text('custom error', StatusCodes.INTERNAL_SERVER_ERROR);
    });

    const res = await server.hono.request('/error', {
      method: 'get',
      headers: {
        'Content-Type': 'application/text',
      },
    });
    const response = await res.text();
    expect(res.status).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(response).toEqual('custom error');
  });
});
