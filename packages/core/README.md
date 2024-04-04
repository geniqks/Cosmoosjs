## @cosmoosjs/core

- [Environment](#environnement)
- [Inversion of control](#ioc)
- [Testing](https://github.com/ae-creator/CosmosJS/tree/main/packages/hono-openapi-adapter#testing)

### Environnement

#### Environment Variables

#### Variable Validation

When introducing new environment variables, validate them in you'r environnement file using the [Zod](https://zod.dev/) library:

**Environment.validator** export the zod library

```ts
export default {
  DATABASE_URL: Environment.validator.string(),
  ENV: Environment.validator.nativeEnum(ENV_STATE_ENUM),
  JWT_TOKEN: Environment.validator.string(),
  ORIGINS: Environment.validator.string(),
  PORT: Environment.validator.string().transform(Number),
  SALT_ROUND: Environment.validator.string(),
  SENTRY_DSN: Environment.validator.string(),
};
```

## IOC

This project utilizes [Inversify](https://inversify.io/), an inversion of control container
for JavaScript & Node.js apps powered by TypeScript.

### Binding

There are several ways to inject classes, in the application we use service <strong>identifier binding</strong> and <strong>name binding</strong>.

#### Identifier binding

We use service identifier binding when we need to inject a class that will remain unique within its business context.

```ts
// utils/container.ts
const container = new Container();
container.bind(AppLogger).toSelf().inSingletonScope();

// src/index.ts
const appLogger = iocContainer.get(AppLogger);

// controllers/user/index.ts
// Updated file for example
@injectable()
export class UserController implements IController {
  public constructor(@inject(Logger) private logger: Logger) {}
}
```

For more information about name identifier, please refer to the [Wiki](https://github.com/inversify/InversifyJS/blob/master/wiki/classes_as_id.md)
