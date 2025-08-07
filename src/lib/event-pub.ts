import { EventPublisher } from "@orpc/server";
import z from "zod";

export const levelUpDataSchema = z.object({
  newLevel: z.number(),
  levelName: z.string(),
  chips: z.number(),
});

export type LevelUpData = z.infer<typeof levelUpDataSchema>;

export const chipsAwardedDataSchema = z.object({
  amount: z.number(),
  reason: z.string(),
  newTotal: z.number(),
});

export type ChipsAwardedData = z.infer<typeof chipsAwardedDataSchema>;

export const taskCompletedDataSchema = z.object({
  taskName: z.string(),
  chips: z.number(),
});

export type TaskCompletedData = z.infer<typeof taskCompletedDataSchema>;

export const toastConfigSchema = z
  .object({
    title: z.string().optional(),
    description: z.string().optional(),
    variant: z
      .enum(["default", "success", "error", "warning", "info"])
      .optional(),
    duration: z.number().optional(),
    position: z
      .enum([
        "top-left",
        "top-center",
        "top-right",
        "bottom-left",
        "bottom-center",
        "bottom-right",
      ])
      .optional(),
    dismissible: z.boolean().optional(),
    action: z
      .object({
        label: z.string(),
        onClick: z.string().optional(), // Could be a function name or action identifier
      })
      .optional(),
  })
  .optional();

export type ToastConfig = z.infer<typeof toastConfigSchema>;

export type UserEventData = {
  level_up: LevelUpData;
  chips_awarded: ChipsAwardedData;
  task_completed: TaskCompletedData;
};

// Define the event structure with type and data
type UserEvents = {
  [K in keyof UserEventData]: {
    type: K;
    data: UserEventData[K];
  };
}[keyof UserEventData];

export const userEventPublisher = new EventPublisher<
  Record<`user:${string}`, UserEvents>
>();
