import { createHonoQueryOptions } from "@reno-stack/hono-react-query";
import { client } from "src/utils/hono-client";

export const shopItemsQueryOptions = createHonoQueryOptions(
  ["shop-items"],
  client.api.shop.items.$get,
);
