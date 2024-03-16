import { defineConfigAndBootstrapApp } from "@cosmosjs/core";
import dotenv from 'dotenv'
dotenv.config()

defineConfigAndBootstrapApp({
  adapters: {
    server: () => import('@cosmosjs/hono-openapi'),
  },
  loaders: {
    env: () => import('@start/env'),
    ioc: () => import('@start/ioc-loader'),
  }
})
