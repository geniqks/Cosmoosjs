import { ConfigService } from '@config/config';
import { LoggerService } from '@services/logger.service';
import type { Container } from 'inversify';
import { Env } from 'src';

/**
 * Bind all classes to container
 */
export const bindToContainers = (container: Container): void => {
	container.bind(ConfigService).toSelf().inSingletonScope();
	container.bind(Env).toSelf().inSingletonScope();
	container.bind(LoggerService).toSelf().inSingletonScope();
};
