import { getDb } from "@/database/db";
import { getBindings } from "@/lib/bindings";
import { queryOptions } from "@tanstack/react-query";
import { createServerFn } from "@tanstack/react-start";

const getAvailableTasks = createServerFn({ method: "GET" }).handler(
  async () => {
    const env = getBindings();
    const tasks = await getDb(
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
