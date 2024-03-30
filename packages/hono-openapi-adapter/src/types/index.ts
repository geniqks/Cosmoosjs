import type { IFactoryBaseConfig } from '@cosmosjs/core';
import type { OpenAPIObjectConfigure } from '@hono/zod-openapi';
import type { GuardAbstract } from 'src';
import type { RouteConfig } from './hono-zod.type';

export type RouteParameters = RouteConfig;
export type GuardsType<T extends GuardAbstract = any> = new () => T;
export type FactoryConfig<T extends string> = IFactoryBaseConfig & FactoryOAS<T>;
export type FactoryOAS<T extends string> = {
  metadata: FactoryOASMetadatas<T>;
};
export type FactoryOASMetadatas<T extends string = ''> = {
  /** default: false */
  enableSwaggerInProd: boolean;
  openapi: {
    /** Url of OAP */
    url: string;
    /** OAP configuration */
    config: OASType<T>;
  };
};
type OASType<T extends string> = OpenAPIObjectConfigure<any, T>;
