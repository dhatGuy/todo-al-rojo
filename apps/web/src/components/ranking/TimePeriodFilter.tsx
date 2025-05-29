import { cn } from "@repo/ui";
import { ToggleGroup, ToggleGroupItem } from "@repo/ui/toggle-group";

interface TimePeriodFilterProps {
  activePeriod: string;
  onPeriodChange: (period: string) => void;
}

export const TimePeriodFilter = ({
  activePeriod,
  onPeriodChange,
}: TimePeriodFilterProps) => {
  const periods = ["Diario", "Semanal", "Mensual"];

  console.log(activePeriod);

  return (
    <div className="flex justify-center mb-8 bg-white">
      <ToggleGroup
        type="single"
        onValueChange={onPeriodChange}
        className="bg-transparent rounded-xl p-1 flex items-center justify-center"
      >
        {periods.map((period) => (
          <ToggleGroupItem
            key={period}
            value={period}
            aria-label="Toggle bold"
            className={cn(
              "px-8 py-2 !rounded-xl font-medium transition-all duration-200",
              activePeriod === period
                ? "!bg-red-500 !text-white shadow-lg"
                : "text-gray-600 hover:text-gray-800",
            )}
          >
            {period}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    </div>
  );
};
