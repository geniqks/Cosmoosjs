import { ConfigService } from '@config/config';
import { Env, IocContainer } from 'src';
import type { IBootstrapConfig } from '../interfaces';

//TODO: add app exception handler
async function loadModule(importedModule: any) {
  try {
    const module = await importedModule();
    return module.default;
  } catch (error: any) {
    throw new Error(`Error loading module ${importedModule}: ${error?.message}`);
  }
}
// TODO: refacto this file later
export async function defineConfigAndBootstrapApp(config: (injectedConfig: ConfigService) => IBootstrapConfig): Promise<{
  port: number;
  fetch: any;
} | void> {
  const env = IocContainer.container.get<Env>(Env);
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
    //TODO: voir pour ne pas utiliser le dénominateur HonoFactory
    return server.HonoFactory.listen(loadedConfig.adapters?.server.port, IocContainer.container);
  }
}
