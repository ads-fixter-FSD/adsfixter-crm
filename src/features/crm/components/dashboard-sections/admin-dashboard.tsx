import { MetricCard } from "@/components/ui/metric-card";
import { Panel } from "@/components/ui/panel";
import { RequestTable } from "@/features/crm/components/tables/request-table";
import type { DashboardSectionProps } from "@/features/crm/components/dashboard-sections/dashboard-section-types";
import type { Role } from "@/features/crm/types/crm";

type AdminDashboardProps = DashboardSectionProps & {
  role: Role;
};

export function AdminDashboard({ data, role, showToast }: AdminDashboardProps) {
  return (
    <div className="grid grid-cols-12 gap-3">
      <section className="col-span-12 grid grid-cols-6 gap-3 max-[1180px]:grid-cols-2 max-[720px]:grid-cols-1">
        {data.adminMetrics.map((metric) => (
          <MetricCard key={metric.label} metric={metric} />
        ))}
      </section>

      <Panel className="col-span-8 max-[1180px]:col-span-12" title="Pending Workflow" action="Review all" onAction={() => showToast("warning", "37 pending requests need review")}>
        <RequestTable requests={data.requests} showToast={showToast} />
      </Panel>

      <Panel className="col-span-4 max-[1180px]:col-span-12" title="Recent Activities">
        <div className="grid gap-3">
          {data.activities.map((activity) => (
            <div className="grid grid-cols-[auto_1fr] items-start gap-3" key={activity}>
              <span className="mt-1.5 h-2.5 w-2.5 rounded-full bg-[var(--brand-orange)]" />
              <p className="m-0 text-[var(--brand-navy)]">{activity}</p>
            </div>
          ))}
        </div>
      </Panel>

      <Panel className="col-span-7 max-[1180px]:col-span-12" title="Dollar Rate Management">
        <div className="flex items-center justify-between gap-4 max-[720px]:flex-col max-[720px]:items-start">
          <div>
            <span className="text-xs font-medium text-[var(--muted)]">Current Exchange Rate</span>
            <strong className="my-2 block text-xl font-semibold tracking-tight text-[var(--brand-navy)]">1 USD = 125 BDT</strong>
            <p className="m-0 text-xs text-[var(--muted)]">10,000 BDT deposit will add 80 USD to customer wallet.</p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {[125, 126, 127].map((rate) => (
              <button className="rounded-lg border-0 bg-[var(--brand-navy)] px-3 py-2 text-sm font-semibold text-[var(--white)]" key={rate} onClick={() => showToast("success", `Dollar rate set to ${rate} BDT`)} type="button">
                {rate} BDT
              </button>
            ))}
          </div>
        </div>
      </Panel>

      <Panel className="col-span-5 max-[1180px]:col-span-12" title={`${role} Controls`}>
        <div className="grid gap-3">
          {["Top-up Approval", "Credit Limit Change", "Client Suspend/Activate", "Business Manager Approve"].map((control) => (
            <button className="rounded-lg border border-[var(--line)] bg-[var(--white)] px-3 py-2 text-sm font-semibold leading-tight text-[var(--brand-navy)] transition hover:bg-[var(--surface)]" key={control} onClick={() => showToast("success", `${control} action completed`)} type="button">
              {control}
            </button>
          ))}
        </div>
      </Panel>
    </div>
  );
}
