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

const IconBox = ({ children }: { children: React.ReactNode }) => (
  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#F6F6F6]">
    {children}
  </div>
);
const ICON_MAP: Record<StatCardData["icon"], React.FC> = {
  wallet: () => (
    <IconBox>
      <svg
        width="13"
        height="12"
        viewBox="0 0 13 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M8.5 4.83333H9.83333M10.5 2.5C10.5 1.39543 9.60457 0.5 8.5 0.5H4.61429C2.90012 0.5 2.04304 0.5 1.44221 0.936533C1.24816 1.07751 1.07751 1.24816 0.936533 1.44221C0.5 2.04304 0.5 2.90012 0.5 4.61429V7.83333M4.61429 11.1667H8.38571C10.0999 11.1667 10.957 11.1667 11.5578 10.7301C11.7518 10.5892 11.9225 10.4185 12.0635 10.2245C12.5 9.62363 12.5 8.76654 12.5 7.05238V6.61429C12.5 4.90012 12.5 4.04304 12.0635 3.4422C11.9225 3.24816 11.7518 3.07751 11.5578 2.93653C10.957 2.5 10.0999 2.5 8.38571 2.5H4.61429C2.90012 2.5 2.04304 2.5 1.44221 2.93653C1.24816 3.07751 1.07751 3.24816 0.936533 3.4422C0.5 4.04304 0.5 4.90012 0.5 6.61428V7.05238C0.5 8.76654 0.5 9.62363 0.936533 10.2245C1.07751 10.4185 1.24816 10.5892 1.44221 10.7301C2.04304 11.1667 2.90012 11.1667 4.61429 11.1667Z"
          stroke="#0E2038"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </IconBox>
  ),

  "arrow-down-tray": () => (
    <IconBox>
      <svg
        width="13"
        height="13"
        viewBox="0 0 13 13"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12.5 7.16667C12.5 8.40663 12.5 9.02661 12.3637 9.53528C11.9938 10.9156 10.9156 11.9938 9.53528 12.3637C9.02661 12.5 8.40663 12.5 7.16667 12.5H5.83333C4.59337 12.5 3.97339 12.5 3.46472 12.3637C2.08436 11.9938 1.00617 10.9156 0.636297 9.53528C0.5 9.02661 0.5 8.40663 0.5 7.16667M6.5 0.5L6.5 8.5M4.5 6.5L6.5 8.5L8.5 6.5"
          stroke="#0E2038"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </IconBox>
  ),

  "dollar-sign": () => (
    <IconBox>
      <svg
        width="9"
        height="13"
        viewBox="0 0 9 13"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M4.5 1.83333H6.17333C7.45832 1.83333 8.5 2.87502 8.5 4.16V4.16667M4.5 1.83333H2.83333C1.54467 1.83333 0.5 2.878 0.5 4.16667C0.5 5.45533 1.54467 6.5 2.83333 6.5H4.5M4.5 1.83333V0.5M4.5 1.83333V6.5M4.5 6.5V11.1667M4.5 6.5H6.16667C7.45533 6.5 8.5 7.54467 8.5 8.83333C8.5 10.122 7.45533 11.1667 6.16667 11.1667H4.5M4.5 11.1667H2.83333C1.54467 11.1667 0.5 10.122 0.5 8.83333M4.5 11.1667V12.5"
          stroke="#0E2038"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </IconBox>
  ),

  "credit-badge": () => (
    <IconBox>
      <svg
        width="13"
        height="13"
        viewBox="0 0 13 13"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M6.08645 12C5.81141 12 5.58845 12.223 5.58845 12.498C5.58845 12.7731 5.81141 12.996 6.08645 12.996V12.498V12ZM0.496094 3.63372H-0.00190625C-0.00190625 3.90875 0.221056 4.13172 0.496094 4.13172L0.496094 3.63372ZM0.994094 1.27669C0.994094 1.00165 0.771132 0.778693 0.496094 0.778693C0.221056 0.778693 -0.00190625 1.00165 -0.00190625 1.27669H0.496094H0.994094ZM2.85312 4.13172C3.12815 4.13172 3.35112 3.90875 3.35112 3.63372C3.35112 3.35868 3.12815 3.13572 2.85312 3.13572V3.63372V4.13172ZM6.08645 7.16471H5.58845C5.58845 7.43975 5.81141 7.66271 6.08645 7.66271V7.16471ZM6.58445 4.49805C6.58445 4.22301 6.36149 4.00005 6.08645 4.00005C5.81141 4.00005 5.58845 4.22301 5.58845 4.49805H6.08645H6.58445ZM8.08645 7.66271C8.36149 7.66271 8.58445 7.43975 8.58445 7.16471C8.58445 6.88968 8.36149 6.66671 8.08645 6.66671V7.16471V7.66271ZM6.08645 12.498V12.996C9.6752 12.996 12.5844 10.0868 12.5844 6.49805H12.0864H11.5884C11.5884 9.53672 9.12512 12 6.08645 12V12.498ZM12.0864 6.49805H12.5844C12.5844 2.9093 9.6752 4.68791e-05 6.08645 4.68791e-05V0.498047V0.996047C9.12512 0.996047 11.5884 3.45938 11.5884 6.49805H12.0864ZM0.496094 3.63372H0.994094V1.27669H0.496094H-0.00190625V3.63372H0.496094ZM0.496094 3.63372V4.13172H0.812997V3.63372V3.13572H0.496094V3.63372ZM0.812997 3.63372V4.13172H2.85312V3.63372V3.13572H0.812997V3.63372ZM6.08645 0.498047V4.68791e-05C3.62044 4.68791e-05 1.47604 1.37391 0.375595 3.39563L0.812997 3.63372L1.2504 3.8718C2.18345 2.1576 3.99967 0.996047 6.08645 0.996047V0.498047ZM6.08645 7.16471H6.58445V4.49805H6.08645H5.58845V7.16471H6.08645ZM6.08645 7.16471V7.66271H8.08645V7.16471V6.66671H6.08645V7.16471Z"
          fill="#0E2038"
        />
      </svg>
    </IconBox>
  ),

  "user-group": () => (
    <svg
      width="13"
      height="12"
      viewBox="0 0 13 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12.4833 8.14924L8.45752 1.17639C7.54996 -0.395612 5.24603 -0.388645 4.34245 1.17639L0.31667 8.14924C-0.588552 9.7171 0.558374 11.6707 2.3454 11.6707C3.14815 11.6707 3.94134 11.2591 4.38176 10.4962L6.39998 7.00054L8.41819 10.4962C8.85792 11.2579 9.65054 11.6707 10.4546 11.6707C12.2404 11.6707 13.389 9.71795 12.4833 8.14924ZM3.66932 10.0849C3.31399 10.7004 2.59163 10.979 1.92649 10.7878C0.971318 10.5102 0.537294 9.41234 1.02908 8.56054C1.45028 7.83098 2.38162 7.58128 3.11136 8.00257C3.84097 8.42382 4.09062 9.35519 3.66932 10.0849ZM4.56128 8.54C4.17808 7.45166 3.05647 6.8031 1.92107 7.01568L4.19397 3.07892C4.29523 3.38855 4.2241 3.23178 5.92505 6.17791L4.56128 8.54ZM11.2129 10.6428C10.4834 11.0641 9.5519 10.8146 9.13063 10.0849L5.10487 3.11203C4.33667 1.78148 5.81757 0.267802 7.13717 1.02975C7.63097 1.31485 7.4951 1.15472 11.7709 8.56054C12.1911 9.28845 11.9408 10.2226 11.2129 10.6428Z"
        fill="black"
      />
    </svg>
  ),

  token: () => (
    <IconBox>
      <svg
        width="12"
        height="11"
        viewBox="0 0 12 11"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M3.79167 0.5H2.53343C0.80115 0.5 -0.133385 2.53188 0.993967 3.84713C1.64481 4.60644 1.64481 5.72689 0.993967 6.4862C-0.133385 7.80145 0.801149 9.83333 2.53343 9.83333H3.79167M3.79167 0.5H9.0499C10.7822 0.5 11.7167 2.53188 10.5894 3.84713C9.93853 4.60644 9.93853 5.72689 10.5894 6.4862C11.7167 7.80145 10.7822 9.83333 9.0499 9.83333H3.79167M3.79167 0.5V2.16667M3.79167 4.16667V5.16667M3.79167 9.83333V7.16667"
          stroke="#0E2038"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </IconBox>
  ),
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
          <h1 className="m-0 font-sans h6-medium  leading-[120%] tracking-[0%] text-[var(--color-primary-text-500,#0e2038)]">
            {title}
          </h1>

          <p className="m-0 flex items-center gap-1 mt-2">
            <span className="font-sans body-sm-regular font-normal leading-[150%] tracking-[-1%] text-[var(--color-subtext-500,#7f8482)]">
              Today is
            </span>
            <span className="font-sans body-sm-regular font-medium leading-5 tracking-[-1%] text-[var(--color-adsfixter-primary,#f74608)]">
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
              <Calendar
                size={16}
                className="text-[var(--color-subtext-500,#7f8482)]"
              />
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
        {/* {stats.map((item) => {
          const Icon = ICON_MAP[item.icon];
          return ( */}
        {stats.map((item) => {
          const IconComponent = ICON_MAP[item.icon]; // এখন এখানে আপনার SVG আসবে
          return (
            <div
              key={item.id}
              className="flex  gap-4 min-w-0 flex-col justify-between rounded-[10px] border border-[#E9E9E9] bg-[var(--color-white,#ffffff)] p-4 shadow-[0px_1px_2px_0px_#E4E5E73D]"
            >
              {/* Icon */}
              {/* <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[var(--color-primary-soft,rgba(247,70,8,0.08))]">
                {IconComponent && <IconComponent />}
              </div> */}
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[var(--color-primary-soft,rgba(247,70,8,0.08))]">
                {IconComponent && <IconComponent />}
              </div>

              {/* Title */}
              <p
                className="m-0 truncate whitespace-nowrap font-sans body-sm-regular leading-[150%] text-[var(--color-subtext-500,#7f8482)]"
                title={item.title}
              >
                {item.title}
              </p>

              {/* Value */}
              <p className="m-0 truncate whitespace-nowrap font-sans h6-medium font-medium leading-[120%] text-[var(--color-primary-text-500,#0e2038)]">
                {formatValue(item)}
              </p>

              {/* Subtitle */}
              <p
                className="m-0 truncate whitespace-nowrap font-sans 
                regular leading-[150%] text-[var(--color-subtext-400,#999d9b)]"
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
