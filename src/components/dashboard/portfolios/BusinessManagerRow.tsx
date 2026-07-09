"use client";

import { useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  GripVertical,
  Plus,
  ImageOff,
} from "lucide-react";
import { SiMeta } from "react-icons/si";
import type { BusinessManager } from "@/types/businessPortfolios";
import StatusBadge from "./StatusBadge";
import AdAccountStatusBadge from "./AdAccountStatusBadge";
import RowMenu from "./RowMenu";

interface BusinessManagerRowProps {
  bm: BusinessManager;
  onRequestAdAccount: (bm: BusinessManager) => void;
}

export default function BusinessManagerRow({
  bm,
  onRequestAdAccount,
}: BusinessManagerRowProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="rounded-[var(--btn-radius)] border border-[var(--color-line)] overflow-hidden">
      <div className="flex items-center gap-3 px-4 py-3.5">
        <GripVertical
          size={16}
          className="text-[var(--color-subtext-400)] shrink-0"
        />

        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--color-surface)]">
          <SiMeta size={16} color="#0866FF" />
        </span>

        <button
          type="button"
          onClick={() => setIsExpanded((prev) => !prev)}
          className="flex-1 text-left"
        >
          <p className="body-sm-medium primary-text">{bm.name}</p>
          <p className="body-xsm-regular subtext-400">ID: {bm.bmId}</p>
        </button>

        <StatusBadge status={bm.status} />
        <RowMenu
          items={[
            { label: "View details", onClick: () => {} },
            { label: "Rename", onClick: () => {} },
            { label: "Remove", onClick: () => {}, danger: true },
          ]}
        />

        <button
          type="button"
          onClick={() => setIsExpanded((prev) => !prev)}
          className="flex h-8 w-8 items-center justify-center rounded-md hover:bg-[var(--color-surface)]"
        >
          {isExpanded ? (
            <ChevronUp size={16} className="text-[var(--color-subtext-500)]" />
          ) : (
            <ChevronDown
              size={16}
              className="text-[var(--color-subtext-500)]"
            />
          )}
        </button>
      </div>

      {isExpanded && (
        <div className="border-t border-[var(--color-line)]">
          {bm.adAccounts.length === 0 ? (
            <div className="flex items-center justify-between gap-4 px-4 py-4">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-md bg-[var(--color-surface)]">
                  <ImageOff
                    size={18}
                    className="text-[var(--color-subtext-400)]"
                  />
                </span>
                <div>
                  <p className="body-sm-medium primary-text">
                    No ad accounts found in this Business Manager
                  </p>
                  <p className="body-xsm-regular subtext-400">
                    This Business Manager doesn&apos;t have any ad accounts yet.
                    Create an ad account to start running ads
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => onRequestAdAccount(bm)}
                className="flex shrink-0 items-center gap-1.5 rounded-[var(--btn-radius)] px-4 py-2.5 body-sm-medium text-white"
                style={{ backgroundColor: "var(--color-primary)" }}
              >
                <Plus size={14} />
                Request Ad Account
              </button>
            </div>
          ) : (
            <div>
              {bm.adAccounts.map((account) => (
                <div
                  key={account.id}
                  className="flex items-center justify-between gap-3 border-t border-[var(--color-line)] px-4 py-3 pl-11 first:border-t-0"
                >
                  <div className="flex items-center gap-2">
                    <p className="body-sm-regular primary-text">
                      {account.name}
                    </p>
                    {account.isPrimary && (
                      <AdAccountStatusBadge status="active" />
                    )}
                  </div>

                  <div className="flex items-center gap-3">
                    <p className="body-xsm-regular subtext-400 hidden sm:block">
                      ID: {account.accountId}
                    </p>
                    <AdAccountStatusBadge status={account.status} />
                    <RowMenu
                      items={[
                        { label: "View details", onClick: () => {} },
                        { label: "Disable", onClick: () => {} },
                        { label: "Remove", onClick: () => {}, danger: true },
                      ]}
                    />
                  </div>
                </div>
              ))}

              <div className="flex items-center justify-between gap-3 border-t border-[var(--color-line)] px-4 py-3 pl-11">
                <p className="body-sm-regular subtext-400">Want to add more?</p>
                <button
                  type="button"
                  onClick={() => onRequestAdAccount(bm)}
                  className="flex items-center gap-1.5 rounded-[var(--btn-radius)] border border-[var(--color-line)] px-4 py-2 body-sm-medium text-[var(--color-primary-text-400)] hover:bg-[var(--color-surface)]"
                >
                  <Plus size={14} />
                  Request Ad Account
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
