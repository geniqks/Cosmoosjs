/**
 * This class export the type of @hono/zod-openapi openapi-regristry.d.ts
 * Because we need to use this to type our custom controller and it's not exported by the library
 */

import type {
  EncodingObject as EncodingObject30,
  ExamplesObject as ExamplesObject30,
  HeadersObject as HeadersObject30,
  LinksObject as LinksObject30,
  OperationObject as OperationObject30,
  ReferenceObject as ReferenceObject30,
  SchemaObject as SchemaObject30,
} from 'openapi3-ts/oas30';

import type {
  EncodingObject as EncodingObject31,
  ExamplesObject as ExamplesObject31,
  HeadersObject as HeadersObject31,
  LinksObject as LinksObject31,
  OperationObject as OperationObject31,
  ReferenceObject as ReferenceObject31,
  SchemaObject as SchemaObject31,
} from 'openapi3-ts/oas31';
import type { AnyZodObject, ZodType } from 'zod';

declare type EncodingObject = EncodingObject30 | EncodingObject31;
declare type ExamplesObject = ExamplesObject30 | ExamplesObject31;
declare type HeadersObject = HeadersObject30 | HeadersObject31;
declare type LinksObject = LinksObject30 | LinksObject31;
declare type OperationObject = OperationObject30 | OperationObject31;
declare type ReferenceObject = ReferenceObject30 | ReferenceObject31;
declare type SchemaObject = SchemaObject30 | SchemaObject31;
declare type Method = 'get' | 'post' | 'put' | 'delete' | 'patch' | 'head' | 'options' | 'trace';
interface ZodMediaTypeObject {
  schema: ZodType<unknown> | SchemaObject | ReferenceObject;
  examples?: ExamplesObject;
  example?: any;
  encoding?: EncodingObject;
}

interface ZodContentObject {
  [mediaType: string]: ZodMediaTypeObject;
}

interface ZodRequestBody {
  description?: string;
  content: ZodContentObject;
  required?: boolean;
}

interface ResponseConfig {
  description: string;
  headers?: AnyZodObject | HeadersObject;
  links?: LinksObject;
  content?: ZodContentObject;
}
export declare type RouteConfig = Omit<OperationObject, 'responses'> & {
  // Removed because we inject it in background
  // method: Method;
  path: string;
  request?: {
    body?: ZodRequestBody;
    params?: AnyZodObject;
    query?: AnyZodObject;
    cookies?: AnyZodObject;
    headers?: AnyZodObject | ZodType<unknown>[];
  };
  responses: {
    [statusCode: string]: ResponseConfig;
  };
};
