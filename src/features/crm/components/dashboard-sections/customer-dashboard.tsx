import { MetricCard } from "@/components/ui/metric-card";
import { Panel } from "@/components/ui/panel";
import { AccountTable } from "@/features/crm/ad-accounts/components";
import { WalletStatement } from "@/features/crm/components/forms/wallet-statement";
import type { DashboardSectionProps } from "@/features/crm/components/dashboard-sections/dashboard-section-types";

export function CustomerDashboard({ data, showToast }: DashboardSectionProps) {
  return (
    <div className="grid grid-cols-12 gap-3">
      <section className="col-span-12 grid grid-cols-4 gap-3 max-[1180px]:grid-cols-2 max-[720px]:grid-cols-1">
        {data.customerMetrics.map((metric) => (
          <MetricCard key={metric.label} metric={metric} />
        ))}
      </section>

      <Panel className="col-span-7 max-[1180px]:col-span-12" title="Wallet Statement">
        <WalletStatement rows={data.wallet} />
      </Panel>

      <Panel className="col-span-5 max-[1180px]:col-span-12" title="New Payment">
        <div className="grid gap-3">
          {["Select bKash, Nagad, or Bank", "Enter amount and transaction ID", "Upload screenshot", "Submit for approval"].map((step, index) => (
            <div className="flex items-center justify-start gap-3 rounded-xl bg-[var(--surface)] px-3 py-2" key={step}>
              <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-[var(--brand-orange)] font-bold text-[var(--white)]">{index + 1}</span>
              <p className="m-0 text-[var(--brand-navy)]">{step}</p>
            </div>
          ))}
        </div>
        <button className="mt-3 w-full rounded-lg border-0 bg-[var(--brand-orange)] px-3 py-2 text-sm font-semibold leading-tight text-[var(--white)] transition hover:bg-[var(--black)]" onClick={() => showToast("success", "Payment submitted for admin approval")} type="button">
          Submit Demo Payment
        </button>
      </Panel>

      <Panel className="col-span-12" title="My Ad Accounts" action="Request account" onAction={() => showToast("warning", "New ad account request saved as pending")}>
        <AccountTable accounts={data.accounts} />
      </Panel>
    </div>
  );
}
