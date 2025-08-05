import { seo } from "@/lib/seo";
import { createFileRoute } from "@tanstack/react-router";
import { zodValidator } from "@tanstack/zod-adapter";
import { RankingTable } from "src/components/ranking/ranking-table";
import { TimePeriodFilter } from "src/components/ranking/TimePeriodFilter";
import z from "zod";

const searchSchema = z.object({
  period: z.enum(["diario", "semanal", "mensual"]).optional(),
});

type SearchParams = z.infer<typeof searchSchema>;

export const Route = createFileRoute("/dashboard/leaderboard")({
  component: RouteComponent,
  validateSearch: zodValidator(searchSchema),
  head: () => ({
    meta: [
      ...seo({
        title: "Leaderboard - TodoAlRojo",
      }),
    ],
  }),
});

function RouteComponent() {
  const { period } = Route.useSearch();
  const navigate = Route.useNavigate();

  const onPeriodChange = (period: SearchParams["period"]) => {
    if (!period) return;
    navigate({
      search: {
        period,
      },
    });
  };

  return (
    <div>
      <TimePeriodFilter activePeriod={period} onPeriodChange={onPeriodChange} />

      {/* Ranking Table */}
      <RankingTable />
    </div>
  );
}
