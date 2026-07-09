"use client";

import { X } from "lucide-react";
import type { AdPerformanceRow } from "@/types/adsPerformance";

interface AdViewDetailsModalProps {
  row: AdPerformanceRow;
  onClose: () => void;
}

function DetailItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between border-b border-[var(--color-line)] py-3 last:border-b-0">
      <span className="body-sm-regular subtext-500">{label}</span>
      <span className="body-sm-medium primary-text">{value}</span>
    </div>
  );
}

export default function AdViewDetailsModal({
  row,
  onClose,
}: AdViewDetailsModalProps) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: "var(--color-modal-backdrop)" }}
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-xl bg-white p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <span
              className="h-10 w-10 shrink-0 rounded-md"
              style={{ background: row.thumbnailColor }}
            />
            <div>
              <h3 className="title-medium primary-text">{row.adName}</h3>
              <p className="body-xsm-regular subtext-400">{row.campaignName}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-md hover:bg-[var(--color-surface)]"
          >
            <X size={16} className="text-[var(--color-subtext-500)]" />
          </button>
        </div>

        <div className="mt-4">
          <DetailItem label="Ad ID" value={row.adId} />
          <DetailItem label="Campaign ID" value={row.campaignId} />
          <DetailItem
            label="Status"
            value={row.status === "active" ? "Active" : "Paused"}
          />
          <DetailItem label="Spend" value={`$${row.spend.toFixed(2)}`} />
          <DetailItem label="CTR" value={`${row.ctr.toFixed(1)}%`} />
          <DetailItem label="CPM" value={`$${row.cpm.toFixed(2)}`} />
          <DetailItem label="Reach" value={row.reachLabel} />
          <DetailItem label="Results" value={row.results} />
          <DetailItem
            label="Top Performing"
            value={row.isTopPerforming ? "Yes" : "No"}
          />
        </div>

        <button
          type="button"
          onClick={onClose}
          className="mt-5 w-full rounded-[var(--btn-radius)] bg-[var(--color-primary)] py-2.5 body-sm-medium text-white hover:bg-[var(--color-primary-hover)]"
        >
          Close
        </button>
      </div>
    </div>
  );
}
