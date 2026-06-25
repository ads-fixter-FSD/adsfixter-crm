import type { Metric } from "@/features/crm/types/crm";

type MetricCardProps = {
  metric: Metric;
};

export function MetricCard({ metric }: MetricCardProps) {
  return (
    <article className="min-h-24 rounded-xl border border-[var(--line)] bg-[var(--white)] p-3">
      <span className="text-xs font-medium text-[var(--muted)]">{metric.label}</span>
      <strong className="my-1 block text-xl font-semibold tracking-tight text-[var(--brand-navy)]">{metric.value}</strong>
      <p className="m-0 text-xs text-[var(--muted)]">{metric.trend}</p>
    </article>
  );
}
