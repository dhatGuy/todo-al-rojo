import { os } from "@orpc/server";
import { requiredAuthMiddleware } from "./middlewares/auth";
import { dbProviderMiddleware } from "./middlewares/db.middleware";

const base = os
  .$context<{
    env: Env;
    headers: Headers;
  }>()
  .use(dbProviderMiddleware);

export const publicProcedure = base;
export const authedProcedure = base.use(requiredAuthMiddleware);
