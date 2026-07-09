"use client";

import React from "react";

export default function SortIcon({
  direction,
  onAscClick,
  onDescClick,
}: {
  direction: "asc" | "desc" | null;
  onAscClick: () => void;
  onDescClick: () => void;
}) {
  return (
    <span className="flex flex-col items-center justify-center gap-[2px]">
      <button
        type="button"
        aria-label="Sort ascending"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          onAscClick();
        }}
        className="flex items-center justify-center w-3 h-3 -mb-[1px] hover:opacity-80 transition-opacity"
      >
        <svg width="9" height="6" viewBox="0 0 9 6" fill="none">
          <path
            d="M4.5 0L9 6H0L4.5 0Z"
            fill="currentColor"
            className={
              direction === "asc"
                ? "text-[var(--color-adsfixter-primary)]"
                : "text-[var(--color-subtext-400)]"
            }
          />
        </svg>
      </button>

      <button
        type="button"
        aria-label="Sort descending"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          onDescClick();
        }}
        className="flex items-center justify-center w-3 h-3 hover:opacity-80 transition-opacity"
      >
        <svg width="9" height="6" viewBox="0 0 9 6" fill="none">
          <path
            d="M4.5 6L0 0H9L4.5 6Z"
            fill="currentColor"
            className={
              direction === "desc"
                ? "text-[var(--color-adsfixter-primary)]"
                : "text-[var(--color-subtext-400)]"
            }
          />
        </svg>
      </button>
    </span>
  );
}