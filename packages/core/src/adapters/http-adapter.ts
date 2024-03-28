import type { IFactoryBaseConfig } from '@customTypes/index';
import type { Container } from 'inversify';

export abstract class HttpAdapter {

  public bindContainers(_container: Container): void { }

  public listen<T extends IFactoryBaseConfig>(_config: T, _container: Container) {}

  public exceptionHandler(handler: Function): void { }
}
