import { ConfigService } from '@config/config';
import { loadModule } from '@helpers/module.helper';
import { Environment, IocContainer } from 'src';
import type { IBootstrapConfig, IHttpServe } from '../interfaces';

class AppBootstrap<T> {
  private config: IBootstrapConfig<T> | undefined;

  public async defineConfigAndBootstrapApp(config: (injectedConfig: ConfigService) => IBootstrapConfig<T>): Promise<IHttpServe | void> {
    const configService = IocContainer.container.get(ConfigService);
    this.config = config(configService);

    this.processEnv();
    await this.bindApp();
    const returnedConfig = await this.loadHttp();
    await this.loadEntrypoint();

    return returnedConfig;
  }

  /**
   * Bind all object to inversify
   */
  private async bindApp(): Promise<void> {
    if (!this.config?.loaders?.ioc) return;
    const iocBindingLoader = await loadModule(this.config.loaders.ioc);
    iocBindingLoader(IocContainer.container);
  }

  /**
   * Process env variables
   */
  private async processEnv(): Promise<void> {
    if (!this.config?.loaders?.env) return;
    const env = IocContainer.container.get(Environment);
    const envLoader = await loadModule(this.config.loaders.env);
    env.process(envLoader);
  }

  /**
   *  Load http server
   */
  private async loadHttp(): Promise<void | IHttpServe> {
    if (this.config?.adapters?.server) {
      const { provider, exceptions, ...httpConfig } = this.config.adapters.server;
      const server = await provider();
      server.HttpFactory.bindContainers(IocContainer.container);

      if (exceptions) {
        const exceptionHandler = await loadModule(exceptions);
        server.HttpFactory.exceptionHandler(exceptionHandler);
      }
      return server.HttpFactory.listen(httpConfig);
    }
  }

  /**
   * Load and run entrypoint
   */
  private async loadEntrypoint(): Promise<void> {
    if (this.config?.entrypoint) {
      const entrypoint = await loadModule(this.config.entrypoint);
      await entrypoint();
    }
  }
}

export const AppFactory = <T>() => new AppBootstrap<T>();
