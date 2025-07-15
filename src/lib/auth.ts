import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";

import { db } from "@/database/db";
import { schema } from "@/database/schema";

export const auth = (env: Env) => {
  const sql = db(env.HYPERDRIVE.connectionString);
  return betterAuth({
    baseURL: env.CF_PAGES_URL,
    secret: env.BETTER_AUTH_SECRET,
    trustedOrigins: [env.CF_PAGES_URL],
    advanced: {
      database: {
        generateId: false,
      },
    },
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
        referralCode: {
          type: "string",
        },
      },
    },
    socialProviders: {
      google: {
        clientId: env.GOOGLE_CLIENT_ID as string,
        clientSecret: env.GOOGLE_CLIENT_SECRET as string,
        redirectURI: `${env.CF_PAGES_URL}/api/auth/callback/google`,
        mapProfileToUser: async (profile) => ({
          email: profile.email,
          firstName: profile.name?.split(" ")[0],
          lastName: profile.name?.split(" ")[1],
          image: profile.picture,
        }),
      },
    },
    database: drizzleAdapter(sql, {
      provider: "pg",
      schema: {
        user: schema.userTable,
        verification: schema.verificationTable,
        session: schema.sessionTable,
        account: schema.accountTable,
      },
    }),
    emailAndPassword: {
      enabled: true,
    },
  });
};
