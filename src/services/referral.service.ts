import { DB } from "@/database/db";
import { userTable } from "@/database/schema/auth-schema";
import { eq } from "drizzle-orm";
import { customAlphabet } from "nanoid";

// Generate a 6-character alphanumeric code
const nanoid = customAlphabet("ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789", 6);

/**
 * Generates and assigns a unique referral code to a user.
 */
export async function generateReferralCode(db: DB): Promise<string> {
  let code = "";
  let isUnique = false;

  while (!isUnique) {
    code = nanoid();
    const existing = await db.query.userTable.findFirst({
      where: eq(userTable.referralCode, code),
    });
    if (!existing) {
      isUnique = true;
    }
  }

  return code;
}

/**
 * Records a referral when a referral link is used.
 * visitorId is a unique identifier for the browser/session (e.g., fingerprint, or a cookie value)
 */
// export async function recordReferralVisit(
//   visitorId: string,
//   referralCode: string,
//   utmData?: {
//     source?: string;
//     medium?: string;
//     campaign?: string;
//     content?: string;
//     term?: string;
//   },
// ) {
//   // Verify the referral code belongs to a user
//   const referrer = await db.query.users.findFirst({
//     where: eq(userTable.referralCode, referralCode),
//     columns: { id: true },
//   });

//   if (!referrer) {
//     console.warn(`Invalid referral code used: ${referralCode}`);
//     return null;
//   }

//   // Check if this visit has already been recorded
//   const existingVisit = await db.query.visitTracking.findFirst({
//     where: and(
//       eq(visitTracking.visitorId, visitorId),
//       eq(visitTracking.referralCode, referralCode),
//     ),
//   });

//   if (existingVisit) {
//     // Already recorded, maybe update timestamp?
//     return existingVisit;
//   }

//   // Record the visit
//   const [visit] = await db
//     .insert(visitTracking)
//     .values({
//       visitorId,
//       referralCode,
//       utmSource: utmData?.source,
//       utmMedium: utmData?.medium,
//       utmCampaign: utmData?.campaign,
//       utmContent: utmData?.content,
//       utmTerm: utmData?.term,
//       ipAddress: "", // You can capture this from the request if needed
//       userAgent: "", // You can capture this from the request if needed
//     })
//     .returning();

//   return visit;
// }

/**
 * Links a new user to their referral and awards the join bonus.
 */
// export async function processUserReferral(userId: number, visitorId: string) {
//   // Find the visit record for this visitor that led to a referral
//   const visit = await db.query.visitTracking.findFirst({
//     where: and(
//       eq(visitTracking.visitorId, visitorId),
//       isNull(visitTracking.userId), // Not yet linked to a registered user
//     ),
//     orderBy: (vt, { desc }) => [desc(vt.createdAt)], // Get the most recent one
//   });

//   if (!visit?.referralCode) {
//     // No referral code was used for this visit
//     return;
//   }

//   // Find the referrer
//   const referrer = await db.query.users.findFirst({
//     where: eq(users.referralCode, visit.referralCode),
//     columns: { id: true },
//   });

//   if (!referrer) {
//     console.warn(`Referrer not found for code: ${visit.referralCode}`);
//     return;
//   }

//   // Create referral record
//   const [referral] = await db
//     .insert(referrals)
//     .values({
//       referrerId: referrer.id,
//       referredId: userId,
//       referralCode: visit.referralCode,
//       referredAt: visit.createdAt, // When the link was first clicked
//       joinedAt: new Date(), // When they registered
//     })
//     .returning();

//   // Link the visit to the new user
//   await db
//     .update(visitTracking)
//     .set({ userId })
//     .where(eq(visitTracking.id, visit.id));

//   // Award +30 chips to the referrer
//   await awardReferralBonus(referrer.id, 30, "refer_friend", referral.id);
// }

/**
 * Awards referral bonus chips.
 */
// async function awardReferralBonus(
//   userId: number,
//   chips: number,
//   action: string,
//   referralId: number,
// ) {
//   // Update user's chip balance
//   await db
//     .update(users)
//     .set({
//       chips: sql`${users.chips} + ${chips}`,
//       earnedChips: sql`${users.earnedChips} + ${chips}`,
//       updatedAt: new Date(),
//     })
//     .where(eq(users.id, userId));

//   // Record the chip transaction (you'll need to implement this table/function)
//   // For now, we assume you have a way to record transactions
//   console.log(`Awarded ${chips} chips to user ${userId} for action ${action}`);
// }
