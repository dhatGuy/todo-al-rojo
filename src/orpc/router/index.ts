import { findPlanet, listPlanet } from "./test.router";

export const router = {
  planet: {
    list: listPlanet,
    find: findPlanet,
  },
};
