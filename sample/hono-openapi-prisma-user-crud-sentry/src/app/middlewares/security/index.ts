import type { ConfigService } from '@cosmoosjs/core';
import type { Server } from '@cosmoosjs/hono-openapi';
import { cors } from 'hono/cors';
import { csrf } from 'hono/csrf';

export function setupHttpSecurity(server: Server, config: ConfigService) {
  const origin = config.get<string>('ORIGINS').split(',');
  server.hono.openAPIRegistry.registerComponent("securitySchemes", "Bearer", {
    type: "http",
    scheme: "bearer",
  });
  //@ts-ignore
  server.hono.use(
    '*',
    cors({
      origin,
    }),
  );
  //@ts-ignore
  server.hono.use(
    '*',
    csrf({
      origin,
    }),
  );
}
