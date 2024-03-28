import { ConfigService } from '@config/config';
import type { IFactoryBaseConfig } from '@customTypes/index';
import { Environment, IocContainer } from 'src';
import type { IBootstrapConfig } from '../interfaces';

//TODO: add app exception handler
// TODO: refacto this file later (used in this state for developpement purpose)
async function loadModule(importedModule: any) {
  try {
    const module = await importedModule();
    return module.default;
  } catch (error: any) {
    throw new Error(`Error loading module ${importedModule}: ${error?.message}`);
  }
}

export async function defineConfigAndBootstrapApp(config: (injectedConfig: ConfigService) => IBootstrapConfig): Promise<{
  port: number;
  fetch: any;
} | void> {
  const env = IocContainer.container.get<Environment>(Environment);
  const configService = IocContainer.container.get<ConfigService>(ConfigService);
  const loadedConfig = config(configService);
  const iocBindingLoader = await loadModule(loadedConfig.loaders.ioc);
  const envLoader = await loadModule(loadedConfig.loaders.env);
  env.process(envLoader);
  iocBindingLoader(IocContainer.container);

  if (loadedConfig.entrypoint) {
    const entrypoint = await loadModule(loadedConfig.entrypoint);
    entrypoint();
  }

  if (loadedConfig.adapters?.server) {
    const server = await loadedConfig.adapters?.server.provider();
    const exceptionHandler = await loadedConfig.adapters?.server.exceptions;
    const httpConfig: IFactoryBaseConfig = {
      port: loadedConfig.adapters?.server.port,
    };

    server.HttpFactory.bindContainers(IocContainer.container);
    server.HttpFactory.exceptionHandler(exceptionHandler);
    return server.HttpFactory.listen(httpConfig);
  }
}
