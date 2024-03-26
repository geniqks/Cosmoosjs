import { ConfigService } from '@config/config';
import { LoggerService } from '@services/logger.service';
import type { Container } from 'inversify';
import { Environment } from 'src/env';

/**
 * Bind all classes to container
 */
export const bindToContainers = (container: Container): void => {
  container.bind(ConfigService).toSelf().inSingletonScope();
  container.bind(Environment).toSelf().inSingletonScope();
  container.bind(LoggerService).toSelf().inSingletonScope();
};
