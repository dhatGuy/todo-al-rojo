import { os } from "@orpc/server";
import { requiredAuthMiddleware } from "./middlewares/auth";
import { dbProviderMiddleware } from "./middlewares/db.middleware";
import { envMiddleware } from "./middlewares/env.middleware";

const base = os
  .$context<{
    headers: Headers;
  }>()
  .use(envMiddleware)
  .use(dbProviderMiddleware);

export const publicProcedure = base;
export const authedProcedure = base.use(requiredAuthMiddleware);
