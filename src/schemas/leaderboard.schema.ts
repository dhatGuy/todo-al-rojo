import { z } from "zod";

// Leaderboard type enum
export const LeaderboardTypeSchema = z.enum([
  "chips",
  "level",
  "earned_chips",
  "weekly_chips",
  "monthly_chips",
]);

// Timeframe filter
export const TimeframeSchema = z.enum(["all_time", "weekly", "monthly"]);

// Pagination schema
export const PaginationSchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
});

// Leaderboard filters
export const LeaderboardFiltersSchema = z.object({
  type: LeaderboardTypeSchema.default("chips"),
  timeframe: TimeframeSchema.default("all_time"),
  ...PaginationSchema.shape,
});

// Leaderboard entry
export const LeaderboardEntrySchema = z.object({
  rank: z.number(),
  userId: z.string(),
  name: z.string(),
  image: z.string().nullable(),
  chips: z.number(),
  level: z.number(),
  levelName: z.string(),
  earnedChips: z.number(),
  isCurrentUser: z.boolean().optional(),
});

// Leaderboard response with pagination
export const LeaderboardResponseSchema = z.object({
  entries: z.array(LeaderboardEntrySchema),
  pagination: z.object({
    page: z.number(),
    limit: z.number(),
    total: z.number(),
    totalPages: z.number(),
    hasNext: z.boolean(),
    hasPrev: z.boolean(),
  }),
  currentUser: LeaderboardEntrySchema.nullable(),
});

// Type exports
export type LeaderboardType = z.infer<typeof LeaderboardTypeSchema>;
export type LeaderboardFilters = z.infer<typeof LeaderboardFiltersSchema>;
export type LeaderboardEntry = z.infer<typeof LeaderboardEntrySchema>;
export type LeaderboardResponse = z.infer<typeof LeaderboardResponseSchema>;
