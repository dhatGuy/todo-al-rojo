import { auth } from "@/lib/auth";
import { ORPCError, os } from "@orpc/server";

export const requiredAuthMiddleware = os
  .$context<{ env: Env; headers: Headers }>()
  .middleware(async ({ context, next }) => {
    try {
      const session = await auth(context.env).api.getSession({
        headers: context.headers,
      });

      if (!session) {
        throw new ORPCError("UNAUTHORIZED");
      }

      return next({
        context: { session },
      });
    } catch (e) {
      console.log("auth middleware error", e);
      throw e;
    }
  });

export const optionalAuthMiddleware = os
  .$context<{ env: Env; headers: Headers }>()
  .middleware(async ({ context, next }) => {
    const session = await auth(context.env).api.getSession({
      headers: context.headers,
    });

    return next({
      context: { session },
    });
  });
