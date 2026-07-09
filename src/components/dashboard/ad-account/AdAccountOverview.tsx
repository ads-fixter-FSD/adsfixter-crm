"use client";

import { useMemo, useState } from "react";
import type {
  AdAccount,
  TopUpHistoryEntry,
  TopUpHistorySummary,
} from "@/types/account";
import OverviewHeader from "./OverviewHeader";
import FilterTabs, { type FilterKey } from "./FilterTabs";
import SearchFilterBar from "./SearchFilterBar";
import AccountTable, { type SortKey, type SortState } from "./AccountTable";
import Pagination from "./Pagination";
import TopUpModal from "./TopUpModal";
import TopUpHistoryModal from "./TopUpHistoryModal";
import AccountTableSkeleton from "./AccounTableSkeleton";

interface AccountOverviewProps {
  accounts?: AdAccount[];
  topUpHistorySummary: TopUpHistorySummary;
  topUpHistoryEntries?: TopUpHistoryEntry[];
  isLoading?: boolean;
}

export default function AccountOverview({
  accounts = [],
  topUpHistorySummary,
  topUpHistoryEntries = [],
  isLoading = false,
}: AccountOverviewProps) {
  const [filter, setFilter] = useState<FilterKey>("all");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);

  // Filter-dropdown state: platform (meta/google/tiktok) and agency status
  // (Take Off, Starter, Growth, ...). Empty array = no restriction on that field.
  const [platformFilter, setPlatformFilter] = useState<string[]>([]);
  const [agencyStatusFilter, setAgencyStatusFilter] = useState<string[]>([]);

  const [sort, setSort] = useState<SortState>({ key: null, direction: "asc" });

  const [topUpAccount, setTopUpAccount] = useState<AdAccount | null>(null);
  const [historyAccount, setHistoryAccount] = useState<AdAccount | null>(null);

  const platformOptions = useMemo(
    () => Array.from(new Set(accounts.map((a) => a.platform))).sort(),
    [accounts],
  );

  const agencyStatusOptions = useMemo(
    () => Array.from(new Set(accounts.map((a) => a.agencyStatus))).sort(),
    [accounts],
  );

  const counts = useMemo(
    () => ({
      all: accounts.length,
      active: accounts.filter((a) => a.metaStatus === "Active").length,
      inactive: accounts.filter((a) => a.metaStatus !== "Active").length,
    }),
    [accounts],
  );

  const filtered = useMemo(() => {
    return accounts.filter((account) => {
      const matchesFilter =
        filter === "all" ||
        (filter === "active" && account.metaStatus === "Active") ||
        (filter === "inactive" && account.metaStatus !== "Active");

      const matchesPlatform =
        platformFilter.length === 0 ||
        platformFilter.includes(account.platform);

      const matchesAgencyStatus =
        agencyStatusFilter.length === 0 ||
        agencyStatusFilter.includes(account.agencyStatus);

      const query = search.trim().toLowerCase();
      const matchesSearch =
        query === "" ||
        account.accountName.toLowerCase().includes(query) ||
        account.accountId.includes(query) ||
        account.id.toLowerCase().includes(query);

      return (
        matchesFilter && matchesPlatform && matchesAgencyStatus && matchesSearch
      );
    });
  }, [accounts, filter, platformFilter, agencyStatusFilter, search]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const currentPage = Math.min(page, totalPages);

  // Pulls the raw comparable value for a given sort key off an account.
  function getSortValue(account: AdAccount, key: SortKey): string | number {
    switch (key) {
      case "id":
        return account.id;
      case "accountName":
        return account.accountName.toLowerCase();
      case "creditBalance":
        return account.creditBalance;
      case "spendThisMonth":
        return account.spendThisMonth;
      case "metaStatus":
        return account.metaStatus;
      case "agencyStatus":
        return account.agencyStatus;
      case "lastTopUpDate": {
        const parsed = Date.parse(account.lastTopUpDate);
        return Number.isNaN(parsed) ? 0 : parsed;
      }
      case "updatedLabel":
        return account.updatedLabel;
      default:
        return "";
    }
  }

  const sorted = useMemo(() => {
    if (!sort.key) return filtered;
    const key = sort.key;
    const direction = sort.direction === "asc" ? 1 : -1;

    return [...filtered].sort((a, b) => {
      const valueA = getSortValue(a, key);
      const valueB = getSortValue(b, key);

      if (typeof valueA === "number" && typeof valueB === "number") {
        return (valueA - valueB) * direction;
      }
      return String(valueA).localeCompare(String(valueB)) * direction;
    });
  }, [filtered, sort]);

  const paginated = sorted.slice(
    (currentPage - 1) * perPage,
    currentPage * perPage,
  );

  function handleSortChange(key: SortKey) {
    setSort((prev) => {
      if (prev.key !== key) return { key, direction: "asc" };
      return { key, direction: prev.direction === "asc" ? "desc" : "asc" };
    });
  }

  return (
    <div className="rounded-xl border border-[var(--color-line)] bg-white ">
      <OverviewHeader />

      <div className="mt-6 border-t border-[var(--color-line)]" />

      <div className="mt-6 px-6 flex flex-wrap items-center justify-between gap-3">
        <FilterTabs
          active={filter}
          counts={counts}
          onChange={(key) => {
            setFilter(key);
            setPage(1);
          }}
        />
        <SearchFilterBar
          value={search}
          onChange={(value) => {
            setSearch(value);
            setPage(1);
          }}
          platformOptions={platformOptions}
          selectedPlatforms={platformFilter}
          onPlatformsChange={(platforms) => {
            setPlatformFilter(platforms);
            setPage(1);
          }}
          statusOptions={agencyStatusOptions}
          selectedStatuses={agencyStatusFilter}
          onStatusesChange={(statuses) => {
            setAgencyStatusFilter(statuses);
            setPage(1);
          }}
        />
      </div>

      <div className="mt-5 px-6">
        {isLoading ? (
          <AccountTableSkeleton />
        ) : (
          <AccountTable
            accounts={paginated}
            sort={sort}
            onSortChange={handleSortChange}
            onTopUp={setTopUpAccount}
            onTopUpHistory={setHistoryAccount}
          />
        )}
      </div>

      {!isLoading && (
        <Pagination
          page={currentPage}
          totalPages={totalPages}
          perPage={perPage}
          onPageChange={setPage}
          onPerPageChange={(value) => {
            setPerPage(value);
            setPage(1);
          }}
        />
      )}

      {topUpAccount && (
        <TopUpModal
          account={topUpAccount}
          onClose={() => setTopUpAccount(null)}
          onConfirm={() => {
            // Wire this up to your top-up API call.
            setTopUpAccount(null);
          }}
        />
      )}

      {historyAccount && (
        <TopUpHistoryModal
          account={historyAccount}
          summary={topUpHistorySummary}
          entries={topUpHistoryEntries}
          onClose={() => setHistoryAccount(null)}
        />
      )}
    </div>
  );
}
