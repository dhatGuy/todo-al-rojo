import { z } from "zod";

import {
  chipsAwardedDataSchema,
  levelUpDataSchema,
  taskCompletedDataSchema,
  userEventPublisher,
} from "@/lib/event-pub";
import { eventIterator } from "@orpc/server";
import { authedProcedure } from "../server";

const onUserEventsInput = z.object({});

export const userEventSchema = z.discriminatedUnion("type", [
  z.object({
    type: z.literal("level_up"),
    data: levelUpDataSchema,
  }),
  z.object({
    type: z.literal("chips_awarded"),
    data: chipsAwardedDataSchema,
  }),
  z.object({
    type: z.literal("task_completed"),
    data: taskCompletedDataSchema,
  }),
]);

export type UserEvent = z.infer<typeof userEventSchema>;

export const onUserEvents = authedProcedure
  .input(onUserEventsInput)
  .output(eventIterator(userEventSchema))
  .handler(async function* ({ signal, context }) {
    const userId = context.session?.user?.id;

    // Create the unique channel key for this user
    const userChannel: `user:${string}` = `user:${userId}`;

    try {
      for await (const payload of userEventPublisher.subscribe(userChannel, {
        signal,
      })) {
        yield payload;
      }
    } finally {
      console.log(`Live event stream for user ${userId} closed.`);
    }
  });
