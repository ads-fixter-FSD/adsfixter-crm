"use client";

import { Check, ChevronDown, Search } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";
import { supportedBankOptions } from "@/features/crm/client-dashboard/sections/payment-setup/payment-setup-storage";
import { paymentSetupSelectClassName } from "@/features/crm/client-dashboard/sections/payment-setup/components/payment-setup-form-styles";

type BanksMultiSelectProps = {
  selectedBanks: string[];
  onChange: (banks: string[]) => void;
};

export function BanksMultiSelect({ selectedBanks, onChange }: BanksMultiSelectProps) {
  const listboxId = useId();
  const searchInputId = useId();
  const containerRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    setIsOpen(true);
  }, []);

  useEffect(() => {
    const handlePointerDown = (event: MouseEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handlePointerDown);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
    };
  }, []);

  useEffect(() => {
    if (!isOpen) {
      setSearchQuery("");
    }
  }, [isOpen]);

  const toggleBank = (bankName: string) => {
    onChange(selectedBanks.includes(bankName) ? selectedBanks.filter((item) => item !== bankName) : [...selectedBanks, bankName]);
  };

  const filteredBanks = supportedBankOptions.filter((bank) => bank.toLowerCase().includes(searchQuery.trim().toLowerCase()));

  const displayLabel =
    selectedBanks.length === 0
      ? "Select Banks (s)"
      : selectedBanks.length === 1
        ? selectedBanks[0]
        : `${selectedBanks.length} banks selected`;

  return (
    <div className="w-full" ref={containerRef}>
      <button
        aria-controls={listboxId}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        className={`${paymentSetupSelectClassName} flex items-center justify-between text-left ${selectedBanks.length === 0 ? "text-[var(--muted)]" : "text-[var(--brand-navy)]"}`}
        onClick={() => setIsOpen((current) => !current)}
        type="button"
      >
        <span className="truncate pr-2">{displayLabel}</span>
        <ChevronDown
          aria-hidden="true"
          className={`shrink-0 text-[var(--muted)] transition-transform ${isOpen ? "rotate-180" : ""}`}
          size={16}
          strokeWidth={2}
        />
      </button>

      {isOpen ? (
        <div className="mt-2 overflow-hidden rounded-lg border border-[var(--line)] bg-[var(--white)] shadow-sm" id={listboxId}>
          <div className="border-b border-[var(--line)] p-3">
            <label className="relative block" htmlFor={searchInputId}>
              <Search
                aria-hidden="true"
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[var(--muted)]"
                size={16}
                strokeWidth={2}
              />
              <input
                className="min-h-10 w-full rounded-lg border border-[var(--line)] bg-[var(--field-bg)] py-2 pl-10 pr-3 text-sm text-[var(--brand-navy)] outline-none placeholder:text-[var(--muted)] focus:border-[var(--color-adsfixter-primary)]"
                id={searchInputId}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Select Banks"
                type="search"
                value={searchQuery}
              />
            </label>
          </div>

          <ul className="grid max-h-64 gap-x-4 gap-y-1 overflow-y-auto p-3 sm:grid-cols-2" role="listbox">
            {filteredBanks.length === 0 ? (
              <li className="body-sm-regular col-span-full px-2 py-4 text-center subtext">No banks found</li>
            ) : (
              filteredBanks.map((bank) => {
                const isSelected = selectedBanks.includes(bank);

                return (
                  <li key={bank} role="option" aria-selected={isSelected}>
                    <button
                      className="body-sm-regular flex w-full items-center gap-2.5 rounded-lg px-2 py-2.5 text-left text-[var(--brand-navy)] transition hover:bg-[var(--surface)]"
                      onClick={() => toggleBank(bank)}
                      type="button"
                    >
                      <span
                        className={`inline-flex h-4 w-4 shrink-0 items-center justify-center rounded border ${
                          isSelected
                            ? "border-[var(--color-adsfixter-primary)] bg-[var(--color-adsfixter-primary)] text-[var(--white)]"
                            : "border-[var(--line)] bg-[var(--white)]"
                        }`}
                      >
                        {isSelected ? <Check aria-hidden="true" size={10} strokeWidth={2.5} /> : null}
                      </span>
                      <span className="min-w-0 flex-1 leading-5">{bank}</span>
                    </button>
                  </li>
                );
              })
            )}
          </ul>
        </div>
      ) : null}
    </div>
  );
}
