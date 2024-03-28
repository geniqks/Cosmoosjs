export interface IBootstrapConfig {
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
      /** HTTP server to be used */
      provider: () => Promise<any>;
      /** Exceptions handler */
      exceptions: () => Promise<any>;
    };
    /**
     * Orm to be used
     */
    orm?: () => Promise<any>;
  };

  /**
   * Loaders are files that must be injected when the application is launched so that it can perform upstream validation.
   */
  loaders: {
    /**
     * Inject the env config to validate your environment
     */
    env: () => Promise<any>;
    /**
     * Inject all classes into our ioc library "Inversify"
     */
    ioc: () => Promise<any>;
  };

  /**
   *  You can inject custom providers to perform actions not native to the framework
   */
  providers?: () => Promise<any>[];

  /**
   * The entry point to your application
   */
  entrypoint?: () => Promise<any>;
}
