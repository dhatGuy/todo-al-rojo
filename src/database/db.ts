import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema/schema"; // Import the full schema

let dbInstance: ReturnType<typeof drizzle<typeof schema>> | null = null;
let postgresClient: ReturnType<typeof postgres> | null = null;

export const getDb = (connectionString: string) => {
  // If instance already exists, return it
  if (dbInstance) {
    return dbInstance;
  }

  // Create new instance only if it doesn't exist
  postgresClient = postgres(connectionString, {
    max: 10, // Connection pool size
    idle_timeout: 20,
    max_lifetime: 60 * 30,
    // Add connection debugging
    debug: process.env.NODE_ENV === "development",
  });

  dbInstance = drizzle(postgresClient, { schema });

  console.log("🗄️ Database connection created");
  return dbInstance;
};

// Helper to close the connection (useful for tests or shutdown)
export const closeDb = async () => {
  if (postgresClient) {
    await postgresClient.end();
    postgresClient = null;
    dbInstance = null;
    console.log("🗄️ Database connection closed");
  }
};

export type DB = ReturnType<typeof getDb>;
