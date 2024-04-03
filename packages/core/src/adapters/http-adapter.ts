import type { FactoryBaseConfig } from '@customTypes/index';
import type { Serve } from 'bun';
import type { Container } from 'inversify';

export abstract class HttpAdapter {
  public bindContainers(_container: Container): void {}

  public listen<T extends FactoryBaseConfig>(_config: T): Serve {
    throw Error('listen function need to be implemented');
  }

  public exceptionHandler(_handler: Function): void {}
}
