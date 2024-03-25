import { ConfigService } from '@config/config';
import { LoggerService } from '@services/logger.service';
import type { Container } from 'inversify';
import { Env } from 'src';
import { AdapterService } from 'src/adapters/adapter.service';

/**
 * Bind all classes to container
 * TODO: find a way to use toSelf() make auto injection in class constructor
 */
export const bindToContainers = (container: Container): void => {
	container.bind(AdapterService).toSelf().inRequestScope();
	container.bind(ConfigService).toSelf().inSingletonScope();
	container.bind(Env).toSelf().inSingletonScope();
	container.bind(LoggerService).toSelf().inSingletonScope();
};
