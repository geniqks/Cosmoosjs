import { ConfigService, IocContainer } from '@cosmosjs/core';
import { Server } from '@cosmosjs/hono-openapi';
import { setupHttpSecurity } from './middlewares/security';
import { setupSentry } from './middlewares/sentry';

export default () => {
  const configServer = IocContainer.container.get(ConfigService);
  const server = IocContainer.container.get(Server)

  setupHttpSecurity(server, configServer);
  setupSentry(server, configServer)
};
