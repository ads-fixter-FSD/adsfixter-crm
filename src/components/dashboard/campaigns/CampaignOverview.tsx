

"use client";

import { useMemo, useState } from "react";
import {
  Search,
  ChevronLeft,
  ChevronRight,
  MoreVertical,
  ChevronsUpDown,
} from "lucide-react";
import { Campaign, CampaignOverviewProps } from "@/types/campaign.types";

const STATUS_STYLES: Record<
  string,
  { label: string; bg: string; text: string; dot: string }
> = {
  Active: {
    label: "Active",
    bg: "bg-[#ECFDF5] dark:bg-[#064e3b]",
    text: "text-[#166534] dark:text-[#10b981]",
    dot: "bg-[#22c55e]",
  },
  Learning: {
    label: "Learning",
    bg: "bg-[#FEF3E2] dark:bg-[#2c2010]",
    text: "text-[#92400E] dark:text-[#f59e0b]",
    dot: "bg-[#f59e0b]",
  },
  Paused: {
    label: "Paused",
    bg: "bg-[#EFF6FF] dark:bg-[#1e293b]",
    text: "text-[#1e40af] dark:text-[#3b82f6]",
    dot: "bg-[#3b82f6]",
  },
  Draft: {
    label: "Draft",
    bg: "bg-[#FEF2F2] dark:bg-[#450a0a]",
    text: "text-[#991B1B] dark:text-[#f87171]",
    dot: "bg-[#ef4444]",
  },
};
const RESULT_LABELS: Record<string, string> = {
  purchase: "purchase",
  leads: "leads",
  link_clicks: "Links Clicks",
  impressions: "impressions",
};

type SortConfig = {
  key: string;
  direction: "asc" | "desc";
} | null;


const copysvg = <svg width="12" height="13" viewBox="0 0 12 13" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M11.0651 5.06706V8.08039C11.0651 9.88026 11.0651 10.7802 10.6067 11.4111C10.4587 11.6148 10.2795 11.794 10.0758 11.942C9.44491 12.4004 8.54498 12.4004 6.7451 12.4004H3.73177M4.73177 10.4004C6.54053 10.4004 7.44491 10.4004 8.07579 9.94203C8.27954 9.794 8.45871 9.61482 8.60675 9.41108C9.0651 8.7802 9.0651 7.88026 9.0651 6.08039V4.72039C9.0651 2.92052 9.0651 2.02058 8.60675 1.38971C8.45871 1.18596 8.27954 1.00678 8.07579 0.85875C7.44491 0.400391 6.54053 0.400391 4.73177 0.400391C2.92301 0.400391 2.01863 0.400391 1.38775 0.85875C1.18401 1.00678 1.00483 1.18596 0.856797 1.38971C0.398438 2.02058 0.398438 2.92052 0.398438 4.72039V6.08039C0.398438 7.88026 0.398438 8.7802 0.856797 9.41108C1.00483 9.61482 1.18401 9.794 1.38775 9.94203C2.01863 10.4004 2.92301 10.4004 4.73177 10.4004Z" stroke="#7F8482" stroke-width="0.8" stroke-linecap="round" stroke-linejoin="round"/>
</svg>


export default function CampaignOverview({
  title = "Campaigns",
  subtitle = "Track your campaign performance and manage your ad spend.",
  campaigns = [],
}: CampaignOverviewProps) {
  const [activeFilter, setActiveFilter] = useState<
    "All" | "Active" | "Learning" | "Paused" | "Draft"
  >("All");
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [sortConfig, setSortConfig] = useState<SortConfig>(null);

  const handleSort = (key: string) => {
    let direction: "asc" | "desc" = "asc";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "asc"
    ) {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const filteredCampaigns = useMemo(() => {
    let result = [...campaigns];

    // 1. Apply Search
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (c) =>
          c.campaignId.toLowerCase().includes(q) ||
          c.name.toLowerCase().includes(q) ||
          c.adAccountId.toLowerCase().includes(q),
      );
    }

    // 2. Apply Status Filter
    if (activeFilter !== "All") {
      result = result.filter((c) => c.status === activeFilter);
    }

    // 3. Apply Sorting
    if (sortConfig !== null) {
      result.sort((a, b) => {
        let aValue: any = a[sortConfig.key as keyof Campaign];
        let bValue: any = b[sortConfig.key as keyof Campaign];

        // Custom handling for nested 'results' object
        if (sortConfig.key === "results") {
          aValue = a.results.count;
          bValue = b.results.count;
        }

        if (typeof aValue === "string") aValue = aValue.toLowerCase();
        if (typeof bValue === "string") bValue = bValue.toLowerCase();

        if (aValue < bValue) {
          return sortConfig.direction === "asc" ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === "asc" ? 1 : -1;
        }
        return 0;
      });
    }

    return result;
  }, [campaigns, search, activeFilter, sortConfig]);

  const totalPages = Math.max(1, Math.ceil(filteredCampaigns.length / perPage));
  const paginatedCampaigns = filteredCampaigns.slice(
    (currentPage - 1) * perPage,
    currentPage * perPage,
  );

  // Filter counts
  const allCount = campaigns.length;
  const activeCount = campaigns.filter((c) => c.status === "Active").length;
  const learningCount = campaigns.filter((c) => c.status === "Learning").length;
  const pausedCount = campaigns.filter((c) => c.status === "Paused").length;

  return (
    <section className="flex w-full flex-col rounded-xl border border-[#E9E9E9]  bg-[var(--color-white,#ffffff)] transition-colors">
      {/* Header Section */}
      <div className="border-b border-[#eceff3]  p-4">
        <h2 className="m-0 font-sans text-[22px] font-medium leading-[120%] text-[var(--color-primary-text-500,#0e2038)] dark:text-zinc-100">
          {title}
        </h2>
        {subtitle && (
          <p className="m-0 mt-1 font-sans text-sm leading-[150%] text-[var(--color-subtext-500,#7f8482)] dark:text-zinc-400">
            {subtitle}
          </p>
        )}
      </div>

      {/* Main Content Body */}
      <div className="flex flex-col gap-4 p-4">
        {/* Filters & Search */}
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          {/* Tabs */}
          <div className="flex flex-wrap items-center gap-1 rounded-lg border border-[var(--color-line,#eceff3)]  bg-[var(--color-surface,#f7f8fa)]  p-1 w-full lg:w-auto">
            {[
              { key: "All", label: "All", count: allCount },
              { key: "Active", label: "Active", count: activeCount },
              { key: "Learning", label: "Learning", count: learningCount },
              { key: "Paused", label: "Paused", count: pausedCount },
            ].map(({ key, label, count }) => (
              <button
                key={key}
                type="button"
                onClick={() => {
                  setActiveFilter(key as any);
                  setCurrentPage(1);
                }}
                className={`flex-1 sm:flex-none rounded-md px-4 py-1.5 font-sans text-sm font-medium transition-all ${
                  activeFilter === key
                    ? "bg-[var(--color-white,#ffffff)]  shadow-sm text-[var(--color-primary-text-500,#0e2038)] dark:text-zinc-100"
                    : "text-[var(--color-subtext-500,#7f8482)] dark:text-zinc-400 hover:bg-[var(--color-white,#ffffff)]/60 /50"
                }`}
              >
                {label} <span className="text-xs opacity-70">({count})</span>
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative w-full lg:w-80">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-subtext-500,#7f8482)] dark:text-zinc-400"
              size={18}
            />
            <input
              type="text"
              placeholder="Search campaigns..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full rounded-lg border border-[var(--color-line,#eceff3)]  bg-[var(--color-white,#ffffff)]  pl-10 pr-4 py-2.5 font-sans text-sm text-[var(--color-primary-text-500,#0e2038)] dark:text-zinc-100 outline-none placeholder:text-[var(--color-subtext-400,#999d9b)] dark:placeholder:text-zinc-500 focus:ring-2 focus:ring-[var(--color-adsfixter-primary,#F74608)] focus:border-transparent"
            />
          </div>
        </div>

        {/* Table Container */}
        <div className="w-full overflow-x-auto rounded-lg border border-[#F0F0F0] ">
          <table className="w-full min-w-[1100px] border-collapse text-sm">
            <thead>
              <tr className="border-b border-[#EDEDED]  bg-[var(--table-header-bg,#F2F3F3)]  text-left text-xs font-medium text-[#525866] dark:text-zinc-400">
                {[
                  { label: "Ad Account", key: "adAccountId" },
                  { label: "Campaign", key: "name" },
                  { label: "Status", key: "status" },
                  { label: "Budget", key: "budget" },
                  { label: "Total Spend", key: "totalSpend" },
                  { label: "Results", key: "results" },
                ].map((column) => (
                  <th
                    key={column.key}
                    onClick={() => handleSort(column.key)}
                    className="border-r border-[#EDEDED] body-xsm-medium px-4 py-3 hover:bg-gray-200/60  cursor-pointer transition-colors select-none last:border-r-0"
                  >
                    <div className="flex items-center justify-between gap-2 font-sans">
                      {column.label}
                      <ChevronsUpDown
                        size={14}
                        className={`transition-colors ${
                          sortConfig?.key === column.key
                            ? "text-[var(--color-adsfixter-primary,#F74608)]"
                            : "text-[#a3a8a5] dark:text-zinc-500"
                        }`}
                      />
                    </div>
                  </th>
                ))}
                <th className="px-4 py-3 w-16 text-center font-sans">Action</th>
              </tr>
            </thead>
            <tbody>
              {paginatedCampaigns.length > 0 ? (
                paginatedCampaigns.map((campaign, idx) => {
                  const statusStyle =
                    STATUS_STYLES[campaign.status] || STATUS_STYLES.Draft;
                  const resultLabel =
                    RESULT_LABELS[campaign.results.type] ||
                    campaign.results.type;

                  return (
                    <tr
                      key={idx}
                      className="border-b border-[#F0F0F0]  hover:bg-[var(--color-surface,#f7f8fa)]/40  transition-colors last:border-b-0"
                    > 
                      {/* Ad Account */}
                      <td className="border-r border-[#F0F0F0]  px-4 py-4 last:border-r-0">
                        <div className="flex items-center gap-3">
                          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-gray-100   body-xsm-medium font-bold text-blue-600 dark:text-blue-400 shadow-sm">
                            {campaign.adAccountId.includes("Boost") ? "G" : "M"}
                          </div>
                          <div className="min-w-0">
                            <div className="truncate font-sans body-xsm-regular text-[var(--color-primary-text-500,#0e2038)] ">
                              {campaign.adAccountId}
                            </div>
                            <div className="font-sans flex gap-1 body-xsm-regular text-[var(--color-subtext-400,#999d9b)] dark:text-zinc-400">
                              ID: {campaign.campaignId} <span>{ copysvg}</span>
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Campaign */}
                      <td className="border-r border-[#F0F0F0]  px-4 py-4 last:border-r-0">
                        <div className="truncate font-sans body-xsm-medium text-[var(--color-primary-text-500,#0e2038)] ">
                          {campaign.name}
                        </div>
                        <div className="font-sans text-xs text-[var(--color-subtext-400,#999d9b)] dark:text-zinc-400">
                          ID: {campaign.campaignId}
                        </div>
                      </td>

                      {/* Status */}
                      <td className="border-r border-[#F0F0F0]  px-4 py-4 last:border-r-0">
                        <span
                          className={`inline-flex items-center gap-1.5 rounded-[6px] px-2.5 py-1 font-sans text-xs font-medium ${statusStyle.bg} ${statusStyle.text}`}
                        >
                          <span
                            className={`h-1.5 w-1.5 rounded-full ${statusStyle.dot}`}
                          />
                          {statusStyle.label}
                        </span>
                      </td>

                      {/* Budget */}
                      <td className="border-r border-[#F0F0F0]  px-4 py-4 font-sans body-sm-regular text-[var(--color-primary-text-500,#0e2038)] dark:text-zinc-300 last:border-r-0">
                        ${campaign.budget.toFixed(2)}/day
                      </td>

                      {/* Total Spend */}
                      <td className="border-r border-[#F0F0F0]  px-4 py-4 font-sans body-xsm-regular font-medium text-[var(--color-primary-text-500,#0e2038)]  last:border-r-0">
                        ${campaign.totalSpend.toFixed(2)}
                      </td>

                      {/* Results */}
                      <td className="border-r border-[#F0F0F0]  px-4 py-4 font-sans body-xsm-regular text-[var(--color-primary-text-500,#0e2038)] dark:text-zinc-300 last:border-r-0">
                        {campaign.results.count.toLocaleString()} {resultLabel}
                      </td>

                      {/* Action */}
                      <td className="px-4 py-4">
                        <div className="flex items-center justify-center gap-2">
                          <button 
                            type="button"
                            className="flex h-7 w-7 items-center justify-center rounded border border-[#EDEDED]  text-[var(--color-subtext-500,#7f8482)] dark:text-zinc-400 hover:bg-gray-100 dark:hover:bg-zinc-800 hover:text-[var(--color-primary-text-500,#0e2038)] dark:hover:text-zinc-200 transition-colors"
                          >
                            <MoreVertical size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td
                    colSpan={7}
                    className="px-4 py-8 text-center font-sans body-xsm-regular  text-[var(--color-subtext-500,#7f8482)] dark:text-zinc-400"
                  >
                    No campaigns found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between pt-2">
          <div className="flex items-center gap-2 font-sans text-sm text-[var(--color-subtext-500,#7f8482)] dark:text-zinc-400">
            Show
            <select 
              value={perPage}
              onChange={(e) => {
                setPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="rounded border border-[var(--color-line,#eceff3)]  bg-[var(--color-white,#ffffff)]  px-3 py-1.5 font-sans text-sm text-[var(--color-primary-text-500,#0e2038)] dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-[var(--color-adsfixter-primary,#F74608)]"
            >
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
            </select>
            Per Page
          </div>

          <div className="flex flex-wrap items-center gap-1.5">
            <button
              type="button"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="flex h-8 w-8 items-center justify-center rounded text-[var(--color-subtext-500,#7f8482)] dark:text-zinc-400 transition-colors hover:bg-gray-50 dark:hover:bg-zinc-800 disabled:opacity-40"
            >
              <ChevronLeft size={16} />
            </button>

            {Array.from(
              { length: Math.min(totalPages, 5) },
              (_, i) => i + 1,
            ).map((page) => (
              <button
                key={page}
                type="button"
                onClick={() => setCurrentPage(page)}
                className={`h-8 w-8 rounded font-sans text-sm font-medium transition-colors ${
                  currentPage === page
                    ? "bg-[var(--color-adsfixter-primary,#F74608)] text-[var(--color-on-primary,#ffffff)]"
                    : "border border-transparent text-[var(--color-subtext-500,#7f8482)] dark:text-zinc-400 hover:border-[var(--color-line,#eceff3)] dark:hover:border-zinc-700 hover:bg-gray-50 dark:hover:bg-zinc-800"
                }`}
              >
                {page}
              </button>
            ))}

            {totalPages > 5 && (
              <>
                <span className="text-sm text-[var(--color-subtext-500,#7f8482)] dark:text-zinc-500">...</span>
                <button
                  type="button"
                  onClick={() => setCurrentPage(totalPages)}
                  className="h-8 w-8 rounded border border-transparent font-sans text-sm font-medium text-[var(--color-subtext-500,#7f8482)] dark:text-zinc-400 transition-colors hover:border-[var(--color-line,#eceff3)] dark:hover:border-zinc-700 hover:bg-gray-50 dark:hover:bg-zinc-800"
                >
                  {totalPages}
                </button>
              </>
            )}

            <button
              type="button"
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="flex h-8 w-8 items-center justify-center rounded text-[var(--color-subtext-500,#7f8482)] dark:text-zinc-400 transition-colors hover:bg-gray-50 dark:hover:bg-zinc-800 disabled:opacity-40"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}