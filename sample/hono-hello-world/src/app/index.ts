import { IocContainer } from '@cosmosjs/core';
import { Validator } from './validator';
import { inject, injectable } from 'inversify';

export default () => {
  const test = IocContainer.container.get(Test);
};

@injectable()
export class Test {
  constructor(@inject(Validator) private readonly validator: Validator) { }

  public validate() { }
}
