"use client";

import React, { useState } from "react";
import { Mail, MessageSquare, Megaphone } from "lucide-react";

export default function NotificationsPage() {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(true);
  const [marketingNotifications, setMarketingNotifications] = useState(false);

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

      {/* ── Notifications Card ── */}
      <div className="bg-[var(--color-white)] border border-[var(--color-line)] rounded-2xl">
        <div className="px-6 py-6">
          <h2 className="body-l-medium text-[var(--color-primary-text-500)]">
            Notifications
          </h2>
          <p className="body-sm-regular text-[var(--color-subtext-500)] mt-1">
            Manage how you receive updates and alerts.
          </p>
        </div>

        <div className="mx-6 mb-6 border border-[var(--color-line)] rounded-xl overflow-hidden">
          <Row
            icon={<Mail size={18} />}
            title="Email Notifications"
            subtitle="Receive important updates via email."
            right={
              <ToggleSwitch
                checked={emailNotifications}
                onChange={setEmailNotifications}
              />
            }
          />

          <Row
            icon={<MessageSquare size={18} />}
            title="SMS Notifications"
            subtitle="Receive important updates via SMS."
            right={
              <ToggleSwitch
                checked={smsNotifications}
                onChange={setSmsNotifications}
              />
            }
          />

          <Row
            icon={<Megaphone size={18} />}
            title="Marketing & Promotions"
            subtitle="Receive offers and product updates."
            right={
              <ToggleSwitch
                checked={marketingNotifications}
                onChange={setMarketingNotifications}
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
      className={`flex items-center justify-between px-6 py-4 ${
        bottomBorder ? "border-b border-[var(--color-line)]" : ""
      }`}
    >
      <div className="flex items-center gap-3">
        <span className="text-[var(--color-primary-text-500)] shrink-0">
          {icon}
        </span>
        <div>
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

// ── Reusable toggle switch ──
function ToggleSwitch({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={`relative w-10 h-6 rounded-full transition-colors shrink-0 ${
        checked
          ? "bg-[var(--color-adsfixter-primary)]"
          : "bg-[var(--color-neutral-track)]"
      }`}
    >
      <span
        className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-[var(--color-white)] shadow-sm transition-transform ${
          checked ? "translate-x-4" : "translate-x-0"
        }`}
      />
    </button>
  );
}