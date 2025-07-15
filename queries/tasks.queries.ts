import { createHonoQueryOptions } from "@reno-stack/hono-react-query";
import { client } from "src/utils/hono-client";

export const getAvailableTasksQueryOptions = createHonoQueryOptions(
  ["available-notes"],
  client.api.tasks.available.$get,
);
