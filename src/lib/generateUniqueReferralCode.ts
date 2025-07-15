import { eq } from "drizzle-orm";
import { referralsTable } from "@/database/schema/referrals.table";

/**
 * Generates a random alphanumeric referral code.
 * @param length Length of the referral code.
 */
function generateRandomCode(length = 8): string {
	const chars =
		"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	let result = "";
	for (let i = 0; i < length; i++) {
		result += chars.charAt(Math.floor(Math.random() * chars.length));
	}
	return result;
}

/**
 * Generates a unique referral code by checking the database for collisions.
 * @param length Length of the referral code.
 * @param maxAttempts Maximum attempts to find a unique code before throwing.
 * @returns A unique referral code string.
 * @throws Error if unable to generate a unique code after maxAttempts.
 */
export async function generateUniqueReferralCode(
	length = 8,
	maxAttempts = 10,
	db: any,
): Promise<string> {
	for (let attempt = 0; attempt < maxAttempts; attempt++) {
		const code = generateRandomCode(length);

		const existing = await db
			.select({ code: referralsTable.referralCode })
			.from(referralsTable)
			.where(eq(referralsTable.referralCode, code))
			.limit(1);

		if (existing.length === 0) {
			return code;
		}
	}
	throw new Error(
		`Failed to generate a unique referral code after ${maxAttempts} attempts`,
	);
}
