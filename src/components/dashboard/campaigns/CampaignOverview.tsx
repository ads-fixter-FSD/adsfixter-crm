// "use client";

// import { useMemo, useState } from "react";
// import {
//   Search,
//   ChevronLeft,
//   ChevronRight,
//   MoreVertical,
//   ChevronsUpDown,
// } from "lucide-react";
// import { Campaign, CampaignOverviewProps } from "@/types/campaign.types";

// const STATUS_STYLES: Record<
//   string,
//   { label: string; bg: string; text: string; dot: string }
// > = {
//   Active: {
//     label: "Active",
//     bg: "bg-[#ECFDF5]",
//     text: "text-[#166534]",
//     dot: "bg-[#22c55e]",
//   },
//   Learning: {
//     label: "Learning",
//     bg: "bg-[#FEF3E2]",
//     text: "text-[#92400E]",
//     dot: "bg-[#f59e0b]",
//   },
//   Paused: {
//     label: "Paused",
//     bg: "bg-[#EFF6FF]",
//     text: "text-[#1e40af]",
//     dot: "bg-[#3b82f6]",
//   },
//   Draft: {
//     label: "Draft",
//     bg: "bg-[#F3F4F6]",
//     text: "text-[#6B7280]",
//     dot: "bg-[#9CA3AF]",
//   },
// };

// const RESULT_LABELS: Record<string, string> = {
//   purchase: "purchase",
//   leads: "leads",
//   link_clicks: "Links Clicks",
//   impressions: "impressions",
// };

// type SortConfig = {
//   key: string;
//   direction: "asc" | "desc";
// } | null;

// export default function CampaignOverview({
//   title = "Campaigns",
//   subtitle = "Track your campaign performance and manage your ad spend.",
//   campaigns,
//   totalCampaigns = 12,
// }: CampaignOverviewProps) {
//   const [activeFilter, setActiveFilter] = useState<
//     "All" | "Active" | "Learning" | "Paused" | "Draft"
//   >("All");
//   const [search, setSearch] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [sortConfig, setSortConfig] = useState<SortConfig>(null);

//   const perPage = 10;

//   const handleSort = (key: string) => {
//     let direction: "asc" | "desc" = "asc";
//     if (
//       sortConfig &&
//       sortConfig.key === key &&
//       sortConfig.direction === "asc"
//     ) {
//       direction = "desc";
//     }
//     setSortConfig({ key, direction });
//   };

//   const filteredCampaigns = useMemo(() => {
//     let result = [...campaigns];

//     // 1. Apply Search
//     if (search.trim()) {
//       const q = search.toLowerCase();
//       result = result.filter(
//         (c) =>
//           c.campaignId.toLowerCase().includes(q) ||
//           c.name.toLowerCase().includes(q) ||
//           c.adAccountId.toLowerCase().includes(q),
//       );
//     }

//     // 2. Apply Status Filter
//     if (activeFilter !== "All") {
//       result = result.filter((c) => c.status === activeFilter);
//     }

//     // 3. Apply Sorting
//     if (sortConfig !== null) {
//       result.sort((a, b) => {
//         let aValue: any = a[sortConfig.key as keyof Campaign];
//         let bValue: any = b[sortConfig.key as keyof Campaign];

//         // Custom handling for nested 'results' object
//         if (sortConfig.key === "results") {
//           aValue = a.results.count;
//           bValue = b.results.count;
//         }

//         if (aValue < bValue) {
//           return sortConfig.direction === "asc" ? -1 : 1;
//         }
//         if (aValue > bValue) {
//           return sortConfig.direction === "asc" ? 1 : -1;
//         }
//         return 0;
//       });
//     }

//     return result;
//   }, [campaigns, search, activeFilter, sortConfig]);

//   const totalPages = Math.max(1, Math.ceil(filteredCampaigns.length / perPage));
//   const paginatedCampaigns = filteredCampaigns.slice(
//     (currentPage - 1) * perPage,
//     currentPage * perPage,
//   );

//   // Filter counts
//   const allCount = campaigns.length;
//   const activeCount = campaigns.filter((c) => c.status === "Active").length;
//   const learningCount = campaigns.filter((c) => c.status === "Learning").length;
//   const pausedCount = campaigns.filter((c) => c.status === "Paused").length;

//   return (
//     <section className="flex w-full flex-col rounded-xl border border-[#E9E9E9] bg-white">
//       {/* Header Section */}
//       <div className="border-b border-[#eceff3] p-4">
//         <h2 className="text-[22px] font-medium text-[#0e2038]">{title}</h2>
//         {subtitle && <p className="mt-1 text-sm text-[#7f8482]">{subtitle}</p>}
//       </div>

//       {/* Main Content Body */}
//       <div className="flex flex-col gap-4 p-4">
//         {/* Filters & Search */}
//         <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
//           <div className="flex flex-wrap items-center gap-1 rounded-lg border border-[#eceff3] bg-[#f7f8fa] p-1 w-full lg:w-auto">
//             {[
//               { key: "All", label: "All", count: allCount },
//               { key: "Active", label: "Active", count: activeCount },
//               { key: "Learning", label: "Learning", count: learningCount },
//               { key: "Paused", label: "Paused", count: pausedCount },
//             ].map(({ key, label, count }) => (
//               <button
//                 key={key}
//                 onClick={() => {
//                   setActiveFilter(key as any);
//                   setCurrentPage(1);
//                 }}
//                 className={`flex-1 sm:flex-none rounded-md px-4 py-1.5 text-sm font-medium transition-all ${
//                   activeFilter === key
//                     ? "bg-white shadow-sm text-[#0e2038]"
//                     : "text-[#7f8482] hover:bg-white/60"
//                 }`}
//               >
//                 {label} <span className="text-xs opacity-70">({count})</span>
//               </button>
//             ))}
//           </div>

//           <div className="relative w-full lg:w-80">
//             <Search
//               className="absolute left-3 top-3.5 text-[#7f8482]"
//               size={18}
//             />
//             <input
//               type="text"
//               placeholder="Search campaigns..."
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//               className="w-full rounded-lg border border-[#eceff3] bg-white pl-10 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#F74608] focus:border-transparent"
//             />
//           </div>
//         </div>

//         {/* Table Container (Responsive Scroll) */}
//         <div className="w-full overflow-x-auto rounded-lg border border-[#F0F0F0]">
//           <table className="w-full min-w-[1100px] border-collapse text-sm">
//             <thead>
//               <tr className="border-b border-[#EDEDED] bg-[#F2F3F3] text-left body-xsm-medium text-[#525866]">
//                 <th
//                   onClick={() => handleSort("adAccountId")}
//                   className="border-r border-[#EDEDED] px-4 py-3 hover:bg-gray-200 cursor-pointer transition-colors"
//                 >
//                   <div className="flex items-center justify-between gap-2">
//                     Ad Account
//                     <ChevronsUpDown size={14} className="text-[#a3a8a5]" />
//                   </div>
//                 </th>
//                 <th
//                   onClick={() => handleSort("name")}
//                   className="border-r border-[#EDEDED] px-4 py-3 hover:bg-gray-200 cursor-pointer transition-colors"
//                 >
//                   <div className="flex items-center justify-between gap-2">
//                     Campaign
//                     <ChevronsUpDown size={14} className="text-[#a3a8a5]" />
//                   </div>
//                 </th>
//                 <th
//                   onClick={() => handleSort("status")}
//                   className="border-r border-[#EDEDED] px-4 py-3 hover:bg-gray-200 cursor-pointer transition-colors"
//                 >
//                   <div className="flex items-center justify-between gap-2">
//                     Status
//                     <ChevronsUpDown size={14} className="text-[#a3a8a5]" />
//                   </div>
//                 </th>
//                 <th
//                   onClick={() => handleSort("budget")}
//                   className="border-r border-[#EDEDED] px-4 py-3 hover:bg-gray-200 cursor-pointer transition-colors"
//                 >
//                   <div className="flex items-center justify-between gap-2">
//                     Budget
//                     <ChevronsUpDown size={14} className="text-[#a3a8a5]" />
//                   </div>
//                 </th>
//                 <th
//                   onClick={() => handleSort("totalSpend")}
//                   className="border-r border-[#EDEDED] px-4 py-3 hover:bg-gray-200 cursor-pointer transition-colors"
//                 >
//                   <div className="flex items-center justify-between gap-2">
//                     Total Spend
//                     <ChevronsUpDown size={14} className="text-[#a3a8a5]" />
//                   </div>
//                 </th>
//                 <th
//                   onClick={() => handleSort("results")}
//                   className="border-r border-[#EDEDED] px-4 py-3 hover:bg-gray-200 cursor-pointer transition-colors"
//                 >
//                   <div className="flex items-center justify-between gap-2">
//                     Results
//                     <ChevronsUpDown size={14} className="text-[#a3a8a5]" />
//                   </div>
//                 </th>
//                 <th className="px-4 py-3 w-16 text-center">Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {paginatedCampaigns.length > 0 ? (
//                 paginatedCampaigns.map((campaign, idx) => {
//                   const statusStyle =
//                     STATUS_STYLES[campaign.status] || STATUS_STYLES.Draft;
//                   const resultLabel =
//                     RESULT_LABELS[campaign.results.type] ||
//                     campaign.results.type;

//                   return (
//                     <tr
//                       key={idx}
//                       className="border-b border-[#F0F0F0] hover:bg-[#f9fafb] transition-colors last:border-b-0"
//                     >
//                       <td className="border-r border-[#F0F0F0] px-4 py-4">
//                         <div className="flex items-center gap-3">
//                           <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-gray-100 bg-white shadow-sm text-xs font-bold text-blue-600">
//                             {campaign.adAccountId.includes("Boost") ? "G" : "M"}
//                           </div>
//                           <div className="min-w-0">
//                             <div className="truncate font-medium text-[#0e2038]">
//                               {campaign.adAccountId}
//                             </div>
//                             <div className="text-xs text-[#999d9b]">
//                               ID: {campaign.campaignId}
//                             </div>
//                           </div>
//                         </div>
//                       </td>
//                       <td className="border-r border-[#F0F0F0] px-4 py-4">
//                         <div className="truncate font-medium text-[#0e2038]">
//                           {campaign.name}
//                         </div>
//                         <div className="text-xs text-[#999d9b]">
//                           ID: {campaign.campaignId}
//                         </div>
//                       </td>
//                       <td className="border-r border-[#F0F0F0] px-4 py-4">
//                         <span
//                           className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${statusStyle.bg} ${statusStyle.text}`}
//                         >
//                           <span
//                             className={`h-1.5 w-1.5 rounded-full ${statusStyle.dot}`}
//                           />
//                           {statusStyle.label}
//                         </span>
//                       </td>
//                       <td className="border-r border-[#F0F0F0] px-4 py-4 text-sm text-[#0e2038]">
//                         ${campaign.budget.toFixed(2)}/day
//                       </td>
//                       <td className="border-r border-[#F0F0F0] px-4 py-4 text-sm font-medium text-[#0e2038]">
//                         ${campaign.totalSpend.toFixed(2)}
//                       </td>
//                       <td className="border-r border-[#F0F0F0] px-4 py-4 text-sm text-[#0e2038]">
//                         {campaign.results.count.toLocaleString()} {resultLabel}
//                       </td>
//                       <td className="px-4 py-4">
//                         <div className="flex items-center justify-center gap-2">
//                           <button className="flex h-7 w-7 items-center justify-center rounded border border-[#EDEDED] text-[#7f8482] hover:bg-gray-100 hover:text-[#0e2038] transition-colors">
//                             <MoreVertical size={14} />
//                           </button>
//                         </div>
//                       </td>
//                     </tr>
//                   );
//                 })
//               ) : (
//                 <tr>
//                   <td
//                     colSpan={7}
//                     className="px-4 py-8 text-center text-sm text-[#7f8482]"
//                   >
//                     No campaigns found.
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>

//         {/* Pagination */}
//         <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between pt-2">
//           <div className="flex items-center gap-2 text-sm text-[#7f8482]">
//             Show
//             <select className="rounded border border-[#eceff3] px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#F74608]">
//               <option>10</option>
//               <option>20</option>
//               <option>50</option>
//             </select>
//             Per Page
//           </div>

//           <div className="flex flex-wrap items-center gap-1.5">
//             <button
//               onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
//               disabled={currentPage === 1}
//               className="flex h-8 w-8 items-center justify-center rounded text-[#7f8482] transition-colors hover:bg-gray-50 disabled:opacity-40"
//             >
//               <ChevronLeft size={16} />
//             </button>

//             {Array.from(
//               { length: Math.min(totalPages, 5) },
//               (_, i) => i + 1,
//             ).map((page) => (
//               <button
//                 key={page}
//                 onClick={() => setCurrentPage(page)}
//                 className={`h-8 w-8 rounded text-sm font-medium transition-colors ${
//                   currentPage === page
//                     ? "bg-[#F74608] text-white"
//                     : "border border-transparent text-[#7f8482] hover:border-[#eceff3] hover:bg-gray-50"
//                 }`}
//               >
//                 {page}
//               </button>
//             ))}

//             {totalPages > 5 && (
//               <>
//                 <span className="text-sm text-[#7f8482]">...</span>
//                 <button
//                   onClick={() => setCurrentPage(totalPages)}
//                   className="h-8 w-8 rounded border border-transparent text-sm font-medium text-[#7f8482] transition-colors hover:border-[#eceff3] hover:bg-gray-50"
//                 >
//                   {totalPages}
//                 </button>
//               </>
//             )}

//             <button
//               onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
//               disabled={currentPage === totalPages}
//               className="flex h-8 w-8 items-center justify-center rounded text-[#7f8482] transition-colors hover:bg-gray-50 disabled:opacity-40"
//             >
//               <ChevronRight size={16} />
//             </button>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

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
    bg: "bg-[#F3F4F6] dark:bg-zinc-800",
    text: "text-[#6B7280] dark:text-zinc-400",
    dot: "bg-[#9CA3AF]",
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
    <section className="flex w-full flex-col rounded-xl border border-[#E9E9E9] dark:border-zinc-700 bg-[var(--color-white,#ffffff)] dark:bg-zinc-900 transition-colors">
      {/* Header Section */}
      <div className="border-b border-[#eceff3] dark:border-zinc-700 p-4">
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
          <div className="flex flex-wrap items-center gap-1 rounded-lg border border-[var(--color-line,#eceff3)] dark:border-zinc-700 bg-[var(--color-surface,#f7f8fa)] dark:bg-zinc-800 p-1 w-full lg:w-auto">
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
                    ? "bg-[var(--color-white,#ffffff)] dark:bg-zinc-700 shadow-sm text-[var(--color-primary-text-500,#0e2038)] dark:text-zinc-100"
                    : "text-[var(--color-subtext-500,#7f8482)] dark:text-zinc-400 hover:bg-[var(--color-white,#ffffff)]/60 dark:hover:bg-zinc-700/50"
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
              className="w-full rounded-lg border border-[var(--color-line,#eceff3)] dark:border-zinc-700 bg-[var(--color-white,#ffffff)] dark:bg-zinc-800 pl-10 pr-4 py-2.5 font-sans text-sm text-[var(--color-primary-text-500,#0e2038)] dark:text-zinc-100 outline-none placeholder:text-[var(--color-subtext-400,#999d9b)] dark:placeholder:text-zinc-500 focus:ring-2 focus:ring-[var(--color-adsfixter-primary,#F74608)] focus:border-transparent"
            />
          </div>
        </div>

        {/* Table Container */}
        <div className="w-full overflow-x-auto rounded-lg border border-[#F0F0F0] dark:border-zinc-700">
          <table className="w-full min-w-[1100px] border-collapse text-sm">
            <thead>
              <tr className="border-b border-[#EDEDED] dark:border-zinc-700 bg-[var(--table-header-bg,#F2F3F3)] dark:bg-zinc-800 text-left text-xs font-medium text-[#525866] dark:text-zinc-400">
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
                    className="border-r border-[#EDEDED] dark:border-zinc-700 px-4 py-3 hover:bg-gray-200/60 dark:hover:bg-zinc-700 cursor-pointer transition-colors select-none last:border-r-0"
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
                      className="border-b border-[#F0F0F0] dark:border-zinc-700 hover:bg-[var(--color-surface,#f7f8fa)]/40 dark:hover:bg-zinc-800/30 transition-colors last:border-b-0"
                    >
                      {/* Ad Account */}
                      <td className="border-r border-[#F0F0F0] dark:border-zinc-700 px-4 py-4 last:border-r-0">
                        <div className="flex items-center gap-3">
                          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-gray-100 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-xs font-bold text-blue-600 dark:text-blue-400 shadow-sm">
                            {campaign.adAccountId.includes("Boost") ? "G" : "M"}
                          </div>
                          <div className="min-w-0">
                            <div className="truncate font-sans font-medium text-[var(--color-primary-text-500,#0e2038)] dark:text-zinc-200">
                              {campaign.adAccountId}
                            </div>
                            <div className="font-sans text-xs text-[var(--color-subtext-400,#999d9b)] dark:text-zinc-400">
                              ID: {campaign.campaignId}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Campaign */}
                      <td className="border-r border-[#F0F0F0] dark:border-zinc-700 px-4 py-4 last:border-r-0">
                        <div className="truncate font-sans font-medium text-[var(--color-primary-text-500,#0e2038)] dark:text-zinc-200">
                          {campaign.name}
                        </div>
                        <div className="font-sans text-xs text-[var(--color-subtext-400,#999d9b)] dark:text-zinc-400">
                          ID: {campaign.campaignId}
                        </div>
                      </td>

                      {/* Status */}
                      <td className="border-r border-[#F0F0F0] dark:border-zinc-700 px-4 py-4 last:border-r-0">
                        <span
                          className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 font-sans text-xs font-medium ${statusStyle.bg} ${statusStyle.text}`}
                        >
                          <span
                            className={`h-1.5 w-1.5 rounded-full ${statusStyle.dot}`}
                          />
                          {statusStyle.label}
                        </span>
                      </td>

                      {/* Budget */}
                      <td className="border-r border-[#F0F0F0] dark:border-zinc-700 px-4 py-4 font-sans text-sm text-[var(--color-primary-text-500,#0e2038)] dark:text-zinc-300 last:border-r-0">
                        ${campaign.budget.toFixed(2)}/day
                      </td>

                      {/* Total Spend */}
                      <td className="border-r border-[#F0F0F0] dark:border-zinc-700 px-4 py-4 font-sans text-sm font-medium text-[var(--color-primary-text-500,#0e2038)] dark:text-zinc-200 last:border-r-0">
                        ${campaign.totalSpend.toFixed(2)}
                      </td>

                      {/* Results */}
                      <td className="border-r border-[#F0F0F0] dark:border-zinc-700 px-4 py-4 font-sans text-sm text-[var(--color-primary-text-500,#0e2038)] dark:text-zinc-300 last:border-r-0">
                        {campaign.results.count.toLocaleString()} {resultLabel}
                      </td>

                      {/* Action */}
                      <td className="px-4 py-4">
                        <div className="flex items-center justify-center gap-2">
                          <button 
                            type="button"
                            className="flex h-7 w-7 items-center justify-center rounded border border-[#EDEDED] dark:border-zinc-700 text-[var(--color-subtext-500,#7f8482)] dark:text-zinc-400 hover:bg-gray-100 dark:hover:bg-zinc-800 hover:text-[var(--color-primary-text-500,#0e2038)] dark:hover:text-zinc-200 transition-colors"
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
                    className="px-4 py-8 text-center font-sans text-sm text-[var(--color-subtext-500,#7f8482)] dark:text-zinc-400"
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
              className="rounded border border-[var(--color-line,#eceff3)] dark:border-zinc-700 bg-[var(--color-white,#ffffff)] dark:bg-zinc-800 px-3 py-1.5 font-sans text-sm text-[var(--color-primary-text-500,#0e2038)] dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-[var(--color-adsfixter-primary,#F74608)]"
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