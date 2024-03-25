import type { Container } from 'inversify';
import { CONTAINER, SERVER, SERVER_TARGET } from 'src/constants/reflector.constant';
import { bindToContainers } from '../ioc';
import { Server } from '../server';

class HonoAdapter {
  public listen(port: number, container: Container) {
    bindToContainers(container);
    const app = container.get(Server);
    Reflect.defineMetadata(SERVER, app, SERVER_TARGET);
    Reflect.defineMetadata(CONTAINER, container, SERVER_TARGET);

    // TODO: add swagger / openApi

    return {
      port,
      fetch: app.hono.fetch,
    };
  }
}

export const HonoFactory = new HonoAdapter();
