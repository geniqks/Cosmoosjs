import { describe, expect, it } from 'bun:test';
import { serializeRoutePath } from './utils';

describe('Util', () => {
	it('Should remove custom param to *', () => {
		const path = serializeRoutePath('/user/{userId}');
		expect(path).toEqual('/user/*');
	});

	it('Should remove multiple custom param', () => {
		const path = serializeRoutePath('/user/{userId}/site/{siteId}');
		expect(path).toEqual('/user/*/site/*');
	});

	it('Should return initial value', () => {
		const path = serializeRoutePath('/user/register');
		expect(path).toEqual('/user/register');
	});
});
