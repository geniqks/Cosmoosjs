import { injectable } from "inversify";
import { CosmosOptions } from "./interfaces";

@injectable()
export class CosmosFactory {
  public async create(options: CosmosOptions): Promise<any> {

  }
}

/**
 * Run the application
 */
export const CosmosFactoryStatic = new CosmosFactory();
