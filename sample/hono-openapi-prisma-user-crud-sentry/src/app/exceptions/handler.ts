import { IocContainer, LoggerService } from "@cosmosjs/core";
import { Server } from "@cosmosjs/hono-openapi";
import { HTTPException } from "hono/http-exception";
import { StatusCodes, ReasonPhrases } from 'http-status-codes';

const app = IocContainer.container.get(Server);
const logger = IocContainer.container.get(LoggerService);

app.hono.onError((err, ctx) => {
  logger.pino.error(err);
  if (err instanceof HTTPException) {
    return err.getResponse();
  }
  return ctx.text(ReasonPhrases.INTERNAL_SERVER_ERROR, StatusCodes.INTERNAL_SERVER_ERROR);
});