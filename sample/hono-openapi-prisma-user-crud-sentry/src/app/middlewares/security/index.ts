import type { ConfigService } from '@cosmoosjs/core';
import type { Server } from '@cosmoosjs/hono-openapi';
import { cors } from 'hono/cors';
import { csrf } from 'hono/csrf';

export function setupHttpSecurity(server: Server, config: ConfigService) {
  const origin = config.get<string>('ORIGINS').split(',');
  server.hono.use(
    '*',
    cors({
      origin,
    }),
  );
  server.hono.use(
    '*',
    csrf({
      origin,
    }),
  );
}
