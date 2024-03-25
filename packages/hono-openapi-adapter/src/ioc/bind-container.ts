import { Server } from '@server/server';
import type { Container } from 'inversify';

/**
 * Bind all classes to container
 */
export const bindToContainers = (container: Container): void => {
	container.bind(Server).toSelf().inSingletonScope();
};
