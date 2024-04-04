import 'reflect-metadata';
import { ControllerRoot } from '@app/controllers';
import * as core from '@cosmoosjs/core';
import * as hono_openapi from '@cosmoosjs/hono-openapi';
import bindToContainers from '@start/ioc-loader';
import type { Container } from 'inversify';
import httpExceptionsHandler from '@exceptions/handler';
import dotenv from 'dotenv';
dotenv.config();

/**
 * Setup environnement for tests
 */
export function setupTestsHelper(container: Container) {
  // Bind classes to container
  hono_openapi.bindToContainers(container);
  core.bindToContainers(container);
  bindToContainers(container);
  // Get app
  const app = container.get(hono_openapi.Server);
  // Set reflection for decorators
  hono_openapi.defineReflection(app);
  // Add custom error handler
  hono_openapi.HttpFactory.exceptionHandler(httpExceptionsHandler, container);
  // Setup routing
  const controllerRoot = container.get(ControllerRoot);
  controllerRoot.setup();
}
