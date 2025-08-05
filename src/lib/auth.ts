import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { APIError } from "better-auth/api";
import { customSession } from "better-auth/plugins";

import { getDb } from "@/database/db";
import { schema } from "@/database/schema";
import { userTable } from "@/database/schema/auth-schema";
import { referralsTable } from "@/database/schema/referrals.table";
import { tasksTable } from "@/database/schema/tasks.table";
import { userLevelsTable } from "@/database/schema/user-levels.table";
import { rewardUserChips } from "@/services/chip.services";
import { generateReferralCode } from "@/services/referral.service";
import { count, eq } from "drizzle-orm";
import { REFERRAL_COOKIE } from "./capture-ref-and-utm.server";
import { sendResetPasswordEmail } from "./resend";

export const auth = (env: Env) => {
  const database = getDb(env.HYPERDRIVE.connectionString);
  return betterAuth({
    baseURL: env.BETTER_AUTH_URL,
    secret: env.BETTER_AUTH_SECRET,
    trustedOrigins: [env.TRUSTED_ORIGINS || ""],
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
          required: false,
        },
        referralCode: {
          type: "string",
        },
        chips: {
          type: "number",
          default: 0,
        },
        // level: {
        //   type: "number",
        //   default: 1,
        // },
      },
    },
    socialProviders: {
      google: {
        clientId: env.GOOGLE_CLIENT_ID,
        clientSecret: env.GOOGLE_CLIENT_SECRET,
        redirectURI: `${env.WEB_URL}/api/auth/callback/google`,
        mapProfileToUser: async (profile) => {
          return {
            email: profile.email,
            firstName: profile.name?.split(" ")[0],
            lastName: profile.name?.split(" ")[1],
            image: profile.picture,
          };
        },
      },
    },
    databaseHooks: {
      user: {
        create: {
          before: async (user, ctx) => {
            if (ctx?.body?.phoneNumber) {
              const [phoneExist] = await database
                .select({ count: count() })
                .from(schema.userTable)
                .where(eq(schema.userTable.phoneNumber, ctx?.body.phoneNumber));

              if (phoneExist.count > 0) {
                throw new APIError("UNPROCESSABLE_ENTITY", {
                  message: "Phone number already exists.",
                  code: "PHONE_NUMBER_ALREADY_EXISTS",
                });
              }
            }

            const referralCode = await generateReferralCode(database);

            return {
              data: {
                ...user,
                referralCode,
              },
            };
          },
          after: async (user, ctx) => {
            const refCookieValue = ctx?.getCookie(REFERRAL_COOKIE);

            const { affiliate } = ctx?.query || {};
            const regTask = "register_web";
            const task = await database.query.tasksTable.findFirst({
              where: eq(tasksTable.taskType, regTask),
            });

            if (task) {
              await database.transaction(async (tx) => {
                await rewardUserChips(tx, {
                  amount: task.defaultChips,
                  taskType: regTask,
                  userId: user.id,
                  description: "Welcome bonus",
                });

                if (refCookieValue) {
                  const referrer = await tx.query.userTable.findFirst({
                    where: eq(userTable.referralCode, refCookieValue),
                  });

                  if (referrer) {
                    await tx.insert(referralsTable).values({
                      referrerId: referrer.id,
                      referredId: user.id,
                      referralCode: referrer.referralCode,
                      affiliateId: affiliate,
                    });

                    //  award the referrer
                    await rewardUserChips(tx, {
                      amount: task.defaultChips,
                      taskType: "referral_signup",
                      userId: referrer.id,
                      description: "Referral signup bonus",
                    });
                  }
                }
              });
            }
          },
        },
      },
    },
    database: drizzleAdapter(database, {
      provider: "pg",
      schema: {
        user: schema.userTable,
        verification: schema.verificationTable,
        session: schema.sessionTable,
        account: schema.accountTable,
      },
      // debugLogs: true,
    }),
    emailAndPassword: {
      enabled: true,
      sendResetPassword: async ({ user, url }) => {
        await sendResetPasswordEmail(env, user.email, url);
        console.log("Email sent");
      },
    },
    plugins: [
      customSession(async ({ user, session }) => {
        const userData = await database.query.userTable.findFirst({
          with: {
            level: {
              columns: {
                level: true,
                name: true,
                requiredChips: true,
              },
            },
          },
          where: eq(userTable.id, user.id),
        });
        const nextLevel = await database.query.userLevelsTable.findFirst({
          columns: {
            level: true,
            name: true,
            requiredChips: true,
          },
          where: eq(userLevelsTable.level, (userData?.level?.level ?? 1) + 1),
        });

        return {
          user: {
            ...userData,
            nextLevel,
          },
          session,
        };
      }),
    ],
  });
};
