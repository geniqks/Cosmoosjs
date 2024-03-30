import { ENV_STATE_ENUM, Environment } from "@cosmoosjs/core";

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
  DATABASE_URL: Environment.validator.string(),
  ENV: Environment.validator.nativeEnum(ENV_STATE_ENUM),
  JWT_TOKEN: Environment.validator.string(),
  ORIGINS: Environment.validator.string(),
  PORT: Environment.validator.string().transform(Number),
  SALT_ROUND: Environment.validator.string(),
  SENTRY_DSN: Environment.validator.string(),
}