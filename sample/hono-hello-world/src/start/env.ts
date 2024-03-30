import { ENV_STATE_ENUM, Env } from "@cosmoosjs/core";

/**
 * This file is used to validate environment variables
 * We use zod to validate them
 * 
 * You can access zod directly with the const
 * Env.validator
 * 
 * For more information on the zod api
 * @link https://zod.dev/
 */ 
export default {
  PORT: Env.validator.string().transform(Number),
  ENV: Env.validator.nativeEnum(ENV_STATE_ENUM)
}