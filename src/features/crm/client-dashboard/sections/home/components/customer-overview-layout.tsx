import { CircleDollarSign, Coins, CreditCard, DollarSign, TrendingUp, WalletCards } from "lucide-react";
import { CustomerHomeOverviewHeader } from "@/features/crm/client-dashboard/sections/home/components/customer-home-sections";

const overviewStatCards = [
  { label: "Wallet Balance", value: "৳0.00", detail: "Available balance (BDT)", icon: WalletCards },
  { label: "Total Top Up", value: "$0.00", detail: "This month", icon: TrendingUp },
  { label: "Total Ad Spend", value: "৳0.00", detail: "This month", icon: DollarSign },
  { label: "Ad Credit Balance", value: "$0.00", detail: "Available to Spend", icon: CreditCard },
  { label: "Total Ad Account", value: "0", detail: "0 Active account", icon: CircleDollarSign },
  { label: "Token", value: "৳0.00", detail: "Available balance (BDT)", icon: Coins },
] as const;

export function CustomerOverviewLayout() {
  return (
    <section className="rounded-xl border border-[var(--line)] bg-[var(--white)] p-5 max-[1180px]:p-4">
      <CustomerHomeOverviewHeader />

      <div className="mt-5 grid grid-cols-6 gap-3 max-[1440px]:grid-cols-3 max-[720px]:grid-cols-1">
        {overviewStatCards.map((card) => {
          const Icon = card.icon;

          return (
            <article className="rounded-xl border border-[var(--line)] bg-[var(--white)] p-4" key={card.label}>
              <div className="flex items-start justify-between gap-3">
                <div className="grid gap-2">
                  <p className="body-xsm-regular m-0 subtext">{card.label}</p>
                  <strong className="h6-medium m-0 primary-text">{card.value}</strong>
                </div>
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--surface)] text-[var(--muted)]">
                  <Icon aria-hidden="true" size={18} strokeWidth={1.8} />
                </span>
              </div>
              <p className="body-xsm-regular m-0 mt-3 subtext">{card.detail}</p>
            </article>
          );
        })}
      </div>
    </section>
  );
}
