"use client";

import { useMemo, useState } from "react";
import {
  Search,
  ChevronLeft,
  ChevronRight,
  MoreVertical,
  Eye,
  ArrowUpDown,
  ChevronDown,
} from "lucide-react";

export interface TicketData {
  ticketId: string;
  date: string;
  assetType: string;
  account: string;
  accountId: string;
  subject: string;
  description: string;
  status: string;
  statusColor: "orange" | "blue" | "green" | string;
  lastUpdate: string;
}

export interface TecketOverviewProps {
  title?: string;
  subtitle?: string;
  tickets: TicketData[];
  totalTickets?: number;
}

type SortKey = "ticketId" | "assetType" | "account" | "subject" | "status" | "lastUpdate" | null;
type SortOrder = "asc" | "desc";

const STATUS_STYLES: Record<string, { label: string; bg: string; text: string; dot: string }> = {
  "In Progress": { label: "In Progress", bg: "bg-[#FEF3E2] dark:bg-[#2c2010]", text: "text-[#92400E] dark:text-[#f59e0b]", dot: "bg-[#f59e0b]" },
  Open: { label: "Open", bg: "bg-[#EFF6FF] dark:bg-[#1e293b]", text: "text-[#1e40af] dark:text-[#3b82f6]", dot: "bg-[#3b82f6]" },
  Resolved: { label: "Resolved", bg: "bg-[#ECFDF5] dark:bg-[#064e3b]", text: "text-[#166534] dark:text-[#10b981]", dot: "bg-[#22c55e]" },
};

export default function TecketOverview({
  title = "Tickets",
  subtitle = "Track your support activity and get the help you need.",
  tickets = [],
}: TecketOverviewProps) {
 const [activeFilter, setActiveFilter] = useState<"All" | "Active" | "Pending" | "Solved">("All");
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  
  // Sorting State
  const [sortKey, setSortKey] = useState<SortKey>(null);
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");

  // Handle Sort Toggle
  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
    setCurrentPage(1);
  };

  const filteredAndSortedTickets = useMemo(() => {
    let result = [...tickets];

    // 1. Search Filter
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(t =>
        t.ticketId.toLowerCase().includes(q) ||
        t.subject.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q) ||
        t.account.toLowerCase().includes(q)
      );
    }

    // 2. Tab Filter
    if (activeFilter !== "All") {
      if (activeFilter === "Active") {
        result = result.filter(t => t.status === "In Progress" || t.status === "Open");
      } else if (activeFilter === "Pending") {
        result = result.filter(t => t.status === "In Progress");
      } else if (activeFilter === "Solved") {
        result = result.filter(t => t.status === "Resolved");
      }
    }

    // 3. Sorting Logic
    if (sortKey) {
      result.sort((a, b) => {
        let valA = a[sortKey].toLowerCase();
        let valB = b[sortKey].toLowerCase();
        
        if (valA < valB) return sortOrder === "asc" ? -1 : 1;
        if (valA > valB) return sortOrder === "asc" ? 1 : -1;
        return 0;
      });
    }

    return result;
  }, [tickets, search, activeFilter, sortKey, sortOrder]);

  const totalPages = Math.max(1, Math.ceil(filteredAndSortedTickets.length / perPage));
  const paginatedTickets = filteredAndSortedTickets.slice((currentPage - 1) * perPage, currentPage * perPage);

  // Dynamic filter counts
  const allCount = tickets.length;
  const activeCount = tickets.filter(t => t.status === "In Progress" || t.status === "Open").length;
  const pendingCount = tickets.filter(t => t.status === "In Progress").length;
  const solvedCount = tickets.filter(t => t.status === "Resolved").length;

  return (
    <section className="flex w-full flex-col gap-4 rounded-xl border border-[#E9E9E9] dark:border-zinc-700 bg-[var(--color-white,#ffffff)] dark:bg-zinc-900 p-4 transition-colors">
      {/* Title section */}
      <div className="flex flex-col gap-1">
        <h2 className="m-0 font-sans text-[22px] font-medium leading-[120%] text-[var(--color-primary-text-500,#0e2038)] dark:text-zinc-100">
          {title}
        </h2>
        <p className="m-0 font-sans text-sm leading-[150%] text-[var(--color-subtext-500,#7f8482)] dark:text-zinc-400">
          {subtitle}
        </p>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        {/* Tabs Filter */}
        <div className="flex flex-wrap items-center gap-1 rounded-lg border border-[var(--color-line,#eceff3)] dark:border-zinc-700 bg-[var(--color-surface,#f7f8fa)] dark:bg-zinc-800 p-1">
          {[
            { key: "All", label: "All", count: allCount },
            { key: "Active", label: "Active", count: activeCount },
            { key: "Pending", label: "Pending", count: pendingCount },
            { key: "Solved", label: "Solved", count: solvedCount },
          ].map(({ key, label, count }) => (
            <button
              key={key}
              type="button"
              onClick={() => {
                setActiveFilter(key as any);
                setCurrentPage(1);
              }}
              className={`rounded-md px-4 py-1.5 font-sans text-sm font-medium transition-all ${
                activeFilter === key
                  ? "bg-[var(--color-white,#ffffff)] dark:bg-zinc-700 text-[var(--color-primary-text-500,#0e2038)] dark:text-zinc-100 shadow-[0px_1px_2px_0px_#E4E5E73D]"
                  : "text-[var(--color-subtext-500,#7f8482)] dark:text-zinc-400 hover:bg-[var(--color-white,#ffffff)]/60 dark:hover:bg-zinc-700/50"
              }`}
            >
              {label} <span className="text-xs opacity-70">({count})</span>
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full lg:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-subtext-500,#7f8482)] dark:text-zinc-400" size={18} />
          <input
            type="text"
            placeholder="Search tickets..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full rounded-lg border border-[var(--color-line,#eceff3)] dark:border-zinc-700 bg-[var(--color-white,#ffffff)] dark:bg-zinc-800 pl-10 pr-4 py-2.5 font-sans text-sm text-[var(--color-primary-text-500,#0e2038)] dark:text-zinc-100 outline-none placeholder:text-[var(--color-subtext-400,#999d9b)] dark:placeholder:text-zinc-500"
          />
        </div>
      </div>

      {/* Table Section */}
      <div className="overflow-x-auto rounded-lg border border-[#F0F0F0] dark:border-zinc-700">
        <table className="w-full min-w-[1100px] border-collapse">
          <thead>
            <tr className="border-b border-[#E5E7EB] dark:border-zinc-700 bg-[var(--table-header-bg,#f8f9fa)] dark:bg-zinc-800 text-left text-xs font-medium text-[var(--color-subtext-500,#7f8482)] dark:text-zinc-400">
              {[
                { label: "Ticket ID", key: "ticketId" },
                { label: "Asset Type", key: "assetType" },
                { label: "Account", key: "account" },
                { label: "Subject", key: "subject" },
                { label: "Descriptions", key: null },
                { label: "Status", key: "status" },
                { label: "Last Update", key: "lastUpdate" },
              ].map((column, i) => (
                <th
                  key={i}
                  onClick={() => column.key && handleSort(column.key as SortKey)}
                  className={`border-r border-[#E5E7EB] dark:border-zinc-700 px-4 py-3 font-sans last:border-r-0 ${
                    column.key ? "cursor-pointer select-none hover:bg-gray-100 dark:hover:bg-zinc-700" : ""
                  }`}
                >
                  <span className="flex items-center gap-1.5">
                    {column.label}
                    {column.key && (
                      <ArrowUpDown 
                        size={14} 
                        className={`transition-colors ${sortKey === column.key ? "text-[var(--color-adsfixter-primary,#f74608)]" : "text-gray-400 dark:text-zinc-500"}`} 
                      />
                    )}
                  </span>
                </th>
              ))}
              <th className="border-r border-[#E5E7EB] dark:border-zinc-700 px-4 py-3 w-12 text-center font-sans last:border-r-0">Action</th>
            </tr>
          </thead>
          <tbody>
            {paginatedTickets.map((ticket, idx) => {
              const statusStyle = STATUS_STYLES[ticket.status] || STATUS_STYLES.Open;
              return (
                <tr
                  key={idx}
                  className="border-b border-[#F0F0F0] dark:border-zinc-700 hover:bg-[var(--color-surface,#f7f8fa)]/40 dark:hover:bg-zinc-800/30 transition-colors last:border-b-0"
                >
                  {/* Ticket ID */}
                  <td className="border-r border-[#F0F0F0] dark:border-zinc-700 px-4 py-4 last:border-r-0">
                    <div className="font-sans font-medium text-[var(--color-primary-text-500,#0e2038)] dark:text-zinc-200">
                      #{ticket.ticketId.replace("#", "")}
                    </div>
                    <div className="font-sans text-xs text-[var(--color-subtext-400,#999d9b)] dark:text-zinc-400">{ticket.date}</div>
                  </td>
                  
                  {/* Asset Type */}
                  <td className="border-r border-[#F0F0F0] dark:border-zinc-700 px-4 py-4 font-sans text-sm text-[var(--color-primary-text-500,#0e2038)] dark:text-zinc-300 last:border-r-0">
                    {ticket.assetType}
                  </td>
                  
                  {/* Account */}
                  <td className="border-r border-[#F0F0F0] dark:border-zinc-700 px-4 py-4 last:border-r-0">
                    <div className="font-sans font-medium text-[var(--color-primary-text-500,#0e2038)] dark:text-zinc-200">{ticket.account || "---"}</div>
                    {ticket.accountId && (
                      <div className="font-sans text-xs text-[var(--color-subtext-400,#999d9b)] dark:text-zinc-400">ID: {ticket.accountId}</div>
                    )}
                  </td>
                  
                  {/* Subject */}
                  <td className="border-r border-[#F0F0F0] dark:border-zinc-700 px-4 py-4 font-sans font-medium text-[var(--color-primary-text-500,#0e2038)] dark:text-zinc-200 last:border-r-0">
                    {ticket.subject}
                  </td>
                  
                  {/* Descriptions */}
                  <td className="border-r border-[#F0F0F0] dark:border-zinc-700 px-4 py-4 font-sans text-sm text-[var(--color-subtext-500,#7f8482)] dark:text-zinc-400 max-w-md truncate last:border-r-0">
                    {ticket.description}
                  </td>
                  
                  {/* Status */}
                  <td className="border-r border-[#F0F0F0] dark:border-zinc-700 px-4 py-4 last:border-r-0">
                    <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 font-sans text-xs font-medium ${statusStyle.bg} ${statusStyle.text}`}>
                      <span className={`h-1.5 w-1.5 rounded-full ${statusStyle.dot}`} />
                      {statusStyle.label}
                    </span>
                  </td>
                  
                  {/* Last Update */}
                  <td className="border-r border-[#F0F0F0] dark:border-zinc-700 px-4 py-4 font-sans text-sm text-[var(--color-subtext-500,#7f8482)] dark:text-zinc-400 last:border-r-0">
                    {ticket.lastUpdate}
                  </td>
                  
                  {/* Action Buttons */}
                  <td className="border-r border-[#F0F0F0] dark:border-zinc-700 px-4 py-4 last:border-r-0">
                    <div className="flex items-center justify-center gap-2">
                      <button type="button" className="text-[var(--color-subtext-500,#7f8482)] hover:text-[var(--color-primary-text-500,#0e2038)] dark:text-zinc-400 dark:hover:text-zinc-200 transition-colors">
                        <Eye size={18} />
                      </button>
                      <button type="button" className="text-[var(--color-subtext-500,#7f8482)] hover:text-[var(--color-primary-text-500,#0e2038)] dark:text-zinc-400 dark:hover:text-zinc-200 transition-colors">
                        <MoreVertical size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}

            {paginatedTickets.length === 0 && (
              <tr>
                <td
                  colSpan={8}
                  className="px-4 py-10 text-center font-sans text-sm text-[var(--color-subtext-500,#7f8482)] dark:text-zinc-400"
                >
                  No tickets match your search or filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Container */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
        <div className="flex items-center gap-2 font-sans text-sm text-[var(--color-subtext-500,#7f8482)] dark:text-zinc-400">
          Show
          <div className="relative">
            <select 
              value={perPage}
              onChange={(e) => {
                setPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="appearance-none rounded-lg border border-[var(--color-line,#eceff3)] dark:border-zinc-700 bg-[var(--color-white,#ffffff)] dark:bg-zinc-800 pl-3 pr-8 py-1.5 font-sans text-sm text-[var(--color-primary-text-500,#0e2038)] dark:text-zinc-100 outline-none"
            >
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
            </select>
            <ChevronDown size={14} className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>
          Per Page
        </div>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="h-8 w-8 flex items-center justify-center border border-[var(--color-line,#eceff3)] dark:border-zinc-700 rounded-md text-[var(--color-subtext-500,#7f8482)] dark:text-zinc-400 disabled:opacity-40 transition-colors hover:bg-[var(--color-surface,#f7f8fa)] dark:hover:bg-zinc-800"
          >
            <ChevronLeft size={16} />
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
            <button
              key={page}
              type="button"
              onClick={() => setCurrentPage(page)}
              className={`h-8 w-8 rounded-md font-sans text-sm font-medium transition-colors ${
                currentPage === page 
                  ? "bg-[var(--color-adsfixter-primary,#f74608)] text-[var(--color-on-primary,#ffffff)]" 
                  : "border border-[var(--color-line,#eceff3)] dark:border-zinc-700 text-[var(--color-primary-text-500,#0e2038)] dark:text-zinc-300 hover:bg-[var(--color-surface,#f7f8fa)] dark:hover:bg-zinc-800"
              }`}
            >
              {page}
            </button>
          ))}

          <button
            type="button"
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="h-8 w-8 flex items-center justify-center border border-[var(--color-line,#eceff3)] dark:border-zinc-700 rounded-md text-[var(--color-subtext-500,#7f8482)] dark:text-zinc-400 disabled:opacity-40 transition-colors hover:bg-[var(--color-surface,#f7f8fa)] dark:hover:bg-zinc-800"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </section>
  );
}