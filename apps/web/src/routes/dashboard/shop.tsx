import { Button } from "@repo/ui/components/button";
import { Card, CardContent } from "@repo/ui/components/card";
import { createFileRoute } from "@tanstack/react-router";
import { Gift } from "lucide-react";
import PokerChip from "../../assets/icons/poker-chip";

export const Route = createFileRoute("/dashboard/shop")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="space-y-6">
      {/* Chips Balance Header */}
      <Card className="bg-dark-blue sm:w-fit py-4 rounded-3xl px-6">
        <CardContent className="p-0">
          <div className="text-gray-400 text-sm mb-2">Chips Balance</div>
          <div className="flex items-center justify-center space-x-3">
            <div className="rounded-full flex items-center justify-center">
              <PokerChip color="red" width={32} height={32} />
            </div>
            <span className="text-white font-bold text-3xl">3000</span>
          </div>
        </CardContent>
      </Card>

      {/* Rewards Grid */}
      <div className="grid gap-y-10 gap-x-4 md:grid-cols-2">
        {rewards.map((reward) => (
          <Card
            key={reward.id}
            className="bg-dark-blue shadow-dark-blue shadow-xl"
          >
            <CardContent className="p-6 text-center">
              <div className="mb-4">
                <Gift className="h-12 w-12 text-red-600 mx-auto mb-3" />
                <h3 className="text-white font-bold text-xl mb-2">
                  {reward.title}
                </h3>
                <p className="text-gray-400 text-sm mb-4">
                  {reward.description}
                </p>
              </div>

              <div className="mb-4">
                <div className="flex items-center justify-center space-x-2 mb-3">
                  <div className="rounded-full flex items-center justify-center">
                    <PokerChip color="red" width={32} height={32} />
                  </div>
                  <span className="text-gray-200 text-lg font-semibold">
                    {reward.chipText}
                  </span>
                </div>
              </div>

              <Button
                // onClick={() => handleRedeem(reward)}
                // disabled={userChips < reward.chips}
                className="p-6 rojo-gradient text-black font-bold hover:opacity-80 disabled:opacity-50"
              >
                Canjear
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

const rewards = [
  {
    id: 1,
    title: "Free Bet $3,000",
    description: "Deposito mínimo $3,000/últimos 7 días",
    chips: 500,
    chipText: "500 fichas",
  },
  {
    id: 2,
    title: "Free Bet $10,000",
    description: "Nivel 6 o superior",
    chips: 1300,
    chipText: "1300 fichas",
  },
  {
    id: 3,
    title: "Free Bet $3,000",
    description: "Deposito mínimo $3,000/últimos 7 días",
    chips: 500,
    chipText: "500 fichas",
  },
  {
    id: 4,
    title: "Free Bet $10,000",
    description: "Nivel 6 o superior",
    chips: 1300,
    chipText: "1300 fichas",
  },
];
