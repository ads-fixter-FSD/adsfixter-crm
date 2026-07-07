"use client";

import { useState } from "react";
import {
  Calendar,
  ChevronDown,
  Wallet,
  ArrowDownToLine,
  DollarSign,
  BadgeDollarSign,
  Users,
  Hash,
  type LucideIcon,
} from "lucide-react";

/* ------------------------------- Types ------------------------------- */

export interface StatCardData {
  id: string;
  icon:
    | "wallet"
    | "arrow-down-tray"
    | "dollar-sign"
    | "credit-badge"
    | "user-group"
    | "token";
  title: string;
  value: number;
  currencySymbol?: string;
  subtitle: string;
}

export interface OverviewTopSectionProps {
  title?: string;
  todayDate?: string;
  dateRangeLabel?: string;
  stats: StatCardData[];
}

/* ------------------------------- Icons -------------------------------- */

const ICON_MAP: Record<StatCardData["icon"], LucideIcon> = {
  wallet: Wallet,
  "arrow-down-tray": ArrowDownToLine,
  "dollar-sign": DollarSign,
  "credit-badge": BadgeDollarSign,
  "user-group": Users,
  token: Hash,
};

function formatValue(item: StatCardData) {
  if (
    item.currencySymbol !== undefined &&
    item.value !== undefined &&
    item.value !== null
  ) {
    return `${item.currencySymbol}${Number(item.value).toFixed(2)}`;
  }
  return `${item.value ?? 0}`;
}

/* ============================================================
   Overview Top Section = Header + Stats Cards
   ONE outer bordered container wraps BOTH the header row and the
   stats cards row (matches the Figma frame: 1128 x 240, radius 12,
   border #EDEDED, padding 16, gap 20 between the two inner rows).
   No `style` attribute anywhere — everything is Tailwind utility
   classes (arbitrary values used only to hit exact px/color specs).
   Only this file is "use client" (needs state for date dropdown).
   ============================================================ */
export default function OverviewTopSection({
  title = "Overview",
  todayDate = "Tuesday - June 30, 2026",
  dateRangeLabel = "Jan 2025 - Jun 2025",
  stats,
}: OverviewTopSectionProps) {
  const [isDateOpen, setIsDateOpen] = useState(false);

  return (
    <section className="flex w-full flex-col gap-5 rounded-xl border border-[#EDEDED] bg-[var(--color-white,#ffffff)] p-4">
      {/* ---------- Header row (title + date filter) ---------- */}
      <div className="flex w-full flex-col items-start justify-between gap-4 sm:flex-row sm:items-center sm:gap-0">
        {/* Title & Date Section */}
        <div className="flex flex-col">
          <h1 className="m-0 font-sans text-2xl font-medium leading-[120%] tracking-[0%] text-[var(--color-primary-text-500,#0e2038)]">
            {title}
          </h1>

          <p className="m-0 flex items-center gap-1">
            <span className="font-sans text-sm font-normal leading-[150%] tracking-[-1%] text-[var(--color-subtext-500,#7f8482)]">
              Today is
            </span>
            <span className="font-sans text-sm font-medium leading-5 tracking-[-1%] text-[var(--color-adsfixter-primary,#f74608)]">
              {todayDate}
            </span>
          </p>
        </div>

        {/* Filter Button Section */}
        <div className="relative w-full sm:w-auto">
          <button
            type="button"
            onClick={() => setIsDateOpen((prev) => !prev)}
            className="flex h-10 w-full items-center justify-between gap-2 rounded-lg border border-[var(--color-line,#eceff3)] bg-[var(--color-white,#ffffff)] px-4 py-2.5 font-sans text-sm font-medium text-[var(--color-primary-text-500,#0e2038)] sm:w-auto sm:justify-start"
          >
            <div className="flex items-center gap-2">
              <Calendar size={16} className="text-[var(--color-subtext-500,#7f8482)]" />
              <span>{dateRangeLabel}</span>
            </div>
            <ChevronDown
              size={16}
              className={`text-[var(--color-subtext-500,#7f8482)] transition-transform duration-150 ${
                isDateOpen ? "rotate-180" : "rotate-0"
              }`}
            />
          </button>

          {isDateOpen && (
            <div className="absolute right-0 top-[calc(100%+8px)] z-10 w-full rounded-[10px] border border-[var(--color-line,#eceff3)] bg-[var(--color-white,#ffffff)] p-4 shadow-[0px_4px_12px_0px_rgba(0,0,0,0.08)] sm:min-w-[260px]">
              <p className="body-sm-regular subtext-500 m-0">
                Date range picker goes here.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* ---------- Stats Cards row ---------- */}
      <div className="grid w-full grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        {stats.map((item) => {
          const Icon = ICON_MAP[item.icon];
          return (
            <div
              key={item.id}
              className="flex h-[130px] min-w-0 flex-col justify-between rounded-[10px] border border-[#E9E9E9] bg-[var(--color-white,#ffffff)] p-4 shadow-[0px_1px_2px_0px_#E4E5E73D]"
            >
              {/* Icon */}
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[var(--color-primary-soft,rgba(247,70,8,0.08))]">
                <Icon size={16} className="text-[var(--color-adsfixter-primary,#f74608)]" />
              </div>

              {/* Title */}
              <p
                className="m-0 truncate whitespace-nowrap font-sans text-sm font-normal leading-[150%] text-[var(--color-subtext-500,#7f8482)]"
                title={item.title}
              >
                {item.title}
              </p>

              {/* Value */}
              <p className="m-0 truncate whitespace-nowrap font-sans text-xl font-medium leading-[120%] text-[var(--color-primary-text-500,#0e2038)]">
                {formatValue(item)}
              </p>

              {/* Subtitle */}
              <p
                className="m-0 truncate whitespace-nowrap font-sans text-xs font-normal leading-[150%] text-[var(--color-subtext-400,#999d9b)]"
                title={item.subtitle}
              >
                {item.subtitle}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}