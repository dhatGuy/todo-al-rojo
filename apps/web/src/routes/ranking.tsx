import { cn } from "@repo/ui";
import { Avatar, AvatarImage } from "@repo/ui/avatar";
import { Card } from "@repo/ui/card";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import bronzeCrown from "../assets/images/bronze.png";
import goldCrown from "../assets/images/gold.png";
import LeaderboardsBg from "../assets/images/leaderboards-bg.png";
import chipImg from "../assets/images/rj-chips.png";
import silverCrown from "../assets/images/silver.png";
import { Footer } from "../components/home/footer";
import { Header } from "../components/home/header";
import { TimePeriodFilter } from "../components/ranking/TimePeriodFilter";
import { RankingTable } from "../components/ranking/ranking-table";

export const Route = createFileRoute("/ranking")({
  component: RouteComponent,
});

function RouteComponent() {
  const [activePeriod, setActivePeriod] = useState("Semanal");

  return (
    <div className="min-h-screen flex flex-col text-white">
      <Header />
      {/* Header */}
      <div
        style={{ backgroundImage: `url(${LeaderboardsBg})` }}
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
            <button className="bg-gradient-to-r from-yellow-500 to-orange-500 text-black font-bold py-1 px-5 rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-200">
              Participa Ahora
            </button>
          </div>

          <div
            className={cn(
              "mb-8 flex flex-col gap-4 md:grid md:grid-cols-3 md:gap-6",
            )}
          >
            {leaderboardUsers.map((user, i) => {
              // Set order: on mobile, 2nd user first, then 1st, then 3rd
              // On md+, use default order
              let orderClass = "";
              if (i === 0) orderClass = "order-2 md:order-1";
              else if (i === 1) orderClass = "order-1 md:order-2";
              else if (i === 2) orderClass = "order-3 md:order-3";
              return (
                <Card
                  key={i}
                  className={cn(
                    "overflow-hidden border-none shadow-lg",
                    user.bgClass,
                    "relative p-6",
                    i === 1 ? "md:scale-110" : "md:scale-90",
                    orderClass,
                  )}
                >
                  <span
                    className={cn(
                      "absolute top-4 left-4 text-6xl font-bold opacity-70 md:text-7xl",
                      user.textClass,
                    )}
                  >
                    {user.rank}
                  </span>

                  <div className="flex flex-col items-center pt-8">
                    <div className="relative mb-4 grid w-full place-items-center">
                      <img
                        className="absolute h-28 w-28 object-cover [grid_area:1/1]"
                        src={
                          i === 0
                            ? silverCrown
                            : i === 1
                              ? goldCrown
                              : bronzeCrown
                        }
                      ></img>
                      <Avatar
                        className={cn(
                          "h-[60px] w-[60px] rounded-full [grid_area:1/1]",
                        )}
                      >
                        <AvatarImage src={user.image} />
                      </Avatar>
                    </div>

                    <h3 className="mb-1 text-xl font-bold text-black">
                      {user.name}
                    </h3>

                    <div className="flex items-center">
                      <img
                        className="mr-2 h-5 w-5 object-contain"
                        src={chipImg}
                        alt="points-icon"
                      />
                      <span className="font-semibold text-black">
                        {user.points}
                      </span>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </div>

      <div className="max-w-7xl w-full mx-auto p-4 space-y-6">
        {/* Time Period Filter */}
        <TimePeriodFilter
          activePeriod={activePeriod}
          onPeriodChange={setActivePeriod}
        />

        {/* Ranking Table */}
        <RankingTable />
      </div>

      <Footer />
    </div>
  );
}

const leaderboardUsers = [
  {
    rank: "2ND",
    name: "Ruben Dias",
    points: "1,600",
    bgClass: "bg-gradient-to-b from-gray-300 to-gray-400",
    textClass: "text-gray-300",
    image: "https://picsum.photos/200",
  },
  {
    rank: "1ST",
    name: "Felipe Pastenes",
    points: "2,000",
    bgClass: "bg-gradient-to-b from-yellow-300 to-yellow-400",
    textClass: "text-yellow-300",
    image: "https://picsum.photos/200",
  },
  {
    rank: "3RD",
    name: "Thiago Silva",
    points: "1,500",
    bgClass: "bg-gradient-to-b from-amber-600 to-amber-700",
    textClass: "text-amber-600",
    image: "https://picsum.photos/200",
  },
];
