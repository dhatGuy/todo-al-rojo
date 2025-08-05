import { ORPCError, os } from "@orpc/server";

// Utility function to format current time
const formatNow = (): string => {
  const now = new Date();
  return now.toISOString().replace("T", " ").substring(0, 19);
};

// Utility function to colorize status codes for console output
const colorStatus = (status: number): string => {
  const statusStr = status.toString();

  if (status >= 200 && status < 300) {
    return `\x1b[32m${statusStr}\x1b[0m`; // Green for success
  } else if (status >= 400 && status < 500) {
    return `\x1b[33m${statusStr}\x1b[0m`; // Yellow for client errors
  } else if (status >= 500) {
    return `\x1b[31m${statusStr}\x1b[0m`; // Red for server errors
  } else {
    return statusStr; // No color for other statuses
  }
};

export const loggerMiddleware = os
  .$context<{ request: Request }>()
  .middleware(async ({ context, next, path }) => {
    const start = Date.now();
    const method = context.request.method;
    const pathname = `/${path.join("/")}`;

    try {
      const result = await next({});
      const duration = Date.now() - start;
      const status = 200; // Success status

      console.log(
        `${formatNow()} | ${method} ${pathname} ${colorStatus(status)} ${duration}ms`,
      );

      return result;
    } catch (error) {
      const duration = Date.now() - start;
      const status =
        error instanceof ORPCError
          ? error.code === "UNAUTHORIZED"
            ? 401
            : error.code === "BAD_REQUEST"
              ? 400
              : error.code === "NOT_FOUND"
                ? 404
                : error.code === "FORBIDDEN"
                  ? 403
                  : 500
          : 500;

      console.error(
        `${formatNow()} | ${method} ${pathname} ${colorStatus(status)} ${duration}ms - ERROR:`,
        error instanceof Error ? error.message : error,
      );

      throw error;
    }
  });
