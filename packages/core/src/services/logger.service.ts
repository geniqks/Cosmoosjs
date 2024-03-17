import type { CosmosConfig } from '@config/config';
import { injectable } from 'inversify';
import { type Logger, pino } from 'pino';
import pretty from 'pino-pretty';
import { Env } from 'src';

type PinoType = Logger<never>;

/**
 * Available environement
 */
export enum ENV_STATE_ENUM {
	PROD = 'PROD',
	DEV = 'DEV',
}

@injectable()
export class LoggerService {
	private _pino: PinoType;

	public constructor(config: CosmosConfig) {
		const env = config.get<ENV_STATE_ENUM>(config.getEnvKey('ENV'));
		console.log(env);
		if (env === ENV_STATE_ENUM.DEV) {
			this._pino = pino(
				pretty({
					colorize: true,
				}),
			);
		} else {
			this._pino = pino();
		}
	}

	/**
	 * Access to pino library
	 */
	get pino(): PinoType {
		return this._pino;
	}

	private set pino(logger: PinoType) {
		this._pino = logger;
	}
}
