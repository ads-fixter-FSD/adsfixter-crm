"use client";

import { Download, MoreVertical, Plus, RefreshCw, SlidersHorizontal } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { AccountTable, type AccountColumnKey } from "@/features/crm/ad-accounts/components/ad-accounts-database/account-table";
import type { DashboardSectionWithNavigationProps } from "@/features/crm/components/dashboard-sections/dashboard-section-types";
import type { MetaAdAccountStatus } from "@/features/crm/types/crm";

const metaAdAccountStatuses: MetaAdAccountStatus[] = ["ACTIVE", "UNSETTLED", "DISABLED", "PENDING_RISK_REVIEW", "PENDING_SETTLEMENT", "CLOSED", "UNKNOWN"];

const accountColumnOptions: { key: AccountColumnKey; label: string }[] = [
  { key: "name", label: "Name" },
  { key: "spendInfo", label: "Spend Info" },
  { key: "metaStatus", label: "Meta Status" },
  { key: "balance", label: "Balance" },
  { key: "todaySpend", label: "Today Spend" },
  { key: "yesterdaySpend", label: "Yesterday Spend" },
  { key: "cardName", label: "Card Name" },
  { key: "client", label: "Client" },
  { key: "lastMetaUpdateAt", label: "Last Meta Update At" },
  { key: "notes", label: "Notes" },
];

const defaultVisibleAccountColumns = accountColumnOptions.map((column) => column.key);

export function AdAccountsDatabaseSection({ data, showToast, onSectionChange }: DashboardSectionWithNavigationProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<MetaAdAccountStatus | "">("");
  const [visibleColumns, setVisibleColumns] = useState<AccountColumnKey[]>(defaultVisibleAccountColumns);
  const [viewMenuOpen, setViewMenuOpen] = useState(false);
  const [actionMenuOpen, setActionMenuOpen] = useState(false);
  const [autoRefreshEnabled, setAutoRefreshEnabled] = useState(false);
  const showToastRef = useRef(showToast);

  const filteredAccounts = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();

    return data.accounts.filter((account) => {
      const matchesSearch = !normalizedQuery || account.name.toLowerCase().includes(normalizedQuery) || account.id.toLowerCase().includes(normalizedQuery);
      const matchesStatus = !selectedStatus || account.status === selectedStatus;

      return matchesSearch && matchesStatus;
    });
  }, [data.accounts, searchQuery, selectedStatus]);

  const clearAdAccountFilters = () => {
    setSearchQuery("");
    setSelectedStatus("");
    showToast("warning", "Ad account filters cleared");
  };

  const updateAllAdAccountsFromMeta = () => {
    showToast("success", "Meta account refresh completed");
  };

  const openPrintableAdAccountExport = () => {
    showToast("success", "Opening print dialog for ad account PDF export");
    window.setTimeout(() => window.print(), 120);
  };

  const toggleVisibleAdAccountColumn = (columnKey: AccountColumnKey) => {
    setVisibleColumns((current) => {
      if (current.includes(columnKey)) {
        return current.length === 1 ? current : current.filter((column) => column !== columnKey);
      }

      return [...current, columnKey];
    });
  };

  useEffect(() => {
    showToastRef.current = showToast;
  }, [showToast]);

  useEffect(() => {
    if (!autoRefreshEnabled) return;

    const intervalId = window.setInterval(() => {
      showToastRef.current("warning", "Auto refresh checked Meta for new ad accounts");
    }, 30000);

    return () => window.clearInterval(intervalId);
  }, [autoRefreshEnabled]);

  return (
    <div className="grid grid-cols-12 gap-3">
      <section className="col-span-12 w-full overflow-visible rounded-xl border border-[var(--line)] bg-[var(--white)] p-3">
        <div className="-mx-3 -mt-3 mb-3 flex items-center justify-between gap-3 border-b border-[var(--line)] px-3 py-2 max-[720px]:flex-col max-[720px]:items-start">
          <h2 className="m-0 text-base font-semibold text-[var(--brand-navy)]">Ad Accounts (Database)</h2>
          <div className="flex flex-wrap items-center gap-2 max-[720px]:w-full">
            <button className="inline-flex min-h-8 items-center gap-2 rounded-lg border border-[var(--line)] bg-[var(--white)] px-3 py-2 text-sm font-semibold leading-tight text-[var(--brand-navy)] transition hover:bg-[var(--surface)] max-[720px]:flex-1 max-[720px]:justify-center" onClick={updateAllAdAccountsFromMeta} type="button">
              <RefreshCw aria-hidden="true" size={15} strokeWidth={1.8} />
              Update All From Meta
            </button>
            <div className="relative">
              <button aria-label="More ad account actions" className="inline-flex min-h-8 w-8 items-center justify-center gap-1.5 rounded-lg border border-[var(--line)] bg-[var(--white)] px-0 text-[var(--brand-navy)] hover:bg-[var(--surface)]" onClick={() => setActionMenuOpen((current) => !current)} type="button">
                <MoreVertical aria-hidden="true" size={16} strokeWidth={1.9} />
              </button>
              {actionMenuOpen ? (
                <div className="absolute right-0 top-[calc(100%+0.35rem)] z-20 grid min-w-56 gap-0.5 rounded-xl border border-[var(--line)] bg-[var(--white)] p-1.5 shadow-xl">
                  <button className="flex min-h-8 w-full items-center gap-2 rounded-lg border-0 bg-transparent px-2 py-1.5 text-left text-sm text-[var(--brand-navy)] hover:bg-[var(--surface)]" onClick={() => showToast("warning", "Auto-add from Meta queued")} type="button">
                    <RefreshCw aria-hidden="true" size={15} strokeWidth={1.8} />
                    Auto-Add From Meta
                  </button>
                  <button
                    className="flex min-h-8 w-full items-center gap-2 rounded-lg border-0 bg-transparent px-2 py-1.5 text-left text-sm text-[var(--brand-navy)] hover:bg-[var(--surface)]"
                    onClick={() => {
                      setAutoRefreshEnabled((current) => !current);
                      showToast("success", autoRefreshEnabled ? "Auto refresh disabled" : "Auto refresh enabled");
                    }}
                    type="button"
                  >
                    <RefreshCw aria-hidden="true" size={15} strokeWidth={1.8} />
                    {autoRefreshEnabled ? "Auto Refresh On" : "Auto Refresh Off"}
                  </button>
                  <button className="flex min-h-8 w-full items-center gap-2 rounded-lg border-0 bg-transparent px-2 py-1.5 text-left text-sm text-[var(--brand-navy)] hover:bg-[var(--surface)]" onClick={() => onSectionChange?.("Create New Account")} type="button">
                    <Plus aria-hidden="true" size={15} strokeWidth={1.8} />
                    New Ad Account
                  </button>
                </div>
              ) : null}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between gap-3 max-[720px]:flex-col max-[720px]:items-start">
          <div className="mb-2 grid grid-cols-[280px_180px] gap-2 max-[720px]:grid-cols-1">
            <label className="grid gap-1">
              <span className="text-xs font-semibold text-[var(--muted)]">Search</span>
              <input className="min-h-9 w-full rounded-lg border border-[var(--line)] bg-[var(--white)] px-3 py-2 text-sm text-[var(--brand-navy)] outline-none focus:border-[var(--brand-navy)]" onChange={(event) => setSearchQuery(event.target.value)} placeholder="Search account or ID" type="search" value={searchQuery} />
            </label>

            <label className="grid gap-1">
              <span className="text-xs font-semibold text-[var(--muted)]">Status</span>
              <select className="min-h-9 w-full rounded-lg border border-[var(--line)] bg-[var(--white)] px-3 py-2 text-sm text-[var(--brand-navy)] outline-none focus:border-[var(--brand-navy)]" onChange={(event) => setSelectedStatus(event.target.value as MetaAdAccountStatus | "")} value={selectedStatus}>
                <option value="">All statuses</option>
                {metaAdAccountStatuses.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="flex flex-wrap items-center gap-2 max-[720px]:w-full">
            <button className="inline-flex min-h-8 items-center gap-2 rounded-lg border border-[var(--line)] bg-[var(--white)] px-3 py-2 text-sm font-semibold leading-tight text-[var(--brand-navy)] transition hover:bg-[var(--surface)] max-[720px]:flex-1 max-[720px]:justify-center" onClick={openPrintableAdAccountExport} type="button">
              <Download aria-hidden="true" size={15} strokeWidth={1.8} />
              Export
            </button>
            <div className="relative">
              <button className="inline-flex min-h-8 items-center gap-2 rounded-lg border border-[var(--line)] bg-[var(--white)] px-3 py-2 text-sm font-semibold leading-tight text-[var(--brand-navy)] transition hover:bg-[var(--surface)] max-[720px]:flex-1 max-[720px]:justify-center" onClick={() => setViewMenuOpen((current) => !current)} type="button">
                <SlidersHorizontal aria-hidden="true" size={15} strokeWidth={1.8} />
                View
              </button>
              {viewMenuOpen ? (
                <div className="absolute left-0 top-[calc(100%+0.35rem)] z-20 grid min-w-56 gap-0.5 rounded-xl border border-[var(--line)] bg-[var(--white)] p-1.5 shadow-xl">
                  {accountColumnOptions.map((column) => (
                    <button className="flex min-h-8 w-full items-center gap-2 rounded-lg border-0 bg-transparent px-2 py-1.5 text-left text-sm text-[var(--brand-navy)] hover:bg-[var(--surface)]" key={column.key} onClick={() => toggleVisibleAdAccountColumn(column.key)} type="button">
                      <span className="inline-block w-5 shrink-0 text-xs font-bold uppercase text-[var(--brand-navy)]">{visibleColumns.includes(column.key) ? "on" : ""}</span>
                      {column.label}
                    </button>
                  ))}
                </div>
              ) : null}
            </div>
          </div>
        </div>

        <p className="my-2 flex items-center gap-2 text-xs font-semibold text-[var(--muted)]">
          Showing {filteredAccounts.length} of {data.accounts.length} ad accounts
          {autoRefreshEnabled ? " • Auto refresh on" : ""}
          <button className="border-0 bg-transparent p-0 text-xs font-bold text-[var(--brand-navy)]" onClick={clearAdAccountFilters} type="button">
            Clear filters
          </button>
        </p>

        <AccountTable accounts={filteredAccounts} visibleColumns={visibleColumns} />
      </section>
    </div>
  );
}
