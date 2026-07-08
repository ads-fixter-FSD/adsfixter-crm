import React from "react";

export default function SortIcon({
  direction,
}: {
  direction: "asc" | "desc" | null;
}) {
  return (
    <svg width="10" height="12" viewBox="0 0 10 12" fill="none">
      <path
        d="M5 0L9 4.5H1L5 0Z"
        fill="currentColor"
        opacity={direction === "asc" ? 1 : 0.35}
      />
      <path
        d="M5 12L1 7.5H9L5 12Z"
        fill="currentColor"
        opacity={direction === "desc" ? 1 : 0.35}
      />
    </svg>
  );
}