import type { FactoryBaseConfig } from '@customTypes/index';
import type { Container } from 'inversify';

export abstract class HttpAdapter {
  public bindContainers(_container: Container): void {}

  public listen<T extends FactoryBaseConfig>(_config: T, _container: Container) {}

  public exceptionHandler(_handler: Function): void {}
}
