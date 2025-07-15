import { queryOptions } from "@tanstack/react-query";
import { createServerFn } from "@tanstack/react-start";
import { db } from "@/database/db";
import { getBindings } from "@/lib/bindings";

const getShopItems = createServerFn({ method: "GET" }).handler(async () => {
	const env = getBindings();
	const items = await db(
		env.HYPERDRIVE.connectionString,
	).query.rewardsCatalogTable.findMany({
		where: (table, { eq }) => eq(table.active, true),
		orderBy: (table, { desc }) => desc(table.createdAt),
	});
	return {
		success: true,
		data: items,
		message: "successfully retrieved shop items",
	};
});

export const shopItemsQueryOptions = queryOptions({
	queryKey: ["shop-items"],
	queryFn: getShopItems,
});
