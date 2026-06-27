import { BriefcaseBusiness, Building2, ClipboardList, DollarSign, ExternalLink, TrendingUp, Users, WalletCards } from "lucide-react";
import type { Metric } from "@/features/crm/types/crm";

type MetricCardProps = {
  metric: Metric;
  dateRangeLabel: string;
  dateRangeKey: string;
  onOpen?: () => void;
};

const metricIncrementMap: Record<string, string> = {
  "Ad Accounts": "+8.4%",
  "Available Balance": "+9.7%",
  "Business Managers": "+6.8%",
  "Credit Balance": "-2.1%",
  "Current Balance": "+12.3%",
  "Pending Requests": "+4.6%",
  "Today's Spend": "+14.2%",
  "Total Balance": "+11.8%",
  "Total Clients": "+17.6%",
};

function renderMetricIcon(label: string) {
  if (label === "Ad Accounts") return <BriefcaseBusiness aria-hidden="true" size={15} strokeWidth={1.9} />;
  if (label === "Business Managers") return <Building2 aria-hidden="true" size={15} strokeWidth={1.9} />;
  if (label === "Pending Requests") return <ClipboardList aria-hidden="true" size={15} strokeWidth={1.9} />;
  if (label === "Today's Spend") return <TrendingUp aria-hidden="true" size={15} strokeWidth={1.9} />;
  if (label === "Total Clients") return <Users aria-hidden="true" size={15} strokeWidth={1.9} />;
  if (label.includes("Balance")) return <WalletCards aria-hidden="true" size={15} strokeWidth={1.9} />;
  return <DollarSign aria-hidden="true" size={15} strokeWidth={1.9} />;
}

function getMetricChartBars(label: string, dateRangeKey: string) {
  const seed = `${label}-${dateRangeKey}`.split("").reduce((total, char) => total + char.charCodeAt(0), 0);

  return Array.from({ length: 9 }, (_, index) => {
    const wave = Math.sin((seed + index * 17) / 11);
    const curve = Math.cos((seed + index * 9) / 13);
    return Math.round(18 + Math.abs(wave * 46) + Math.abs(curve * 24));
  });
}

function getMetricIncrement(label: string) {
  return metricIncrementMap[label] ?? "+7.5%";
}

export function MetricCard({ metric, dateRangeLabel, dateRangeKey, onOpen }: MetricCardProps) {
  const chartBars = getMetricChartBars(metric.label, dateRangeKey);
  const increment = getMetricIncrement(metric.label);
  const isNegativeIncrement = increment.startsWith("-");

  return (
    <article className="overflow-hidden rounded-xl border-2 border-[var(--line)] bg-[var(--white)]">
      <div className="flex min-h-14 items-center justify-between gap-3 border-b border-[var(--line)] px-4 py-3">
        <div className="flex min-w-0 items-center gap-2">
          <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-[var(--line)] bg-[var(--surface)] text-[var(--brand-navy)]">
            {renderMetricIcon(metric.label)}
          </span>
          <span className="truncate text-sm font-semibold text-[var(--brand-navy)]">{metric.label}</span>
        </div>
        {onOpen ? (
          <button aria-label={`Open ${metric.label}`} className="inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg text-[var(--brand-navy)] transition hover:bg-[var(--surface)] hover:text-[var(--brand-orange)]" onClick={onOpen} type="button">
            <ExternalLink aria-hidden="true" size={14} strokeWidth={2} />
          </button>
        ) : null}
      </div>
      <div className="grid min-h-24 grid-cols-[1fr_auto] items-end gap-3 px-4 py-4">
        <div className="min-w-0">
          <strong className="block text-2xl font-bold tracking-[-0.03em] text-[var(--brand-navy)]">{metric.value}</strong>
          <p className={`mt-2 mb-0 inline-flex rounded-md px-2 py-1 text-[0.7rem] font-semibold ${isNegativeIncrement ? "bg-[var(--danger-bg)] text-[var(--danger-text)]" : "bg-[var(--success-bg)] text-[var(--success-text)]"}`}>
            {increment}
          </p>
          <p className="mt-2 mb-0 text-xs text-[var(--muted)]">{dateRangeLabel}</p>
        </div>
        <div className="flex h-16 w-28 items-end justify-end gap-1">
          {chartBars.map((height, index) => (
            <span className={`w-2 rounded-t-full ${index === chartBars.length - 1 ? "bg-[var(--brand-orange)]" : "bg-[var(--brand-orange-soft)]"}`} key={`${metric.label}-${height}-${index}`} style={{ height: `${height}%` }} />
          ))}
        </div>
      </div>
    </article>
  );
}
