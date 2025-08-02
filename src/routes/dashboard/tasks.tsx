import PokerChip from "@/assets/icons/poker-chip";
import { LevelProgress } from "@/components/level-progress";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { seo } from "@/lib/seo";
import { cn } from "@/lib/utils";
import { orpc } from "@/orpc/client";
import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import {
  createFileRoute,
  useRouteContext,
  useRouter,
} from "@tanstack/react-router";
import { toast } from "sonner";

const queryOptions = orpc.tasks.getAvailableTasks.queryOptions({
  input: {},
});

const loginStatusQueryOptions = orpc.tasks.getDailyLoginStatus.queryOptions();

export const Route = createFileRoute("/dashboard/tasks")({
  component: RouteComponent,
  head: () => ({
    meta: [
      ...seo({
        title: "Tasks - TodoAlRojo",
      }),
    ],
  }),
});

function RouteComponent() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { data } = useSuspenseQuery(queryOptions);
  const { data: dailyLoginStatus } = useSuspenseQuery(loginStatusQueryOptions);

  const dailyCheckMutation = useMutation(
    orpc.tasks.checkDailyLogin.mutationOptions(),
  );

  const onCheckDailyLogin = async () => {
    dailyCheckMutation.mutate(
      {},
      {
        onSuccess: (data) => {
          if (data.alreadyCompleted) {
            toast.info("Daily login already completed", {
              description: "Come back tomorrow for more rewards!",
            });
          } else {
            toast.success("Daily login checked successfully", {
              description: `You've earned ${data.chips} chips!`,
            });
          }
        },
        onError: (error) => {
          toast.error("Error checking daily login");
        },
        onSettled: async () => {
          await queryClient.invalidateQueries();
          router.invalidate();
        },
      },
    );
  };

  const { session } = useRouteContext({
    from: "__root__",
  });

  return (
    <div className="flex flex-col min-h-screen gap-12">
      <LevelProgress user={session?.user as any} />

      <div className="flex flex-col gap-4">
        {/* Chips Balance */}
        <div className="flex-1 md:col-span-2 bg-dark-blue backdrop-blur-lg border border-white/10 rounded-4xl p-4 sm:p-6 flex flex-col justify-center hover:transform hover:-translate-y-1 transition-all duration-200">
          <h2 className="text-gray-400 text-lg sm:text-xl font-medium mb-3 sm:mb-4">
            Chips Balance
          </h2>
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="w-12 h-12 sm:w-15 sm:h-15 rounded-full flex items-center justify-center relative">
              <PokerChip color="red" width={undefined} height={undefined} />
            </div>
            <span className="text-4xl sm:text-6xl font-bold text-white">
              {session?.user.chips}
            </span>
          </div>
        </div>

        <Card className="bg-dark-blue rounded-4xl">
          <CardContent className="p-6">
            <div className="flex flex-wrap items-start justify-between mb-4 gap-4">
              <div className="flex items-center space-x-3">
                <div>
                  <h3 className="text-white font-medium flex items-center space-x-2">
                    <span>{tasks[0]?.title}</span>
                    <span
                      // variant="secondary"
                      className="text-yellow-400"
                    >
                      +{tasks[0]?.chips} RC
                    </span>
                    <div className="rounded-full flex items-center justify-center">
                      <PokerChip color="red" width={20} height={20} />
                    </div>
                  </h3>
                  <p className="text-gray-400 text-sm mt-1">
                    {tasks[0]?.description}
                  </p>
                </div>
              </div>

              <Button
                onClick={onCheckDailyLogin}
                disabled={dailyLoginStatus?.completedToday}
                variant={
                  dailyLoginStatus?.completedToday ? "secondary" : "primary"
                }
                className={cn(
                  dailyLoginStatus?.completedToday
                    ? "bg-gray-600 text-gray-300"
                    : "rojo-gradient text-black font-bold hover:opacity-80",
                  "text-md p-5 rounded-xl w-full sm:w-auto",
                )}
                size="sm"
              >
                {dailyLoginStatus?.completedToday ? "Terminado" : "Completo"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tasks List */}
      <div className="space-y-4">
        {data?.tasks?.slice(1).map((task) => (
          <Card key={task.id} className="bg-dark-blue rounded-4xl">
            <CardContent className="p-6">
              <div className="flex flex-wrap items-start justify-between mb-4 gap-4">
                <div className="flex items-center space-x-3">
                  <div>
                    <h3 className="text-white font-medium flex items-center space-x-2">
                      <span>{task.name}</span>
                      <span
                        // variant="secondary"
                        className="text-yellow-400"
                      >
                        +{task.defaultChips} RC
                      </span>
                      <div className="rounded-full flex items-center justify-center">
                        <PokerChip color="red" width={20} height={20} />
                      </div>
                    </h3>
                    <p className="text-gray-400 text-sm mt-1">
                      {task.description}
                    </p>
                  </div>
                </div>

                <Button
                  // onClick={() => handleCompleteTask(task.id)}
                  // disabled={task.completed}
                  // variant={task.completed ? "secondary" : "primary"}
                  className={cn(
                    !task.active
                      ? "bg-gray-600 text-gray-300"
                      : "rojo-gradient text-black font-bold hover:opacity-80",
                    "text-md p-5 rounded-xl w-full sm:w-auto",
                  )}
                  size="sm"
                >
                  {!task.active ? "Terminado" : "Completo"}
                </Button>
              </div>

              {/* {task.hasInput && !task.completed && (
                <Input
                  defaultValue={task.inputPlaceholder}
                  readOnly
                  className="border-gray-600 bg-[#11172f] py-6 rounded-xl text-white placeholder-gray-400"
                />
              )} */}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

const tasks = [
  {
    id: 1,
    title: "💬 Daily Login",
    description:
      "Comparte tu link con amigos y gana Red Chips cuando depositen",
    chips: 300,
    type: "daily",
    completed: true,
    hasInput: false,
  },
  {
    id: 2,
    title: "💬 Invita y gana",
    description:
      "Comparte tu link con amigos y gana Red Chips cuando depositen",
    chips: 300,
    type: "referral",
    completed: false,
    hasInput: true,
    inputPlaceholder: "https://todoalrojo.cl/invite/tuusuario",
  },
  {
    id: 3,
    title: "💬 Invita y gana",
    description:
      "Comparte tu link con amigos y gana Red Chips cuando depositen",
    chips: 300,
    type: "referral",
    completed: false,
    hasInput: true,
    inputPlaceholder: "https://todoalrojo.cl/invite/tuusuario",
  },
  {
    id: 4,
    title: "💬 Invita y gana",
    description:
      "Comparte tu link con amigos y gana Red Chips cuando depositen",
    chips: 300,
    type: "referral",
    completed: false,
    hasInput: true,
    inputPlaceholder: "https://todoalrojo.cl/invite/tuusuario",
  },
];
