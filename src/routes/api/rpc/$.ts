import { router } from "@/orpc/router";
import { RPCHandler } from "@orpc/server/fetch";
import { BatchHandlerPlugin } from "@orpc/server/plugins";
import {
  createServerFileRoute,
  getHeaders,
} from "@tanstack/react-start/server";

const handler = new RPCHandler(router, {
  plugins: [new BatchHandlerPlugin()],
});

async function handle({ request }: { request: Request }) {
  const headers = getHeaders() as unknown as Headers;
  const { response } = await handler.handle(request, {
    prefix: "/api/rpc",
    context: {
      headers,
      request,
    },
  });

  return response ?? new Response("Not Found", { status: 404 });
}

export const ServerRoute = createServerFileRoute("/api/rpc/$").methods({
  HEAD: handle,
  GET: handle,
  POST: handle,
  PUT: handle,
  PATCH: handle,
  DELETE: handle,
});
