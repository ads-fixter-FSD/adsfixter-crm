import Image from "next/image";
import React from "react";

export default function SummaryCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex-1 flex items-center justify-between gap-3 px-4 sm:px-5 py-3.5 sm:py-4 rounded-lg border border-[var(--color-line)]">
      <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
        <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-[var(--color-line)] flex items-center justify-center text-[var(--color-primary-text-500)] shrink-0">
          <Image src={icon as string} width={14} height={14} alt="icon" className="sm:w-4 sm:h-4" />
        </span>
        <span className="body-sm-medium sm:body-l-regular text-[var(--color-primary-text-500)] truncate">
          {label}
        </span>
      </div>
      <span className="body-sm-medium sm:body-l-regular text-[var(--color-primary-text-500)] whitespace-nowrap shrink-0">
        {value}
      </span>
    </div>
  );
}