# hono-openapi-adapter

This packages is intented to be injected to **@cosmoosjs/core**.\
It aims to inject an http server and create an api with a simplified integration of _Hono Zod OpenApi_

- [Installation](#installation)
- [Api](#api)
  - [@Guards](#guards)
  - [@Get,Post,Put,Patch,Delete](#http)
- [Tests](#testing)
  - [Example](#example)

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

#### Http

##### @Get,Post,Put,Patch,Delete

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

## Testing

```bash
$ bun test
```

To test the codebase you need to emulate the process of bootstraping the application. At the moment you can use the helper given below setup them

```ts
/**
 * Setup environnement for tests
 */
export function setupTestsHelper(container: Container) {
  // Bind classes to container
  hono_openapi.bindToContainers(container);
  core.bindToContainers(container);
  bindToContainers(container);
  // Get app
  const app = container.get(hono_openapi.Server);
  // Set reflection for decorators
  hono_openapi.defineReflection(app);
  // Add custom error handler
  hono_openapi.HttpFactory.exceptionHandler(httpExceptionsHandler, container);
  // Setup routing
  const controllerRoot = container.get(ControllerRoot);
  controllerRoot.setup();
}
```

### Example

This example is from the sample [hono-openapi](https://github.com/ae-creator/CosmosJS/tree/main/sample/hono-openapi-prisma-user-crud-sentry)

```ts
import { describe, it, beforeAll, expect } from "bun:test";
import { Container } from "inversify";
import { setupTestsHelper } from "src/tests/helpers/setup.helper";
import { Server } from "@cosmoosjs/hono-openapi";

describe("User Controller", () => {
  const container = new Container();

  beforeAll(() => {
    setupTestsHelper(container);
  });

  it("Should test /", async () => {
    const server = container.get(Server);
    const res = await server.hono.request("/");
    expect(res.status).toEqual(500);
    expect(await res.text()).toEqual("Hello my name is error");
  });
});
```

You can have more examples [here](https://github.com/honojs/middleware/blob/main/packages/zod-openapi/test/index.test.ts)
