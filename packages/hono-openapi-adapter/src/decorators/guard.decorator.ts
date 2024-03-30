import type { GuardsType } from '@customTypes/index';
import type * as hono from 'hono';
import type { Container } from 'inversify';
import { CONTAINER, GUARD, SERVER_TARGET } from 'src/constants/reflector.constant';

export function guardHandler(guards: GuardsType[], ctx?: hono.Context): void {
  const container: Container = Reflect.getMetadata(CONTAINER, SERVER_TARGET);
  for (const guard of guards) {
    const resolvedGuard = container.get(guard);
    resolvedGuard.run(ctx);
  }
}

function createFunctionParameters() {
  return (...guard: GuardsType[]) => {
    return (target: any, propertyKey: string, descriptor: PropertyDescriptor): void | TypedPropertyDescriptor<any> => {
      const original = target[propertyKey];
      Reflect.defineMetadata(GUARD, guard, original);
      return {
        ...descriptor,
        value() {
          return original.call(this);
        },
      };
    };
  };
}

export const Guards = createFunctionParameters();
