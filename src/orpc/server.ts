import { os } from "@orpc/server";
import { requiredAuthMiddleware } from "./middlewares/auth";
import { dbProviderMiddleware } from "./middlewares/db.middleware";
import { envMiddleware } from "./middlewares/env.middleware";
import { loggerMiddleware } from "./middlewares/logger.middleware";

const base = os
  .$context<{
    headers: Headers;
    request: Request;
  }>()
  .use(loggerMiddleware)
  .use(envMiddleware)
  .use(dbProviderMiddleware);

export const publicProcedure = base;
export const authedProcedure = base.use(requiredAuthMiddleware);
