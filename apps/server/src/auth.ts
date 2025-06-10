import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { APIError } from "better-auth/api";
import { admin } from "better-auth/plugins";
import { count, eq } from "drizzle-orm";
import { env } from "../env.js";
import { db } from "./db/index.js";
import * as schema from "./db/schema.js";

export const auth = betterAuth({
  emailAndPassword: {
    enabled: true,
  },
  plugins: [admin()],
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: {
      user: schema.userTable,
      verification: schema.verificationTable,
      session: schema.sessionTable,
      account: schema.accountTable,
    },
    debugLogs: true,
  }),
  advanced: {
    database: {
      generateId: false,
    },
  },
  trustedOrigins: [env.WEB_URL!],
  user: {
    additionalFields: {
      firstName: {
        type: "string",
        required: true,
      },
      lastName: {
        type: "string",
        required: true,
      },
      phoneNumber: {
        type: "string",
        required: true,
      },
    },
  },
  databaseHooks: {
    user: {
      create: {
        before: async (user, ctx) => {
          const [phoneExist] = await db
            .select({ count: count() })
            .from(schema.userTable)
            // @ts-expect-error
            .where(eq(schema.userTable.phoneNumber, ctx.body.phoneNumber));
          if (phoneExist.count > 0) {
            throw new APIError("UNPROCESSABLE_ENTITY", {
              message: "Phone number already exists.",
              code: "PHONE_NUMBER_ALREADY_EXISTS",
            });
          }
          return {
            data: user,
          };
        },
      },
    },
  },
});

/**
 * Represents the authentication status of an application's routes.
 * This type is used to enforce type safety for route authentication requirements.
 */
/**
 * @property {"IsAuthenticated"} IsAuthenticated - All routes require authentication
 * @property {"IsNotAuthenticated"} IsNotAuthenticated - No routes require authentication
 * @property {"IsMaybeAuthenticated"} IsMaybeAuthenticated - Some routes may require authentication
 *
 * @example
 * // All routes require auth
 * const app = new Hono<HonoAppContext<"IsAuthenticated">>();
 *
 * // Some routes may require auth (default)
 * const app = new Hono<HonoAppContext<"IsMaybeAuthenticated">>();
 *
 * // No routes require auth
 * const app = new Hono<HonoAppContext<"IsNotAuthenticated">>();
 */
type AuthStatus =
  | "IsAuthenticated"
  | "IsNotAuthenticated"
  | "IsMaybeAuthenticated";

export type HonoAppContext<
  Authenticated extends AuthStatus = "IsMaybeAuthenticated",
> = {
  Variables: {
    user: Authenticated extends "IsAuthenticated"
      ? typeof auth.$Infer.Session.user
      : Authenticated extends "IsNotAuthenticated"
        ? null
        : typeof auth.$Infer.Session.user | null;
    session: Authenticated extends "IsAuthenticated"
      ? typeof auth.$Infer.Session.session
      : Authenticated extends "IsNotAuthenticated"
        ? null
        : typeof auth.$Infer.Session.session | null;
  };
};
