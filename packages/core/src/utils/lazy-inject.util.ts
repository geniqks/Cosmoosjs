import type { Container } from 'inversify';
import getDecorators from 'inversify-inject-decorators';
import { CONTAINER, SERVER_TARGET } from 'src/constants/reflector.constant';

const container: Container = Reflect.getMetadata(CONTAINER, SERVER_TARGET);
export const { lazyInject } = getDecorators(container);
