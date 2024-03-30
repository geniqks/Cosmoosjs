import type { Container } from "inversify";
import { ControllerRoot } from "@app/controllers";
import { PrismaService } from "src/libs/prisma/prisma.service";
import { UserController } from "@app/controllers/user.controller";
import { UserRepository } from "src/libs/user/user.repository";
import { UserService } from "src/libs/user/user.service";
import { JwtMiddleware } from "@app/middlewares/jwt";
import { TestGuard } from "src/libs/guards/test.guard";

/**
 * This file will list all the application's injectables. 
 * They will then be injected into our ioc library "Inversify".
 * For more information 
 * @link https://inversify.io/
 */
export default (container: Container) => {
  container.bind(ControllerRoot).toSelf().inRequestScope();
  container.bind(JwtMiddleware).toSelf().inRequestScope();
  container.bind(PrismaService).toSelf().inSingletonScope();
  container.bind(TestGuard).toSelf().inRequestScope();
  container.bind(UserController).toSelf().inRequestScope();
  container.bind(UserRepository).toSelf().inRequestScope();
  container.bind(UserService).toSelf().inRequestScope();

};