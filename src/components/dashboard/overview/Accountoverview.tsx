"use client";

import { useMemo, useState } from "react";
import {
  Search,
  SlidersHorizontal,
  ArrowUpDown,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  MoreVertical,
  Eye,
  Megaphone,
  Download,
  Ticket,
  Share2,
  Pencil,
  Trash2,
} from "lucide-react";

/* ------------------------------- Types ------------------------------- */

type MetaStatus = "active" | "inactive" | "disable";
type Platform = "facebook" | "google" | "tiktok";

export interface AccountRow {
  id: string;
  platform: Platform;
  accountName: string;
  accountIdMasked: string;
  creditBalance: number;
  spendMonth: number;
  lastTopUp: { value: string; date: string };
  metaStatus: MetaStatus;
  agencyStatus: string;
  optimizeScore: number;
  updatedAgo: string;
  status: "active" | "inactive";
}

export interface AccountOverviewProps {
  title?: string;
  subtitle?: string;
  rows: AccountRow[];
}

/* ------------------------------- Config ------------------------------- */

const TABS = [
  { key: "all", label: "All" },
  { key: "active", label: "Active Account" },
  { key: "inactive", label: "Inactive Account" },
] as const;

type TabKey = (typeof TABS)[number]["key"];

const SORT_OPTIONS = [
  "Newest",
  "Oldest",
  "Highest Spend",
  "Lowest Spend",
  "Name A-Z",
  "Name Z-A",
] as const;

const META_STATUS_FILTERS: { key: MetaStatus; label: string }[] = [
  { key: "active", label: "Active" },
  { key: "inactive", label: "Inactive" },
  { key: "disable", label: "Disable" },
];

const PLATFORM_FILTERS: { key: Platform; label: string }[] = [
  { key: "facebook", label: "Facebook" },
  { key: "google", label: "Google" },
  { key: "tiktok", label: "TikTok" },
];

const STATUS_STYLES: Record<MetaStatus, { label: string; dot: string; text: string; bg: string }> = {
  active: { label: "Active", dot: "bg-[#22C55E]", text: "text-[#166534]", bg: "bg-[#E9F9EF]" },
  inactive: { label: "Inactive", dot: "bg-[#F59E0B]", text: "text-[#92400E]", bg: "bg-[#FEF3E2]" },
  disable: { label: "Disable", dot: "bg-[#EF4444]", text: "text-[#991B1B]", bg: "bg-[#FDECEC]" },
};

const COLUMNS: { key: string; label: string; sortable: boolean }[] = [
  { key: "id", label: "ID", sortable: false },
  { key: "accountDetails", label: "Account Details", sortable: true },
  { key: "creditBalance", label: "Credit Bal", sortable: true },
  { key: "spendMonth", label: "Spend(month)", sortable: true },
  { key: "lastTopUp", label: "Last Top-Up", sortable: true },
  { key: "metaStatus", label: "Meta Status", sortable: true },
  { key: "agencyStatus", label: "Agency Status", sortable: false },
  { key: "optimizeScore", label: "Optimize Score", sortable: true },
  { key: "update", label: "Update", sortable: true },
  { key: "action", label: "Action", sortable: false },
];

const PLATFORM_ICON: Record<Platform, React.ReactNode> = {
  // lucide-react has no official brand logos (trademark reasons), so these
  // are small hand-rolled SVGs. Swap for your real brand assets any time —
  // just replace the value for each key below.
  facebook: (
    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="#1877F2">
      <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5 3.66 9.15 8.44 9.94v-7.03H7.9v-2.91h2.54V9.85c0-2.51 1.49-3.9 3.77-3.9 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56v1.89h2.78l-.44 2.91h-2.34V22c4.78-.79 8.44-4.94 8.44-9.94z" />
    </svg>
  ),
  google: (
    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5">
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.99.66-2.26 1.06-3.71 1.06-2.86 0-5.28-1.93-6.15-4.53H2.18v2.85A10.99 10.99 0 0 0 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.85 13.1a6.6 6.6 0 0 1 0-4.2V6.05H2.18a11 11 0 0 0 0 9.9l3.67-2.85z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 6.9l3.67 2.85C6.72 7.31 9.14 5.38 12 5.38z"
      />
    </svg>
  ),
  tiktok: (
    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="#000000">
      <path d="M16.6 5.82c-.9-.98-1.4-2.26-1.4-3.6h-3.02v13.2c0 1.5-1.22 2.72-2.72 2.72a2.72 2.72 0 0 1 0-5.44c.28 0 .55.04.8.12V9.7a5.74 5.74 0 0 0-.8-.06A5.75 5.75 0 1 0 15.2 15.4V9.28a8.62 8.62 0 0 0 5 1.6V7.85a5.6 5.6 0 0 1-3.6-2.03z" />
    </svg>
  ),
};

const ACTION_MENU_ITEMS = [
  { key: "view-details", label: "View Details", icon: Eye },
  { key: "view-campaign", label: "View Campaign", icon: Megaphone },
  { key: "top-up-history", label: "Top Up History", icon: Download },
  { key: "open-ticket", label: "Open Support Ticket", icon: Ticket },
  { key: "bm-share", label: "BM Share Request", icon: Share2 },
  { key: "edit-account", label: "Edit Account", icon: Pencil },
] as const;

/* ============================================================
   Account Overview Section
   - bg white, border 1px #E9E9E9, radius 12 (outer card)
   - table borders 1px #F0F0F0
   - every sortable header is clickable
   - Filter = checkbox dropdown panel
   - Action = 3-dot menu styled like the provided reference (rounded
     card, icon + label rows, divider, red delete row at bottom)
   No `style` attribute anywhere — Tailwind utility classes only.
   ============================================================ */
export default function AccountOverview({
  title = "Account Overview",
  subtitle = "Manage and monitor all your Meta ad accounts",
  rows,
}: AccountOverviewProps) {
  const [activeTab, setActiveTab] = useState<TabKey>("all");
  const [search, setSearch] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [activeSort, setActiveSort] = useState<(typeof SORT_OPTIONS)[number]>("Newest");
  const [metaFilters, setMetaFilters] = useState<Set<MetaStatus>>(new Set());
  const [platformFilters, setPlatformFilters] = useState<Set<Platform>>(new Set());
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");
  const [openActionRow, setOpenActionRow] = useState<number | null>(null);
  const [perPage, setPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const toggleMetaFilter = (key: MetaStatus) => {
    setMetaFilters((prev) => {
      const next = new Set(prev);
      next.has(key) ? next.delete(key) : next.add(key);
      return next;
    });
  };

  const togglePlatformFilter = (key: Platform) => {
    setPlatformFilters((prev) => {
      const next = new Set(prev);
      next.has(key) ? next.delete(key) : next.add(key);
      return next;
    });
  };

  const handleHeaderSort = (key: string, sortable: boolean) => {
    if (!sortable) return;
    if (sortKey === key) {
      setSortDir((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  };

  const filteredRows = useMemo(() => {
    let result = [...rows];

    if (activeTab !== "all") {
      result = result.filter((r) => r.status === activeTab);
    }

    if (search.trim()) {
      const q = search.trim().toLowerCase();
      result = result.filter(
        (r) =>
          r.accountName.toLowerCase().includes(q) ||
          r.accountIdMasked.toLowerCase().includes(q) ||
          r.id.toLowerCase().includes(q)
      );
    }

    if (metaFilters.size > 0) {
      result = result.filter((r) => metaFilters.has(r.metaStatus));
    }

    if (platformFilters.size > 0) {
      result = result.filter((r) => platformFilters.has(r.platform));
    }

    if (sortKey) {
      result.sort((a, b) => {
        let aVal: string | number = "";
        let bVal: string | number = "";
        switch (sortKey) {
          case "accountDetails":
            aVal = a.accountName.toLowerCase();
            bVal = b.accountName.toLowerCase();
            break;
          case "creditBalance":
            aVal = a.creditBalance;
            bVal = b.creditBalance;
            break;
          case "spendMonth":
            aVal = a.spendMonth;
            bVal = b.spendMonth;
            break;
          case "lastTopUp":
            aVal = a.lastTopUp.date;
            bVal = b.lastTopUp.date;
            break;
          case "metaStatus":
            aVal = a.metaStatus;
            bVal = b.metaStatus;
            break;
          case "optimizeScore":
            aVal = a.optimizeScore;
            bVal = b.optimizeScore;
            break;
          case "update":
            aVal = a.updatedAgo;
            bVal = b.updatedAgo;
            break;
        }
        if (aVal < bVal) return sortDir === "asc" ? -1 : 1;
        if (aVal > bVal) return sortDir === "asc" ? 1 : -1;
        return 0;
      });
    }

    return result;
  }, [rows, activeTab, search, metaFilters, platformFilters, sortKey, sortDir]);

  const totalPages = Math.max(1, Math.ceil(filteredRows.length / perPage));
  const pagedRows = filteredRows.slice((currentPage - 1) * perPage, currentPage * perPage);
  const activeFilterCount = metaFilters.size + platformFilters.size;

  return (
    <section className="flex w-full flex-col gap-4 rounded-xl border border-[#E9E9E9] bg-[var(--color-white,#ffffff)] p-4">
      {/* ---------- Title ---------- */}
      <div className="flex flex-col gap-1">
        <h2 className="m-0 font-sans title-medium  font-medium leading-[120%] text-[var(--color-primary-text-500,#0e2038)]">
          {title}
        </h2>
        <p className="m-0 font-sans body-sm-regular mt-2 leading-[150%] text-[var(--color-subtext-500,#7f8482)]">
          {subtitle}
        </p>
      </div>

      {/* ---------- Toolbar: Tabs / Search / Filter / Sort ---------- */}
      <div className="flex w-full flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        {/* Tabs */}
        <div className="flex w-fit items-center gap-1 rounded-lg border border-[var(--color-line,#eceff3)] bg-[var(--color-surface,#f7f8fa)] p-1">
          {TABS.map((tab) => (
            <button
              key={tab.key}
              type="button"
              onClick={() => {
                setActiveTab(tab.key);
                setCurrentPage(1);
              }}
              className={`rounded-md px-3 py-1.5 font-sans text-sm font-medium transition-colors ${
                activeTab === tab.key
                  ? "bg-[var(--color-white,#ffffff)] text-[var(--color-primary-text-500,#0e2038)] shadow-[0px_1px_2px_0px_#E4E5E73D]"
                  : "text-[var(--color-subtext-500,#7f8482)]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Search + Filter + Sort */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex h-10 w-full items-center gap-2 rounded-lg border border-[var(--color-line,#eceff3)] bg-[var(--color-white,#ffffff)] px-3 sm:w-64">
            <Search size={16} className="text-[var(--color-subtext-500,#7f8482)]" />
            <input
              type="text"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Search..."
              className="w-full bg-transparent font-sans text-sm text-[var(--color-primary-text-500,#0e2038)] outline-none placeholder:text-[var(--color-subtext-400,#999d9b)]"
            />
          </div>

          {/* Filter */}
          <div className="relative">
            <button
              type="button"
              onClick={() => {
                setIsFilterOpen((prev) => !prev);
                setIsSortOpen(false);
              }}
              className="flex h-10 items-center gap-2 rounded-lg border border-[var(--color-line,#eceff3)] bg-[var(--color-white,#ffffff)] px-4 font-sans text-sm font-medium text-[var(--color-primary-text-500,#0e2038)]"
            >
              <SlidersHorizontal size={16} className="text-[var(--color-subtext-500,#7f8482)]" />
              <span>Filter</span>
              {activeFilterCount > 0 && (
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[var(--color-adsfixter-primary,#f74608)] font-sans text-xs font-medium text-[var(--color-on-primary,#ffffff)]">
                  {activeFilterCount}
                </span>
              )}
            </button>

            {isFilterOpen && (
              <div className="absolute right-0 z-20 mt-2 w-64 rounded-2xl border border-[var(--color-line,#eceff3)] bg-[var(--color-white,#ffffff)] p-4 shadow-[0px_8px_24px_0px_rgba(0,0,0,0.12)]">
                <p className="m-0 mb-2 font-sans text-xs font-medium uppercase tracking-wide text-[var(--color-subtext-400,#999d9b)]">
                  Meta Status
                </p>
                <div className="flex flex-col gap-2">
                  {META_STATUS_FILTERS.map((opt) => (
                    <label
                      key={opt.key}
                      className="flex items-center gap-2 font-sans text-sm text-[var(--color-primary-text-500,#0e2038)]"
                    >
                      <input
                        type="checkbox"
                        checked={metaFilters.has(opt.key)}
                        onChange={() => {
                          toggleMetaFilter(opt.key);
                          setCurrentPage(1);
                        }}
                        className="h-4 w-4 rounded border-[var(--color-line,#eceff3)] accent-[var(--color-adsfixter-primary,#f74608)]"
                      />
                      {opt.label}
                    </label>
                  ))}
                </div>

                <div className="my-3 h-px w-full bg-[var(--color-line,#eceff3)]" />

                <p className="m-0 mb-2 font-sans text-xs font-medium uppercase tracking-wide text-[var(--color-subtext-400,#999d9b)]">
                  Platform
                </p>
                <div className="flex flex-col gap-2">
                  {PLATFORM_FILTERS.map((opt) => (
                    <label
                      key={opt.key}
                      className="flex items-center gap-2 font-sans text-sm text-[var(--color-primary-text-500,#0e2038)]"
                    >
                      <input
                        type="checkbox"
                        checked={platformFilters.has(opt.key)}
                        onChange={() => {
                          togglePlatformFilter(opt.key);
                          setCurrentPage(1);
                        }}
                        className="h-4 w-4 rounded border-[var(--color-line,#eceff3)] accent-[var(--color-adsfixter-primary,#f74608)]"
                      />
                      {opt.label}
                    </label>
                  ))}
                </div>

                {activeFilterCount > 0 && (
                  <button
                    type="button"
                    onClick={() => {
                      setMetaFilters(new Set());
                      setPlatformFilters(new Set());
                      setCurrentPage(1);
                    }}
                    className="mt-3 font-sans text-sm font-medium text-[var(--color-adsfixter-primary,#f74608)]"
                  >
                    Clear all
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Sort by */}
          <div className="relative">
            <button
              type="button"
              onClick={() => {
                setIsSortOpen((prev) => !prev);
                setIsFilterOpen(false);
              }}
              className="flex h-10 items-center gap-2 rounded-lg border border-[var(--color-line,#eceff3)] bg-[var(--color-white,#ffffff)] px-4 font-sans text-sm font-medium text-[var(--color-primary-text-500,#0e2038)]"
            >
              <ArrowUpDown size={16} className="text-[var(--color-subtext-500,#7f8482)]" />
              <span>Sort by</span>
              <ChevronDown
                size={16}
                className={`text-[var(--color-subtext-500,#7f8482)] transition-transform ${
                  isSortOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {isSortOpen && (
              <div className="absolute right-0 z-20 mt-2 w-52 rounded-2xl border border-[var(--color-line,#eceff3)] bg-[var(--color-white,#ffffff)] p-2 shadow-[0px_8px_24px_0px_rgba(0,0,0,0.12)]">
                {SORT_OPTIONS.map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => {
                      setActiveSort(opt);
                      setIsSortOpen(false);
                    }}
                    className={`w-full rounded-lg px-3 py-2 text-left font-sans text-sm ${
                      activeSort === opt
                        ? "bg-[var(--color-primary-soft,rgba(247,70,8,0.08))] text-[var(--color-adsfixter-primary,#f74608)]"
                        : "text-[var(--color-primary-text-500,#0e2038)]"
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ---------- Table ---------- */}
      <div className="w-full overflow-x-auto rounded-lg border border-[#F0F0F0]">
        <table className="w-full min-w-[960px] border-collapse">
          <thead>
            <tr className="bg-[var(--table-header-bg,#f2f3f3)]">
              {COLUMNS.map((col) => (
                <th
                  key={col.key}
                  onClick={() => handleHeaderSort(col.key, col.sortable)}
                  className={`border-b border-[#F0F0F0] px-4 py-3 text-left font-sans text-xs font-medium text-[var(--color-subtext-500,#7f8482)] ${
                    col.sortable ? "cursor-pointer select-none" : ""
                  }`}
                >
                  <span className="flex items-center gap-1">
                    {col.label}
                    {col.sortable && (
                      <ArrowUpDown
                        size={12}
                        className={
                          sortKey === col.key
                            ? "text-[var(--color-adsfixter-primary,#f74608)]"
                            : "text-[var(--color-subtext-400,#999d9b)]"
                        }
                      />
                    )}
                  </span>
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {pagedRows.map((row, idx) => {
              const statusStyle = STATUS_STYLES[row.metaStatus];
              return (
                <tr key={`${row.id}-${idx}`} className="border-b border-[#F0F0F0] last:border-b-0">
                  <td className="px-4 py-4 font-sans text-sm text-[var(--color-primary-text-500,#0e2038)]">
                    {row.id}
                  </td>

                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2">
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[var(--color-surface,#f7f8fa)]">
                        {PLATFORM_ICON[row.platform]}
                      </span>
                      <div className="flex flex-col">
                        <span className="font-sans text-sm font-medium text-[var(--color-primary-text-500,#0e2038)]">
                          {row.accountName}
                        </span>
                        <span className="font-sans text-xs text-[var(--color-subtext-400,#999d9b)]">
                          ID: {row.accountIdMasked}
                        </span>
                      </div>
                    </div>
                  </td>

                  <td className="px-4 py-4 font-sans text-sm text-[var(--color-primary-text-500,#0e2038)]">
                    ${row.creditBalance.toFixed(2)}
                  </td>

                  <td className="px-4 py-4 font-sans text-sm text-[var(--color-primary-text-500,#0e2038)]">
                    ${row.spendMonth.toFixed(2)}
                  </td>

                  <td className="px-4 py-4">
                    <div className="flex flex-col">
                      <span className="font-sans text-sm text-[var(--color-primary-text-500,#0e2038)]">
                        {row.lastTopUp.value}
                      </span>
                      <span className="font-sans text-xs text-[var(--color-subtext-400,#999d9b)]">
                        {row.lastTopUp.date}
                      </span>
                    </div>
                  </td>

                  <td className="px-4 py-4">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 font-sans text-xs font-medium ${statusStyle.bg} ${statusStyle.text}`}
                    >
                      <span className={`h-1.5 w-1.5 rounded-full ${statusStyle.dot}`} />
                      {statusStyle.label}
                    </span>
                  </td>

                  <td className="px-4 py-4 font-sans text-sm text-[var(--color-primary-text-500,#0e2038)]">
                    {row.agencyStatus}
                  </td>

                  <td className="px-4 py-4 font-sans text-sm text-[var(--color-primary-text-500,#0e2038)]">
                    {row.optimizeScore}
                  </td>

                  <td className="px-4 py-4 font-sans text-sm text-[var(--color-subtext-500,#7f8482)]">
                    {row.updatedAgo}
                  </td>

                  <td className="relative px-4 py-4">
                    <button
                      type="button"
                      onClick={() => setOpenActionRow(openActionRow === idx ? null : idx)}
                      className="flex h-8 w-8 items-center justify-center rounded-md text-[var(--color-subtext-500,#7f8482)] hover:bg-[var(--color-surface,#f7f8fa)]"
                    >
                      <MoreVertical size={16} />
                    </button>

                    {openActionRow === idx && (
                      <div className="absolute right-4 top-12 z-20 w-56 rounded-2xl border border-[var(--color-line,#eceff3)] bg-[var(--color-white,#ffffff)] p-2 shadow-[0px_8px_24px_0px_rgba(0,0,0,0.14)]">
                        {ACTION_MENU_ITEMS.map((item) => {
                          const ItemIcon = item.icon;
                          return (
                            <button
                              key={item.key}
                              type="button"
                              onClick={() => setOpenActionRow(null)}
                              className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left font-sans text-sm text-[var(--color-primary-text-500,#0e2038)] hover:bg-[var(--color-surface,#f7f8fa)]"
                            >
                              <ItemIcon size={16} className="text-[var(--color-subtext-500,#7f8482)]" />
                              {item.label}
                            </button>
                          );
                        })}

                        <div className="my-1 h-px w-full bg-[var(--color-line,#eceff3)]" />

                        <button
                          type="button"
                          onClick={() => setOpenActionRow(null)}
                          className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left font-sans text-sm font-medium text-[var(--color-danger-text,#991b1b)] hover:bg-[var(--color-danger-bg,#fee2e2)]"
                        >
                          <Trash2 size={16} className="text-[var(--color-danger-text,#991b1b)]" />
                          Delete Ad Account
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              );
            })}

            {pagedRows.length === 0 && (
              <tr>
                <td
                  colSpan={COLUMNS.length}
                  className="px-4 py-10 text-center font-sans text-sm text-[var(--color-subtext-500,#7f8482)]"
                >
                  No accounts match your search / filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* ---------- Pagination ---------- */}
      <div className="flex w-full flex-col items-center justify-between gap-3 sm:flex-row">
        <div className="flex items-center gap-2 font-sans text-sm text-[var(--color-subtext-500,#7f8482)]">
          <span>Show</span>
          <div className="relative">
            <select
              value={perPage}
              onChange={(e) => {
                setPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="appearance-none rounded-lg border border-[var(--color-line,#eceff3)] bg-[var(--color-white,#ffffff)] py-1.5 pl-3 pr-7 font-sans text-sm text-[var(--color-primary-text-500,#0e2038)] outline-none"
            >
              {[10, 25, 50, 100].map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
            <ChevronDown
              size={14}
              className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-[var(--color-subtext-500,#7f8482)]"
            />
          </div>
          <span>Per Page</span>
        </div>

        <div className="flex items-center gap-1">
          <button
            type="button"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            className="flex h-8 w-8 items-center justify-center rounded-md border border-[var(--color-line,#eceff3)] text-[var(--color-subtext-500,#7f8482)] disabled:opacity-40"
          >
            <ChevronLeft size={16} />
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              type="button"
              onClick={() => setCurrentPage(page)}
              className={`flex h-8 w-8 items-center justify-center rounded-md font-sans text-sm font-medium ${
                currentPage === page
                  ? "bg-[var(--color-adsfixter-primary,#f74608)] text-[var(--color-on-primary,#ffffff)]"
                  : "border border-[var(--color-line,#eceff3)] text-[var(--color-primary-text-500,#0e2038)]"
              }`}
            >
              {page}
            </button>
          ))}

          <button
            type="button"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            className="flex h-8 w-8 items-center justify-center rounded-md border border-[var(--color-line,#eceff3)] text-[var(--color-subtext-500,#7f8482)] disabled:opacity-40"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </section>
  );
}