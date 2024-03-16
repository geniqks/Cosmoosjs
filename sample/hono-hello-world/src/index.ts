import { defineConfigAndBootstrapApp } from "@cosmosjs/core";
import dotenv from 'dotenv'
dotenv.config()

defineConfigAndBootstrapApp({
  adapters: {
    server: () => import('@cosmosjs/hono-openapi'),
  },
  loaders: {
    env: () => import('@app/start/env'),
    ioc: () => import('@app/start/ioc-loader'),
  }
})
