import { inject, injectable } from 'inversify';
import { Env } from 'src/env/env';

@injectable()
export class ConfigService {
	public constructor(@inject(Env) private readonly env: Env) {}

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
		const envKey = this.env.envKeys[key];
		if (envKey) {
			return envKey;
		} else {
			console.warn(`${key} does not exist in you'r environnement`);
		}
	}
}
