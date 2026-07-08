import React from "react";
import { TabItem } from "@/types/dashboard/advertising/funding-history/types";

export default function FundingTabs({
  tabs,
  activeTab,
  onChange,
}: {
  tabs: TabItem[];
  activeTab: string;
  onChange: (key: string) => void;
}) {
  return (
    <div className="flex items-center gap-1 p-1 rounded-lg border border-[var(--color-line)] w-fit">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.key;
        return (
          <button
            key={tab.key}
            type="button"
            onClick={() => onChange(tab.key)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md body-sm-medium transition-colors ${
              isActive
                ? "bg-[var(--color-surface)] text-[var(--color-primary-text-500)]"
                : "text-[var(--color-subtext-500)] hover:text-[var(--color-primary-text-500)]"
            }`}
          >
            {tab.label}
            <span
              className={`text-xs px-1.5 py-0.5 rounded ${
                isActive
                  ? "bg-[var(--color-white)] text-[var(--color-primary-text-500)]"
                  : "bg-[var(--color-surface)] text-[var(--color-subtext-500)]"
              }`}
            >
              {tab.count}
            </span>
          </button>
        );
      })}
    </div>
  );
}