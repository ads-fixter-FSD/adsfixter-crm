"use client";

import { CalendarDays, Download, MoreVertical, Plus, RefreshCw, Search, SlidersHorizontal } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { AccountTable, type AccountColumnKey } from "@/features/crm/ad-accounts/components/ad-accounts-database/account-table";
import type { DashboardSectionWithNavigationProps } from "@/features/crm/components/dashboard-sections/dashboard-section-types";
import type { MetaAdAccountStatus } from "@/features/crm/types/crm";
import { useClickOutside } from "@/hooks/use-click-outside";

const metaAdAccountStatuses: MetaAdAccountStatus[] = ["ACTIVE", "UNSETTLED", "DISABLED", "PENDING_RISK_REVIEW", "PENDING_SETTLEMENT", "CLOSED", "UNKNOWN"];

function formatStatusButtonLabel(status: MetaAdAccountStatus) {
  return status.toLowerCase();
}

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
const rowsPerPageOptions = [5, 6, 7, 10];

export function AdAccountsDatabaseSection({ data, dateFilterControl, dateRangeLabel, showToast, onSectionChange }: DashboardSectionWithNavigationProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<MetaAdAccountStatus | "">("");
  const [visibleColumns, setVisibleColumns] = useState<AccountColumnKey[]>(defaultVisibleAccountColumns);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMenuOpen, setViewMenuOpen] = useState(false);
  const [actionMenuOpen, setActionMenuOpen] = useState(false);
  const [autoRefreshEnabled, setAutoRefreshEnabled] = useState(false);
  const showToastRef = useRef(showToast);
  const actionMenuRef = useRef<HTMLDivElement | null>(null);
  const viewMenuRef = useRef<HTMLDivElement | null>(null);

  const filteredAccounts = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();

    return data.accounts.filter((account) => {
      const matchesSearch = !normalizedQuery || account.name.toLowerCase().includes(normalizedQuery) || account.id.toLowerCase().includes(normalizedQuery);
      const matchesStatus = !selectedStatus || account.status === selectedStatus;

      return matchesSearch && matchesStatus;
    });
  }, [data.accounts, searchQuery, selectedStatus]);

  const totalPages = Math.max(1, Math.ceil(filteredAccounts.length / rowsPerPage));
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const pageStartIndex = (safeCurrentPage - 1) * rowsPerPage;
  const paginatedAccounts = filteredAccounts.slice(pageStartIndex, pageStartIndex + rowsPerPage);
  const shouldShowPagination = filteredAccounts.length > 10;

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

  useClickOutside(actionMenuRef, () => setActionMenuOpen(false));
  useClickOutside(viewMenuRef, () => setViewMenuOpen(false));

  return (
    <div className="grid grid-cols-12 gap-5">
      <section className="col-span-12 w-full overflow-visible rounded-xl border-2 border-[var(--line)] bg-[var(--white)] p-5">
        <div className="flex items-center justify-between gap-3 max-[720px]:flex-col max-[720px]:items-start">
          <div>
            <h2 className="m-0 text-xl font-semibold text-[var(--brand-navy)]">Ad Accounts</h2>
            <p className="mt-1 text-sm text-[var(--muted)]">Manage ad account sync, Meta refresh, and account actions.</p>
          </div>
          <div className="flex flex-wrap items-center gap-2 max-[720px]:w-full">
            {dateFilterControl ?? (
              <button className="inline-flex min-h-9 items-center gap-2 rounded-lg bg-[var(--toolbar-button-bg)] px-3 text-sm font-light text-[var(--toolbar-button-text)] transition hover:bg-[var(--toolbar-button-hover)] max-[720px]:flex-1 max-[720px]:justify-center" type="button">
                <CalendarDays aria-hidden="true" size={15} strokeWidth={1.9} />
                {dateRangeLabel ?? "Current Date Range"}
              </button>
            )}
            <button className="inline-flex min-h-9 items-center gap-2 rounded-lg bg-[var(--toolbar-button-bg)] px-3 py-2 text-sm font-light leading-tight text-[var(--toolbar-button-text)] transition hover:bg-[var(--toolbar-button-hover)] max-[720px]:flex-1 max-[720px]:justify-center" onClick={updateAllAdAccountsFromMeta} type="button">
              <RefreshCw aria-hidden="true" size={15} strokeWidth={1.8} />
              Update All From Meta
            </button>
            <div className="relative" ref={actionMenuRef}>
              <button aria-label="More ad account actions" className="inline-flex min-h-9 w-9 items-center justify-center gap-1.5 rounded-lg bg-[var(--toolbar-button-bg)] px-0 text-[var(--toolbar-button-text)] hover:bg-[var(--toolbar-button-hover)]" onClick={() => setActionMenuOpen((current) => !current)} type="button">
                <MoreVertical aria-hidden="true" size={16} strokeWidth={1.9} />
              </button>
              <div
                className={`absolute right-0 top-[calc(100%+0.35rem)] z-20 grid min-w-56 origin-top-right gap-0.5 rounded-xl border border-[var(--line)] bg-[var(--white)] p-1.5 transition-all duration-200 ease-out ${
                  actionMenuOpen ? "pointer-events-auto translate-y-0 scale-100 opacity-100" : "pointer-events-none -translate-y-2 scale-95 opacity-0"
                }`}
              >
                  <button className="flex min-h-8 w-full items-center gap-2 rounded-lg border-0 bg-transparent px-2 py-1.5 text-left text-xs font-light text-[var(--brand-navy)] transition hover:bg-[var(--toolbar-button-bg)] hover:text-[var(--toolbar-button-text)]" onClick={() => showToast("warning", "Auto-add from Meta queued")} type="button">
                    <RefreshCw aria-hidden="true" size={15} strokeWidth={1.8} />
                    Auto-Add From Meta
                  </button>
                  <button
                    className="flex min-h-8 w-full items-center gap-2 rounded-lg border-0 bg-transparent px-2 py-1.5 text-left text-xs font-light text-[var(--brand-navy)] transition hover:bg-[var(--toolbar-button-bg)] hover:text-[var(--toolbar-button-text)]"
                    onClick={() => {
                      setAutoRefreshEnabled((current) => !current);
                      showToast("success", autoRefreshEnabled ? "Auto refresh disabled" : "Auto refresh enabled");
                    }}
                    type="button"
                  >
                    <RefreshCw aria-hidden="true" size={15} strokeWidth={1.8} />
                    {autoRefreshEnabled ? "Auto Refresh On" : "Auto Refresh Off"}
                  </button>
                  <button className="flex min-h-8 w-full items-center gap-2 rounded-lg border-0 bg-transparent px-2 py-1.5 text-left text-xs font-light text-[var(--brand-navy)] transition hover:bg-[var(--toolbar-button-bg)] hover:text-[var(--toolbar-button-text)]" onClick={() => onSectionChange?.("Create New Account")} type="button">
                    <Plus aria-hidden="true" size={15} strokeWidth={1.8} />
                    New Ad Account
                  </button>
                </div>
            </div>
          </div>
        </div>
      </section>

      <section className="col-span-12 w-full overflow-hidden rounded-xl border-2 border-[var(--line)] bg-[var(--white)]">
        <div className="flex items-center justify-between gap-3 border-b border-[var(--line)] px-5 py-4 max-[1180px]:flex-col max-[1180px]:items-start">
          <h3 className="m-0 text-[16px] font-semibold font-light text-[var(--brand-navy)]">Ad Account List</h3>

          <div className="flex flex-wrap items-center justify-end gap-2 max-[1180px]:w-full max-[1180px]:justify-start">
            <label className="flex min-h-8 w-72 items-center gap-2 rounded-lg border border-[var(--line)] bg-[var(--white)] px-3 text-[var(--muted)] max-[720px]:w-full">
              <Search aria-hidden="true" size={15} strokeWidth={1.8} />
              <input
                className="min-w-0 flex-1 bg-transparent text-xs text-[var(--brand-navy)] outline-none placeholder:text-[var(--muted)]"
                onChange={(event) => {
                  setSearchQuery(event.target.value);
                  setCurrentPage(1);
                }}
                placeholder="Search account or ID"
                type="search"
                value={searchQuery}
              />
            </label>
            <button className="inline-flex min-h-8 items-center gap-2 rounded-lg border border-[var(--brand-orange)] bg-[var(--brand-orange)] px-3 py-1.5 text-xs font-light leading-tight text-[var(--brand-orange-contrast)] transition hover:border-[var(--brand-orange-hover)] hover:bg-[var(--brand-orange-hover)] max-[720px]:flex-1 max-[720px]:justify-center" onClick={openPrintableAdAccountExport} type="button">
              <Download aria-hidden="true" size={15} strokeWidth={1.8} />
              Export
            </button>
            <div className="relative" ref={viewMenuRef}>
              <button className="inline-flex min-h-8 items-center gap-2 rounded-lg border border-[var(--brand-orange)] bg-[var(--brand-orange)] px-3 py-1.5 text-xs font-light leading-tight text-[var(--brand-orange-contrast)] transition hover:border-[var(--brand-orange-hover)] hover:bg-[var(--brand-orange-hover)] max-[720px]:flex-1 max-[720px]:justify-center" onClick={() => setViewMenuOpen((current) => !current)} type="button">
                <SlidersHorizontal aria-hidden="true" size={15} strokeWidth={1.8} />
                View
              </button>
              <div
                className={`absolute right-0 top-[calc(100%+0.35rem)] z-20 grid min-w-56 origin-top-right gap-0.5 rounded-xl border border-[var(--line)] bg-[var(--white)] p-1.5 transition-all duration-200 ease-out ${
                  viewMenuOpen ? "pointer-events-auto translate-y-0 scale-100 opacity-100" : "pointer-events-none -translate-y-2 scale-95 opacity-0"
                }`}
              >
                  {accountColumnOptions.map((column) => (
                    <button className="flex min-h-8 w-full items-center gap-2 rounded-lg border-0 bg-transparent px-2 py-1.5 text-left text-xs font-light text-[var(--brand-navy)] transition hover:bg-[var(--toolbar-button-bg)] hover:text-[var(--toolbar-button-text)]" key={column.key} onClick={() => toggleVisibleAdAccountColumn(column.key)} type="button">
                      <span className="inline-flex w-6 shrink-0 justify-center rounded bg-[var(--toolbar-button-bg)] px-1 text-[0.6rem] font-light uppercase text-[var(--toolbar-button-text)]">{visibleColumns.includes(column.key) ? "on" : ""}</span>
                      {column.label}
                    </button>
                  ))}
                </div>
            </div>
          </div>
        </div>

        <div className="grid gap-2 px-5 pt-4">
  <p className="m-0 text-[16px] font-semibold text-[var(--brand-navy)]">Quick select</p>
  <div className="flex flex-wrap items-center gap-2">
    <button
      className={` py-1 rounded-lg border px-2.5 text-[12px] font-semibold transition ${
        selectedStatus === "" ? "border-[var(--brand-navy)] bg-[var(--brand-navy)] text-[var(--white)]" : "border-[var(--line)] bg-[var(--white)] text-[var(--brand-navy)] hover:border-[var(--brand-navy)]"
      }`}
      onClick={() => {
        setSelectedStatus("");
        setCurrentPage(1);
      }}
      type="button"
    >
      all ({data.accounts.length})
    </button>
    {metaAdAccountStatuses.map((status) => {
      const statusCount = data.accounts.filter((account) => account.status === status).length;

      return (
        <button
          className={ ` py-1 rounded-lg border px-2.5 text-[12px] font-semibold transition ${
            selectedStatus === status ? "border-[var(--brand-navy)] bg-[var(--brand-navy)] text-[var(--white)]" : "border-[var(--line)] bg-[var(--white)] text-[var(--brand-navy)] hover:border-[var(--brand-navy)]"
          }`}
          key={status}
          onClick={() => {
            setSelectedStatus(status);
            setCurrentPage(1);
          }}
          type="button"
        >
                  {formatStatusButtonLabel(status)} ({statusCount})
        </button>
      );
    })}
  </div>
  <div className="-mx-5 mt-2 border-b border-[var(--line)]" />
</div>
        <div>
          <AccountTable accounts={shouldShowPagination ? paginatedAccounts : filteredAccounts} visibleColumns={visibleColumns} />
        </div>
        {shouldShowPagination ? (
          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[var(--line)] px-5 py-3">
            <label className="flex items-center gap-2 text-[10px] font-light text-[var(--muted)]">
              Per page
              <select
                className="min-h-8 rounded-lg border border-[var(--line)] bg-[var(--white)] px-2 text-[10px] text-[var(--brand-navy)] outline-none focus:border-[var(--brand-navy)]"
                onChange={(event) => {
                  setRowsPerPage(Number(event.target.value));
                  setCurrentPage(1);
                }}
                value={rowsPerPage}
              >
                {rowsPerPageOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>

            <div className="flex items-center gap-3 text-[10px] font-light text-[var(--muted)]">
              <button className="text-[var(--muted)] transition hover:text-[var(--brand-navy)] disabled:opacity-40" disabled={safeCurrentPage === 1} onClick={() => setCurrentPage((page) => Math.max(1, page - 1))} type="button">
                Previous
              </button>
              <span className="text-[var(--brand-navy)]">
                Page {safeCurrentPage} of {totalPages}
              </span>
              <button className="text-[var(--brand-navy)] transition hover:text-[var(--brand-orange)] disabled:opacity-40" disabled={safeCurrentPage === totalPages} onClick={() => setCurrentPage((page) => Math.min(totalPages, page + 1))} type="button">
                Next
              </button>
            </div>
          </div>
        ) : null}
      </section>
    </div>
  );
}
