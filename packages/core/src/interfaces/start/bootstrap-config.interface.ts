export interface IBootstrapConfig {
  /**
   * Les adapters permette de choisir les outils que vous utiliserez durant le développement
   * de l'application
   */
  adapters: {
    /**
     * Serveur HTTP qui sera utilisé
     */
    server: any;
    /**
     * Orm qui sera utilisé
     */
    orm?: any;
  }

  /**
   * Les Loaders sont les fichiers qui doivent être injecté au lancement de l'application
   * pour que cette dernière puisse effectuer des validation en amont 
   */
  loaders: {
    /**
     * Injection de la config env afin de valider votre environnement
     */
    env: any;
    /**
     * Injection de toutes les class dans notre librairie ioc "Inversify"
     */
    ioc: any;
  }

  /**
   *  Vous pouvez injecter des providers custom afin d'effectuer des actions non natif
   *  au framework
   */
  providers?: any[];
}