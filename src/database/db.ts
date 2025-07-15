import { drizzle } from "drizzle-orm/postgres-js";
export const db = (connectionString: string) => drizzle(connectionString);
