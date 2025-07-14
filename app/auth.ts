import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { APIError } from "better-auth/api";
import { admin } from "better-auth/plugins";
import { count, eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/node-postgres";
import * as schema from "./db/schema";
import { referralsTable } from "./db/schema";
import { env } from "./env";
import { generateUniqueReferralCode } from "./lib/generateUniqueReferralCode";
import { sendResetPasswordEmail } from "./service/email.service";

export const db = drizzle(env.DATABASE_URL, { schema });
export const auth = betterAuth({
	emailAndPassword: {
		enabled: true,
		sendResetPassword: async ({ user, url }) => {
			await sendResetPasswordEmail(user.email, url);
			console.log("Email sent");
		},
	},
	socialProviders: {
		google: {
			clientId: process.env.GOOGLE_CLIENT_ID as string,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
			redirectURI: `${Bun.env.NODE_ENV === "development" ? "http://localhost:8000" : Bun.env.RENDER_EXTERNAL_URL}/api/auth/callback/google`,
		},
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
		// debugLogs: true,
	}),
	advanced: {
		// useSecureCookies: true,
		database: {
			generateId: false,
		},
		defaultCookieAttributes: {
			secure: Bun.env.NODE_ENV === "production", // Use secure cookies in production
			httpOnly: true, // Helps mitigate XSS attacks
			sameSite: "none", // Allows cookies to be sent in cross-site requests
			// ...(Bun.env.NODE_ENV === "production" ? { partitioned: true } : {}),
		},
	},
	trustedOrigins: [env.WEB_URL],
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
					const [phoneExist] = await db
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
					await db.insert(referralsTable).values({
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
