import { drizzle } from "drizzle-orm/node-postgres";
import { Client } from "pg";
import * as schema from "./schema";

export const db = (connectionString: string) => {
	const client = new Client({
		connectionString,
	});
	return drizzle(client, {
		schema,
	});
};
