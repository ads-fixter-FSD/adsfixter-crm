"use client";

import {
  Check,
  ChevronDown,
  CreditCard,
  Info,
  Landmark,
  Search,
  type LucideIcon,
} from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";
import { PrimaryButton, SecondaryButton } from "@/components/shared-buttons";
import {
  getPaymentSetupData,
  paymentCurrencyOptions,
  paymentMethodOptions,
  savePaymentSetup,
  supportedBankOptions,
} from "@/features/crm/client-dashboard/payment-setup-storage";
import type { ToastType } from "@/features/crm/types/crm";

type ClientPaymentSetupSectionProps = {
  onCancel: () => void;
  onSaved: () => void;
  showToast: (type: ToastType, message: string) => void;
};

const selectClassName =
  "min-h-11 w-full appearance-none rounded-lg border border-[var(--line)] bg-[var(--field-bg)] px-3 pr-10 text-sm text-[var(--brand-navy)] outline-none focus:border-[var(--color-adsfixter-primary)]";

const paymentMethodIcons: Record<string, { icon?: LucideIcon; badge?: string; badgeClassName?: string }> = {
  "bank-transfer": { icon: Landmark },
  bkash: { badge: "bK", badgeClassName: "bg-[#e2136e] text-[var(--white)]" },
  nagad: { badge: "N", badgeClassName: "bg-[#f6921e] text-[var(--white)]" },
  paypal: { badge: "P", badgeClassName: "bg-[#003087] text-[var(--white)]" },
  card: { icon: CreditCard },
  stripe: { badge: "S", badgeClassName: "bg-[#635bff] text-[var(--white)]" },
};

function SectionNumber({ number }: { number: number }) {
  return (
    <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[var(--color-adsfixter-primary)] text-sm font-semibold text-[var(--white)]">
      {number}
    </span>
  );
}

function InfoBox({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`flex gap-2 rounded-lg bg-[var(--brand-orange-soft)] px-4 py-3 ${className}`}>
      <Info aria-hidden="true" className="mt-0.5 shrink-0 text-[var(--color-adsfixter-primary)]" size={16} strokeWidth={1.8} />
      <p className="body-xsm-regular m-0 text-[var(--brand-navy)]">{children}</p>
    </div>
  );
}

function CurrencySelect({ value, onChange }: { value: string; onChange: (value: string) => void }) {
  const selectedOption = paymentCurrencyOptions.find((option) => option.value === value) ?? paymentCurrencyOptions[0];

  return (
    <label className="relative block w-full">
      <span className="sr-only">Primary currency</span>
      <div className="pointer-events-none absolute left-3 top-1/2 flex -translate-y-1/2 items-center gap-2">
        <span aria-hidden="true" className="text-base leading-none">
          {selectedOption.flag}
        </span>
      </div>
      <select
        className={`${selectClassName} pl-10`}
        onChange={(event) => onChange(event.target.value)}
        value={value}
      >
        {paymentCurrencyOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <ChevronDown
        aria-hidden="true"
        className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[var(--muted)]"
        size={16}
        strokeWidth={2}
      />
    </label>
  );
}

function BanksMultiSelect({
  selectedBanks,
  onChange,
}: {
  selectedBanks: string[];
  onChange: (banks: string[]) => void;
}) {
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
        className={`${selectClassName} flex items-center justify-between text-left ${selectedBanks.length === 0 ? "text-[var(--muted)]" : "text-[var(--brand-navy)]"}`}
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

function PaymentMethodIcon({ methodId }: { methodId: string }) {
  const config = paymentMethodIcons[methodId];

  if (config?.icon) {
    const Icon = config.icon;

    return (
      <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--surface)] text-[var(--brand-navy)]">
        <Icon aria-hidden="true" size={20} strokeWidth={1.8} />
      </span>
    );
  }

  return (
    <span
      className={`inline-flex h-10 w-10 items-center justify-center rounded-lg text-xs font-bold ${config?.badgeClassName ?? "bg-[var(--surface)] text-[var(--brand-navy)]"}`}
    >
      {config?.badge}
    </span>
  );
}

export function ClientPaymentSetupSection({ onCancel, onSaved, showToast }: ClientPaymentSetupSectionProps) {
  const [currency, setCurrency] = useState("BDT");
  const [paymentMethods, setPaymentMethods] = useState<string[]>(["bank-transfer", "bkash"]);
  const [selectedBanks, setSelectedBanks] = useState<string[]>([]);

  useEffect(() => {
    const saved = getPaymentSetupData();

    if (saved) {
      setCurrency(saved.currency);
      setPaymentMethods(saved.paymentMethods);
      setSelectedBanks(saved.selectedBanks);
    }
  }, []);

  const hasBankTransfer = paymentMethods.includes("bank-transfer");

  const togglePaymentMethod = (methodId: string) => {
    setPaymentMethods((current) => {
      if (current.includes(methodId)) {
        const next = current.filter((item) => item !== methodId);

        if (methodId === "bank-transfer") {
          setSelectedBanks([]);
        }

        return next;
      }

      return [...current, methodId];
    });
  };

  const handleSave = () => {
    if (paymentMethods.length === 0) {
      showToast("warning", "Please select at least one payment method");
      return;
    }

    if (hasBankTransfer && selectedBanks.length === 0) {
      showToast("warning", "Please select at least one supported bank");
      return;
    }

    savePaymentSetup({
      currency,
      paymentMethods,
      selectedBanks: hasBankTransfer ? selectedBanks : [],
    });

    showToast("success", "Payment setup saved successfully");
    onSaved();
  };

  return (
    <section className="grid gap-6">
      <div>
        <h1 className="h4 m-0 primary-text">Payment Setup</h1>
        <p className="body-regular m-0 mt-1 subtext">Please select your preferred payment method(s) and choose your primary currency.</p>
      </div>

      <div className="grid gap-8 rounded-xl border border-[var(--line)] bg-[var(--white)] p-5 max-[720px]:p-4">
        <div className="flex items-start gap-3">
          <SectionNumber number={1} />
          <div className="grid min-w-0 flex-1 gap-5 lg:grid-cols-[minmax(0,1fr)_300px] lg:items-start lg:gap-8">
            <div className="grid gap-4">
              <div>
                <h2 className="body-sm-medium m-0 primary-text">Select Primary Currency</h2>
                <p className="body-xsm-regular m-0 mt-1 subtext">This currency will be used as your wallet balance and for all transactions.</p>
              </div>

              <InfoBox className="max-[1023px]:hidden">
                This currency will be used for your Wallet Balance. It cannot be changed after setup without assistance from our Support Team.
              </InfoBox>
            </div>

            <div className="grid gap-4">
              <CurrencySelect onChange={setCurrency} value={currency} />

              <InfoBox className="min-[1024px]:hidden">
                This currency will be used for your Wallet Balance. It cannot be changed after setup without assistance from our Support Team.
              </InfoBox>
            </div>
          </div>
        </div>

        <div className="border-t border-[var(--line)] pt-8">
          <div className="flex items-start gap-3">
            <SectionNumber number={2} />
            <div className="grid min-w-0 flex-1 gap-5">
              <div>
                <h2 className="body-sm-medium m-0 primary-text">Select Payment Method(s)</h2>
                <p className="body-xsm-regular m-0 mt-1 subtext">You can select multiple payment methods.</p>
              </div>

              <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                {paymentMethodOptions.map((method) => {
                  const isSelected = paymentMethods.includes(method.id);

                  return (
                    <button
                      className={`relative flex min-h-[88px] items-center gap-3 rounded-xl border-2 px-4 py-4 text-left transition ${
                        isSelected
                          ? "border-[var(--color-adsfixter-primary)] bg-[var(--brand-orange-soft)]"
                          : "border-[var(--line)] bg-[var(--white)] hover:bg-[var(--surface)]"
                      }`}
                      key={method.id}
                      onClick={() => togglePaymentMethod(method.id)}
                      type="button"
                    >
                      <PaymentMethodIcon methodId={method.id} />
                      <strong className="body-sm-medium flex-1 primary-text">{method.label}</strong>
                      <span
                        className={`absolute right-3 top-3 inline-flex h-5 w-5 items-center justify-center rounded border ${
                          isSelected
                            ? "border-[var(--color-adsfixter-primary)] bg-[var(--color-adsfixter-primary)] text-[var(--white)]"
                            : "border-[var(--line)] bg-[var(--white)]"
                        }`}
                      >
                        {isSelected ? <Check aria-hidden="true" size={12} strokeWidth={2.5} /> : null}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {hasBankTransfer ? (
          <div className="border-t border-[var(--line)] pt-8">
            <div className="grid gap-4">
              <div>
                <h2 className="body-sm-medium m-0 primary-text">Supported Banks (Bank Transfer)</h2>
                <p className="body-xsm-regular m-0 mt-1 subtext">Select one or more banks you would like to use for wallet deposits.</p>
              </div>

              <BanksMultiSelect onChange={setSelectedBanks} selectedBanks={selectedBanks} />

              <InfoBox>You can add or update payment methods anytime from the Payment Settings.</InfoBox>
            </div>
          </div>
        ) : null}

        <div className="flex flex-wrap items-center justify-end gap-3 border-t border-[var(--line)] pt-6">
          <SecondaryButton className="min-h-10 px-6" onClick={onCancel} type="button">
            Cancel
          </SecondaryButton>
          <PrimaryButton className="min-h-10 px-6" onClick={handleSave} type="button">
            Save &amp; Continue
          </PrimaryButton>
        </div>
      </div>
    </section>
  );
}
