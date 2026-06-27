"use client";

import { CalendarDays, ChevronDown } from "lucide-react";
import { useMemo, useRef, useState } from "react";
import { useClickOutside } from "@/hooks/use-click-outside";

export type DateRangeValue = {
  id: string;
  label: string;
  startDate: string;
  endDate: string;
};

type DateRangeFilterProps = {
  value: DateRangeValue;
  onChange: (range: DateRangeValue) => void;
};

const dateFormatter = new Intl.DateTimeFormat("en", {
  month: "short",
  day: "numeric",
  year: "numeric",
});

function parseDateKey(dateKey: string) {
  return new Date(`${dateKey}T00:00:00`);
}

function toDateKey(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function addDays(date: Date, days: number) {
  const nextDate = new Date(date);
  nextDate.setDate(nextDate.getDate() + days);
  return nextDate;
}

function getStartOfWeek(date: Date) {
  const day = date.getDay();
  const distanceFromMonday = day === 0 ? 6 : day - 1;
  return addDays(date, -distanceFromMonday);
}

function getStartOfMonth(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

function getEndOfMonth(date: Date) {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0);
}

function getStartOfYear(date: Date) {
  return new Date(date.getFullYear(), 0, 1);
}

function getEndOfYear(date: Date) {
  return new Date(date.getFullYear(), 11, 31);
}

export function formatDateRangeLabel(startDate: string, endDate: string) {
  if (startDate === endDate) {
    return dateFormatter.format(parseDateKey(startDate));
  }

  return `${dateFormatter.format(parseDateKey(startDate))} - ${dateFormatter.format(parseDateKey(endDate))}`;
}

function createDateRange(id: string, label: string, startDate: Date, endDate: Date): DateRangeValue {
  const startDateKey = toDateKey(startDate);
  const endDateKey = toDateKey(endDate);

  return {
    id,
    label,
    startDate: startDateKey,
    endDate: endDateKey,
  };
}

export function createDefaultDateRange() {
  const today = new Date();
  return createDateRange("this-month", "This Month", getStartOfMonth(today), getEndOfMonth(today));
}

function createDateRangeOptions() {
  const today = new Date();
  const weekStart = getStartOfWeek(today);
  const previousMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1);

  return [
    createDateRange("today", "Today", today, today),
    createDateRange("this-week", "This Week", weekStart, addDays(weekStart, 6)),
    createDateRange("this-month", "This Month", getStartOfMonth(today), getEndOfMonth(today)),
    createDateRange("last-month", "Last Month", getStartOfMonth(previousMonth), getEndOfMonth(previousMonth)),
    createDateRange("this-year", "This Year", getStartOfYear(today), getEndOfYear(today)),
  ];
}

export function isDateWithinRange(dateKey: string, range: DateRangeValue) {
  return dateKey >= range.startDate && dateKey <= range.endDate;
}

export function DateRangeFilter({ value, onChange }: DateRangeFilterProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [customStartDate, setCustomStartDate] = useState(value.startDate);
  const [customEndDate, setCustomEndDate] = useState(value.endDate);
  const dateRangeOptions = useMemo(() => createDateRangeOptions(), []);
  const visibleLabel = formatDateRangeLabel(value.startDate, value.endDate);

  useClickOutside(containerRef, () => setIsOpen(false));

  const selectDateRange = (range: DateRangeValue) => {
    setCustomStartDate(range.startDate);
    setCustomEndDate(range.endDate);
    onChange(range);
    setIsOpen(false);
  };

  const applyCustomRange = () => {
    const startDate = customStartDate <= customEndDate ? customStartDate : customEndDate;
    const endDate = customStartDate <= customEndDate ? customEndDate : customStartDate;

    onChange({
      id: "custom",
      label: "Custom Range",
      startDate,
      endDate,
    });
    setIsOpen(false);
  };

  return (
    <div className="relative inline-flex" ref={containerRef}>
      <button
        className="inline-flex min-h-9 items-center gap-2 rounded-lg bg-[var(--toolbar-button-bg)] px-3 text-sm font-light text-[var(--toolbar-button-text)] transition hover:bg-[var(--toolbar-button-hover)]"
        onClick={() => setIsOpen((current) => !current)}
        type="button"
      >
        <CalendarDays aria-hidden="true" size={15} strokeWidth={1.9} />
        <span>{visibleLabel}</span>
        <ChevronDown aria-hidden="true" className={`transition-transform ${isOpen ? "rotate-180" : ""}`} size={14} strokeWidth={2} />
      </button>

      <div
        className={`absolute right-0 top-[calc(100%+0.45rem)] z-40 grid w-[min(380px,calc(100vw-2rem))] origin-top-right gap-3 rounded-xl border border-[var(--line)] bg-[var(--white)] p-3 text-[var(--brand-navy)] transition-all duration-200 ease-out ${
          isOpen ? "pointer-events-auto translate-y-0 scale-100 opacity-100" : "pointer-events-none -translate-y-2 scale-95 opacity-0"
        }`}
      >
          <section className="grid gap-2">
            <p className="m-0 text-xs font-semibold">Quick select</p>
            <div className="grid grid-cols-3 gap-2">
              {dateRangeOptions.map((range) => (
                <button
                  className={`min-h-8 whitespace-nowrap rounded-lg border px-1.5 text-[0.68rem] transition ${
                    value.id === range.id
                      ? "border-[var(--toolbar-button-bg)] bg-[var(--toolbar-button-bg)] text-[var(--toolbar-button-text)]"
                      : "border-[var(--line)] bg-[var(--white)] text-[var(--brand-navy)] hover:border-[var(--brand-navy)]"
                  }`}
                  key={range.id}
                  onClick={() => selectDateRange(range)}
                  type="button"
                >
                  {range.label}
                </button>
              ))}
            </div>
          </section>

          <section className="grid gap-2 border-t border-[var(--line)] pt-3">
            <p className="m-0 text-xs font-semibold">All ranges</p>
            <div className="max-h-44 overflow-y-auto rounded-lg border border-[var(--line)]">
              {dateRangeOptions.map((range) => (
                <button
                  className={`grid min-h-10 w-full grid-cols-[1fr_auto] items-center gap-3 px-3 text-left text-xs transition ${
                    value.id === range.id ? "bg-[var(--toolbar-button-bg)] text-[var(--toolbar-button-text)]" : "bg-[var(--white)] text-[var(--brand-navy)] hover:bg-[var(--surface)]"
                  }`}
                  key={`list-${range.id}`}
                  onClick={() => selectDateRange(range)}
                  type="button"
                >
                  <span>{range.label}</span>
                  <span className="text-[0.68rem] opacity-75">{formatDateRangeLabel(range.startDate, range.endDate)}</span>
                </button>
              ))}
            </div>
          </section>

          <section className="grid gap-3 border-t border-[var(--line)] pt-3">
            <p className="m-0 text-xs font-semibold">Custom range</p>
            <div className="grid grid-cols-2 gap-2">
              <label className="grid gap-1 text-[0.68rem] text-[var(--muted)]">
                From
                <input className="min-h-8 rounded-lg border border-[var(--line)] bg-[var(--field-bg)] px-2 text-xs text-[var(--brand-navy)] outline-none focus:border-[var(--brand-orange)]" onChange={(event) => setCustomStartDate(event.target.value)} type="date" value={customStartDate} />
              </label>
              <label className="grid gap-1 text-[0.68rem] text-[var(--muted)]">
                To
                <input className="min-h-8 rounded-lg border border-[var(--line)] bg-[var(--field-bg)] px-2 text-xs text-[var(--brand-navy)] outline-none focus:border-[var(--brand-orange)]" onChange={(event) => setCustomEndDate(event.target.value)} type="date" value={customEndDate} />
              </label>
            </div>
            <button className="min-h-8 rounded-lg bg-[var(--toolbar-button-bg)] px-3 text-xs font-semibold text-[var(--toolbar-button-text)] hover:bg-[var(--toolbar-button-hover)]" onClick={applyCustomRange} type="button">
              Apply custom range
            </button>
          </section>
        </div>
    </div>
  );
}
