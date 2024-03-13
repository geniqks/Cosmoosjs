import { CosmosOptions } from "./interfaces";

class CosmosFactory {
  public async create(options: CosmosOptions): Promise<any> {

  }
}

/**
 * Run the application
 */
export const CosmosFactoryStatic = new CosmosFactory();
