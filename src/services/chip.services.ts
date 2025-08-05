import { DB } from "@/database/db";
import { userTable } from "@/database/schema/auth-schema";
import { chipTransactionsTable } from "@/database/schema/chip-transactions.table";
import { userTasksTable } from "@/database/schema/user-tasks.table";
import { eq, sql } from "drizzle-orm";

export async function rewardUserChips(
  db: Parameters<Parameters<DB["transaction"]>[0]>[0] | DB,
  reward: {
    userId: string;
    amount: number;
    taskType: string;
    description?: string;
  },
) {
  // Use a database transaction to ensure consistency
  await db.transaction(async (tx) => {
    const { userId, amount, taskType, description } = reward;

    await tx.insert(chipTransactionsTable).values({
      userId,
      transactionType: "earned", // or 'redeemed' for spending
      amount: Math.abs(amount), // Always store positive value, type indicates direction
      taskType, // e.g., 'daily_login', 'refer_friend', 'reward_redeem'
      description: description || "Reward",
    });

    await tx.insert(userTasksTable).values({
      userId,
      taskType,
      chipsRewarded: amount,
      status: "completed",
    });

    await tx
      .update(userTable)
      .set({
        chips: sql`${userTable.chips} + ${amount}`, // Add positive or negative chips
        earnedChips:
          amount > 0 ? sql`${userTable.earnedChips} + ${amount}` : undefined,
        spentChips:
          amount < 0
            ? sql`${userTable.spentChips} + ${Math.abs(amount)}`
            : undefined,
        updatedAt: new Date(),
      })
      .where(eq(userTable.id, userId));
  });
}
