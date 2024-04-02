import type { FactoryBaseConfig } from '@customTypes/index';
import type { Serve } from 'bun';
import type { Container } from 'inversify';

export declare abstract class HttpAdapter {
  public bindContainers(_container: Container): void;

  public listen<T extends FactoryBaseConfig>(_config: T): Serve;

  public exceptionHandler(_handler: Function): void;
}
