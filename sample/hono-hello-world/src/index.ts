import { defineConfigAndBootstrapApp } from "@cosmosjs/core";
import {serve} from 'bun';
import dotenv from 'dotenv'
dotenv.config()

/**
 * The server will be configured with all given options
 * and will return the http config in order to start the server.
 */
const boostrapApp = async () => {
  const config = await defineConfigAndBootstrapApp({
    adapters: {
      server: {
        port: 3005,
        provider: () => import('@cosmosjs/hono-openapi')
      },
    },
    loaders: {
      env: () => import('@start/env'),
      ioc: () => import('@start/ioc-loader'),
    },
    entrypoint: () => import('@app/index'),
  })
  return config;
}

boostrapApp().then(httpConfig => {
  serve({
    async fetch(req) {
      const serverConfig = await httpConfig?.fetch(req);
      return serverConfig;
    },
    port: httpConfig?.port
  })
})