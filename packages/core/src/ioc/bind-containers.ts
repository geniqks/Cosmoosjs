import { CosmosConfig } from '@config/config';
import { LoggerService } from '@services/logger.service';
import type { Container } from 'inversify';
import { Env } from 'src';
import { AdapterService } from 'src/adapters/adapter.service';

/**
 * Bind all classes to container
 */
export const bindToContainers = (container: Container): void => {
	container.bind(Env).toSelf().inSingletonScope();
	container.bind(CosmosConfig).toSelf().inSingletonScope();
	container.bind(AdapterService).toSelf().inRequestScope();
	container.bind(LoggerService).toSelf().inSingletonScope();
};
