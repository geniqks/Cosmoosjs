import type { HttpAdapter } from 'src/adapters';

export interface IBootstrapConfig<Metatadas> {
  /**
   * Adapters let you choose the tools you'll use during application development
   */
  adapters: {
    /**
     * HTTP server config
     */
    server: {
      /** Port to be used */
      port: number;
      /** You can pass metadata to handle them using metadata */
      metadata?: Metatadas;
      /** HTTP server to be used */
      provider: <T extends HttpAdapter>() => Promise<
        any & {
          HttpFactory: T;
        }
      >;
      /** Exceptions handler */
      exceptions?: () => Promise<unknown>;
    };
  };

  /**
   * Loaders are files that must be injected when the application is launched so that it can perform upstream validation.
   */
  loaders: {
    /**
     * Inject the env config to validate your environment
     */
    env: () => Promise<unknown>;
    /**
     * Inject all classes into our ioc library "Inversify"
     */
    ioc: () => Promise<unknown>;
  };

  /**
   * The entry point to your application
   */
  entrypoint?: () => Promise<unknown>;
}

export interface IHttpServe {
  port: number;
  fetch: any;
}
