import { salutTest } from '@cosmosjs/core';
import { describe, expect, it } from 'bun:test';

describe('test', () => {
  it('Should remove custom param to *', () => {
    expect(salutTest()).toEqual(1);
  });
});