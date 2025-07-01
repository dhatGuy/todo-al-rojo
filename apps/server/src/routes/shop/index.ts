import { Hono } from "hono";
import type { HonoAppContext } from "../../auth";
import { db } from "../../db";
import { withAuth } from "../../middlewares/auth.middleware";
import { successResponse } from "../../utils/response";

export const shopRouter = new Hono<HonoAppContext<"IsAuthenticated">>()
  .use(withAuth)
  .get("/items", async (c) => {
    // const user = c.get("user");
    // const session = c.get("session");

    const shopItems = await db.query.rewardsCatalogTable.findMany({
      where: (table, { eq }) => eq(table.active, true),
      orderBy: (table, { desc }) => desc(table.createdAt),
    });

    return successResponse(c, shopItems, "Shop items retrieved successfully");
  });
