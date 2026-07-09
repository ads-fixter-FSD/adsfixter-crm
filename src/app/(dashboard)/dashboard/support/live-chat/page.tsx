"use client";

import React, { useState } from "react";
import {
  Ticket,
  ChevronRight,
  Paperclip,
  Smile,
  Send,
  LifeBuoy,
  X,
} from "lucide-react";
import { PrimaryButton } from "@/components/shared-buttons";

// ---------------- Types ----------------
type TicketStatus = "Open" | "In Progress" | "Pending" | "Resolved";
type FilterKey = "all" | "active" | "pending" | "solved";

type SupportTicket = {
  id: string;
  title: string;
  ticketNumber: string;
  subtitle: string;
  refId: string;
  status: TicketStatus;
  timeAgo: string;
};

type ChatAttachment = {
  type: "image";
  url: string;
};

type ChatMessage = {
  id: string;
  sender: "agent" | "user";
  text?: string;
  attachments?: ChatAttachment[];
  time: string;
  seen?: boolean;
};

// ---------------- Sample data ----------------
const tickets: SupportTicket[] = [
  {
    id: "1",
    title: "Account restriction",
    ticketNumber: "#TK-2024-0012",
    subtitle: "ADF1001-UrbanCart Fashion",
    refId: "91827364518273",
    status: "Open",
    timeAgo: "30 min ago",
  },
  {
    id: "2",
    title: "Ad consultancy",
    ticketNumber: "#TK-2024-0012",
    subtitle: "ADF1001-UrbanCart Fashion",
    refId: "91827364518273",
    status: "In Progress",
    timeAgo: "30 min ago",
  },
  {
    id: "3",
    title: "Ad consultancy",
    ticketNumber: "#TK-2024-0012",
    subtitle: "ADF1001-UrbanCart Fashion",
    refId: "91827364518273",
    status: "In Progress",
    timeAgo: "30 min ago",
  },
  {
    id: "4",
    title: "Ad consultancy",
    ticketNumber: "#TK-2024-0012",
    subtitle: "ADF1001-UrbanCart Fashion",
    refId: "91827364518273",
    status: "Resolved",
    timeAgo: "30 min ago",
  },
  {
    id: "5",
    title: "Ad consultancy",
    ticketNumber: "#TK-2024-0012",
    subtitle: "ADF1001-UrbanCart Fashion",
    refId: "91827364518273",
    status: "Resolved",
    timeAgo: "30 min ago",
  },
  {
    id: "6",
    title: "Ad consultancy",
    ticketNumber: "#TK-2024-0012",
    subtitle: "ADF1001-UrbanCart Fashion",
    refId: "91827364518273",
    status: "Resolved",
    timeAgo: "30 min ago",
  },
  {
    id: "7",
    title: "Billing dispute",
    ticketNumber: "#TK-2024-0013",
    subtitle: "ADF1001-UrbanCart Fashion",
    refId: "91827364518273",
    status: "Pending",
    timeAgo: "45 min ago",
  },
  {
    id: "8",
    title: "Payout delay",
    ticketNumber: "#TK-2024-0014",
    subtitle: "ADF1001-UrbanCart Fashion",
    refId: "91827364518273",
    status: "Pending",
    timeAgo: "1 hrs ago",
  },
];

const initialMessages: ChatMessage[] = [
  {
    id: "1",
    sender: "agent",
    text: "Hi Mr. Tarikul👋\nWelcome to MetaBari Helpdest, how can we assist you today?",
    time: "10:30 AM",
  },
  {
    id: "2",
    sender: "user",
    text: "Hi, I need help with setting up my CRM",
    time: "10:30 AM",
    seen: true,
  },
  {
    id: "3",
    sender: "agent",
    text: "Hi Mr. Tarikul👋\nWelcome to MetaBari Helpdest, how can we assist you today?",
    time: "10:30 AM",
  },
  {
    id: "4",
    sender: "user",
    text: "This is my issue help me to solve.",
    attachments: [
      {
        type: "image",
        url: "https://images.unsplash.com/photo-1614850523060-8da1d56ae167?w=200&q=80",
      },
      {
        type: "image",
        url: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=200&q=80",
      },
    ],
    time: "10:30 AM",
    seen: true,
  },
];

// A ticket is "Active" if it's Open or In Progress, "Pending" if waiting
// on the customer/other party, and "Solved" once Resolved.
const filterMatchers: Record<Exclude<FilterKey, "all">, (t: SupportTicket) => boolean> = {
  active: (t) => t.status === "Open" || t.status === "In Progress",
  pending: (t) => t.status === "Pending",
  solved: (t) => t.status === "Resolved",
};

const getFilterCount = (key: FilterKey, list: SupportTicket[]) =>
  key === "all" ? list.length : list.filter(filterMatchers[key]).length;

const filterLabels: { key: FilterKey; label: string }[] = [
  { key: "all", label: "All" },
  { key: "active", label: "Active" },
  { key: "pending", label: "Pending" },
  { key: "solved", label: "Solved" },
];

const statusStyles: Record<TicketStatus, string> = {
  Open: "bg-[#EAF0FF] text-[#3B5FE0]",
  "In Progress": "bg-[#FFECE6] text-[#F74608]",
  Pending: "bg-[#FFF4E5] text-[#B7791F]",
  Resolved: "bg-[#E8F5E9] text-[#2E7D32]",
};

const statusDot: Record<TicketStatus, string> = {
  Open: "bg-[#3B5FE0]",
  "In Progress": "bg-[#F74608]",
  Pending: "bg-[#B7791F]",
  Resolved: "bg-[#4CAF50]",
};

const StatusBadge = ({ status }: { status: TicketStatus }) => (
  <span
    className={`inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-medium whitespace-nowrap ${statusStyles[status]}`}
  >
    <span className={`h-1.5 w-1.5 rounded-full ${statusDot[status]}`} />
    {status === "In Progress" ? "In Progess" : status}
  </span>
);

// ---------------- Main Page ----------------
const TicketsPage = () => {
  const [activeFilter, setActiveFilter] = useState<FilterKey>("all");
  const [selectedTicketId, setSelectedTicketId] = useState(tickets[0].id);
  const [activeTab, setActiveTab] = useState<"message" | "details">(
    "details"
  );
  const [messageText, setMessageText] = useState("");

  const selectedTicket =
    tickets.find((t) => t.id === selectedTicketId) ?? tickets[0];

  // Everything below is derived live from the raw `tickets` array —
  // change/add/remove a ticket up top and both the tab counts and the
  // visible list update automatically.
  const visibleTickets =
    activeFilter === "all"
      ? tickets
      : tickets.filter(filterMatchers[activeFilter]);

  return (
    <div className="min-h-screen p-6 max-[640px]:p-4">
      <div className="mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between rounded-xl border border-[#F0F0F0] p-6 max-[640px]:flex-col max-[640px]:items-start max-[640px]:gap-4">
          <div>
            <h2 className="text-lg font-semibold text-[#0F172A]">Tickets</h2>
            <p className="mt-1 text-sm text-gray-400">
              Track your support activity and get the help you need.
            </p>
          </div>
          <PrimaryButton className="min-h-10 gap-2 px-4 py-2 !bg-[#F74608] hover:!bg-[#e03d04] border-0 text-white max-[640px]:w-full">
            <Ticket size={16} />
            Open New Ticket
          </PrimaryButton>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* ---------------- LEFT: Ticket List ---------------- */}
          <div className="flex flex-col rounded-xl border border-[#F0F0F0] p-5">
            {/* Filter Tabs */}
            <div className="flex flex-wrap items-center gap-1.5 rounded-xl border border-[#F0F0F0] bg-white p-1.5">
              {filterLabels.map((tab) => (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => setActiveFilter(tab.key)}
                  className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition ${
                    activeFilter === tab.key
                      ? "border border-[#EDEDED] bg-white text-[#0F172A] shadow-sm"
                      : "text-[#71717A] hover:text-[#334155]"
                  }`}
                >
                  {tab.label}
                  <span
                    className={`flex h-5 min-w-5 items-center justify-center rounded-full px-1 text-[11px] font-semibold ${
                      activeFilter === tab.key
                        ? "bg-[#F2F3F3] text-[#334155]"
                        : "bg-[#F2F3F3] text-[#71717A]"
                    }`}
                  >
                    {getFilterCount(tab.key, tickets)}
                  </span>
                </button>
              ))}
            </div>

            {/* Ticket Cards */}
            <div className="mt-4 flex-1 space-y-3 overflow-y-auto">
              {visibleTickets.length === 0 ? (
                <div className="flex flex-col items-center justify-center gap-2 py-10 text-center text-sm text-[#94A3B8]">
                  No tickets in this category.
                </div>
              ) : (
                visibleTickets.map((ticket) => {
                  const isSelected = ticket.id === selectedTicketId;
                  return (
                    <button
                      key={ticket.id}
                      type="button"
                      onClick={() => setSelectedTicketId(ticket.id)}
                      className={`w-full rounded-xl border p-4 text-left transition ${
                        isSelected
                          ? "border-[#FBD8C7] bg-[#FFF6F2]"
                          : "border-[#F0F0F0] bg-white hover:bg-[#F8FAFC]"
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#FFECE6] text-sm font-semibold text-[#F74608]">
                          U
                        </span>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center justify-between gap-2">
                            <div className="flex items-center gap-1.5 truncate text-sm font-semibold text-[#0F172A]">
                              {ticket.title}
                              <span className="font-normal text-[#94A3B8]">
                                {ticket.ticketNumber}
                              </span>
                            </div>
                            <StatusBadge status={ticket.status} />
                          </div>
                          <div className="mt-1 text-sm font-medium text-[#334155]">
                            {ticket.subtitle}
                          </div>
                          <div className="mt-2 flex items-center justify-between text-xs text-[#94A3B8]">
                            <span>ID: {ticket.refId}</span>
                            <span>{ticket.timeAgo}</span>
                          </div>
                        </div>
                      </div>
                    </button>
                  );
                })
              )}
            </div>

            {/* View All Tickets */}
            <button
              type="button"
              className="mt-4 inline-flex items-center justify-center gap-1.5 rounded-xl border border-[#F0F0F0] py-2.5 text-sm font-semibold text-[#334155] transition hover:bg-[#F8FAFC]"
            >
              View All Tickets
              <ChevronRight size={15} />
            </button>
          </div>

          {/* ---------------- RIGHT: Conversation Panel ---------------- */}
          <div className="flex flex-col rounded-xl border border-[#F0F0F0]">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-[#F0F0F0] p-5">
              <div>
                <h3 className="text-lg font-semibold text-[#0F172A]">
                  {selectedTicket.title}
                </h3>
                <p className="mt-0.5 text-xs text-[#94A3B8]">
                  {selectedTicket.ticketNumber} &middot; Created 2 min ago
                </p>
              </div>
              <StatusBadge status={selectedTicket.status} />
            </div>

            {/* Tabs */}
            <div className="flex items-center gap-2 p-5 pb-0">
              <button
                type="button"
                onClick={() => setActiveTab("message")}
                className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${
                  activeTab === "message"
                    ? "bg-[#0F172A] text-white"
                    : "border border-[#E4E4E7] text-[#334155] hover:bg-[#F8FAFC]"
                }`}
              >
                Message
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("details")}
                className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${
                  activeTab === "details"
                    ? "bg-[#0F172A] text-white"
                    : "border border-[#E4E4E7] text-[#334155] hover:bg-[#F8FAFC]"
                }`}
              >
                Details
              </button>
            </div>

            {/* Start Conversation divider */}
            <div className="flex items-center gap-3 px-5 pt-5">
              <span className="h-px flex-1 bg-[#F0F0F0]" />
              <span className="text-xs font-medium text-[#94A3B8]">
                Start Conversation
              </span>
              <span className="h-px flex-1 bg-[#F0F0F0]" />
            </div>

            {/* Messages */}
            <div className="flex-1 space-y-4 overflow-y-auto p-5">
              {initialMessages.map((msg) =>
                msg.sender === "agent" ? (
                  <div key={msg.id} className="flex items-start gap-2.5">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#F74608] text-white">
                      <LifeBuoy size={15} />
                    </span>
                    <div>
                      <div className="max-w-sm rounded-2xl rounded-tl-sm bg-[#F2F3F3] px-4 py-2.5 text-sm text-[#1E293B] whitespace-pre-line">
                        {msg.text}
                      </div>
                      <div className="mt-1 text-[11px] text-[#94A3B8]">
                        {msg.time}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div key={msg.id} className="flex flex-col items-end">
                    {msg.attachments && (
                      <div className="mb-1.5 flex gap-2 rounded-2xl rounded-tr-sm bg-[#F2F3F3] p-2.5">
                        {msg.attachments.map((att, i) => (
                          <img
                            key={i}
                            src={att.url}
                            alt="attachment"
                            className="h-14 w-14 rounded-lg object-cover"
                          />
                        ))}
                      </div>
                    )}
                    {msg.text && (
                      <div className="max-w-sm rounded-2xl rounded-tr-sm bg-[#F2F3F3] px-4 py-2.5 text-sm text-[#1E293B]">
                        {msg.text}
                      </div>
                    )}
                    <div className="mt-1 flex items-center gap-1 text-[11px] text-[#94A3B8]">
                      {msg.time}
                      {msg.seen && (
                        <span className="text-[#4CAF50]">✓✓</span>
                      )}
                    </div>
                  </div>
                )
              )}

              {/* Connecting indicator */}
              <div className="flex items-center gap-2.5">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#F74608] text-white">
                  <LifeBuoy size={15} />
                </span>
                <span className="text-sm text-[#64748B]">
                  Connecting you to an agent
                </span>
                <span className="flex gap-0.5">
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#F74608] [animation-delay:0ms]" />
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#F74608] [animation-delay:150ms]" />
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#F74608] [animation-delay:300ms]" />
                </span>
              </div>
            </div>

            {/* Message Input */}
            <div className="border-t border-[#F0F0F0] p-4">
              <div className="rounded-xl border border-[#E4E4E7] p-3">
                {/* Attached file chips */}
                <div className="mb-2 flex gap-2">
                  <span className="relative h-8 w-8 overflow-hidden rounded-md">
                    <img
                      src="https://images.unsplash.com/photo-1614850523060-8da1d56ae167?w=100&q=80"
                      alt="attachment"
                      className="h-full w-full object-cover"
                    />
                    <button
                      type="button"
                      aria-label="Remove attachment"
                      className="absolute -right-1 -top-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-white text-[#71717A] shadow"
                    >
                      <X size={9} />
                    </button>
                  </span>
                  <span className="relative flex h-8 w-8 items-center justify-center overflow-hidden rounded-md bg-[#0F172A] text-[10px] font-bold text-white">
                    AD
                    <button
                      type="button"
                      aria-label="Remove attachment"
                      className="absolute -right-1 -top-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-white text-[#71717A] shadow"
                    >
                      <X size={9} />
                    </button>
                  </span>
                </div>

                <textarea
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  placeholder="I have been facing an issue while requesting an ad account. Need to fix this."
                  rows={2}
                  className="w-full resize-none bg-transparent text-sm text-[#1E293B] outline-none placeholder:text-[#94A3B8]"
                />

                <div className="flex items-center justify-end gap-2 pt-1">
                  <button
                    type="button"
                    aria-label="Attach file"
                    className="flex h-8 w-8 items-center justify-center rounded-lg text-[#94A3B8] transition hover:bg-[#F8FAFC] hover:text-[#475569]"
                  >
                    <Paperclip size={17} />
                  </button>
                  <button
                    type="button"
                    aria-label="Add emoji"
                    className="flex h-8 w-8 items-center justify-center rounded-lg text-[#94A3B8] transition hover:bg-[#F8FAFC] hover:text-[#475569]"
                  >
                    <Smile size={17} />
                  </button>
                  <button
                    type="button"
                    aria-label="Send message"
                    className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#F74608] text-white transition hover:bg-[#e03d04]"
                  >
                    <Send size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketsPage;