import { Container } from 'inversify';
import { SERVER_TARGET } from 'src/constants/reflector.constant';
import { bindToContainers } from './bind-containers';

export class IocContainer {
	/**
	 * Access to inversify container
	 */
	private static _container: Container;

	public static get container(): Container {
		if (!IocContainer._container) {
			IocContainer._container = new Container();
			bindToContainers(IocContainer._container);
			Reflect.defineMetadata(Container, IocContainer._container, SERVER_TARGET);
		}
		return IocContainer._container;
	}
}
