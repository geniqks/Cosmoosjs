import { Env, IocContainer } from 'src';
import type { IBootstrapConfig } from '../interfaces';

async function loadModule(importedModule: any) {
	try {
		const module = await importedModule();
		return module.default;
	} catch (error: any) {
		throw new Error(`Error loading module ${importedModule}: ${error?.message}`);
	}
}

export async function defineConfigAndBootstrapApp(config: IBootstrapConfig) {
	const envLoader = await loadModule(config.loaders.env);
	const iocBindingLoader = await loadModule(config.loaders.ioc);
	const env = IocContainer.container.get(Env);
	env.process(envLoader);
	iocBindingLoader(IocContainer.container);
}
