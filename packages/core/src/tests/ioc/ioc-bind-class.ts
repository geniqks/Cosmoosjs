import { injectable } from 'inversify';

@injectable()
export class IocTestClass {
	public test(): string {
		return 'this is a test';
	}
}
