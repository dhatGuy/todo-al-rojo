import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { User } from "@/lib/auth-client";
import { cn } from "@/lib/utils";

interface LevelProgressProps {
  user: User;
  className?: string;
}

export function LevelProgress({ user, className }: LevelProgressProps) {
  // Calculate progress percentage to next level
  const progressPercentage = user.nextLevel?.requiredChips
    ? Math.min(
        Math.max(
          (((user.level?.requiredChips ?? 0) - user.nextLevel.requiredChips) /
            (user.nextLevel.requiredChips - user.nextLevel.requiredChips)) *
            100,
          0,
        ),
        100,
      )
    : 100; // If no next level, show 100%

  const displayPercentage = Math.round(progressPercentage);

  return (
    <Card
      className={cn(
        "bg-dark-blue w-full rounded-lg md:rounded-full p-3 sm:p-4",
        className,
      )}
    >
      <CardContent className="p-0">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-4">
          <h3 className="text-xs sm:text-sm text-gray-400">
            {user.level && user.level.level >= 6
              ? `${user.level.name} (Nivel ${user.level.level})`
              : `Nivel ${user.level?.level ?? 1}`}
          </h3>
          <Progress
            value={progressPercentage}
            className="h-1.5 sm:h-2 md:h-3 bg-gray-700 w-full sm:flex-1"
          />
          <span className="text-gray-400 text-xs sm:text-sm">
            {user.level && user.level.level < 6
              ? `${displayPercentage}% completado`
              : "Nivel máximo"}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
