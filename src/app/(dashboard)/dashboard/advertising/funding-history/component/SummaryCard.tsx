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
    <div className="flex-1 flex items-center justify-between gap-3 px-5 py-4 rounded-lg border border-[var(--color-line)]">
      <div className="flex items-center gap-3">
        <span className="w-8 h-8 rounded-full border border-[var(--color-line)] flex items-center justify-center text-[var(--color-primary-text-500)] shrink-0 body-l-regular ">
          <Image src={icon as string} width={16} height={16} alt="Lifetime"></Image>
          
        </span>
        <span className="body-l-regular text-[var(--color-primary-text-500)]">
          {label}
        </span>
      </div>
      <span className="body-l-regular text-[var(--color-primary-text-500)]">
        {value}
      </span>
    </div>
  );
}