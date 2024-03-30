import type { ConfigService, ENV_STATE_ENUM } from '@cosmoosjs/core';
import type { Server } from '@cosmoosjs/hono-openapi';
import { sentry } from '@hono/sentry';

export function setupSentry(server: Server, configService: ConfigService) {
  const sentryPrivate = configService.get<string>('SENTRY_DSN');
  const env = configService.get<ENV_STATE_ENUM>('ENV');

  if (sentryPrivate) {
    server.hono.use(
      '*',
      sentry({
        dsn: sentryPrivate,
        tracesSampleRate: 1.0,
        environment: env,
      }),
    );
  }
}