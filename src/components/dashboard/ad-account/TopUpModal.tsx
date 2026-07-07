"use client";

import { useMemo, useState } from "react";
import type { AdAccount } from "@/types/account";
import Modal from "./Modal";
import PlatformIcon from "./PlatFormIcon";

const PRESET_AMOUNTS = [10, 50, 100, 200, 500];

interface TopUpModalProps {
  account: AdAccount;
  onClose: () => void;
  onConfirm: (amountUSD: number) => void;
}

export default function TopUpModal({
  account,
  onClose,
  onConfirm,
}: TopUpModalProps) {
  const [amount, setAmount] = useState(100);

  const payBDT = useMemo(
    () => amount * account.exchangeRate,
    [amount, account.exchangeRate],
  );
  const balanceAfterBDT = useMemo(
    () => account.walletBalanceBDT - payBDT,
    [account.walletBalanceBDT, payBDT],
  );

  return (
    <Modal onClose={onClose} widthClassName="max-w-xl">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="title-medium primary-text">Top up ad account</h2>
          <p className="body-sm-regular subtext mt-1.5 max-w-md">
            Request USD for your ad account. The amount will be deducted from
            your wallet instantly
          </p>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--color-surface)] text-[var(--color-primary-text-500)] hover:opacity-80"
        >
          ✕
        </button>
      </div>

      <div className="my-5 border-t border-[var(--color-line)]" />

      <div className="overflow-hidden rounded-[var(--btn-radius)] border border-[var(--color-line)]">
        <div
          className="grid grid-cols-3 border-b border-[var(--table-header-border)] body-sm-medium subtext-500"
          style={{ backgroundColor: "var(--table-header-bg)" }}
        >
          <div className="px-4 py-2.5 border-r border-[var(--table-header-border)]">
            Platform
          </div>
          <div className="px-4 py-2.5 border-r border-[var(--table-header-border)]">
            Business Account
          </div>
          <div className="px-4 py-2.5">Ad account</div>
        </div>
        <div className="grid grid-cols-3">
          <div className="flex items-center gap-2 px-4 py-3 border-r border-[var(--color-line)]">
            <PlatformIcon platform={account.platform} />
            <span className="body-sm-medium primary-text capitalize">
              {account.platform}
            </span>
          </div>
          <div className="px-4 py-3 border-r border-[var(--color-line)]">
            <p className="body-sm-medium primary-text">
              {account.businessAccountName}
            </p>
            <p className="body-xsm-regular subtext-400">
              ID: {account.businessAccountId}
            </p>
          </div>
          <div className="px-4 py-3">
            <p className="body-sm-medium primary-text">
              {account.adAccountName}
            </p>
            <p className="body-xsm-regular subtext-400">
              ID: {account.adAccountRefId}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-5">
        <label className="body-sm-medium primary-text">
          Enter amount (USD)
        </label>
        <div className="mt-2 flex items-center gap-2 rounded-[var(--btn-radius)] border border-[var(--color-line)] px-4 py-3">
          <span className="body-l-medium subtext-500">$</span>
          <input
            type="number"
            min={0}
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value) || 0)}
            className="w-full body-l-medium primary-text outline-none"
          />
        </div>

        <div className="mt-3 flex flex-wrap gap-2">
          {PRESET_AMOUNTS.map((preset) => {
            const isSelected = preset === amount;
            return (
              <button
                key={preset}
                type="button"
                onClick={() => setAmount(preset)}
                className={`rounded-[var(--btn-radius)] border px-4 py-2 body-sm-medium transition-colors ${
                  isSelected
                    ? "border-[var(--color-primary)] text-[var(--color-primary)]"
                    : "border-[var(--color-line)] text-[var(--color-primary-text-400)] hover:bg-[var(--color-surface)]"
                }`}
              >
                ${preset}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-5 space-y-2.5 rounded-[var(--btn-radius)] bg-[var(--color-surface)] p-4">
        <div className="flex items-center justify-between body-sm-regular">
          <span className="subtext-500">You request</span>
          <span className="primary-text">${amount.toFixed(1)}</span>
        </div>
        <div className="flex items-center justify-between body-sm-regular">
          <span className="subtext-500">Exchange Rate</span>
          <span className="primary-text">
            1 (USD) = ৳{account.exchangeRate.toFixed(1)}
          </span>
        </div>
        <div className="flex items-center justify-between body-sm-regular">
          <span className="subtext-500">You Pay</span>
          <span className="body-sm-medium text-[var(--color-primary)]">
            ৳
            {payBDT.toLocaleString("en-US", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </span>
        </div>

        <div className="border-t border-[var(--color-line)] pt-2.5 flex items-center justify-between body-sm-regular">
          <span className="subtext-500">Wallet balance after top-up</span>
          <span className="body-sm-medium primary-text">
            ৳
            {balanceAfterBDT.toLocaleString("en-US", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </span>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-end gap-3">
        <button
          type="button"
          onClick={onClose}
          className="rounded-[var(--btn-radius)] border border-[var(--color-line)] px-5 py-2.5 body-sm-medium primary-text hover:bg-[var(--color-surface)]"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={() => onConfirm(amount)}
          className="rounded-[var(--btn-radius)] bg-[var(--color-primary)] px-5 py-2.5 body-sm-medium text-[var(--color-on-primary)] hover:bg-[var(--color-primary-hover)]"
        >
          Confirm top-up
        </button>
      </div>
    </Modal>
  );
}
