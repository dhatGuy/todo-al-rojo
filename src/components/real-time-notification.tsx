import { orpc } from "@/orpc/client";
import { UserEvent } from "@/orpc/router/event.router";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { toast } from "sonner";

export function RealTimeNotifications() {
  const { data, error, status } = useQuery(
    orpc.events.onUserEvents.experimental_liveOptions({
      input: {},
      enabled: true,
      retry: true,
      structuralSharing: false,
    }),
  );

  useEffect(() => {
    if (data) {
      handleEvent(data);
    }
  }, [data]);

  return null;
}

function handleEvent(event: UserEvent) {
  switch (event.type) {
    case "level_up":
      toast.success("¡Felicidades! 🎉", {
        description: `Subiste a nivel ${event.data.newLevel}: ${event.data.levelName}`,
        duration: 5000,
      });
      break;
    case "chips_awarded":
      toast("¡Fichas ganadas! 🔴", {
        description: `Has ganado ${event.data.amount} fichas por ${event.data.reason}. Total: ${event.data.newTotal}`,
      });
      break;
    default:
      console.warn(
        "Unknown or unhandled event type received:",
        (event as any).type,
      );
  }
}
