import { queryOptions } from "@tanstack/react-query";
import { createServerFn } from "@tanstack/react-start";
import { db } from "@/database/db";
import { getBindings } from "@/lib/bindings";

const getAvailableTasks = createServerFn({ method: "GET" }).handler(
	async () => {
		const env = getBindings();
		const tasks = await db(
			env.HYPERDRIVE.connectionString,
		).query.tasksTable.findMany({
			where: (table, { eq }) => eq(table.active, true),
			orderBy: (table, { desc }) => desc(table.createdAt),
		});
		return {
			success: true,
			data: tasks,
			message: "successfully retrieved available tasks",
		};
	},
);

export const getAvailableTasksQueryOptions = queryOptions({
	queryKey: ["available-tasks"],
	queryFn: getAvailableTasks,
});
