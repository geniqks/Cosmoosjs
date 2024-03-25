import type { Container } from "inversify";
import { ControllerRoot } from "@app/controllers";
import { PrismaService } from "src/libs/prisma/prisma.service";
import { UserController } from "@app/controllers/user.controller";

/**
 * This file will list all the application's injectables. 
 * They will then be injected into our ioc library "Inversify".
 * For more information 
 * @link https://inversify.io/
 */
export default (container: Container) => {
  container.bind(UserController).toSelf().inRequestScope();
  container.bind(PrismaService).toSelf().inSingletonScope();
  container.bind(ControllerRoot).toSelf().inRequestScope();
};