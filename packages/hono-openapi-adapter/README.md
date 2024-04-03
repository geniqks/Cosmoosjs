# hono-openapi-adapter

This packages is intented to be injected to **@cosmoosjs/core**.\
It aims to inject an http server and create an api with a simplified integration of _Hono Zod OpenApi_

## Installation

```bash
$ bun i @cosmoosjs/hono-openapi
```

## Api

Below you'll find the api for understanding some of the existing components

### Decorators

---

#### @Guards

Guards can be used to create middleware using [hono middleware](https://hono.dev/guides/middleware#definition-of-middleware).\
Regarding the declaration of a guard, it must always be declared before the Get,Post... because of its typescript composition
[Typescript](https://www.typescriptlang.org/docs/handbook/decorators.html#decorator-composition)

```ts
const Guards = (...guard: GuardsType[]): void {}
```

**_Usage_**

```ts
@Guards(TestGuard, TestGuard2)
public ...

export class TestGuard extends GuardAbstract {
  public run(_ctx: any): void {
    console.log("Guard triggered");
  }
}
```

**_Types_**

```ts
type GuardsType<T extends GuardAbstract = any> = new (...args: any) => T;

abstract class GuardAbstract {
  public run(_ctx: Context): void {}
}
```

---

#### @Get,Post,Put,Patch,Delete

All decorators work in the same way and have the same declaration.

```ts
const Get = (routeParameters: RouteParameters): void {}
```

**_Usage_**

```ts
@Get({
  path: '/user/me',
  tags: ['User'],
  security: [
    {
      Bearer: [],
    }
  ],
  responses: {},
})
```

**_Types_**

```ts
type RouteParameters = Omit<OperationObject, "responses"> & {
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
```
