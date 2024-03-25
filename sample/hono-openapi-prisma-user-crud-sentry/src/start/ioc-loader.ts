import { Validator } from "../app/validator";
import type { Container } from "inversify";
import { ControllerRoot } from "@app/controllers";

/**
 * This file will list all the application's injectables. 
 * They will then be injected into our ioc library "Inversify".
 * For more information 
 * @link https://inversify.io/
 */
export default (container: Container) => {
  container.bind(Validator).toSelf();
  container.bind(ControllerRoot).toSelf();
};