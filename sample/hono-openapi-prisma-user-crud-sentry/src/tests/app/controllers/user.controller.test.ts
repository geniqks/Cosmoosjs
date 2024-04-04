import { describe, it, beforeAll } from 'bun:test';
import { Container } from 'inversify';
import { setupTestsHelper } from 'src/tests/helpers/setup.helper';
import { Server } from '@cosmoosjs/hono-openapi';

describe('User Controller', () => {
  const container = new Container();

  beforeAll(() => {
    setupTestsHelper(container);
  });

  it('Should test /', async () => {
    const server = container.get(Server);
    // const res = await server.hono.request('/');
    // expect(res.status).toEqual(500);
    // expect(await res.text()).toEqual('Hello my name is error');
  });
});
