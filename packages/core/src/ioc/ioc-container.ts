import { Container } from "inversify";

export class IocContainer {
  private static _container: Container

  public static get Container(): Container {
    if (!this._container) {
      this._container = new Container();
    }
    return this._container;
  }
}
