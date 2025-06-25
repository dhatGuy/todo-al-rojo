import { drizzle } from "drizzle-orm/node-postgres";
import { nanoid } from "nanoid/non-secure";
import { Pool } from "pg";
import { affiliatesTable } from "./affiliates.table";
import type { userTable } from "./auth-schema";
import { tasksTable } from "./tasks.table";
import { userLevelsTable } from "./user-levels.table";

if (!("DATABASE_URL" in process.env))
  throw new Error("DATABASE_URL not found on .env.development");

const main = async () => {
  const client = new Pool({
    connectionString: process.env.DATABASE_URL,
  });
  const db = drizzle(client);
  const data: (typeof userTable.$inferInsert)[] = [];

  await db.insert(userLevelsTable).values([
    { level: 1, name: "Novato al Rojo", requiredXp: 0 },
    { level: 3, name: "Estratega", requiredXp: 300 },
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

  console.log("Seed done");
};

main();
