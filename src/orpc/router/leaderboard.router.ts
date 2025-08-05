import {
  LeaderboardFiltersSchema,
  LeaderboardResponse,
  LeaderboardTypeSchema,
} from "@/schemas/leaderboard.schema";
import { desc, sql } from "drizzle-orm";
import * as z from "zod";
import { userLevelsTable, userTable } from "../../database/schema/schema";
import { optionalAuthMiddleware } from "../middlewares/auth";
import { authedProcedure, publicProcedure } from "../server";

// Get paginated leaderboard
export const getLeaderboard = publicProcedure
  .use(optionalAuthMiddleware)
  .input(LeaderboardFiltersSchema)
  .handler(async ({ input, context }) => {
    const { type, timeframe, page, limit } = input;
    const { db, session } = context;

    const offset = (page - 1) * limit;

    try {
      // Base query for leaderboard entries
      let orderByField;
      switch (type) {
        case "chips":
          orderByField = desc(userTable.chips);
          break;
        case "level":
          orderByField = desc(userTable.level);
          break;
        case "earned_chips":
          orderByField = desc(userTable.earnedChips);
          break;
        default:
          orderByField = desc(userTable.chips);
      }

      // Get total count
      const totalResult = await db
        .select({ count: sql<number>`count(*)` })
        .from(userTable)
        .where(sql`${userTable.banned} = false`);

      const total = Number(totalResult[0]?.count || 0);
      const totalPages = Math.ceil(total / limit);

      // Get leaderboard entries with ranking
      const leaderboardQuery = db
        .select({
          userId: userTable.id,
          name: sql<string>`CONCAT(${userTable.firstName}, ' ', ${userTable.lastName})`,
          chips: userTable.chips,
          level: userTable.level,
          levelName: userLevelsTable.name,
          earnedChips: userTable.earnedChips,
          // Calculate rank using window function
          rank: sql<number>`ROW_NUMBER() OVER (ORDER BY ${orderByField})`,
        })
        .from(userTable)
        .leftJoin(
          userLevelsTable,
          sql`${userTable.level} = ${userLevelsTable.level}`,
        )
        .where(sql`${userTable.banned} = false`)
        .orderBy(orderByField)
        .limit(limit)
        .offset(offset);

      const entries = await leaderboardQuery;

      let currentUser = null;

      if (session?.user) {
        // Get current user's position in leaderboard
        const currentUserRankQuery = await db
          .select({
            rank: sql<number>`rank_result.rank`,
            userId: sql<string>`rank_result.id`,
            name: sql<string>`rank_result.name`,
            chips: sql<number>`rank_result.chips`,
            level: sql<number>`rank_result.level`,
            levelName: sql<string>`rank_result.level_name`,
            earnedChips: sql<number>`rank_result.earned_chips`,
          })
          .from(
            sql`(
            SELECT
              u.id,
              CONCAT(u.first_name, ' ', u.last_name) as name,
              u.chips,
              u.level,
              ul.name as level_name,
              u.earned_chips,
              ROW_NUMBER() OVER (ORDER BY u.${sql.raw(type === "level" ? "level" : type === "earned_chips" ? "earned_chips" : "chips")} DESC) as rank
            FROM "user" u
            LEFT JOIN user_levels ul ON u.level = ul.level
            WHERE u.banned = false
          ) as rank_result`,
          )
          .where(sql`rank_result.id = ${session.user.id}`)
          .limit(1);
        currentUser = currentUserRankQuery[0] || null;
      }

      const response: LeaderboardResponse = {
        entries: entries.map((entry, index) => ({
          rank: offset + index + 1,
          userId: entry.userId,
          name: entry.name,
          chips: entry.chips,
          level: entry.level,
          levelName: entry.levelName || `Level ${entry.level}`,
          earnedChips: entry.earnedChips,
          isCurrentUser: entry.userId === session?.user.id,
        })),
        pagination: {
          page,
          limit,
          total,
          totalPages,
          hasNext: page < totalPages,
          hasPrev: page > 1,
        },
        currentUser: currentUser
          ? {
              rank: currentUser.rank,
              userId: currentUser.userId,
              name: currentUser.name,
              chips: currentUser.chips,
              level: currentUser.level,
              levelName: currentUser.levelName || `Level ${currentUser.level}`,
              earnedChips: currentUser.earnedChips,
              isCurrentUser: true,
            }
          : null,
      };

      return response;
    } catch (error) {
      console.error("Failed to fetch leaderboard:", error);
      throw new Error("Failed to fetch leaderboard");
    }
  });

// Get user's leaderboard position
export const getUserLeaderboardPosition = authedProcedure
  .input(
    z.object({
      type: LeaderboardTypeSchema.default("chips"),
    }),
  )
  .handler(async ({ input, context }) => {
    const { type } = input;
    const { db, session } = context;

    try {
      const orderField =
        type === "level"
          ? "level"
          : type === "earned_chips"
            ? "earned_chips"
            : "chips";

      const positionQuery = await db
        .select({
          rank: sql<number>`rank_result.rank`,
          total: sql<number>`rank_result.total`,
        })
        .from(
          sql`(
            SELECT
              ROW_NUMBER() OVER (ORDER BY u.${sql.raw(orderField)} DESC) as rank,
              COUNT(*) OVER() as total
            FROM "user" u
            WHERE u.banned = false AND u.id = ${session.user.id}
          ) as rank_result`,
        )
        .limit(1);

      const result = positionQuery[0];

      return {
        rank: result?.rank || null,
        total: result?.total || 0,
        percentile: result?.rank
          ? Math.round(((result.total - result.rank + 1) / result.total) * 100)
          : null,
      };
    } catch (error) {
      console.error("Failed to get user leaderboard position:", error);
      throw new Error("Failed to get user leaderboard position");
    }
  });

// Get top performers (public endpoint for showcasing)
export const getTopPerformers = publicProcedure
  .use(optionalAuthMiddleware)
  .input(
    z.object({
      limit: z.number().int().min(1).max(10).default(5),
      type: LeaderboardTypeSchema.default("chips"),
    }),
  )
  .handler(async ({ input, context }) => {
    const { limit, type } = input;
    const { db } = context;

    try {
      let orderByField;
      switch (type) {
        case "chips":
          orderByField = desc(userTable.chips);
          break;
        case "level":
          orderByField = desc(userTable.level);
          break;
        case "earned_chips":
          orderByField = desc(userTable.earnedChips);
          break;
        default:
          orderByField = desc(userTable.chips);
      }

      const topPerformers = await db
        .select({
          rank: sql<number>`ROW_NUMBER() OVER (ORDER BY ${orderByField})`,
          name: sql<string>`CONCAT(${userTable.firstName}, ' ', ${userTable.lastName})`,
          chips: userTable.chips,
          level: userTable.level,
          levelName: userLevelsTable.name,
          earnedChips: userTable.earnedChips,
        })
        .from(userTable)
        .leftJoin(
          userLevelsTable,
          sql`${userTable.level} = ${userLevelsTable.level}`,
        )
        .where(sql`${userTable.banned} = false`)
        .orderBy(orderByField)
        .limit(limit);

      return topPerformers.map((performer, index) => ({
        rank: index + 1,
        name: performer.name,
        chips: performer.chips,
        level: performer.level,
        levelName: performer.levelName || `Level ${performer.level}`,
        earnedChips: performer.earnedChips,
      }));
    } catch (error) {
      console.error("Failed to fetch top performers:", error);
      throw new Error("Failed to fetch top performers");
    }
  });
