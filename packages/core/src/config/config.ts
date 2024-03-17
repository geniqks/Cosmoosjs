import { inject, injectable } from 'inversify';
import { Env, type LoggerService } from 'src';
@injectable()
export class CosmosConfig {
	public constructor(@inject('LoggerService') private readonly loggerService: LoggerService) {}

	/**
	 * Get env variables
	 */
	public get<T>(value: string): T {
		const envValue = process.env[value];

		if (envValue === 'true') {
			return true as T;
		}

		if (envValue === 'false') {
			return false as T;
		}

		if (!Number.isNaN(Number(envValue))) {
			return Number(envValue) as T;
		}

		return envValue as T;
	}

	/**
	 * Validate if env key exist and then return it
	 */
	public getEnvKey(key: string) {
		const envKey = Env.EnvKeys[key];
		if (envKey) {
			return envKey;
		} else {
			this.loggerService.pino.warn(`${key} does not exist in you'r environnement`);
		}
	}
}
