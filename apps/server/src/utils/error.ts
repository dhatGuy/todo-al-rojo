import type { Context } from "hono";
import { HTTPException } from "hono/http-exception";
import type { ContentfulStatusCode } from "hono/utils/http-status";
import { ZodError } from "zod";

export class CustomError extends HTTPException {
  constructor(
    message: ContentfulStatusCode,
    options?: {
      res?: Response;
      status?: number;
    },
  ) {
    super(message, options);
    this.name = "CustomError";
  }
}

export function errorHandler(err: Error, c: Context) {
  if (err instanceof CustomError) {
    return c.json({ error: err.message }, err.status);
  }

  if (err instanceof ZodError) {
    return c.json({ error: "Invalid data", details: err.errors }, 400);
  }

  if (err instanceof HTTPException) {
    return c.json({ error: err.message }, err.status);
  }

  console.error(err);
  return c.json({ error: "Internal Server Error" }, 500);
}

export function notFoundHandler(c: Context) {
  return c.json({ error: "Not Found" }, 404);
}
