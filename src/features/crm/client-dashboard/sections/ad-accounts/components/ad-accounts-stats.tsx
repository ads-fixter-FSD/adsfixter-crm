import { CreditCard, DollarSign, TrendingUp, WalletCards, type LucideIcon } from "lucide-react";

type AdAccountsStatsProps = {
  totalAccounts: number;
  activeAccounts: number;
  totalAdSpend: number;
  remainingBudget: number;
};

export function AdAccountsStats({ totalAccounts, activeAccounts, totalAdSpend, remainingBudget }: AdAccountsStatsProps) {
  const metrics = [
    { label: "Total Accounts", value: totalAccounts.toString(), detail: "Number of ad accounts", icon: WalletCards, tone: "bg-[var(--info-bg)] text-[var(--info-text)]" },
    { label: "Active Accounts", value: activeAccounts.toString(), detail: "Currently active accounts", icon: TrendingUp, tone: "bg-[var(--success-bg)] text-[var(--success-text)]" },
    { label: "Total Ad Spend", value: `$${totalAdSpend.toFixed(2)}`, detail: "Lifetime ad spend", icon: DollarSign, tone: "bg-[var(--accent-bg)] text-[var(--accent-text)]" },
    { label: "Remaining Budget", value: `$${remainingBudget.toFixed(2)}`, detail: "Available ad budget", icon: CreditCard, tone: "bg-[var(--warning-bg)] text-[var(--warning-text)]" },
  ];

  return (
    <div className="grid grid-cols-4 gap-3 max-[1180px]:grid-cols-2 max-[720px]:grid-cols-1">
      {metrics.map((metric) => {
        const Icon = metric.icon as LucideIcon;

        return (
          <article className="rounded-xl border-2 border-[var(--line)] bg-[var(--white)] p-5" key={metric.label}>
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="m-0 text-xs font-semibold text-[var(--muted)]">{metric.label}</p>
                <strong className="mt-2 block text-2xl text-[var(--brand-navy)]">{metric.value}</strong>
              </div>
              <span className={`inline-flex h-7 w-7 items-center justify-center rounded-full ${metric.tone}`}>
                <Icon aria-hidden="true" size={15} strokeWidth={1.9} />
              </span>
            </div>
            <div className={`mt-3 rounded-lg px-3 py-2 text-xs font-semibold ${metric.tone}`}>{metric.detail}</div>
          </article>
        );
      })}
    </div>
  );
}
