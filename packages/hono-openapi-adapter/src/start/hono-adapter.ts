import { OpenAPIHono } from '@hono/zod-openapi';
import type { Container } from 'inversify';
import { bindToContainers } from '../ioc';
import { Server } from '../server';

class HonoAdapter {
	public listen(port: number, container: Container) {
    bindToContainers(container);
    const app = container.get(Server);

		return {
			port,
			fetch: app.hono.fetch,
		};
	}
}

export const HonoFactory = new HonoAdapter();
