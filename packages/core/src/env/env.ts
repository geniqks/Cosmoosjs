import { injectable } from 'inversify';
import z, { type SafeParseError, type ZodError } from 'zod';

/**
 * Fixes the return error from the Zod library.
 */
function hashError(safeParseReturn: any): safeParseReturn is SafeParseError<ZodError<any>> {
	return safeParseReturn?.error;
}

@injectable()
export class Env {
	/**
	 * Access to zod library
	 */
	public static validator = z;

	/**
	 * Mapping of env key
	 */
	public static EnvKeys: { [key: string]: any } = {};

	/**
	 * Process and validate env variables
	 */
	public process(variables: { [key: string]: any }) {
		for (const [envVariable, enValues] of Object.entries(variables)) {
			Env.EnvKeys[envVariable] = envVariable;
		}

		const schema = z.object(variables);
		const parsed = schema.safeParse(process.env);

		if (hashError(parsed)) {
			console.error('❌ Invalid environment variables:', JSON.stringify(parsed.error.format(), null, 4));
			process.exit(1);
		}
	}
}
