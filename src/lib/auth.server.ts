import { createServerFn } from "@tanstack/react-start";
import { getHeaders, setResponseStatus } from "@tanstack/react-start/server";
import { auth } from "./auth";
import { getBindings } from "./bindings";

export const getUser = createServerFn({ method: "GET" }).handler(async () => {
  const env = getBindings();
  const headers = getHeaders();
  const session = await auth(env).api.getSession({
    headers: headers as unknown as Headers,
  });

  if (!session) {
    setResponseStatus(401);
    return null;
  }

  // Serialize the user object to avoid function serialization issues
  return {
    user: {
      ...session.user,
      level: session.user.level
        ? {
            name: session.user.level.name,
            level: session.user.level.level,
            requiredChips: session.user.level.requiredChips,
          }
        : undefined,
    },
    session: session.session,
  };
});
