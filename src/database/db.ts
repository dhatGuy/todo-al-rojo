import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema/schema";

export const getDb = (connectionString: string) => {
  const postgresClient = postgres(connectionString, {
    max: 1,
    idle_timeout: 5,
    connect_timeout: 10,
    prepare: false,
    transform: undefined,
    debug: false,
  });

  const dbInstance = drizzle(postgresClient, { schema });

  // console.log("🗄️ Hyperdrive connection created for request");
  return dbInstance;
};

export type DB = ReturnType<typeof getDb>;
