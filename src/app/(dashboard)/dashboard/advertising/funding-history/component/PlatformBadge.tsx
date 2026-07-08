import React from "react";
import { Platform } from "@/types/dashboard/advertising/funding-history/types";
import { PLATFORM_STYLES } from "@/types/dashboard/advertising/funding-history/data";

export default function PlatformBadge({
  platform,
  accountName,
  accountId,
}: {
  platform: Platform;
  accountName: string;
  accountId: string;
}) {
  return (
    <div className="flex items-center gap-2">
      <span
        className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0"
        style={{ backgroundColor: PLATFORM_STYLES[platform].bg }}
      >
        {PLATFORM_STYLES[platform].label}
      </span>
      <div className="min-w-0">
        <p className="body-sm-medium text-[var(--color-primary-text-500)] truncate">
          {accountName}
        </p>
        <p className="flex items-center gap-1 text-xs text-[var(--color-subtext-400)]">
          ID: {accountId}
        </p>
      </div>
    </div>
  );
}