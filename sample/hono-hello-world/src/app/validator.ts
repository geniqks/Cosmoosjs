import { injectable } from "inversify";

@injectable()
export class Validator {
  public numberValidator(number: number): boolean {
    return !isNaN(number);
  }
} 