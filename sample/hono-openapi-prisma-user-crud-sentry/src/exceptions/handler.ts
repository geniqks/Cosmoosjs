import type { LoggerService } from '@cosmoosjs/core';
import { HTTPException } from 'hono/http-exception';
import { StatusCodes, ReasonPhrases } from 'http-status-codes';
import type * as hono from 'hono';

export default (err: Error, ctx: hono.Context, logger: LoggerService) => {
  logger.pino.error(err);
  if (err instanceof HTTPException) {
    return err.getResponse();
  }
  return ctx.text(ReasonPhrases.INTERNAL_SERVER_ERROR, StatusCodes.INTERNAL_SERVER_ERROR);
};
