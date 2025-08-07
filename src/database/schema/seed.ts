import { InferInsertModel } from "drizzle-orm";
import { drizzle } from "drizzle-orm/node-postgres";
import { nanoid } from "nanoid/non-secure";
import postgres from "postgres";
import { affiliatesTable } from "./affiliates.table";
import type { userTable } from "./auth-schema";
import { rewardsCatalogTable } from "./reward-catalog.table";
import { tasksTable } from "./tasks.table";
import { userLevelsTable } from "./user-levels.table";

if (!("DATABASE_URL" in process.env))
  throw new Error("DATABASE_URL not found on .env.development");

const main = async () => {
  const client = postgres(process.env.DATABASE_URL);
  const db = drizzle(client);
  const data: (typeof userTable.$inferInsert)[] = [];

  await db.insert(userLevelsTable).values([
    { level: 1, name: "Novato al Rojo", requiredChips: 0 },
    { level: 3, name: "Estratega", requiredChips: 300 },
  ]);

  await db.insert(affiliatesTable).values([
    {
      name: "Betsson",
      postbackUrl: "https://betsson.com/postback",
      affiliateCode: nanoid(5),
    },
    {
      name: "Pinup",
      postbackUrl: "https://pinup.com/postback",
      affiliateCode: nanoid(5),
    },
  ]);

  await db.insert(tasksTable).values([
    {
      taskType: "referral",
      name: "Refer a Friend",
      description: "Invite a friend to sign up",
      defaultChips: 100,
      frequency: "one_time",
      active: true,
      conditions: { min_deposit: 20 },
    },
    {
      taskType: "first_deposit",
      name: "First Deposit",
      description: "Make your first deposit",
      defaultChips: 200,
      frequency: "one_time",
      active: true,
    },
    {
      taskType: "referral_deposit",
      name: "Referral Deposit",
      description: "Friend makes a deposit ≥ $50",
      defaultChips: 50,
      frequency: "one_time",
      conditions: { min_deposit: 50 },
      active: true,
    },
    {
      taskType: "daily_login",
      name: "Daily Login",
      description: "Log in each day",
      defaultChips: 10,
      frequency: "daily",
      active: true,
    },
    {
      taskType: "weekly_bet",
      name: "Weekly Bet",
      description: "Place a bet each week",
      defaultChips: 50,
      frequency: "weekly",
      conditions: { min_deposit: 20 },
      active: true,
    },
  ]);

  const rewards: InferInsertModel<typeof rewardsCatalogTable>[] = [
    {
      rewardName: "Free Bet $3,000",
      chipCost: 500,
      minLevelRequired: 1,
      active: true,
      conditions: { deposit_min: 3000, days_window: 7 },
    },
    {
      rewardName: "Free Bet $5,000",
      chipCost: 750,
      minLevelRequired: 2,
      active: true,
      conditions: { deposit_recent: true },
    },
    {
      rewardName: "Free Bet $10,000",
      chipCost: 1300,
      minLevelRequired: 3,
      active: true,
      conditions: { max_per_month: 1 },
    },
    {
      rewardName: "50% Reload Bonus",
      chipCost: 300,
      minLevelRequired: 1,
      active: true,
      conditions: { deposit_same_day: true },
    },
    {
      rewardName: "100% Reload Bonus",
      chipCost: 600,
      minLevelRequired: 1,
      active: true,
      conditions: { max_per_month: 1, stackable: false },
    },
    {
      rewardName: "Special Raffle Ticket",
      chipCost: 200,
      minLevelRequired: 1,
      active: true,
      conditions: { accumulative: true },
    },
    {
      rewardName: "Cashback up to $10,000",
      chipCost: 1000,
      minLevelRequired: 1,
      active: true,
      conditions: { weekly_loss_required: true },
    },
    {
      rewardName: "Free Spin – Roulette “All Red”",
      chipCost: 250,
      minLevelRequired: 1,
      active: true,
      conditions: { random_reward: true },
    },
    {
      rewardName: "Secret Bonus 🎁",
      chipCost: 850,
      minLevelRequired: 1,
      active: true,
      conditions: { max_per_month: 1 },
    },
    {
      rewardName: "Free Pass to Exclusive Event",
      chipCost: 1200,
      minLevelRequired: 1,
      active: true,
      conditions: { event_available: true },
    },
    {
      rewardName: "Official “Todo al Rojo” Merch",
      chipCost: 1500,
      minLevelRequired: 1,
      active: true,
      conditions: { shipping: "national", availability: "every_2_months" },
    },
  ];

  await db.insert(rewardsCatalogTable).values(rewards);
  console.log("✅ Rewards catalog seeded successfully.");

  console.log("Seed done");
};

main();
