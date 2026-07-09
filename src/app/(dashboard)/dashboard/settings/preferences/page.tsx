"use client";

import React, { useState } from "react";
import { Globe, Clock, DollarSign, ChevronDown } from "lucide-react";

const LANGUAGES = ["English", "Bangla", "Hindi", "Arabic"];

const TIMEZONES = [
  "(GMT+06:00) Asia/Dhaka",
  "(GMT+05:30) Asia/Kolkata",
  "(GMT+00:00) UTC",
  "(GMT-05:00) America/New_York",
];

const CURRENCIES = [
  "BDT (৳) - Bangladeshi Taka",
  "USD ($) - US Dollar",
  "INR (₹) - Indian Rupee",
  "EUR (€) - Euro",
];

export default function PreferencesPage() {
  const [language, setLanguage] = useState("English");
  const [timezone, setTimezone] = useState("(GMT+06:00) Asia/Dhaka");
  const [currency, setCurrency] = useState("BDT (৳) - Bangladeshi Taka");

  return (
    <div className="space-y-6">
      {/* ── Settings Header Card ── */}
      <div className="bg-[var(--color-white)] border border-[var(--color-line)] rounded-2xl px-6 py-6">
        <h1 className="h6-bold text-[var(--color-primary-text-500)]">
          Settings
        </h1>
        <p className="body-sm-regular text-[var(--color-subtext-500)] mt-1">
          Manage your account, security and preferences.
        </p>
      </div>

      {/* ── Preferences Card ── */}
      <div className="bg-[var(--color-white)] border border-[var(--color-line)] rounded-2xl">
        <div className="px-6 py-6">
          <h2 className="body-l-medium text-[var(--color-primary-text-500)]">
            Preferences
          </h2>
          <p className="body-sm-regular text-[var(--color-subtext-500)] mt-1">
            Customize your experience.
          </p>
        </div>

        <div className="mx-6 mb-6 border border-[var(--color-line)] rounded-xl overflow-hidden">
          <Row
            icon={<Globe size={18} />}
            title="Language"
            subtitle="Choose your preferred language!"
            right={
              <SelectField
                value={language}
                onChange={setLanguage}
                options={LANGUAGES}
              />
            }
          />

          <Row
            icon={<Clock size={18} />}
            title="Timezone"
            subtitle="Select your timezone."
            right={
              <SelectField
                value={timezone}
                onChange={setTimezone}
                options={TIMEZONES}
              />
            }
          />

          <Row
            icon={<DollarSign size={18} />}
            title="Currency"
            subtitle="Choose your default currency."
            right={
              <SelectField
                value={currency}
                onChange={setCurrency}
                options={CURRENCIES}
              />
            }
            bottomBorder={false}
          />
        </div>
      </div>
    </div>
  );
}

// ── Reusable row ──
function Row({
  icon,
  title,
  subtitle,
  right,
  bottomBorder = true,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  right: React.ReactNode;
  bottomBorder?: boolean;
}) {
  return (
    <div
      className={`flex items-center justify-between gap-4 px-6 py-4 ${
        bottomBorder ? "border-b border-[var(--color-line)]" : ""
      }`}
    >
      <div className="flex items-center gap-3 min-w-0">
        <span className="text-[var(--color-primary-text-500)] shrink-0">
          {icon}
        </span>
        <div className="min-w-0">
          <p className="body-sm-medium text-[var(--color-primary-text-500)]">
            {title}
          </p>
          <p className="text-xs text-[var(--color-subtext-500)] mt-0.5">
            {subtitle}
          </p>
        </div>
      </div>
      {right}
    </div>
  );
}

// ── Reusable right-aligned select field ──
function SelectField({
  value,
  onChange,
  options,
}: {
  value: string;
  onChange: (value: string) => void;
  options: string[];
}) {
  return (
    <div className="relative w-64 shrink-0">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full h-11 pl-4 pr-10 rounded-lg border border-[var(--color-line)] body-sm-regular text-[var(--color-primary-text-500)] bg-[var(--color-field)] outline-none appearance-none cursor-pointer focus:border-[var(--color-adsfixter-primary)] transition-colors"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <ChevronDown
        size={16}
        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[var(--color-subtext-500)] pointer-events-none"
      />
    </div>
  );
}