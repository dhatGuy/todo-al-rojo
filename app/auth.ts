import { type BetterAuthOptions, betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { APIError } from "better-auth/api";
import { admin } from "better-auth/plugins";
import { count, eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/node-postgres";
import type { AppLoadContext } from "react-router";
import * as schema from "./db/schema";
import { referralsTable } from "./db/schema";
import { generateUniqueReferralCode } from "./lib/generateUniqueReferralCode";

let authInstance: ReturnType<typeof betterAuth>;
export const createBetterAuth = (
	database: BetterAuthOptions["database"],
	env: Env,
) =>
	betterAuth({
		emailAndPassword: {
			enabled: true,
			// sendResetPassword: async ({ user, url }) => {
			// 	await sendResetPasswordEmail(user.email, url);
			// 	console.log("Email sent");
			// },
		},
		socialProviders: {
			google: {
				clientId: env.GOOGLE_CLIENT_ID,
				clientSecret: env.GOOGLE_CLIENT_SECRET,
				redirectURI: `${env.CF_PAGES_URL}/api/auth/callback/google`,
			},
		},
		plugins: [admin()],
		database,
		advanced: {
			// useSecureCookies: true,
			database: {
				generateId: false,
			},
			defaultCookieAttributes: {
				// secure: Bun.env.NODE_ENV === "production", // Use secure cookies in production
				httpOnly: true, // Helps mitigate XSS attacks
				sameSite: "none", // Allows cookies to be sent in cross-site requests
				// ...(Bun.env.NODE_ENV === "production" ? { partitioned: true } : {}),
			},
		},
		// trustedOrigins: [env.WEB_URL],
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
		databaseHooks: {
			user: {
				create: {
					before: async (user, ctx) => {
						const [phoneExist] = await database
							.select({ count: count() })
							.from(schema.userTable)
							.where(eq(schema.userTable.phoneNumber, ctx?.body.phoneNumber));

						const referralCode = await generateUniqueReferralCode();
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
						await database.insert(referralsTable).values({
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
	});

export function getAuth(ctx: AppLoadContext) {
	if (!authInstance) {
		authInstance = createBetterAuth(
			drizzleAdapter(
				drizzle(ctx.cloudflare.env.HYPERDRIVE.connectionString, { schema }),
				{
					provider: "pg",
					schema: {
						user: schema.userTable,
						verification: schema.verificationTable,
						session: schema.sessionTable,
						account: schema.accountTable,
					},
					// debugLogs: true,
				},
			),
			ctx.cloudflare.env,
		);
	}

	return authInstance;
}
