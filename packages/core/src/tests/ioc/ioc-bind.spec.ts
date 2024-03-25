import { beforeAll, describe, expect, it } from 'bun:test';
import { Container } from 'inversify';
import 'reflect-metadata';
import { IocTestClass, IocTestClass2, IocTestClass3 } from './ioc-bind-class';

describe('Ioc Service', () => {
  const container = new Container();

  beforeAll(() => {
    container.bind(IocTestClass).toSelf();
    container.bind('IocTestClass2').to(IocTestClass2);
    container.bind(IocTestClass3).toSelf();
  });

  it('Should bind classes to container', async () => {
    const iocTestClass = container.get(IocTestClass);
    expect(iocTestClass).toBeDefined();
    expect(iocTestClass).toBeInstanceOf(IocTestClass);
  });

  it('Should test if inversiy inject in contrustor', async () => {
    const iocTestClass3 = container.get(IocTestClass3);
    const iocTestClass2 = container.get('IocTestClass2');
    expect(iocTestClass2).toBeInstanceOf(IocTestClass2);
    expect(iocTestClass3.iocTestClass2).toBeInstanceOf(IocTestClass2);
  });
});
