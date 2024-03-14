import { Container } from "inversify";
import { bindToContainers } from "./bind-containers";

// TODO: add loader from configuration to load user binding
export class IocContainer {
  private static _container: Container

  public static get container(): Container {
    if (!this._container) {
      this._container = new Container();
      bindToContainers(this._container);
    }
    return this._container;
  }
}
