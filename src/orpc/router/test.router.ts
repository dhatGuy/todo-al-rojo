import * as z from "zod";
import { authedProcedure, publicProcedure } from "../server";

const PlanetSchema = z.object({
  id: z.number().int().min(1),
  name: z.string(),
  description: z.string().optional(),
});

export const listPlanet = authedProcedure
  .input(
    z.object({
      limit: z.number().int().min(1).max(100).optional(),
      cursor: z.number().int().min(0).default(0),
    }),
  )
  .handler(async ({ input, context }) => {
    try {
      return [{ id: 1, name: "name" }];
    } catch (error) {
      console.error(error);
      throw new Error("Failed to list planets");
    }
  });

export const findPlanet = publicProcedure
  .input(PlanetSchema.pick({ id: true }))
  .handler(async ({ input }) => {
    // your find code here
    return { id: 1, name: "name" };
  });
