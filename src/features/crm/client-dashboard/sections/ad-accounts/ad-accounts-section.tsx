"use client";

import { useMemo, useState } from "react";
import { AdAccountsStats } from "@/features/crm/client-dashboard/sections/ad-accounts/components/ad-accounts-stats";
import { AdAccountsTable } from "@/features/crm/client-dashboard/sections/ad-accounts/components/ad-accounts-table";
import { AdAccountsToolbar } from "@/features/crm/client-dashboard/sections/ad-accounts/components/ad-accounts-toolbar";
import type { CrmOverview, MetaAdAccountStatus, ToastType } from "@/features/crm/types/crm";

type AdAccountsSectionProps = {
  data: CrmOverview;
  showToast: (type: ToastType, message: string) => void;
};

function parseCurrency(value: string) {
  const numericValue = Number(value.replace(/[^0-9.-]+/g, ""));
  return Number.isFinite(numericValue) ? numericValue : 0;
}

export function AdAccountsSection({ data, showToast }: AdAccountsSectionProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatuses, setSelectedStatuses] = useState<MetaAdAccountStatus[]>([]);

  const filteredAccounts = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();

    return data.accounts.filter((account) => {
      const matchesSearch =
        !normalizedQuery || account.name.toLowerCase().includes(normalizedQuery) || account.id.toLowerCase().includes(normalizedQuery);
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

  const handleAccountAction = (accountName: string, action: "view" | "top-up") => {
    showToast("success", action === "top-up" ? `Top-up started for ${accountName}` : `Opening ${accountName}`);
  };

  return (
    <section className="grid gap-5">
      <div>
        <h2 className="m-0 text-xl font-semibold text-[var(--brand-navy)]">Your Ad Accounts</h2>
      </div>

      <AdAccountsStats
        activeAccounts={activeAccounts}
        remainingBudget={remainingBudget}
        totalAccounts={data.accounts.length}
        totalAdSpend={totalAdSpend}
      />

      <section className="rounded-xl border-2 border-[var(--line)] bg-[var(--white)] p-5">
        <AdAccountsToolbar
          onClearStatuses={() => setSelectedStatuses([])}
          onSearchChange={setSearchQuery}
          onToggleStatus={toggleStatus}
          searchQuery={searchQuery}
          selectedStatuses={selectedStatuses}
        />
        <AdAccountsTable accounts={filteredAccounts} onAccountAction={handleAccountAction} />
      </section>
    </section>
  );
}

export { AdAccountsSection as ClientAdAccountsSection };
