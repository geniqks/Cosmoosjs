import { defineConfigAndBootstrapApp } from "@cosmosjs/core";
import dotenv from 'dotenv'
import { Validator } from "./app/validator";
import * as t from '@cosmosjs/hono-openapi';
import type iocLoader from "./start/ioc-loader";

dotenv.config()

defineConfigAndBootstrapApp({
  adapters: {
    server: () => import('@cosmosjs/hono-openapi'),
  },
  loaders: {
    env: () => import('./start/env'),
    ioc: () => import('./start/ioc-loader'),
  }
})
