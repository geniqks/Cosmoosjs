import { Container } from "inversify";
import { FileReaderService } from "../services/file-reader.service";
import { Env } from "src";

// Récupérer le fichier qui a le default export de l'app pour pouvoir load to les containers que l'utilisateur voudras
export const bindToContainers = (container: Container): void => {
  container.bind(FileReaderService).toSelf()
  container.bind(Env).toSelf()
}