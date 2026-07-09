import type { PerformanceStat } from "@/types/adsPerformance";
import StatCard from "./StatCard";

export default function StatsRow({ stats }: { stats: PerformanceStat[] }) {
  return (
    <div className="flex flex-wrap gap-3">
      {stats.map((stat) => (
        <StatCard key={stat.key} stat={stat} />
      ))}
    </div>
  );
}
