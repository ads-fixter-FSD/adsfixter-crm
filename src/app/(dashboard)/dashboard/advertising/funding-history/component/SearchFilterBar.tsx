import React from "react";
import { Search, SlidersHorizontal } from "lucide-react";

export default function SearchFilterBar({
  search,
  onSearchChange,
  onFilterClick,
}: {
  search: string;
  onSearchChange: (value: string) => void;
  onFilterClick?: () => void;
}) {
  return (
    <div className="flex items-center gap-3 w-full lg:w-auto">
      <div className="relative flex-1 lg:flex-none">
        <Search
          size={16}
          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--color-subtext-500)]"
        />
        <input
          type="text"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search..."
          className="w-full lg:w-56 h-10 pl-10 pr-4 rounded-lg border border-[var(--color-line)] body-sm-regular text-[var(--color-primary-text-500)] bg-[var(--color-field)] outline-none focus:border-[var(--color-adsfixter-primary)] transition-colors"
        />
      </div>

      <button
        type="button"
        onClick={onFilterClick}
        className="flex items-center gap-2 h-10 px-3 sm:px-4 rounded-lg border border-[var(--color-line)] body-sm-medium text-[var(--color-primary-text-500)] hover:bg-[var(--color-surface)] transition-colors shrink-0"
      >
        <SlidersHorizontal size={16} />
        <span className="hidden sm:inline">Filter</span>
      </button>
    </div>
  );
}