import { orpc } from "@/orpc/client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouteContext, useRouter } from "@tanstack/react-router";
import { toast } from "sonner";

interface DailyLoginTaskProps {
  className?: string;
}

export function DailyLoginTask({ className }: DailyLoginTaskProps) {
  const { session } = useRouteContext({ from: "__root__" });
  const queryClient = useQueryClient();
  const router = useRouter();

  // Get daily login status
  const { data: loginStatus, isLoading } = useQuery(
    orpc.tasks.getDailyLoginStatus.queryOptions({
      enabled: !!session?.user.id,
    }),
  );

  // Check and award daily login manually
  const checkDailyLoginMutation = useMutation({
    ...orpc.tasks.checkDailyLogin.mutationOptions(),
    onSuccess: (data) => {
      if (data.alreadyCompleted) {
        toast.info("Daily login already completed", {
          description: "Come back tomorrow for more rewards!",
        });
      } else if (data.awarded) {
        toast.success(`¡Bono diario recibido! +${data.chips} chips`, {
          description: "¡Sigue tu racha de días consecutivos!",
        });
      }
    },
    onSettled: () => {
      router.invalidate();
      queryClient.invalidateQueries();
    },
    onError: (error) => {
      console.error("Error checking daily login:", error);
      toast.error("Error claiming daily login bonus");
    },
  });

  const handleClaimDailyLogin = () => {
    if (!isCompleted && !checkDailyLoginMutation.isPending) {
      checkDailyLoginMutation.mutate({});
    }
  };

  if (isLoading || !session?.user.id) {
    return (
      <div
        className={`animate-pulse bg-[#101227] rounded-xl p-3 sm:p-4 flex items-center justify-between ${className || ""}`}
      >
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white/10 rounded-full"></div>
          <div>
            <div className="h-4 bg-white/10 rounded w-20 mb-1"></div>
            <div className="h-3 bg-white/10 rounded w-32"></div>
          </div>
        </div>
        <div className="h-4 bg-white/10 rounded w-12"></div>
      </div>
    );
  }

  const isCompleted = loginStatus?.completedToday || false;
  const streak = loginStatus?.streak || 0;

  return (
    <div
      className={`bg-[#101227] rounded-xl p-3 sm:p-4 flex items-center justify-between ${className || ""}`}
    >
      <div className="flex items-center gap-3 sm:gap-4">
        <div className="w-8 h-8 sm:w-10 sm:h-10 bg-red-600 rounded-full flex items-center justify-center text-white font-bold">
          {isCompleted ? "✓" : "🎯"}
        </div>
        <div>
          <h3 className="text-white font-semibold text-sm sm:text-base flex items-center gap-2">
            Login Diario
            {streak > 0 && (
              <span className="text-yellow-400 text-xs">🔥{streak}</span>
            )}
          </h3>
          <p className="text-gray-400 text-xs sm:text-sm">
            {isCompleted ? "¡Completado hoy!" : "Inicia sesión cada día"}
          </p>
        </div>
      </div>
      <button
        onClick={handleClaimDailyLogin}
        disabled={isCompleted || checkDailyLoginMutation.isPending}
        className={`px-3 py-1 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
          isCompleted
            ? "bg-green-600 text-white cursor-not-allowed"
            : "bg-lime-300 text-black hover:bg-lime-400 active:scale-95"
        }`}
      >
        {checkDailyLoginMutation.isPending
          ? "..."
          : isCompleted
            ? "✓"
            : "+5 RC"}
      </button>
    </div>
  );
}
