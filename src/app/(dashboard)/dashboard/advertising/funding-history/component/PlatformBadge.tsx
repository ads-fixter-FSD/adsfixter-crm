"use client";

import React, { useState } from "react";
import { Platform } from "@/types/dashboard/advertising/funding-history/types";
import { Copy, Check } from "lucide-react";

function MetaIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 36 36" fill="none" className="sm:w-[18px] sm:h-[18px]">
      <path
        d="M6 20.5c0-6 3.2-11 7.4-11 2.4 0 4.2 1.5 6.6 5.1 2.4-3.6 4.2-5.1 6.6-5.1 4.2 0 7.4 5 7.4 11s-3.2 5.5-7.4 5.5c-2.6 0-4.4-2.1-6.6-6-2.2 3.9-4 6-6.6 6C9.2 26 6 26.5 6 20.5Z"
        stroke="#0866FF"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function GoogleAdsIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 36 36" fill="none" className="sm:w-4 sm:h-4">
      <path d="M14 5 4 23h8.5L22.5 5H14Z" fill="#4285F4" />
      <path d="M22.5 5 32 21.5 27.5 29 13 5h9.5Z" fill="#34A853" />
      <path d="M8 23a4.5 4.5 0 1 0 4.5 7.8A4.5 4.5 0 0 0 8 23Z" fill="#FBBC05" />
    </svg>
  );
}

function TikTokIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 36 36" fill="none" className="sm:w-4 sm:h-4">
      <path
        d="M25.5 6c.6 3.3 2.9 5.6 6.3 6v4.6c-2.4.1-4.5-.6-6.3-1.9v9.8c0 5.4-4.4 9-9.4 9-5.2 0-9.4-4-9.4-9 0-5.2 4.6-9.3 10.1-8.9v4.8c-2.5-.4-4.9 1.3-4.9 4.1 0 2.6 2.1 4.3 4.3 4.3 2.7 0 4.7-2.1 4.7-5V6h4.6Z"
        fill="#111111"
      />
    </svg>
  );
}

const PLATFORM_ICON: Record<Platform, React.ReactNode> = {
  meta: <MetaIcon />,
  google: <GoogleAdsIcon />,
  tiktok: <TikTokIcon />,
};

export default function PlatformBadge({
  platform,
  accountName,
  accountId,
}: {
  platform: Platform;
  accountName: string;
  accountId: string;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(accountId);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 1500);
    } catch (err) {
      console.error("Copy failed:", err);
    }
  };

  return (
    <div
      className="flex items-center gap-2 sm:gap-3"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={() => setIsHovered(true)}
    >
      <span className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[var(--color-white)] border border-[var(--color-line)] flex items-center justify-center shrink-0">
        {PLATFORM_ICON[platform]}
      </span>
      <div className="min-w-0 text-left">
        <p className="text-xs sm:text-sm font-medium text-[var(--color-primary-text-500)] truncate max-w-[110px] sm:max-w-none">
          {accountName}
        </p>
        <p className="flex items-center gap-1.5 text-[10px] sm:text-xs text-[var(--color-subtext-400)] mt-0.5">
          <span className="truncate max-w-[90px] sm:max-w-none">ID: {accountId}</span>
          <button
            type="button"
            onClick={handleCopy}
            aria-label="Copy account ID"
            className={`transition-opacity duration-150 shrink-0 ${
              isHovered ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
          >
            {isCopied ? (
              <Check size={12} className="text-[var(--color-success-text)]" />
            ) : (
              <Copy
                size={12}
                className="cursor-pointer hover:text-[var(--color-primary-text-500)] transition-colors"
              />
            )}
          </button>
        </p>
      </div>
    </div>
  );
}