import { ConfigService, ENV_STATE_ENUM, HttpAdapter, type IHttpServe, IocContainer, LoggerService } from '@cosmoosjs/core';
import type { FactoryConfig } from '@customTypes/index';
import { defineReflection } from '@helpers/reflection.helper';
import { swaggerUI } from '@hono/swagger-ui';
import type { Context } from 'hono';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import type { Container } from 'inversify';
import { bindToContainers } from '../ioc';
import { Server } from '../server';

class HonoAdapter extends HttpAdapter {
  public bindContainers(container: Container) {
    bindToContainers(container);
  }

  public listen(config: FactoryConfig): IHttpServe {
    const app = IocContainer.container.get(Server);
    const configService = IocContainer.container.get(ConfigService);
    defineReflection(app);
    const oasUrl = config.metadata?.openapi?.url ?? '/doc';
    const swaggerUrl = config.metadata?.swaggerUrl ?? '/swagger';

    // Setup open api
    if (config.metadata) {
      app.hono.doc(oasUrl, config.metadata.openapi.config);
      if (configService.get('ENV') === ENV_STATE_ENUM.DEV || config.metadata?.enableSwaggerInProd) {
        // Setup swagger
        app.hono.get(
          swaggerUrl,
          swaggerUI({
            url: oasUrl,
          }),
        );
      }
    }

    return {
      port: config.port,
      fetch: app.hono.fetch,
    };
  }

  /** Error Handling */
  public exceptionHandler(
    handler: (err: Error, ctx: Context, logger: LoggerService) => Response | Promise<Response>,
    linkedContainer?: Container,
  ) {
    const container = linkedContainer ?? IocContainer.container;
    const app = container.get(Server);
    const logger = container.get(LoggerService);
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
