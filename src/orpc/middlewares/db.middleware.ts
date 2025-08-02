import { getDb } from "@/database/db";
import { os } from "@orpc/server";

export const dbProviderMiddleware = os
  .$context<{ env: Env }>()
  .middleware(async ({ context, next }) => {
    const db = getDb(context.env.HYPERDRIVE.connectionString);

    try {
      return next({
        context: {
          db,
        },
      });
    } finally {
      // await database.$client.end();
    }
  });
