"use client";

import { useState } from "react";
import { X } from "lucide-react";
import type { AdPerformanceRow } from "@/types/adsPerformance";

interface AdEditModalProps {
  row: AdPerformanceRow;
  onClose: () => void;
  onSave: (updated: AdPerformanceRow) => void;
}

function Field({
  label,
  ...inputProps
}: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="block">
      <span className="body-xsm-medium subtext-500 mb-1 block">{label}</span>
      <input
        {...inputProps}
        className="w-full rounded-[var(--btn-radius)] border border-[var(--color-line)] px-3 py-2 body-sm-regular outline-none focus:border-[var(--color-primary)]"
      />
    </label>
  );
}

export default function AdEditModal({
  row,
  onClose,
  onSave,
}: AdEditModalProps) {
  const [form, setForm] = useState({
    campaignName: row.campaignName,
    adName: row.adName,
    spend: String(row.spend),
    ctr: String(row.ctr),
    cpm: String(row.cpm),
    results: row.results,
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSave({
      ...row,
      campaignName: form.campaignName,
      adName: form.adName,
      spend: parseFloat(form.spend) || 0,
      ctr: parseFloat(form.ctr) || 0,
      cpm: parseFloat(form.cpm) || 0,
      results: form.results,
    });
    onClose();
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: "var(--color-modal-backdrop)" }}
      onClick={onClose}
    >
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md rounded-xl bg-white p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="title-medium primary-text">Edit Ad</h3>
          <button
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-md hover:bg-[var(--color-surface)]"
          >
            <X size={16} className="text-[var(--color-subtext-500)]" />
          </button>
        </div>

        <div className="flex flex-col gap-3">
          <Field
            label="Campaign Name"
            value={form.campaignName}
            onChange={(e) =>
              setForm((f) => ({ ...f, campaignName: e.target.value }))
            }
          />
          <Field
            label="Ad Name"
            value={form.adName}
            onChange={(e) => setForm((f) => ({ ...f, adName: e.target.value }))}
          />
          <div className="grid grid-cols-3 gap-3">
            <Field
              label="Spend ($)"
              type="number"
              step="0.01"
              value={form.spend}
              onChange={(e) =>
                setForm((f) => ({ ...f, spend: e.target.value }))
              }
            />
            <Field
              label="CTR (%)"
              type="number"
              step="0.1"
              value={form.ctr}
              onChange={(e) => setForm((f) => ({ ...f, ctr: e.target.value }))}
            />
            <Field
              label="CPM ($)"
              type="number"
              step="0.01"
              value={form.cpm}
              onChange={(e) => setForm((f) => ({ ...f, cpm: e.target.value }))}
            />
          </div>
          <Field
            label="Results"
            value={form.results}
            onChange={(e) =>
              setForm((f) => ({ ...f, results: e.target.value }))
            }
          />
        </div>

        <div className="mt-5 flex gap-3">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 rounded-[var(--btn-radius)] border border-[var(--color-line)] py-2.5 body-sm-medium text-[var(--color-primary-text-400)] hover:bg-[var(--color-surface)]"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="flex-1 rounded-[var(--btn-radius)] bg-[var(--color-primary)] py-2.5 body-sm-medium text-white hover:bg-[var(--color-primary-hover)]"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}
