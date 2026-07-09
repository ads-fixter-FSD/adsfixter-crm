import {
  Megaphone,
  MousePointerClick,
  Users,
  CircleDollarSign,
} from "lucide-react";
import type { PerformanceStat, StatIconKey } from "@/types/adsPerformance";

const ICONS: Record<StatIconKey, typeof Megaphone> = {
  ads: Megaphone,
  ctr: MousePointerClick,
  reach: Users,
  spend: CircleDollarSign,
};

export default function StatCard({ stat }: { stat: PerformanceStat }) {
  const Icon = ICONS[stat.key];

  return (
    <div className="flex-1 min-w-[160px] rounded-[var(--btn-radius)] border border-[var(--color-line)] bg-white p-4">
      <div className="flex items-center gap-2">
        <span className="flex h-6 w-6 items-center justify-center rounded-md border border-[var(--color-line)]">
          <Icon size={13} className="text-[var(--color-subtext-500)]" />
        </span>
        <span className="body-xsm-medium subtext-500">{stat.label}</span>
      </div>

      <p className="h6-semibold primary-text mt-3">{stat.value}</p>
      <p className="body-xsm-regular subtext-400 mt-1">{stat.description}</p>
    </div>
  );
}
