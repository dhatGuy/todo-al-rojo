import { Hono } from "hono";

import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { prettyJSON } from "hono/pretty-json";
import { env } from "../env.js";
import { auth, type HonoAppContext } from "./auth.js";
import { shopRouter } from "./routes/shop/index.js";
import { tasksRouter } from "./routes/tasks/index.js";
import { errorHandler, notFoundHandler } from "./utils/error.js";

const app = new Hono<HonoAppContext>()
  .use(logger())
  .use(prettyJSON())
  // ------------------------------------------------------------
  // CORS
  // ------------------------------------------------------------
  .use(
    "*",
    cors({
      origin: env.WEB_URL,
      allowHeaders: ["Content-Type", "Authorization"],
      allowMethods: ["POST", "GET", "OPTIONS"],
      exposeHeaders: ["Content-Length"],
      maxAge: 600,
      credentials: true,
    }),
  )
  // ------------------------------------------------------------
  // AUTH
  // ------------------------------------------------------------
  .use("*", async (c, next) => {
    const session = await auth.api.getSession({ headers: c.req.raw.headers });

    if (!session) {
      c.set("user", null);
      c.set("session", null);
      return next();
    }

    c.set("user", session.user);
    c.set("session", session.session);
    return next();
  })
  .get("/", (c) => {
    return c.redirect("/api", 301);
  })
  .basePath("/api")
  .get("/", (c) => c.json({ message: "Hello World" }))
  .on(["POST", "GET"], "/auth/*", (c) => {
    return auth.handler(c.req.raw);
  })
  .route("/shop", shopRouter)
  .route("/tasks", tasksRouter)
  // ------------------------------------------------------------
  // Error and Not Found Handlers
  // ------------------------------------------------------------
  .onError(errorHandler)
  .notFound(notFoundHandler);

export default app;

export type AppType = typeof app;
