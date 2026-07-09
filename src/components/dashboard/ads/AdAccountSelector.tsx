"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown, Search, Check } from "lucide-react";
import type { AdAccountOption } from "@/types/adsPerformance";

interface AdAccountSelectorProps {
  accounts: AdAccountOption[];
  selectedIds: string[];
  onSelectionChange: (ids: string[]) => void;
}

function toggleId(ids: string[], id: string) {
  return ids.includes(id) ? ids.filter((v) => v !== id) : [...ids, id];
}

export default function AdAccountSelector({
  accounts,
  selectedIds,
  onSelectionChange,
}: AdAccountSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedAccounts = accounts.filter((a) => selectedIds.includes(a.id));

  const filtered = accounts.filter((a) =>
    `${a.name} ${a.accountId}`.toLowerCase().includes(query.toLowerCase()),
  );

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

  // What the closed trigger button shows: the single account's details,
  // a "N accounts selected" summary, or a placeholder when empty.
  let triggerLabel: React.ReactNode;
  if (selectedAccounts.length === 0) {
    triggerLabel = (
      <p className="body-sm-medium subtext-400">Select Ad Account</p>
    );
  } else if (selectedAccounts.length === 1) {
    triggerLabel = (
      <div>
        <p className="body-sm-medium primary-text">
          {selectedAccounts[0].name}
        </p>
        <p className="body-xsm-regular subtext-400">
          ID: {selectedAccounts[0].accountId}
        </p>
      </div>
    );
  } else {
    triggerLabel = (
      <p className="body-sm-medium primary-text">
        {selectedAccounts.length} accounts selected
      </p>
    );
  }

  return (
    <div className="w-full max-w-md" ref={containerRef}>
      <p className="body-sm-medium subtext-500 mb-2">Select Ad Account</p>

      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          className="flex w-full items-center justify-between rounded-[var(--btn-radius)] border border-[var(--color-line)] bg-white px-4 py-2.5 text-left hover:bg-[var(--color-surface)]"
        >
          {triggerLabel}
          <ChevronDown
            size={16}
            className={`shrink-0 text-[var(--color-subtext-500)] transition-transform ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        {isOpen && (
          <div
            className="absolute left-0 right-0 z-20 mt-2 rounded-[var(--btn-radius)] border border-[var(--color-line)] bg-white p-2 shadow-lg"
            style={{ boxShadow: "0px 8px 24px 0px rgba(0,0,0,0.08)" }}
          >
            <div className="flex items-center gap-2 rounded-[var(--btn-radius)] border border-[var(--color-line)] px-3 py-2">
              <Search size={16} className="text-[var(--color-subtext-500)]" />
              <input
                autoFocus
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Select Ad Account"
                className="w-full body-sm-regular text-[var(--color-primary-text-500)] outline-none placeholder:text-[var(--color-subtext-400)]"
              />
            </div>

            <div className="mt-1 max-h-64 overflow-y-auto">
              {filtered.length === 0 ? (
                <p className="px-3 py-4 text-center body-sm-regular subtext-400">
                  No accounts found.
                </p>
              ) : (
                filtered.map((account, i) => {
                  const isSelected = selectedIds.includes(account.id);
                  return (
                    <button
                      key={account.id}
                      type="button"
                      onClick={() =>
                        onSelectionChange(toggleId(selectedIds, account.id))
                      }
                      className={`flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-left hover:bg-[var(--color-surface)] ${
                        i !== 0 ? "border-t border-[var(--color-line)]" : ""
                      }`}
                    >
                      <span
                        className="flex h-4 w-4 shrink-0 items-center justify-center rounded"
                        style={{
                          background: isSelected
                            ? "var(--color-primary)"
                            : "transparent",
                          border: isSelected
                            ? "none"
                            : "1.5px solid var(--color-line)",
                        }}
                      >
                        {isSelected && (
                          <Check size={12} strokeWidth={3} color="white" />
                        )}
                      </span>
                      <div>
                        <p className="body-sm-medium primary-text">
                          {account.name}
                        </p>
                        <p className="body-xsm-regular subtext-400">
                          ID: {account.accountId}
                        </p>
                      </div>
                    </button>
                  );
                })
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
