"use client";

import { useState } from "react";
import type {
  AdAccount,
  TopUpHistoryEntry,
  TopUpHistorySummary,
} from "@/types/account";
import Modal from "./Modal";
import PlatformIcon from "./PlatFormIcon";
import Pagination from "./Pagination";

interface TopUpHistoryModalProps {
  account: AdAccount;
  summary: TopUpHistorySummary;
  entries?: TopUpHistoryEntry[];
  onClose: () => void;
}

const COLUMNS = ["Date & Time", "Type", "Amount", "Fee", "USD", "Description"];

function formatBDT(amount: number) {
  return `৳${amount.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

export default function TopUpHistoryModal({
  account,
  summary,
  entries = [],
  onClose,
}: TopUpHistoryModalProps) {
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);

  const totalPages = Math.max(1, Math.ceil(entries.length / perPage));
  const currentPage = Math.min(page, totalPages);
  const paginated = entries.slice(
    (currentPage - 1) * perPage,
    currentPage * perPage,
  );

  return (
    <Modal onClose={onClose} widthClassName="max-w-3xl">
      <div className="flex items-start justify-between">
        <h2 className="title-medium primary-text">Top - Up History</h2>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--color-surface)] text-[var(--color-primary-text-500)] hover:opacity-80"
        >
          ✕
        </button>
      </div>

      <div className="my-4 border-t border-[var(--color-line)]" />

      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <PlatformIcon platform={account.platform} />
          <div>
            <p className="body-sm-medium primary-text">{account.accountName}</p>
            <p className="body-xsm-regular subtext-400">
              ID: {account.accountId}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-6 rounded-[var(--btn-radius)] border border-[var(--color-line)] px-5 py-3">
          <SummaryStat
            label="Total Top-Up"
            value={summary.totalTopUps.toString()}
          />
          <SummaryStat
            label="Total Amount"
            value={formatBDT(summary.totalAmountBDT)}
          />
          <SummaryStat
            label="Total Fees"
            value={formatBDT(summary.totalFeesBDT)}
          />
          <SummaryStat
            label="Current Balance"
            value={`$${summary.currentBalanceUSD.toFixed(2)}`}
            valueClassName="text-[var(--color-success-text)]"
          />
        </div>
      </div>

      <div className="mt-5 overflow-x-auto rounded-[var(--btn-radius)] border border-[var(--color-line)]">
        <table className="w-full min-w-[680px] border-collapse">
          <thead>
            <tr
              className="border-b"
              style={{
                backgroundColor: "var(--table-header-bg)",
                borderColor: "var(--table-header-border)",
              }}
            >
              {COLUMNS.map((col, i) => (
                <th
                  key={col}
                  className={`whitespace-nowrap px-4 py-3 text-left body-sm-medium subtext-500 ${
                    i !== COLUMNS.length - 1
                      ? "border-r border-[var(--table-header-border)]"
                      : ""
                  }`}
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginated.map((entry, index) => (
              <tr
                key={index}
                className="border-b border-[var(--color-line)] last:border-b-0"
              >
                <td className="px-4 py-3.5 body-sm-regular primary-text whitespace-nowrap border-r border-[var(--color-line)]">
                  {entry.dateTime}
                </td>
                <td className="px-4 py-3.5 border-r border-[var(--color-line)]">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-[var(--color-info-bg)] px-2.5 py-1 body-sm-s text-[var(--color-info-text)]">
                    ↑ {entry.type}
                  </span>
                </td>
                <td className="px-4 py-3.5 body-sm-regular primary-text whitespace-nowrap border-r border-[var(--color-line)]">
                  {formatBDT(entry.amountBDT)}
                </td>
                <td className="px-4 py-3.5 body-sm-regular whitespace-nowrap border-r border-[var(--color-line)] text-[var(--color-danger-text)]">
                  {formatBDT(entry.feeBDT)}
                </td>
                <td className="px-4 py-3.5 body-sm-regular primary-text whitespace-nowrap border-r border-[var(--color-line)]">
                  ${entry.usd.toFixed(2)}
                </td>
                <td className="px-4 py-3.5 body-sm-regular subtext-400 whitespace-nowrap">
                  {entry.description}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Pagination
        page={currentPage}
        totalPages={totalPages}
        perPage={perPage}
        onPageChange={setPage}
        onPerPageChange={(value) => {
          setPerPage(value);
          setPage(1);
        }}
      />
    </Modal>
  );
}

function SummaryStat({
  label,
  value,
  valueClassName = "primary-text",
}: {
  label: string;
  value: string;
  valueClassName?: string;
}) {
  return (
    <div>
      <p className="body-xsm-regular subtext-500">{label}</p>
      <p className={`body-sm-medium ${valueClassName}`}>{value}</p>
    </div>
  );
}
