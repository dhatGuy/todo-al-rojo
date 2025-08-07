import { userEventPublisher } from "@/lib/event-pub";
import z from "zod";
import { authedProcedure } from "../server";
import { onUserEvents } from "./event.router";
import {
  getLeaderboard,
  getTopPerformers,
  getUserLeaderboardPosition,
} from "./leaderboard.router";
import {
  checkDailyLogin,
  getDailyLoginStatus,
  getDailyLoginStreak,
  getUserTasksWithStatus,
} from "./task/task.router";
import { findPlanet, listPlanet } from "./test.router";

export const router = {
  planet: {
    list: listPlanet,
    find: findPlanet,
  },
  tasks: {
    getAvailableTasks: getUserTasksWithStatus,
    checkDailyLogin: checkDailyLogin,
    getDailyLoginStatus: getDailyLoginStatus,
    getDailyLoginStreak: getDailyLoginStreak,
  },
  leaderboard: {
    get: getLeaderboard,
    getUserPosition: getUserLeaderboardPosition,
    getTopPerformers: getTopPerformers,
  },
  events: {
    onUserEvents,
  },
  sendNotification: authedProcedure
    .input(z.object({ userId: z.string(), message: z.string() }))
    .handler(({ context }) => {
      userEventPublisher.publish(`user:${context.session.user.id}`, {
        type: "level_up",
        data: {
          chips: 100,
          levelName: "Level 1",
          newLevel: 2,
        },
      });
    }),
};
