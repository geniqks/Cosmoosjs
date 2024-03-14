import { CosmosFactoryStatic, type CosmosOptions } from "@cosmosjs/core";
import * as path from 'path';
import dotenv from 'dotenv'
dotenv.config()

async function bootstrapApp() {
  const appOptions: CosmosOptions = {
    envLoaderPath: path.join(__dirname, './start/env.ts'),
    iocLoaderPath: path.join(__dirname, './start/ioc-loader.ts'),
  }

  const app = await CosmosFactoryStatic.create(appOptions);
}

bootstrapApp();