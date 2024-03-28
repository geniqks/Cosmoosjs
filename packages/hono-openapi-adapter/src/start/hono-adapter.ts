import { ConfigService, ENV_STATE_ENUM, HttpAdapter, IocContainer, LoggerService } from '@cosmosjs/core';
import type { IFactoryConfig } from '@customTypes/index';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import type { Container } from 'inversify';
import { CONTAINER, SERVER, SERVER_TARGET } from 'src/constants/reflector.constant';
import { bindToContainers } from '../ioc';
import { Server } from '../server';

class HonoAdapter extends HttpAdapter {
  public bindContainers(container: Container) {
    bindToContainers(container);
  }

  public listen(config: IFactoryConfig) {
    const app = IocContainer.container.get(Server);
    const configService = IocContainer.container.get(ConfigService);
    Reflect.defineMetadata(SERVER, app, SERVER_TARGET);
    Reflect.defineMetadata(CONTAINER, IocContainer.container, SERVER_TARGET);

    // TODO: add swagger / openApi
    if (configService.get('ENV') === ENV_STATE_ENUM.DEV) {
      // Setup swagger
      // app.hono.get(
      //   '/swagger',
      //   swaggerUI({
      //     url: config.openapi.url,
      //   }),
      // );

      // Setup open api
      const formattedUrl = `${configService.get('URL')}:${configService.get('PORT')}`;
      // app.hono.doc('doc', {});
    }
    return {
      port: config.port,
      fetch: app.hono.fetch,
    };
  }

  /** Error Handling */
  public exceptionHandler(handler: Function) {
    const app = IocContainer.container.get(Server);
    const logger = IocContainer.container.get(LoggerService);
    if (handler) {
      app.hono.onError((err, ctx) => {
        return handler(err, ctx, logger);
      });
    } else {
      app.hono.onError((err, c) => {
        logger.pino.error(err);
        return c.text(ReasonPhrases.INTERNAL_SERVER_ERROR, StatusCodes.INTERNAL_SERVER_ERROR);
      });
    }
  }
}

export const HttpFactory = new HonoAdapter();
