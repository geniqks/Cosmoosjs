export interface IBootstrapConfig {
	/**
	 * Adapters let you choose the tools you'll use during application development
	 */
	adapters: {
		/**
		 * HTTP server to be used
		 */
		server: any;
		/**
		 * Orm to be used
		 */
		orm?: any;
	};

	/**
	 * Loaders are files that must be injected when the application is launched so that it can perform upstream validation.
	 */
	loaders: {
		/**
		 * Inject the env config to validate your environment
		 */
		env: any;
		/**
		 * Inject all classes into our ioc library "Inversify"
		 */
		ioc: any;
	};

	/**
	 *  You can inject custom providers to perform actions not native to the framework
	 */
	providers?: any[];
}
