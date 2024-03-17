import { CosmosConfig } from '@config/config';
import { LoggerService } from '@services/logger.service';
import type { Container } from 'inversify';
import { Env } from 'src';
import { AdapterService } from 'src/adapters/adapter.service';

/**
 * Bind all classes to container
 * TODO: find a way to use toSelf() make auto injection in class constructor
 */
export const bindToContainers = (container: Container): void => {
	container.bind('AdapterService').to(AdapterService).inRequestScope();
	container.bind('CosmosConfig').to(CosmosConfig).inSingletonScope();
	container.bind('Env').to(Env).inSingletonScope();
	container.bind('LoggerService').to(LoggerService).inSingletonScope();
};
