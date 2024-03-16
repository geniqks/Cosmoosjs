import { Container } from "inversify";
import { bindToContainers } from "./bind-containers";

// biome-ignore lint/complexity/noStaticOnlyClass: <explanation>
export class IocContainer {
  private static _container: Container

  public static get container(): Container {
    if (!IocContainer._container) {
      IocContainer._container = new Container();
      bindToContainers(IocContainer._container);
    }
    return IocContainer._container;
  }
}
