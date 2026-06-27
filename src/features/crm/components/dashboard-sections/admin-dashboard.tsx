import { PrimaryButton } from "@/components/shared-buttons";
import { MetricCard } from "@/components/ui/metric-card";
import { Panel } from "@/components/ui/panel";
import { RequestTable } from "@/features/crm/components/tables/request-table";
import type { DashboardSectionProps } from "@/features/crm/components/dashboard-sections/dashboard-section-types";
import type { Role } from "@/features/crm/types/crm";
import { BriefcaseBusiness, Building2, Users } from "lucide-react";
import type { ReactNode } from "react";

type AdminDashboardProps = DashboardSectionProps & {
  role: Role;
  overviewHeader?: ReactNode;
  onSectionChange?: (section: string) => void;
};

function getMetricDestination(metricLabel: string) {
  if (metricLabel === "Total Clients") return "Clients";
  if (metricLabel === "Ad Accounts") return "Ad Accounts";
  if (metricLabel === "Business Managers") return "Business Managers";
  if (metricLabel === "Total Balance") return "Wallet Settings";
  if (metricLabel === "Pending Requests") return "New Account Requests";
  return undefined;
}

function createGraphPoints(label: string, dateRangeKey: string) {
  const seed = `${label}-${dateRangeKey}`.split("").reduce((total, char) => total + char.charCodeAt(0), 0);
  const values = Array.from({ length: 7 }, (_, index) => {
    const wave = Math.sin((seed + index * 19) / 17);
    const curve = Math.cos((seed + index * 13) / 23);
    return 16 + Math.round(Math.abs(wave * 46) + Math.abs(curve * 22));
  });
  const maxValue = Math.max(...values, 1);

  return values.map((value, index) => {
    const x = 8 + index * 18;
    const y = 82 - (value / maxValue) * 62;
    return `${x},${y.toFixed(1)}`;
  });
}

function DashboardGraphCard({
  title,
  value,
  subtitle,
  colorClassName,
  points,
  onViewAll,
  icon,
}: {
  title: string;
  value: string;
  subtitle: string;
  colorClassName: string;
  points: string[];
  onViewAll?: () => void;
  icon: ReactNode;
}) {
  const linePoints = points.join(" ");
  const areaPoints = `8,88 ${linePoints} 116,88`;

  return (
    <article className="overflow-hidden rounded-xl border-2 border-[var(--line)] bg-[var(--white)]">
      <div className="flex min-h-11 items-center justify-between gap-3 border-b border-[var(--line)] px-4 py-2">
        <div className="flex min-w-0 items-center gap-2">
          <span className="text-[var(--brand-navy)]">{icon}</span>
          <h3 className="m-0 truncate text-sm font-semibold text-[var(--brand-navy)]">{title}</h3>
        </div>
        {onViewAll ? (
          <button className="text-xs font-semibold text-[var(--brand-orange)] underline-offset-2 hover:underline" onClick={onViewAll} type="button">
            View All
          </button>
        ) : null}
      </div>

      <div className="grid gap-3 p-4">
        <div>
          <p className="m-0 text-xs text-[var(--muted)]">{subtitle}</p>
          <strong className="mt-1 block text-xl font-semibold text-[var(--brand-navy)]">{value}</strong>
        </div>
        <svg aria-hidden="true" className="h-28 w-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 124 96">
          {[24, 44, 64, 84].map((lineY) => (
            <line className="stroke-[var(--line)]" key={lineY} strokeWidth="0.7" x1="0" x2="124" y1={lineY} y2={lineY} />
          ))}
          <polygon className={`${colorClassName} opacity-10`} points={areaPoints} />
          <polyline className={colorClassName} fill="none" points={linePoints} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          {points.map((point, index) => {
            const [cx, cy] = point.split(",");
            return <circle className={colorClassName} cx={cx} cy={cy} fill="currentColor" key={`${title}-${point}-${index}`} r={index === points.length - 1 ? "2.2" : "1.5"} />;
          })}
          {["Mon", "Tue", "Wed", "Thu"].map((label, index) => (
            <text className="fill-[var(--muted)] text-[0.18rem]" key={label} x={8 + index * 34} y="95">
              {label}
            </text>
          ))}
        </svg>
      </div>
    </article>
  );
}

export function AdminDashboard({ data, dateRangeKey = "default", dateRangeLabel = "Current range", overviewHeader, showToast, onSectionChange }: AdminDashboardProps) {
  return (
    <div className="grid w-full grid-cols-12 gap-5">
      <section className="col-span-12 grid gap-5 rounded-xl border-2 border-[var(--line)] bg-[var(--white)] p-5">
        {overviewHeader}
        <div className="grid grid-cols-6 gap-4 max-[1500px]:grid-cols-3 max-[1180px]:grid-cols-2 max-[720px]:grid-cols-1">
          {data.adminMetrics.map((metric) => {
            const destination = getMetricDestination(metric.label);

            return <MetricCard dateRangeKey={dateRangeKey} dateRangeLabel={dateRangeLabel} key={metric.label} metric={metric} onOpen={destination ? () => onSectionChange?.(destination) : undefined} />;
          })}
        </div>
      </section>

      <section className="col-span-12 grid grid-cols-3 gap-4 max-[1180px]:grid-cols-1">
        <DashboardGraphCard
          colorClassName="text-[var(--info-text)]"
          icon={<Users aria-hidden="true" size={15} strokeWidth={1.9} />}
          onViewAll={() => onSectionChange?.("Clients")}
          points={createGraphPoints("Total Clients", dateRangeKey)}
          subtitle={`Total clients - ${dateRangeLabel}`}
          title="Total Clients"
          value={data.clients.length.toString()}
        />
        <DashboardGraphCard
          colorClassName="text-[var(--brand-orange)]"
          icon={<BriefcaseBusiness aria-hidden="true" size={15} strokeWidth={1.9} />}
          onViewAll={() => onSectionChange?.("Ad Accounts")}
          points={createGraphPoints("Ad Accounts", dateRangeKey)}
          subtitle={`Ad accounts - ${dateRangeLabel}`}
          title="Ad Accounts"
          value={data.accounts.length.toString()}
        />
        <DashboardGraphCard
          colorClassName="text-[var(--success-text)]"
          icon={<Building2 aria-hidden="true" size={15} strokeWidth={1.9} />}
          onViewAll={() => onSectionChange?.("Business Managers")}
          points={createGraphPoints("Business Managers", dateRangeKey)}
          subtitle={`Business managers - ${dateRangeLabel}`}
          title="Business Managers"
          value={data.businessManagers.length.toString()}
        />
      </section>

      <Panel className="col-span-12" title="Pending Workflow" action="Review all" onAction={() => showToast("warning", "37 pending requests need review")}>
        <RequestTable requests={data.requests} showToast={showToast} />
      </Panel>

      <Panel className="col-span-12" title="Dollar Rate Management">
        <div className="flex items-center justify-between gap-4 max-[720px]:flex-col max-[720px]:items-start">
          <div>
            <span className="text-xs font-medium text-[var(--muted)]">Current Exchange Rate</span>
            <strong className="my-2 block text-xl font-semibold tracking-tight text-[var(--brand-navy)]">1 USD = 125 BDT</strong>
            <p className="m-0 text-xs text-[var(--muted)]">10,000 BDT deposit will add 80 USD to customer wallet.</p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {[125, 126, 127].map((rate) => (
              <PrimaryButton className="px-3" key={rate} onClick={() => showToast("success", `Dollar rate set to ${rate} BDT`)} type="button">
                {rate} BDT
              </PrimaryButton>
            ))}
          </div>
        </div>
      </Panel>
    </div>
  );
}
