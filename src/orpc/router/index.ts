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
};
