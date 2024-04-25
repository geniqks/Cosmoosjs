import type { GuardsType } from '@customTypes/index';
import { SERVER, SERVER_TARGET } from 'src/constants/reflector.constant';
import { guardHandler } from 'src/decorators';
import { RequestMethod } from 'src/enums/request-method';
import type { Server } from 'src/server';

/**
 * Set middleware for path and method
 */
export function guardMiddleware(guards: GuardsType[], requestType: RequestMethod, path: string): void {
  if (guards && guards.length > 0) {
    const middlewareDefinition = getMiddlewareByDefinition(requestType);
    if (middlewareDefinition) {
      middlewareDefinition(path, async (ctx, next) => {
        guardHandler(guards, ctx);
        await next();
      });
    }
  }
}

/**
 * https://hono.dev/guides/middleware#definition-of-middleware
 */
function getMiddlewareByDefinition(type: RequestMethod) {
  const appServer: Server = Reflect.getMetadata(SERVER, SERVER_TARGET);
  switch (type) {
    case RequestMethod.GET:
      return appServer.hono.get;
    case RequestMethod.POST:
      return appServer.hono.post;
    case RequestMethod.PATCH:
      return appServer.hono.patch;
    case RequestMethod.DELETE:
      return appServer.hono.delete;
    case RequestMethod.PUT:
      return appServer.hono.put;
    case RequestMethod.OPTIONS:
      return appServer.hono.options;
  }
}
