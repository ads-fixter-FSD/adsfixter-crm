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
import AccountTable from "./AccountTable";
import Pagination from "./Pagination";
import TopUpModal from "./TopUpModal";
import TopUpHistoryModal from "./TopUpHistoryModal";

interface AccountOverviewProps {
  accounts?: AdAccount[];
  topUpHistorySummary: TopUpHistorySummary;
  topUpHistoryEntries?: TopUpHistoryEntry[];
}

export default function AccountOverview({
  accounts = [],
  topUpHistorySummary,
  topUpHistoryEntries = [],
}: AccountOverviewProps) {
  const [filter, setFilter] = useState<FilterKey>("all");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);

  const [topUpAccount, setTopUpAccount] = useState<AdAccount | null>(null);
  const [historyAccount, setHistoryAccount] = useState<AdAccount | null>(null);

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

      const query = search.trim().toLowerCase();
      const matchesSearch =
        query === "" ||
        account.accountName.toLowerCase().includes(query) ||
        account.accountId.includes(query) ||
        account.id.toLowerCase().includes(query);

      return matchesFilter && matchesSearch;
    });
  }, [accounts, filter, search]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const currentPage = Math.min(page, totalPages);
  const paginated = filtered.slice(
    (currentPage - 1) * perPage,
    currentPage * perPage,
  );

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
        />
      </div>

      <div className="mt-5 px-6">
        <AccountTable
          accounts={paginated}
          onTopUp={setTopUpAccount}
          onTopUpHistory={setHistoryAccount}
        />
      </div>

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
