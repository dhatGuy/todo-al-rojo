import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { APIError } from "better-auth/api";

import { db } from "@/database/db";
import { schema } from "@/database/schema";
import { referralsTable } from "@/database/schema/referrals.table";
import { count, eq } from "drizzle-orm";
import { generateUniqueReferralCode } from "./generateUniqueReferralCode";

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
    databaseHooks: {
      user: {
        create: {
          before: async (user, ctx) => {
            const [phoneExist] = await sql
              .select({ count: count() })
              .from(schema.userTable)
              .where(eq(schema.userTable.phoneNumber, ctx?.body.phoneNumber));

            const referralCode = await generateUniqueReferralCode(6, 5, sql);
            if (phoneExist.count > 0) {
              throw new APIError("UNPROCESSABLE_ENTITY", {
                message: "Phone number already exists.",
                code: "PHONE_NUMBER_ALREADY_EXISTS",
              });
            }
            return {
              data: {
                ...user,
                referralCode,
              },
            };
          },
          after: async (user, ctx) => {
            const { ref, affiliate } = ctx?.query || {};
            await sql.insert(referralsTable).values({
              referrerUserId: user.id,
              referredUserId: ref,
              // @ts-expect-error referral is present
              referralCode: user?.referralCode,
              affiliateId: affiliate,
            });
          },
        },
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
