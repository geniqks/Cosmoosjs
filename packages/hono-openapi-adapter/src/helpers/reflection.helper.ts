import { IocContainer } from '@cosmoosjs/core';
import type { Server } from '@server/server';
import { CONTAINER, SERVER, SERVER_TARGET } from 'src/constants/reflector.constant';

/**
 * Define values by reflection for decorators
 */
export function defineReflection(app: Server) {
  Reflect.defineMetadata(SERVER, app, SERVER_TARGET);
  Reflect.defineMetadata(CONTAINER, IocContainer.container, SERVER_TARGET);
}
