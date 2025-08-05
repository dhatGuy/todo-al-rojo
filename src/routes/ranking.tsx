import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { RankingTable } from "@/components/ranking/ranking-table";
import { TimePeriodFilter } from "@/components/ranking/TimePeriodFilter";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { orpc } from "@/orpc/client";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { zodValidator } from "@tanstack/zod-adapter";
import z from "zod";

const searchSchema = z.object({
  period: z.enum(["diario", "semanal", "mensual"]).optional(),
  page: z.number().int().min(1).optional(),
});

type SearchParams = z.infer<typeof searchSchema>;

export const Route = createFileRoute("/ranking")({
  validateSearch: zodValidator(searchSchema),
  component: RouteComponent,
});

function RouteComponent() {
  const { period, page } = Route.useSearch();
  const navigate = Route.useNavigate();

  // Convert period to timeframe for API
  const getTimeframe = (period: string) => {
    switch (period) {
      case "diario":
        return "weekly" as const;
      case "semanal":
        return "weekly" as const;
      case "mensual":
        return "monthly" as const;
      default:
        return "all_time" as const;
    }
  };

  // Get top 3 performers for podium
  const { data: topPerformers } = useQuery(
    orpc.leaderboard.getTopPerformers.queryOptions({
      input: {
        limit: 3,
        type: "chips",
      },
    }),
  );

  const onPeriodChange = (period: SearchParams["period"]) => {
    if (!period) return;
    navigate({
      search: (prev) => ({
        ...prev,
        period,
      }),
    });
  };

  const onPageChange = (page: number) => {
    if (!page) return;
    navigate({
      search: (prev) => ({
        ...prev,
        page,
      }),
    });
  };

  return (
    <div className="min-h-screen flex flex-col text-white">
      <Header />
      {/* Header */}
      <div
        style={{ backgroundImage: `url('/images/leaderboards-bg.png')` }}
        className="bg-cover bg-center bg-no-repeat"
      >
        <div className="max-w-7xl px-4 text-center py-12 h-full flex flex-col gap-24 w-full mx-auto">
          <div>
            <div className="flex items-center justify-center gap-3 mb-4">
              <h1 className="text-4xl md:text-5xl font-bold">
                🔥 ¡Lidera el juego con tus <br />
                <span className="">Red Chips!</span>
              </h1>
            </div>
            <p className="text-gray-300 text-lg mb-6">
              Gana puntos, escala posiciones y consigue recompensas exclusivas.
            </p>
            <button
              type="button"
              className="bg-gradient-to-r from-yellow-500 to-orange-500 text-black font-bold py-1 px-5 rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-200"
            >
              Participa Ahora
            </button>
          </div>

          <div
            className={cn(
              "mb-8 flex flex-col gap-4 md:grid md:grid-cols-3 md:gap-6",
            )}
          >
            {(() => {
              const getBgClass = (rank: number) => {
                if (rank === 1)
                  return "bg-gradient-to-b from-yellow-300 to-yellow-400";
                if (rank === 2)
                  return "bg-gradient-to-b from-gray-300 to-gray-400";
                if (rank === 3)
                  return "bg-gradient-to-b from-amber-600 to-amber-700";
                return "bg-gradient-to-b from-gray-300 to-gray-400";
              };

              const getTextClass = (rank: number) => {
                if (rank === 1) return "text-yellow-300";
                if (rank === 2) return "text-gray-300";
                if (rank === 3) return "text-amber-600";
                return "text-gray-300";
              };

              const getRankText = (rank: number) => {
                if (rank === 1) return "1ST";
                if (rank === 2) return "2ND";
                if (rank === 3) return "3RD";
                return `${rank}TH`;
              };

              const getCrownImage = (rank: number) => {
                if (rank === 1) return "/images/gold.png";
                if (rank === 2) return "/images/silver.png";
                if (rank === 3) return "/images/bronze.png";
                return "/images/bronze.png";
              };

              // Create array of 3 positions, fill with available performers or null
              const positions = Array.from({ length: 3 }, (_, i) => {
                const rank = i + 1;
                return (
                  topPerformers?.find((user) => user.rank === rank) || null
                );
              });

              // Reorder for display: 1st, 2nd, 3rd on mobile; 2nd, 1st, 3rd on desktop
              const displayOrder = [positions[0], positions[1], positions[2]];

              return displayOrder.map((user, displayIndex) => {
                const actualRank = displayIndex + 1;
                let orderClass = "";
                if (displayIndex === 0)
                  orderClass = "order-1 md:order-2"; // 1st place - first on mobile, middle on desktop
                else if (displayIndex === 1)
                  orderClass = "order-2 md:order-1"; // 2nd place - second on mobile, left on desktop
                else if (displayIndex === 2) orderClass = "order-3 md:order-3"; // 3rd place - third on mobile, right on desktop

                if (user) {
                  return (
                    <Card
                      key={user.name}
                      className={cn(
                        "overflow-hidden border-none shadow-lg",
                        getBgClass(actualRank),
                        "relative p-6",
                        actualRank === 1 ? "md:scale-110" : "md:scale-90",
                        orderClass,
                      )}
                    >
                      <span
                        className={cn(
                          "absolute top-4 left-4 text-6xl font-bold opacity-70 md:text-7xl",
                          getTextClass(actualRank),
                        )}
                      >
                        {getRankText(actualRank)}
                      </span>

                      <div className="flex flex-col items-center pt-8">
                        <div className="relative mb-4 grid w-full place-items-center">
                          <img
                            className="absolute h-28 w-28 object-cover [grid_area:1/1]"
                            alt="crown"
                            src={getCrownImage(actualRank)}
                          />
                          <Avatar
                            className={cn(
                              "h-[60px] w-[60px] rounded-full [grid_area:1/1]",
                            )}
                          >
                            <AvatarImage src={user.image || ""} />
                            <AvatarFallback className="text-black">
                              {user.name.charAt(0).toUpperCase()}
                              {user.name.split(" ")[1].charAt(0).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                        </div>

                        <h3 className="mb-1 text-xl font-bold text-black">
                          {user.name}
                        </h3>

                        <div className="flex items-center">
                          <img
                            className="mr-2 h-5 w-5 object-contain"
                            src="/images/rj-chips.png"
                            alt="points-icon"
                          />
                          <span className="font-semibold text-black">
                            {user.chips.toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </Card>
                  );
                } else {
                  // Empty position card
                  return (
                    <Card
                      key={`empty-${actualRank}`}
                      className={cn(
                        "overflow-hidden border-none shadow-lg",
                        "bg-gradient-to-b from-gray-500 to-gray-600",
                        "relative p-6 opacity-50",
                        actualRank === 1 ? "md:scale-110" : "md:scale-90",
                        orderClass,
                      )}
                    >
                      <span
                        className={cn(
                          "absolute top-4 left-4 text-6xl font-bold opacity-70 md:text-7xl",
                          "text-gray-400",
                        )}
                      >
                        {getRankText(actualRank)}
                      </span>

                      <div className="flex flex-col items-center pt-8">
                        <div className="relative mb-4 grid w-full place-items-center">
                          <img
                            className="absolute h-28 w-28 object-cover [grid_area:1/1] opacity-50"
                            alt="crown"
                            src={getCrownImage(actualRank)}
                          />
                          <div className="h-[60px] w-[60px] rounded-full bg-gray-400 [grid_area:1/1] flex items-center justify-center">
                            <span className="text-2xl">?</span>
                          </div>
                        </div>

                        <h3 className="mb-1 text-xl font-bold text-black">
                          Posición disponible
                        </h3>

                        <div className="flex items-center">
                          <img
                            className="mr-2 h-5 w-5 object-contain opacity-50"
                            src="/images/rj-chips.png"
                            alt="points-icon"
                          />
                          <span className="font-semibold text-black">0</span>
                        </div>
                      </div>
                    </Card>
                  );
                }
              });
            })()}
          </div>
        </div>
      </div>
      <div className="bg-[#00021c]">
        <div className="max-w-7xl w-full mx-auto p-4 space-y-6">
          {/* Time Period Filter */}
          <TimePeriodFilter
            activePeriod={period}
            onPeriodChange={onPeriodChange}
          />

          {/* Ranking Table */}
          <RankingTable
            timePeriod={period}
            currentPage={page}
            onPageChange={onPageChange}
          />
        </div>
      </div>

      <Footer />
    </div>
  );
}
