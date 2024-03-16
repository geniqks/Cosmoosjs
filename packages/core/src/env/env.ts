import { injectable } from 'inversify';
import z, { type SafeParseError, type ZodError } from 'zod';
// Fixes the return error from the Zod library.
function hashError(safeParseReturn: any): safeParseReturn is SafeParseError<ZodError<any>> {
	return safeParseReturn?.error;
}

@injectable()
export class Env {
	public static validator = z;

	public process(variables: { [key: string]: any }) {
		const schema = z.object(variables);
		const parsed = schema.safeParse(process.env);

		if (hashError(parsed)) {
			console.error('❌ Invalid environment variables:', JSON.stringify(parsed.error.format(), null, 4));
			process.exit(1);
		}
	}
}
