"use client";

import { ChevronDown, CreditCard, DollarSign, Eye, Search, TrendingUp, WalletCards } from "lucide-react";
import { useMemo, useRef, useState } from "react";
import { StatusChip } from "@/components/ui/status-chip";
import type { CrmOverview, MetaAdAccountStatus, ToastType } from "@/features/crm/types/crm";
import { useClickOutside } from "@/hooks/use-click-outside";

type ClientAdAccountsSectionProps = {
  data: CrmOverview;
  showToast: (type: ToastType, message: string) => void;
};

const accountStatusOptions: MetaAdAccountStatus[] = ["ACTIVE", "UNSETTLED", "DISABLED", "PENDING_RISK_REVIEW", "PENDING_SETTLEMENT", "CLOSED", "UNKNOWN"];

function parseCurrency(value: string) {
  const numericValue = Number(value.replace(/[^0-9.-]+/g, ""));
  return Number.isFinite(numericValue) ? numericValue : 0;
}

export function ClientAdAccountsSection({ data, showToast }: ClientAdAccountsSectionProps) {
  const statusFilterRef = useRef<HTMLDivElement | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatuses, setSelectedStatuses] = useState<MetaAdAccountStatus[]>([]);
  const [isStatusFilterOpen, setIsStatusFilterOpen] = useState(false);

  const filteredAccounts = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();

    return data.accounts.filter((account) => {
      const matchesSearch = !normalizedQuery || account.name.toLowerCase().includes(normalizedQuery) || account.id.toLowerCase().includes(normalizedQuery);
      const matchesStatus = selectedStatuses.length === 0 || selectedStatuses.includes(account.status);
      return matchesSearch && matchesStatus;
    });
  }, [data.accounts, searchQuery, selectedStatuses]);

  const activeAccounts = data.accounts.filter((account) => account.status === "ACTIVE").length;
  const totalAdSpend = data.accounts.reduce((total, account) => total + parseCurrency(account.spend), 0);
  const remainingBudget = data.accounts.reduce((total, account) => total + parseCurrency(account.balance), 0);

  const toggleStatus = (status: MetaAdAccountStatus) => {
    setSelectedStatuses((current) => (current.includes(status) ? current.filter((item) => item !== status) : [...current, status]));
  };

  useClickOutside(statusFilterRef, () => setIsStatusFilterOpen(false));

  const handleAccountAction = (accountName: string, action: "view" | "top-up") => {
    showToast("success", action === "top-up" ? `Top-up started for ${accountName}` : `Opening ${accountName}`);
  };

  return (
    <section className="grid gap-5">
      <div>
        <h2 className="m-0 text-xl font-semibold text-[var(--brand-navy)]">Your Ad Accounts</h2>
      </div>

      <div className="grid grid-cols-4 gap-3 max-[1180px]:grid-cols-2 max-[720px]:grid-cols-1">
        {[
          { label: "Total Accounts", value: data.accounts.length.toString(), detail: "Number of ad accounts", icon: WalletCards, tone: "bg-[var(--info-bg)] text-[var(--info-text)]" },
          { label: "Active Accounts", value: activeAccounts.toString(), detail: "Currently active accounts", icon: TrendingUp, tone: "bg-[var(--success-bg)] text-[var(--success-text)]" },
          { label: "Total Ad Spend", value: `$${totalAdSpend.toFixed(2)}`, detail: "Lifetime ad spend", icon: DollarSign, tone: "bg-[var(--accent-bg)] text-[var(--accent-text)]" },
          { label: "Remaining Budget", value: `$${remainingBudget.toFixed(2)}`, detail: "Available ad budget", icon: CreditCard, tone: "bg-[var(--warning-bg)] text-[var(--warning-text)]" },
        ].map((metric) => {
          const Icon = metric.icon;

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

      <section className="rounded-xl border-2 border-[var(--line)] bg-[var(--white)] p-5">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <label className="flex min-h-9 w-72 items-center gap-2 rounded-lg border border-[var(--line)] bg-[var(--white)] px-3 text-[var(--muted)] max-[720px]:w-full">
            <Search aria-hidden="true" size={15} strokeWidth={1.9} />
            <input className="min-w-0 flex-1 bg-transparent text-sm text-[var(--brand-navy)] outline-none" onChange={(event) => setSearchQuery(event.target.value)} placeholder="Search accounts..." type="search" value={searchQuery} />
          </label>

          <div className="relative" ref={statusFilterRef}>
            <button className="inline-flex min-h-9 items-center gap-2 rounded-lg border border-[var(--brand-orange)] bg-[var(--brand-orange)] px-3 text-sm font-semibold text-[var(--brand-orange-contrast)] hover:bg-[var(--brand-orange-hover)]" onClick={() => setIsStatusFilterOpen((current) => !current)} type="button">
              Status
              <ChevronDown aria-hidden="true" className={`transition-transform ${isStatusFilterOpen ? "rotate-180" : ""}`} size={15} strokeWidth={2} />
            </button>
            {isStatusFilterOpen ? (
              <div className="absolute right-0 top-[calc(100%+0.4rem)] z-20 grid min-w-56 gap-2 rounded-xl border-2 border-[var(--line)] bg-[var(--white)] p-4">
                <label className="flex items-center gap-2 text-xs font-semibold text-[var(--brand-navy)]">
                  <input checked={selectedStatuses.length === 0} onChange={() => setSelectedStatuses([])} type="checkbox" />
                  All Statuses
                </label>
                {accountStatusOptions.map((status) => (
                  <label className="flex items-center gap-2 text-xs text-[var(--brand-navy)]" key={status}>
                    <input checked={selectedStatuses.includes(status)} onChange={() => toggleStatus(status)} type="checkbox" />
                    {status}
                  </label>
                ))}
              </div>
            ) : null}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[1100px] border-collapse">
            <thead>
              <tr>
                {["Name", "Meta Account ID", "Status", "Budget", "Last Refreshed", "Notes", ""].map((heading) => (
                  <th className="border-b border-[var(--line)] px-3 py-2 text-left text-xs font-semibold text-[var(--muted)]" key={heading}>
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredAccounts.map((account) => {
                const spendAmount = parseCurrency(account.spend);
                const budgetPercent = Math.min(100, Math.max(8, spendAmount * 5));

                return (
                  <tr key={account.id}>
                    <td className="border-b border-[var(--line)] px-3 py-2 text-sm font-semibold text-[var(--brand-navy)]">{account.name}</td>
                    <td className="border-b border-[var(--line)] px-3 py-2 text-sm">
                      <a className="font-semibold text-[var(--link)] underline-offset-2 hover:underline" href={`#${account.id}`}>
                        {account.id}
                      </a>
                    </td>
                    <td className="border-b border-[var(--line)] px-3 py-2 text-sm">
                      <StatusChip status={account.status} />
                    </td>
                    <td className="border-b border-[var(--line)] px-3 py-2 text-sm text-[var(--brand-navy)]">
                      <span className="block text-xs font-semibold">{account.balance}</span>
                      <div className="mt-1 h-1.5 w-36 overflow-hidden rounded-full bg-[var(--neutral-track)]">
                        <div className={`h-full rounded-full ${budgetPercent > 70 ? "bg-[var(--warning-text)]" : "bg-[var(--danger-text)]"}`} style={{ width: `${budgetPercent}%` }} />
                      </div>
                    </td>
                    <td className="border-b border-[var(--line)] px-3 py-2 text-sm text-[var(--brand-navy)]">{account.lastMetaUpdateAt}</td>
                    <td className="border-b border-[var(--line)] px-3 py-2 text-sm text-[var(--brand-navy)]">{account.notes}</td>
                    <td className="border-b border-[var(--line)] px-3 py-2 text-center text-sm">
                      <div className="flex flex-wrap items-center justify-center gap-2">
                        <button className="inline-flex min-h-8 items-center gap-1.5 rounded-lg border border-[var(--brand-orange)] bg-[var(--brand-orange)] px-2.5 text-xs font-semibold text-[var(--brand-orange-contrast)] transition hover:bg-[var(--brand-orange-hover)]" onClick={() => handleAccountAction(account.name, "view")} type="button">
                          <Eye aria-hidden="true" size={13} strokeWidth={2.1} />
                          View
                        </button>
                        <button className="inline-flex min-h-8 items-center gap-1.5 rounded-lg border border-[var(--brand-orange)] bg-[var(--white)] px-2.5 text-xs font-semibold text-[var(--brand-orange)] transition hover:bg-[var(--brand-orange-soft)]" onClick={() => handleAccountAction(account.name, "top-up")} type="button">
                          <CreditCard aria-hidden="true" size={13} strokeWidth={2.1} />
                          Top Up
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
              {filteredAccounts.length === 0 ? (
                <tr>
                  <td className="px-3 py-8 text-center text-sm text-[var(--muted)]" colSpan={7}>
                    No accounts match your filters.
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
      </section>
    </section>
  );
}
