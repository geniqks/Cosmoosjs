import type { Container } from 'inversify';
import { Server } from '../server';

/**
 * Bind all classes to container
 */
export const bindToContainers = (container: Container): void => {
  container.bind(Server).toSelf().inSingletonScope();
};
