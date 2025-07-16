import { createServerFn } from "@tanstack/react-start";
import { getHeaders } from "@tanstack/react-start/server";
import { auth } from "./auth";
import { getBindings } from "./bindings";

export const getUser = createServerFn({ method: "GET" }).handler(async ({}) => {
  const env = getBindings();
  const headers = getHeaders();
  const session = await auth(env).api.getSession({
    headers: headers as unknown as Headers,
  });

  return session;
});
