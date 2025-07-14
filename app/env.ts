import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const env = createEnv({
	server: {
		DATABASE_URL: z.url(),
		BETTER_AUTH_SECRET: z.string().min(1),
		WEB_URL: z.string().min(1),
		GOOGLE_CLIENT_SECRET: z.string().min(1),
		GOOGLE_CLIENT_ID: z.string().min(1),
		GOOGLE_MAIL_CLIENT_ID: z.string().min(1),
		GOOGLE_CLIENT_MAIL_SECRET: z.string().min(1),
		GOOGLE_MAIL_REFRESH_TOKEN: z.string().min(1),
		SENDER_EMAIL: z.email(),
	},

	/**
	 * Makes sure you explicitly access **all** environment variables
	 * from `server` and `client` in your `runtimeEnv`.
	 */
	runtimeEnvStrict: {
		DATABASE_URL: Bun.env.DATABASE_URL,
		BETTER_AUTH_SECRET: Bun.env.BETTER_AUTH_SECRET,
		WEB_URL: Bun.env.WEB_URL,
		GOOGLE_CLIENT_SECRET: Bun.env.GOOGLE_CLIENT_SECRET,
		GOOGLE_CLIENT_ID: Bun.env.GOOGLE_CLIENT_ID,
		GOOGLE_MAIL_CLIENT_ID: Bun.env.GOOGLE_MAIL_CLIENT_ID,
		GOOGLE_CLIENT_MAIL_SECRET: Bun.env.GOOGLE_CLIENT_MAIL_SECRET,
		GOOGLE_MAIL_REFRESH_TOKEN: Bun.env.GOOGLE_MAIL_REFRESH_TOKEN,
		SENDER_EMAIL: Bun.env.SENDER_EMAIL,
	},

	/**
	 * By default, this library will feed the environment variables directly to
	 * the Zod validator.
	 *
	 * This means that if you have an empty string for a value that is supposed
	 * to be a number (e.g. `PORT=` in a ".env" file), Zod will incorrectly flag
	 * it as a type mismatch violation. Additionally, if you have an empty string
	 * for a value that is supposed to be a string with a default value (e.g.
	 * `DOMAIN=` in an ".env" file), the default value will never be applied.
	 *
	 * In order to solve these issues, we recommend that all new projects
	 * explicitly specify this option as true.
	 */
	emptyStringAsUndefined: true,
});
