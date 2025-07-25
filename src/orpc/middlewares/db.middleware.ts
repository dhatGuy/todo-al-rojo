import { db } from "@/database/db";
import { os } from "@orpc/server";

export const dbProviderMiddleware = os
  .$context<{ env: Env }>()
  .middleware(async ({ context, next }) => {
    const database = db(context.env.HYPERDRIVE.connectionString);

    try {
      return next({
        context: {
          db: database,
        },
      });
    } finally {
      // await database.$client.end();
    }
  });
