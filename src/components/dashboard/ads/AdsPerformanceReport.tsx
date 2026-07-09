"use client";

import { useMemo, useState } from "react";
import type {
  AdAccountOption,
  AdPerformanceRow,
  GrowthTrendPoint,
  PerformanceStat,
} from "@/types/adsPerformance";

import StatsRow from "./StatsRow";
import GrowthTrendsChart from "./GrowthTrendsChart";
import AdPerformanceTabs, { type AdFilterKey } from "./AdPerformanceTabs";
import AdPerformanceTable, {
  type AdSortKey,
  type AdSortState,
} from "./AdPerformanceTable";
import Pagination from "../ad-account/Pagination";
import AdPerformanceSearchBar, {
  type FilterState,
} from "./AdPerformanceSearchBar";
import AdAccountSelector from "./AdAccountSelector";
import AdViewDetailsModal from "./AdViewDetailsModal";
import AdEditModal from "./AdEditModal";
import type { AdRowAction } from "./AdPerformanceTableRow";

// --- Mock data — replace with real API data when wiring this up. ---

const ACCOUNTS: AdAccountOption[] = [
  {
    id: "ADF1001",
    name: "ADF1001-UrbanCart Fashion",
    accountId: "91827364518273",
  },
  { id: "ADF1002", name: "ADF1002-Nexoria Store", accountId: "56291836417215" },
  { id: "ADF1003", name: "ADF1003-BoostFixter", accountId: "78234190183475" },
  { id: "ADF1004", name: "ADF1004-DesignFixter", accountId: "23894650123746" },
];

const STATS: PerformanceStat[] = [
  {
    key: "ads",
    label: "Total Ads Running",
    value: "32",
    description: "Ads currently live",
  },
  {
    key: "ctr",
    label: "Average CTR",
    value: "2.8%",
    description: "Average click-through rate",
  },
  {
    key: "reach",
    label: "Total Reach",
    value: "10K",
    description: "Unique people reached",
  },
  {
    key: "spend",
    label: "Total Spend",
    value: "$190.00",
    description: "Across selected period",
  },
];

const GROWTH_DATA: GrowthTrendPoint[] = [
  { week: "Week-1", reach: 1000, ctr: 1.0, dateRangeLabel: "June 05-12, 2025" },
  { week: "Week-2", reach: 1400, ctr: 1.4, dateRangeLabel: "June 12-19, 2025" },
  { week: "Week-3", reach: 1800, ctr: 1.6, dateRangeLabel: "June 19-26, 2025" },
  {
    week: "Week-4",
    reach: 2400,
    ctr: 2.0,
    dateRangeLabel: "June 26-July 03, 2025",
  },
  { week: "Week-5", reach: 5000, ctr: 3.0, dateRangeLabel: "July 03-10, 2025" },
  { week: "Week-6", reach: 4200, ctr: 2.6, dateRangeLabel: "July 10-17, 2025" },
  { week: "Week-7", reach: 5600, ctr: 3.5, dateRangeLabel: "July 17-24, 2025" },
];

const INITIAL_AD_ROWS: AdPerformanceRow[] = [
  {
    id: "1",
    campaignName: "Summer Sale Retargeting",
    campaignId: "91827364518273",
    adName: "Summer sale - UGC v-1",
    adId: "91827364518273",
    thumbnailColor: "#B91C1C",
    spend: 22.0,
    ctr: 3.5,
    cpm: 4.45,
    reach: 200,
    reachLabel: "200",
    results: "14 Message",
    isTopPerforming: true,
    status: "active",
  },
  {
    id: "2",
    campaignName: "New Customer Acquisition",
    campaignId: "91827364518273",
    adName: "Carosel - Bestsellers",
    adId: "56291836417215",
    thumbnailColor: "#C2410C",
    spend: 22.0,
    ctr: 2.5,
    cpm: 2.0,
    reach: 5000,
    reachLabel: "5K",
    results: "9 purchase",
    isTopPerforming: true,
    status: "active",
  },
  {
    id: "3",
    campaignName: "Brand Awareness",
    campaignId: "91827364518273",
    adName: "Brand Video - 15s",
    adId: "78234190183475",
    thumbnailColor: "#0F766E",
    spend: 22.0,
    ctr: 0.5,
    cpm: 2.2,
    reach: 1000,
    reachLabel: "1k",
    results: "--",
    isTopPerforming: false,
    status: "active",
  },
  {
    id: "4",
    campaignName: "Skincare Prospecting",
    campaignId: "91827364518273",
    adName: "Prospecting - Static V2",
    adId: "23894650123746",
    thumbnailColor: "#1E293B",
    spend: 22.0,
    ctr: 1.5,
    cpm: 4.45,
    reach: 1500,
    reachLabel: "1.5k",
    results: "--",
    isTopPerforming: false,
    status: "active",
  },
  {
    id: "5",
    campaignName: "Summer Sale - UGC v-1",
    campaignId: "91827364518273",
    adName: "Carosel - Bestsellers",
    adId: "23894650123746",
    thumbnailColor: "#7C2D12",
    spend: 22.0,
    ctr: 2.0,
    cpm: 9.45,
    reach: 2900,
    reachLabel: "2.9k",
    results: "32 purchase",
    isTopPerforming: true,
    status: "active",
  },
  {
    id: "6",
    campaignName: "Summer Sale - UGC v-1",
    campaignId: "91827364518273",
    adName: "Summer sale - UGC v-1",
    adId: "23894650123746",
    thumbnailColor: "#365314",
    spend: 22.0,
    ctr: 3.0,
    cpm: 2.45,
    reach: 3200,
    reachLabel: "3.2k",
    results: "7 purchase",
    isTopPerforming: true,
    status: "active",
  },
  {
    id: "7",
    campaignName: "Summer Sale - UGC v-1",
    campaignId: "91827364518273",
    adName: "Summer sale - UGC v-1",
    adId: "23894650123746",
    thumbnailColor: "#78350F",
    spend: 22.0,
    ctr: 1.0,
    cpm: 7.45,
    reach: 900,
    reachLabel: "900",
    results: "7 purchase",
    isTopPerforming: false,
    status: "active",
  },
];

const DEFAULT_FILTERS: FilterState = {
  status: "all",
  performance: "all",
  ctrMin: "",
};

export default function AdsPerformanceReport() {
  const [selectedAccountIds, setSelectedAccountIds] = useState<string[]>([
    ACCOUNTS[0].id,
  ]);

  const [rows, setRows] = useState<AdPerformanceRow[]>(INITIAL_AD_ROWS);

  const [tab, setTab] = useState<AdFilterKey>("all");
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS);
  const [sort, setSort] = useState<AdSortState>({
    key: null,
    direction: "asc",
  });
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);

  const [viewingRow, setViewingRow] = useState<AdPerformanceRow | null>(null);
  const [editingRow, setEditingRow] = useState<AdPerformanceRow | null>(null);

  const counts = useMemo(
    () => ({
      all: rows.length,
      topPerforming: rows.filter((r) => r.isTopPerforming).length,
    }),
    [rows],
  );

  const filtered = useMemo(() => {
    return rows.filter((row) => {
      const matchesTab = tab === "all" || row.isTopPerforming;

      const query = search.trim().toLowerCase();
      const matchesSearch =
        query === "" ||
        row.campaignName.toLowerCase().includes(query) ||
        row.adName.toLowerCase().includes(query);

      const matchesPerformance =
        filters.performance === "all" ||
        (filters.performance === "top" && row.isTopPerforming) ||
        (filters.performance === "low" && !row.isTopPerforming);

      const matchesCtrMin =
        filters.ctrMin === "" || row.ctr >= parseFloat(filters.ctrMin);

      const matchesStatus =
        filters.status === "all" || row.status === filters.status;

      return (
        matchesTab &&
        matchesSearch &&
        matchesPerformance &&
        matchesCtrMin &&
        matchesStatus
      );
    });
  }, [rows, tab, search, filters]);

  const sorted = useMemo(() => {
    if (!sort.key) return filtered;
    const key = sort.key;
    const direction = sort.direction === "asc" ? 1 : -1;

    return [...filtered].sort((a, b) => {
      const valueA = a[key];
      const valueB = b[key];

      if (typeof valueA === "number" && typeof valueB === "number") {
        return (valueA - valueB) * direction;
      }
      return String(valueA).localeCompare(String(valueB)) * direction;
    });
  }, [filtered, sort]);

  const totalPages = Math.max(1, Math.ceil(sorted.length / perPage));
  const currentPage = Math.min(page, totalPages);
  const paginated = sorted.slice(
    (currentPage - 1) * perPage,
    currentPage * perPage,
  );

  function handleSortChange(key: AdSortKey) {
    setSort((prev) => {
      if (prev.key !== key) return { key, direction: "asc" };
      return { key, direction: prev.direction === "asc" ? "desc" : "asc" };
    });
  }

  function handleRowAction(action: AdRowAction, row: AdPerformanceRow) {
    switch (action) {
      case "view":
        setViewingRow(row);
        break;
      case "edit":
        setEditingRow(row);
        break;
      case "toggle-pause":
        setRows((prev) =>
          prev.map((r) =>
            r.id === row.id
              ? { ...r, status: r.status === "active" ? "paused" : "active" }
              : r,
          ),
        );
        break;
      case "delete":
        setRows((prev) => prev.filter((r) => r.id !== row.id));
        break;
    }
  }

  function handleSaveEdit(updated: AdPerformanceRow) {
    setRows((prev) => prev.map((r) => (r.id === updated.id ? updated : r)));
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="rounded-xl border border-[var(--color-line)] bg-white p-6">
        <AdAccountSelector
          accounts={ACCOUNTS}
          selectedIds={selectedAccountIds}
          onSelectionChange={setSelectedAccountIds}
        />
      </div>

      <div className="rounded-xl border border-[var(--color-line)] bg-white p-6">
        <h2 className="title-medium primary-text">Ads Performance Report</h2>
        <p className="body-sm-regular subtext-400 mt-1">
          Ad level results and growth trend across all your accounts, last 8
          weeks.
        </p>

        <div className="mt-5">
          <StatsRow stats={STATS} />
        </div>
      </div>

      <GrowthTrendsChart data={GROWTH_DATA} />

      <div className="rounded-xl border border-[var(--color-line)] bg-white p-6">
        <h3 className="title-medium primary-text mb-4">Total Ad</h3>

        <div className="flex flex-wrap items-center justify-between gap-3">
          <AdPerformanceTabs
            active={tab}
            counts={counts}
            onChange={(key) => {
              setTab(key);
              setPage(1);
            }}
          />
          <AdPerformanceSearchBar
            value={search}
            onChange={(value) => {
              setSearch(value);
              setPage(1);
            }}
            filters={filters}
            onFiltersChange={(next) => {
              setFilters(next);
              setPage(1);
            }}
          />
        </div>

        <div className="mt-5">
          <AdPerformanceTable
            rows={paginated}
            sort={sort}
            onSortChange={handleSortChange}
            onAction={handleRowAction}
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
      </div>

      {viewingRow && (
        <AdViewDetailsModal
          row={viewingRow}
          onClose={() => setViewingRow(null)}
        />
      )}

      {editingRow && (
        <AdEditModal
          row={editingRow}
          onClose={() => setEditingRow(null)}
          onSave={handleSaveEdit}
        />
      )}
    </div>
  );
}
