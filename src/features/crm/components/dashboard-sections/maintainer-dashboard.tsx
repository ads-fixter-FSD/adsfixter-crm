import { MetricCard } from "@/components/ui/metric-card";
import { Panel } from "@/components/ui/panel";
import { ClientTable } from "@/features/crm/components/tables/client-table";
import { RequestTable } from "@/features/crm/components/tables/request-table";
import type { DashboardSectionProps } from "@/features/crm/components/dashboard-sections/dashboard-section-types";

const maintainerDashboardMetrics = [
  { label: "Pending Top-ups", value: "18", trend: "Verify payment first" },
  { label: "Account Requests", value: "11", trend: "Needs review" },
  { label: "Business Share", value: "8", trend: "Approval queue" },
  { label: "Failed Attempts", value: "5", trend: "Retry status pending" },
];

export function MaintainerDashboard({ data, showToast }: DashboardSectionProps) {
  return (
    <div className="grid grid-cols-12 gap-3">
      <section className="col-span-12 grid grid-cols-4 gap-3 max-[1180px]:grid-cols-2 max-[720px]:grid-cols-1">
        {maintainerDashboardMetrics.map((metric) => (
          <MetricCard key={metric.label} metric={metric} />
        ))}
      </section>

      <Panel className="col-span-8 max-[1180px]:col-span-12" title="Approval Queue" action="Review pending" onAction={() => showToast("warning", "Maintainer approval queue opened")}>
        <RequestTable requests={data.requests.filter((request) => request.status === "Pending")} showToast={showToast} />
      </Panel>

      <Panel className="col-span-4 max-[1180px]:col-span-12" title="Maintainer Tasks">
        <div className="grid gap-3">
          {["Verify Payment", "Approve Ad Account", "Approve Business Share", "Add Rejection Notes"].map((control) => (
            <button className="rounded-lg border border-[var(--line)] bg-[var(--white)] px-3 py-2 text-sm font-semibold leading-tight text-[var(--brand-navy)] transition hover:bg-[var(--surface)]" key={control} onClick={() => showToast("success", `${control} completed`)} type="button">
              {control}
            </button>
          ))}
        </div>
      </Panel>

      <Panel className="col-span-12" title="Client Request Snapshot">
        <ClientTable clients={data.clients} showToast={showToast} />
      </Panel>
    </div>
  );
}
