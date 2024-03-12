import { beforeAll, describe, expect, it } from 'bun:test';
import { Container } from 'inversify';
import { IocTestClass } from './ioc-bind-class';

describe('Ioc Service', () => {
  const container = new Container();

  beforeAll(() => {
    container.bind(IocTestClass).toSelf();
  })

  it('Should bind classes to container', async () => {
    const iocTestClass = container.get(IocTestClass);
    expect(iocTestClass).toBeDefined();
    expect(iocTestClass).toBeInstanceOf(IocTestClass);
  });
});