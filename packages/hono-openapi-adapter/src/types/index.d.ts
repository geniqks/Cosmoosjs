import type { IFactoryBaseConfig } from '@cosmosjs/core';
import type { GuardAbstract } from 'src';
import type { RouteConfig } from './hono-zod.type';

export type RouteParameters = RouteConfig;
export type GuardsType<T extends GuardAbstract = any> = new () => T;
export type IFactoryConfig = IFactoryBaseConfig & {
  openapi: {
    url: string;
    config: any;
  };
};
