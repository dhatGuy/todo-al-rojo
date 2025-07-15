import { drizzle } from "drizzle-orm/postgres-js";
import { schema } from "./schema";
export const db = (connectionString: string) =>
  drizzle(connectionString, { schema });
