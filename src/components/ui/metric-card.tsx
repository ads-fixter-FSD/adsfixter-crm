import type { Metric } from "@/features/crm/types/crm";

type MetricCardProps = {
  metric: Metric;
};

export function MetricCard({ metric }: MetricCardProps) {
  return (
    <article className="metric-card">
      <span>{metric.label}</span>
      <strong>{metric.value}</strong>
      <p>{metric.trend}</p>
    </article>
  );
}
