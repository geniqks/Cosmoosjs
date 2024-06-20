import type { FactoryBaseConfig } from '@cosmoosjs/core';
import type { GuardAbstract } from '@guards/guard.abstract';
import type { OpenAPIObjectConfigure } from '@hono/zod-openapi';
import type { RouteConfig } from './hono-zod.type';

export type RouteParameters = RouteConfig;
export type GuardsType<T extends GuardAbstract = any> = new (...args: any) => T;
export type FactoryConfig = FactoryBaseConfig & FactoryOAS;
export type FactoryOAS = {
  metadata?: FactoryOASMetadatas;
};
export type FactoryOASMetadatas = {
  /** default: false */
  enableSwaggerInProd?: boolean;
  /** default: /swagger */
  swaggerUrl: string;
  openapi: {
    /** Url of OAP */
    url: string;
    /** OAP configuration */
    config: OASType;
  };
};
type OASType = OpenAPIObjectConfigure<any, string>;
