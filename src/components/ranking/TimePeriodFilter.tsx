import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { cn } from "@/lib/utils";

interface TimePeriodFilterProps {
  activePeriod?: "diario" | "semanal" | "mensual";
  onPeriodChange: (period: "diario" | "semanal" | "mensual") => void;
}

export const TimePeriodFilter = ({
  activePeriod = "semanal",
  onPeriodChange,
}: TimePeriodFilterProps) => {
  const periods = ["diario", "semanal", "mensual"];

  return (
    <div className="flex justify-center mb-8 bg-white rounded-xl">
      <ToggleGroup
        type="single"
        value={activePeriod.toLowerCase()}
        onValueChange={onPeriodChange}
        className="bg-transparent rounded-xl p-1 flex items-center justify-center"
      >
        {periods.map((period) => (
          <ToggleGroupItem
            key={period}
            value={period}
            aria-label={`Toggle ${period}`}
            className={cn(
              "flex-1 px-2 sm:px-4 md:px-8 py-2 !rounded-xl font-medium transition-all duration-200 text-sm sm:text-base",
              activePeriod === period
                ? "!bg-red-500 !text-white shadow-lg font-semibold"
                : "text-gray-600 hover:text-gray-800",
            )}
          >
            {period.charAt(0).toUpperCase() + period.slice(1)}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    </div>
  );
};
