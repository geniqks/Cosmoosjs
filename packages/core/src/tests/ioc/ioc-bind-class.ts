import { inject, injectable } from 'inversify';

@injectable()
export class IocTestClass {
	public test(): string {
		return 'this is a test';
	}
}

@injectable()
export class IocTestClass2 {
	public test(): string {
		return 'this is a test 2';
	}
}

@injectable()
export class IocTestClass3 {
	constructor(@inject('IocTestClass2') public readonly iocTestClass2: IocTestClass2) {}

	public test(): string {
		return 'this is a test 3';
	}
}
