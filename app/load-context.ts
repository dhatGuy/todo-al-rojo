import { drizzle, type NodePgDatabase } from "drizzle-orm/node-postgres";
import * as schema from "./db/schema";

type GetLoadContextArgs = {
	request: Request;
	context: {
		cloudflare: {
			env: Env;
			caches: CacheStorage;
			cf: Request["cf"];
			ctx: ExecutionContext;
		};
		db?: NodePgDatabase<typeof schema>;
	};
};

declare module "react-router" {
	interface AppLoadContext extends ReturnType<typeof getLoadContext> {}
}

export function getLoadContext({ context }: GetLoadContextArgs) {
	const db = drizzle(context.cloudflare.env.HYPERDRIVE.connectionString, {
		schema,
	});
	return {
		...context,
		db,
	};
}
