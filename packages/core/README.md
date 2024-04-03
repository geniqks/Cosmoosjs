## @cosmoosjs/core

#### Environment Variables

Copy the provided template for environment variables:

```powershell
cp .env.template .env
```

Update the .env file with your specific configuration.

#### Variable Validation

When introducing new environment variables, validate them in `src/config/config.ts` using the [Zod](https://zod.dev/) library:

```ts
// TODO add example
const schema = z.object({
  CUSTOM_VARIABLE: withDevDefault(z.string(), "Default value"),
});
```

This step ensures that all variables adhere to a defined schema, enhancing the reliability of your application.

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
