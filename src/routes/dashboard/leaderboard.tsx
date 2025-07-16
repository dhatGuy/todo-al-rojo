import { seo } from "@/lib/seo";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { RankingTable } from "src/components/ranking/ranking-table";
import { TimePeriodFilter } from "src/components/ranking/TimePeriodFilter";

export const Route = createFileRoute("/dashboard/leaderboard")({
  component: RouteComponent,
  head: () => ({
    meta: [
      ...seo({
        title: "Leaderboard - TodoAlRojo",
      }),
    ],
  }),
});

function RouteComponent() {
  const [activePeriod, setActivePeriod] = useState("Semanal");

  return (
    <div>
      <TimePeriodFilter
        activePeriod={activePeriod}
        onPeriodChange={setActivePeriod}
      />

      {/* Ranking Table */}
      <RankingTable />
    </div>
  );
}
