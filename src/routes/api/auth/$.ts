import { auth } from "@/lib/auth";
import { getBindings } from "@/lib/bindings";
import { createServerFileRoute } from "@tanstack/react-start/server";

export const ServerRoute = createServerFileRoute("/api/auth/$").methods({
  GET: ({ request }) => {
    const env = getBindings();
    return auth(env).handler(request);
  },
  POST: ({ request }) => {
    const env = getBindings();
    return auth(env).handler(request);
  },
});
