import PokerChip from "@/assets/icons/poker-chip";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { seo } from "@/lib/seo";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, useRouteContext } from "@tanstack/react-router";
import { Gift } from "lucide-react";
import { shopItemsQueryOptions } from "src/queries/shop.queries";

export const Route = createFileRoute("/dashboard/shop")({
  component: RouteComponent,
  head: () => ({
    meta: [
      ...seo({
        title: "Shop - TodoAlRojo",
      }),
    ],
  }),
});

function RouteComponent() {
  const { data: rewards } = useSuspenseQuery(shopItemsQueryOptions);
  const { session } = useRouteContext({ from: "__root__" });

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
            <span className="text-white font-bold text-3xl">
              {Intl.NumberFormat().format(session?.user.chips || 0)}
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Rewards Grid */}
      <div className="grid gap-y-10 gap-x-4 md:grid-cols-2">
        {rewards?.data.map((reward) => (
          <Card
            key={reward.id}
            className="bg-dark-blue shadow-dark-blue shadow-xl"
          >
            <CardContent className="p-6 text-center">
              <div className="mb-4">
                <Gift className="h-12 w-12 text-red-600 mx-auto mb-3" />
                <h3 className="text-white font-bold text-xl mb-2">
                  {reward.rewardName}
                </h3>
                <p className="text-gray-400 text-sm mb-4">
                  {reward.minLevelRequired} Nivel requerido
                </p>
              </div>

              <div className="mb-4">
                <div className="flex items-center justify-center space-x-2 mb-3">
                  <div className="rounded-full flex items-center justify-center">
                    <PokerChip color="red" width={32} height={32} />
                  </div>
                  <span className="text-gray-200 text-lg font-semibold">
                    {reward.chipCost}
                  </span>
                </div>
              </div>

              <Button
                // onClick={() => handleRedeem(reward)}
                disabled={(session?.user.chips ?? 0) < reward.chipCost}
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
