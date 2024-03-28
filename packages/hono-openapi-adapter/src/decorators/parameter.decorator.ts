import type { GuardsType, RouteParameters } from '@customTypes/index';
import { createRoute } from '@hono/zod-openapi';
import { StatusCodes } from 'http-status-codes';
import { GUARD, PATH_METADATA, SERVER, SERVER_TARGET } from 'src/constants/reflector.constant';
import { RequestMethod } from 'src/enums/request-method';
import { guardMiddleware } from 'src/middlewares/guards.middleware';
import type { Server } from 'src/server';

function controllerHandler(options: RouteParameters, requestType: RequestMethod, target: any, guards: GuardsType[], thisArg: any) {
  const server: Server = Reflect.getMetadata(SERVER, SERVER_TARGET);

  // Define route
  const { ...routeMetadata } = options;
  const finalRouteMetadata = Object.assign(routeMetadata, {
    method: requestType,
  });
  const route = createRoute(finalRouteMetadata);

  if (guards && guards.length > 0) {
    guardMiddleware(guards, requestType, finalRouteMetadata.path);
  }

  const openapi = server.hono.openapi(
    route,
    async (ctx) => {
      return target.call(thisArg, ctx);
    },
    (result, c) => {
      if (!result.success) {
        console.error(result.error);
        return c.json(
          {
            code: StatusCodes.BAD_REQUEST,
            message: result.error,
          },
          StatusCodes.BAD_REQUEST,
        );
      }
    },
  );

  return openapi;
}

/**
 * To understand how this function work
 * @link https://stackoverflow.com/a/70910553/15431338
 */
export function createFunctionParameters(type: RequestMethod) {
  return (routeParameters: RouteParameters) => {
    return (target: any, propertyKey: string, descriptor: PropertyDescriptor): void | TypedPropertyDescriptor<any> => {
      // Add path to reflection
      Reflect.defineMetadata(PATH_METADATA, routeParameters.path, target);
      const original = target[propertyKey];
      return {
        ...descriptor,
        value() {
          const guards = Reflect.getMetadata(GUARD, original);
          // At the moment controller function cannot have other parameter than ctx
          return controllerHandler(routeParameters, type, original, guards, this);
        },
      };
    };
  };
}

export const Get = createFunctionParameters(RequestMethod.GET);

export const Post = createFunctionParameters(RequestMethod.POST);

export const Put = createFunctionParameters(RequestMethod.PUT);

export const Patch = createFunctionParameters(RequestMethod.PATCH);

export const Delete = createFunctionParameters(RequestMethod.DELETE);
