import { ControllerRoot } from '@app/controllers';
import { IocContainer, LoggerService, defineConfigAndBootstrapApp } from '@cosmosjs/core';
import type { ConfigService } from '@cosmosjs/core';
import { serve } from 'bun';
import dotenv from 'dotenv';
dotenv.config();

/**
 * The server will be configured with all given options
 * and will return the http config in order to start the server.
 */
const boostrapApp = async () => {
  const config = await defineConfigAndBootstrapApp((config: ConfigService) => ({
    adapters: {
      server: {
        port: config.get<number>('PORT'),
        provider: () => import('@cosmosjs/hono-openapi'),
      },
    },
    loaders: {
      env: () => import('@start/env'),
      ioc: () => import('@start/ioc-loader'),
    }
  }));

  return config;
};

boostrapApp().then((httpConfig) => {
  const logger = IocContainer.container.get(LoggerService);
  const controllerRoot = IocContainer.container.get(ControllerRoot);
  try {
    serve({
      async fetch(req) {
        const serverConfig = await httpConfig?.fetch(req);
        return serverConfig;
      },
      port: httpConfig?.port,
    });

    controllerRoot.setup();
    logger.pino.info(`Hono 🥟 Server Listening on port ${httpConfig?.port}`);
  } catch (e) {
    logger.pino.error(`An error occurred during server initialization, ${e}`);
  }
});