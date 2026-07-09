"use client";

import { useEffect, useRef, useState } from "react";
import {
  MoreVertical,
  Copy,
  Check,
  Eye,
  Pencil,
  PauseCircle,
  PlayCircle,
  Trash2,
} from "lucide-react";
import type { AdPerformanceRow } from "@/types/adsPerformance";

const CELL = "px-4 py-3.5 border-r border-[var(--color-line)]";

export type AdRowAction = "view" | "edit" | "toggle-pause" | "delete";

function formatMoney(amount: number) {
  return `$${amount.toFixed(2)}`;
}

interface AdPerformanceTableRowProps {
  row: AdPerformanceRow;
  onAction?: (action: AdRowAction, row: AdPerformanceRow) => void;
}

function IdWithCopy({ label, id }: { label: string; id: string }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy(e: React.MouseEvent) {
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(id);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch {
      // Clipboard unavailable — fail silently.
    }
  }

  return (
    <p className="body-xsm-regular subtext-400 flex items-center gap-1">
      {label}: {id}
      <button
        type="button"
        onClick={handleCopy}
        aria-label="Copy ID"
        className="opacity-70 hover:opacity-100"
      >
        {copied ? (
          <Check size={11} className="text-[var(--color-success-text)]" />
        ) : (
          <Copy size={11} />
        )}
      </button>
    </p>
  );
}

function RowActionsMenu({
  row,
  onAction,
}: {
  row: AdPerformanceRow;
  onAction?: (action: AdRowAction, row: AdPerformanceRow) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handle(action: AdRowAction) {
    onAction?.(action, row);
    setIsOpen(false);
  }

  const items = [
    { action: "view" as const, label: "View details", icon: Eye },
    { action: "edit" as const, label: "Edit ad", icon: Pencil },
    {
      action: "toggle-pause" as const,
      label: "Pause / Resume",
      icon: PauseCircle,
    },
    { action: "delete" as const, label: "Delete", icon: Trash2, danger: true },
  ];

  return (
    <div className="relative" ref={containerRef}>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label="Row actions"
        className="flex h-8 w-8 items-center justify-center rounded-md border border-[var(--color-line)] text-[var(--color-subtext-500)] hover:bg-[var(--color-surface)]"
      >
        <MoreVertical size={16} />
      </button>

      {isOpen && (
        <div
          className="absolute right-0 z-20 mt-1 w-44 rounded-[var(--btn-radius)] border border-[var(--color-line)] bg-white py-1 shadow-lg"
          style={{ boxShadow: "0px 8px 24px 0px rgba(0,0,0,0.08)" }}
        >
          {items.map((item) => (
            <button
              key={item.action}
              type="button"
              onClick={() => handle(item.action)}
              className={`flex w-full items-center gap-2.5 px-3 py-2 text-left body-sm-regular hover:bg-[var(--color-surface)] ${
                item.danger ? "text-red-600" : "primary-text"
              }`}
            >
              <item.icon size={15} />
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function AdPerformanceTableRow({
  row,
  onAction,
}: AdPerformanceTableRowProps) {
  return (
    <tr className="border-b border-[var(--color-line)] last:border-b-0">
      <td className={CELL}>
        <p className="body-sm-medium primary-text whitespace-nowrap">
          {row.campaignName}
        </p>
        <IdWithCopy label="ID" id={row.campaignId} />
      </td>

      <td className={CELL}>
        <div className="flex items-center gap-2.5">
          <span
            className="h-8 w-8 shrink-0 rounded-md"
            style={{ background: row.thumbnailColor }}
          />
          <div>
            <p className="body-sm-medium primary-text whitespace-nowrap">
              {row.adName}
            </p>
            <IdWithCopy label="ID" id={row.adId} />
          </div>
        </div>
      </td>

      <td className={`${CELL} body-sm-regular primary-text whitespace-nowrap`}>
        {formatMoney(row.spend)}
      </td>

      <td className={`${CELL} body-sm-regular primary-text whitespace-nowrap`}>
        {row.ctr.toFixed(1)}%
      </td>

      <td className={`${CELL} body-sm-regular primary-text whitespace-nowrap`}>
        {formatMoney(row.cpm)}
      </td>

      <td className={`${CELL} body-sm-regular primary-text whitespace-nowrap`}>
        {row.reachLabel}
      </td>

      <td className={`${CELL} body-sm-regular primary-text whitespace-nowrap`}>
        {row.results}
      </td>

      <td className="px-4 py-3.5">
        <RowActionsMenu row={row} onAction={onAction} />
      </td>
    </tr>
  );
}
