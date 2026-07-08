

"use client";

import { useMemo, useState } from "react";
import { Search, ChevronLeft, ChevronRight, MoreVertical, Eye } from "lucide-react";

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

const STATUS_STYLES: Record<string, { label: string; bg: string; text: string; dot: string }> = {
  "In Progress": { label: "In Progress", bg: "bg-[#FEF3E2]", text: "text-[#92400E]", dot: "bg-[#f59e0b]" },
  Open: { label: "Open", bg: "bg-[#EFF6FF]", text: "text-[#1e40af]", dot: "bg-[#3b82f6]" },
  Resolved: { label: "Resolved", bg: "bg-[#ECFDF5]", text: "text-[#166534]", dot: "bg-[#22c55e]" },
};

export default function TecketOverview({
  title = "Tickets",
  subtitle = "Track your support activity and get the help you need.",
  tickets,
  totalTickets = 12,
}: TecketOverviewProps) {
  const [activeFilter, setActiveFilter] = useState<"All" | "Active" | "Pending" | "Solved">("All");
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 10;

  const filteredTickets = useMemo(() => {
    let result = [...tickets];

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(t =>
        t.ticketId.toLowerCase().includes(q) ||
        t.subject.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q)
      );
    }

    if (activeFilter !== "All") {
      if (activeFilter === "Active") {
        result = result.filter(t => t.status === "In Progress" || t.status === "Open");
      } else if (activeFilter === "Pending") {
        result = result.filter(t => t.status === "In Progress");
      } else if (activeFilter === "Solved") {
        result = result.filter(t => t.status === "Resolved");
      }
    }

    return result;
  }, [tickets, search, activeFilter]);

  const totalPages = Math.max(1, Math.ceil(filteredTickets.length / perPage));
  const paginatedTickets = filteredTickets.slice((currentPage - 1) * perPage, currentPage * perPage);

  // Filter counts
  const allCount = tickets.length;
  const activeCount = tickets.filter(t => t.status === "In Progress" || t.status === "Open").length;
  const pendingCount = tickets.filter(t => t.status === "In Progress").length;
  const solvedCount = tickets.filter(t => t.status === "Resolved").length;

  return (
    <section className="flex w-full flex-col gap-4 rounded-xl border border-[#E9E9E9] bg-white p-4">
      <div>
        <h2 className="text-[22px] font-medium text-[#0e2038]">{title}</h2>
        <p className="mt-1 text-sm text-[#7f8482]">{subtitle}</p>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap items-center gap-1 rounded-lg border border-[#eceff3] bg-[#f7f8fa] p-1">
          {[
            { key: "All", label: "All", count: allCount },
            { key: "Active", label: "Active", count: activeCount },
            { key: "Pending", label: "Pending", count: pendingCount },
            { key: "Solved", label: "Solved", count: solvedCount },
          ].map(({ key, label, count }) => (
            <button
              key={key}
              onClick={() => {
                setActiveFilter(key as any);
                setCurrentPage(1);
              }}
              className={`rounded-md px-4 py-1.5 text-sm font-medium transition-all ${
                activeFilter === key
                  ? "bg-white shadow-sm text-[#0e2038]"
                  : "text-[#7f8482] hover:bg-white/60"
              }`}
            >
              {label} <span className="text-xs opacity-70">({count})</span>
            </button>
          ))}
        </div>

        <div className="relative w-full lg:w-80">
          <Search className="absolute left-3 top-3.5 text-[#7f8482]" size={18} />
          <input
            type="text"
            placeholder="Search tickets..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-[#eceff3] bg-white pl-10 py-2.5 text-sm focus:outline-none"
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg border border-[#F0F0F0]">
        <table className="w-full min-w-[1100px] border-collapse">
          <thead>
            <tr className="border-b border-[#E5E7EB] bg-[#f8f9fa] text-left text-xs font-medium text-[#7f8482]">
              <th className="px-4 py-3 ">Ticket ID</th>
              <th className="px-4 py-3">Asset Type</th>
              <th className="px-4 py-3">Account</th>
              <th className="px-4 py-3">Subject</th>
              <th className="px-4 py-3">Descriptions</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Last Update</th>
              <th className="px-4 py-3 w-12 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {paginatedTickets.map((ticket, idx) => {
              const statusStyle = STATUS_STYLES[ticket.status] || STATUS_STYLES.Open;
              return (
                <tr
                  key={idx}
                  className="border-b border-[#F0F0F0] hover:bg-[#f9fafb] transition-colors"
                >
                  <td className="px-4 py-4">
                    <div className="font-medium text-[#0e2038]">{ticket.ticketId}</div>
                    <div className="text-xs text-[#999d9b]">{ticket.date}</div>
                  </td>
                  <td className="px-4 py-4 text-sm">{ticket.assetType}</td>
                  <td className="px-4 py-4">
                    <div className="font-medium">{ticket.account}</div>
                    <div className="text-xs text-[#999d9b]">ID: {ticket.accountId}</div>
                  </td>
                  <td className="px-4 py-4 font-medium text-[#0e2038]">{ticket.subject}</td>
                  <td className="px-4 py-4 text-sm text-[#555] max-w-md truncate">
                    {ticket.description}
                  </td>
                  <td className="px-4 py-4">
                    <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${statusStyle.bg} ${statusStyle.text}`}>
                      <span className={`h-2 w-2 rounded-full ${statusStyle.dot}`} />
                      {statusStyle.label}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-sm text-[#555]">{ticket.lastUpdate}</td>
                  <td className="px-4 py-4">
                    <div className="flex items-center justify-center gap-2">
                      <button className="text-[#7f8482] hover:text-[#0e2038]">
                        <Eye size={18} />
                      </button>
                      <button className="text-[#7f8482] hover:text-[#0e2038]">
                        <MoreVertical size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-sm text-[#7f8482]">
          Show
          <select className="rounded border border-[#eceff3] px-3 py-1.5 text-sm">
            <option>10</option>
            <option>20</option>
            <option>50</option>
          </select>
          Per Page
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="h-8 w-8 flex items-center justify-center border rounded-md disabled:opacity-40"
          >
            <ChevronLeft size={16} />
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`h-8 w-8 rounded-md text-sm font-medium ${
                currentPage === page ? "bg-[#f74608] text-white" : "border border-[#eceff3]"
              }`}
            >
              {page}
            </button>
          ))}

          <button
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="h-8 w-8 flex items-center justify-center border rounded-md disabled:opacity-40"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </section>
  );
}