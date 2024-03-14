import { Env } from "@cosmosjs/core";

export default {
  PORT: Env.validator.string().transform(Number)
}