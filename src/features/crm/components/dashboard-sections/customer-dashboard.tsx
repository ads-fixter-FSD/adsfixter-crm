"use client";

import { CalendarDays, ChevronDown, CreditCard, DollarSign, Eye, Plus, Search, TrendingUp, X } from "lucide-react";
import { useMemo, useRef, useState } from "react";
import { PrimaryButton } from "@/components/shared-buttons";
import { StatusChip } from "@/components/ui/status-chip";
import type { DashboardSectionProps } from "@/features/crm/components/dashboard-sections/dashboard-section-types";
import type { MetaAdAccountStatus } from "@/features/crm/types/crm";
import { useClickOutside } from "@/hooks/use-click-outside";

const accountStatusOptions: MetaAdAccountStatus[] = ["ACTIVE", "UNSETTLED", "DISABLED", "PENDING_RISK_REVIEW", "PENDING_SETTLEMENT", "CLOSED", "UNKNOWN"];

const customerMetricCards = [
  { label: "Wallet Balance", value: "$606.04", detail: "Available USD", icon: DollarSign, tone: "bg-[var(--info-bg)] text-[var(--info-text)]" },
  { label: "USD Rate", value: "127.00", detail: "BDT to USD", icon: TrendingUp, tone: "bg-[var(--success-bg)] text-[var(--success-text)]" },
  { label: "Top Up", value: "$379.39", detail: "Jun 01 - Jan 01, 2026", icon: Plus, tone: "bg-[var(--success-bg)] text-[var(--success-text)]" },
  { label: "Remaining", value: "$94.74", detail: "Remove subject", icon: CreditCard, tone: "bg-[var(--warning-bg)] text-[var(--warning-text)]" },
];

type NewAccountFormValues = {
  accountName: string;
  businessManagerId: string;
  timezone: string;
  facebookPage: string;
  email: string;
  monthlyBudget: string;
  startDate: string;
};

export function CustomerDashboard({ data, showToast }: DashboardSectionProps) {
  const statusFilterRef = useRef<HTMLDivElement | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatuses, setSelectedStatuses] = useState<MetaAdAccountStatus[]>(["ACTIVE"]);
  const [isStatusFilterOpen, setIsStatusFilterOpen] = useState(false);
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
  const [newAccountForm, setNewAccountForm] = useState<NewAccountFormValues>({
    accountName: "",
    businessManagerId: "",
    timezone: "BST (Bangladesh Standard Time)",
    facebookPage: "",
    email: "",
    monthlyBudget: "",
    startDate: "",
  });

  const filteredAccounts = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();

    return data.accounts.filter((account) => {
      const matchesSearch = !normalizedQuery || account.name.toLowerCase().includes(normalizedQuery) || account.id.toLowerCase().includes(normalizedQuery);
      const matchesStatus = selectedStatuses.length === 0 || selectedStatuses.includes(account.status);
      return matchesSearch && matchesStatus;
    });
  }, [data.accounts, searchQuery, selectedStatuses]);

  const updateNewAccountFormValue = (field: keyof NewAccountFormValues, value: string) => {
    setNewAccountForm((current) => ({ ...current, [field]: value }));
  };

  const toggleStatus = (status: MetaAdAccountStatus) => {
    setSelectedStatuses((current) => (current.includes(status) ? current.filter((item) => item !== status) : [...current, status]));
  };

  const submitNewAccountRequest = () => {
    if (!newAccountForm.accountName.trim() || !newAccountForm.businessManagerId.trim()) {
      showToast("warning", "Account name and Business Manager ID are required");
      return;
    }

    setIsRequestModalOpen(false);
    setNewAccountForm({
      accountName: "",
      businessManagerId: "",
      timezone: "BST (Bangladesh Standard Time)",
      facebookPage: "",
      email: "",
      monthlyBudget: "",
      startDate: "",
    });
    showToast("success", "New ad account request submitted");
  };

  useClickOutside(statusFilterRef, () => setIsStatusFilterOpen(false));

  const handleAccountAction = (accountName: string, action: "view" | "top-up") => {
    showToast("success", action === "top-up" ? `Top-up started for ${accountName}` : `Opening ${accountName}`);
  };

  return (
    <div className="grid gap-5">
      <p className="m-0 text-sm text-[var(--muted)]">Welcome back, Boostfixter! Manage your ad accounts and requests.</p>

      <section className="grid grid-cols-4 gap-3 max-[1180px]:grid-cols-2 max-[720px]:grid-cols-1">
        {customerMetricCards.map((metric) => {
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
      </section>

      <section className="rounded-xl border-2 border-[var(--line)] bg-[var(--white)] p-5">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <h2 className="m-0 text-lg font-semibold text-[var(--brand-navy)]">Your Ad Accounts</h2>
          <PrimaryButton onClick={() => setIsRequestModalOpen(true)} type="button">
            <Plus aria-hidden="true" size={15} strokeWidth={1.9} />
            Request New Account
          </PrimaryButton>
        </div>

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
                const spendAmount = Number(account.spend.replace(/[^0-9.-]+/g, "")) || 0;
                const budgetPercent = Math.min(100, Math.max(8, spendAmount * 5));
                const isError = account.status !== "ACTIVE";

                return (
                  <tr key={account.id}>
                    <td className="border-b border-[var(--line)] px-3 py-2 text-sm font-semibold text-[var(--brand-navy)]">{account.name}</td>
                    <td className="border-b border-[var(--line)] px-3 py-2 text-sm">
                      <a className="font-semibold text-[var(--link)] underline-offset-2 hover:underline" href={`#${account.id}`}>{account.id}</a>
                    </td>
                    <td className="border-b border-[var(--line)] px-3 py-2 text-sm">
                      <StatusChip status={account.status} />
                    </td>
                    <td className="border-b border-[var(--line)] px-3 py-2 text-sm text-[var(--brand-navy)]">
                      <span className="block text-xs font-semibold">{account.balance}</span>
                      <div className="mt-1 h-1.5 w-36 overflow-hidden rounded-full bg-[var(--neutral-track)]">
                        <div className={`h-full rounded-full ${isError ? "bg-[var(--danger-text)]" : budgetPercent > 70 ? "bg-[var(--warning-text)]" : "bg-[var(--danger-text)]"}`} style={{ width: `${budgetPercent}%` }} />
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

      {isRequestModalOpen ? (
        <div className="fixed inset-0 z-50 grid place-items-center bg-[var(--modal-backdrop)] p-4">
          <div className="w-full max-w-md rounded-xl border border-[var(--line)] bg-[var(--white)] p-5">
            <div className="mb-4 flex items-center justify-between gap-3">
              <h3 className="m-0 flex-1 text-center text-base font-semibold text-[var(--brand-navy)]">New Ad Account</h3>
              <button className="rounded-lg p-1 text-[var(--brand-orange)] hover:bg-[var(--brand-orange-soft)]" onClick={() => setIsRequestModalOpen(false)} type="button">
                <X aria-hidden="true" size={16} strokeWidth={1.9} />
              </button>
            </div>

            <div className="grid gap-3">
              <label className="grid gap-1 text-xs font-semibold text-[var(--brand-navy)]">
                Account Name
                <input className="min-h-9 rounded-lg border border-[var(--line)] bg-[var(--field-bg)] px-3 text-sm font-normal text-[var(--brand-navy)] outline-none focus:border-[var(--brand-orange)]" onChange={(event) => updateNewAccountFormValue("accountName", event.target.value)} placeholder="Enter account name" value={newAccountForm.accountName} />
              </label>
              <label className="grid gap-1 text-xs font-semibold text-[var(--brand-navy)]">
                Business Manager ID
                <input className="min-h-9 rounded-lg border border-[var(--line)] bg-[var(--field-bg)] px-3 text-sm font-normal text-[var(--brand-navy)] outline-none focus:border-[var(--brand-orange)]" onChange={(event) => updateNewAccountFormValue("businessManagerId", event.target.value)} placeholder="Enter BM ID" value={newAccountForm.businessManagerId} />
              </label>
              <label className="grid gap-1 text-xs font-semibold text-[var(--brand-navy)]">
                Timezone
                <select className="min-h-9 rounded-lg border border-[var(--line)] bg-[var(--field-bg)] px-3 text-sm font-normal text-[var(--brand-navy)] outline-none focus:border-[var(--brand-orange)]" onChange={(event) => updateNewAccountFormValue("timezone", event.target.value)} value={newAccountForm.timezone}>
                  <option>BST (Bangladesh Standard Time)</option>
                  <option>UTC</option>
                  <option>EST (Eastern Standard Time)</option>
                </select>
              </label>
              <label className="grid gap-1 text-xs font-semibold text-[var(--brand-navy)]">
                Facebook Page (Optional)
                <input className="min-h-9 rounded-lg border border-[var(--line)] bg-[var(--field-bg)] px-3 text-sm font-normal text-[var(--brand-navy)] outline-none focus:border-[var(--brand-orange)]" onChange={(event) => updateNewAccountFormValue("facebookPage", event.target.value)} placeholder="https://facebook.com/yourpage" value={newAccountForm.facebookPage} />
              </label>
              <label className="grid gap-1 text-xs font-semibold text-[var(--brand-navy)]">
                Email (Optional)
                <input className="min-h-9 rounded-lg border border-[var(--line)] bg-[var(--field-bg)] px-3 text-sm font-normal text-[var(--brand-navy)] outline-none focus:border-[var(--brand-orange)]" onChange={(event) => updateNewAccountFormValue("email", event.target.value)} placeholder="example@email.com" type="email" value={newAccountForm.email} />
              </label>
              <label className="grid gap-1 text-xs font-semibold text-[var(--brand-navy)]">
                Monthly Budget (USD)
                <input className="min-h-9 rounded-lg border border-[var(--line)] bg-[var(--field-bg)] px-3 text-sm font-normal text-[var(--brand-navy)] outline-none focus:border-[var(--brand-orange)]" onChange={(event) => updateNewAccountFormValue("monthlyBudget", event.target.value)} placeholder="100" value={newAccountForm.monthlyBudget} />
              </label>
              <label className="grid gap-1 text-xs font-semibold text-[var(--brand-navy)]">
                Start Date
                <span className="relative">
                  <input className="min-h-9 w-full rounded-lg border border-[var(--line)] bg-[var(--field-bg)] px-3 text-sm font-normal text-[var(--brand-navy)] outline-none focus:border-[var(--brand-orange)]" onChange={(event) => updateNewAccountFormValue("startDate", event.target.value)} placeholder="Pick a date" type="date" value={newAccountForm.startDate} />
                  <CalendarDays aria-hidden="true" className="pointer-events-none absolute right-3 top-2.5 text-[var(--muted)]" size={15} strokeWidth={1.9} />
                </span>
              </label>
              <PrimaryButton className="mt-1 min-h-10" onClick={submitNewAccountRequest} type="button">
                Submit Request
              </PrimaryButton>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
