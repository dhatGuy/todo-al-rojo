import { getBindings } from "@/lib/bindings";
import { os } from "@orpc/server";

export const envMiddleware = os.middleware(async ({ next }) => {
  const env = getBindings();

  return next({
    context: {
      env,
    },
  });
});
