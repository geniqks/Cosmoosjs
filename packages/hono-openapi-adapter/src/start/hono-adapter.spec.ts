import { describe, expect, it } from 'bun:test';
import { type IHttpServe, IocContainer } from '@cosmoosjs/core';
import type { FactoryConfig } from '@customTypes/index';
import { Server } from '@server/server';
import { HttpFactory } from './hono-adapter';

describe.only('HonoAdapter', () => {
  const adapter = HttpFactory;
  const container = IocContainer.container;
  adapter.bindContainers(container);

  it.only('it should get the server', async () => {
    const server = container.get(Server);
    expect(server).toBeTruthy();
    expect(server).toBeInstanceOf(Server);
  });

  it.only('it should config and return an object with type IHttpServe', async () => {
    const serverConfig: FactoryConfig<string> = {
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
});
