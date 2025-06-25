import type { Context } from "hono";
import type { ContentfulStatusCode } from "hono/utils/http-status";

export function successResponse<T>(
  c: Context,
  data: T,
  message: string = "Success",
  status: ContentfulStatusCode = 200,
) {
  return c.json(
    {
      success: true,
      message,
      data,
    },
    status,
  );
}

export function createdResponse<T>(
  c: Context,
  data: T,
  message: string = "Resource created successfully",
  status: ContentfulStatusCode = 201,
) {
  return c.json(
    {
      success: true,
      message,
      data,
    },
    status,
  );
}

export function noContentResponse(c: Context) {
  return c.body(null, 204);
}
