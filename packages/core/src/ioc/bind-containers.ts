import type { Container } from "inversify";
import { Env } from "src";

// Récupérer le fichier qui a le default export de l'app pour pouvoir load to les containers que l'utilisateur voudras
export const bindToContainers = (container: Container): void => {
	container.bind(Env).toSelf();
};
