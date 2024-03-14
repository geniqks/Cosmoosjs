import { FileReaderService } from "@services/file-reader.service";
import { CosmosOptions } from "./interfaces";
import { IocContainer } from "./ioc";
import { Env } from "./env";
class CosmosFactory {
  public async create(options: CosmosOptions): Promise<any> {
    if (options.envLoaderPath) {
        const envLoader = await FileReaderService.getDefaultExportFromFile(options.envLoaderPath);
        const iocLoader = await FileReaderService.getDefaultExportFromFile(options.iocLoaderPath);
        const env = IocContainer.container.get(Env)
        env.process(envLoader);
        iocLoader(IocContainer.container);
    }
  }

  public async listen(port: number) {
    return 'salut'
  }
}

/**
 * Run the application
 */
export const CosmosFactoryStatic = new CosmosFactory();
