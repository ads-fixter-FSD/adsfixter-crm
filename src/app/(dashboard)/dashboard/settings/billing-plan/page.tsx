"use client";

import React from "react";
import { User, FileText, Crown, Trash2 } from "lucide-react";

export default function BusinessBillingPage() {
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

      {/* ── Business & Billing Section (heading outside the box) ── */}
      <div>
        <h2 className="body-l-medium text-[var(--color-primary-text-500)]">
          Business &amp; Billing
        </h2>
        <p className="body-sm-regular text-[var(--color-subtext-500)] mt-1">
          Manage your business and billing information.
        </p>

        <div className="mt-4 border border-[var(--color-line)] rounded-xl overflow-hidden bg-[var(--color-white)]">
          <Row
            icon={<User size={18} />}
            title="Business Profile"
            subtitle="View and update your business information."
            right={<OutlineButton>Manage</OutlineButton>}
          />

          <Row
            icon={<FileText size={18} />}
            title="Billing & Invoices"
            subtitle="View your billing history and invoices."
            right={<OutlineButton>View</OutlineButton>}
          />

          <Row
            icon={<Crown size={18} />}
            title="Subscription & Plan"
            subtitle="Manage your current plan and usage."
            right={<OutlineButton>Manage</OutlineButton>}
            bottomBorder={false}
          />
        </div>
      </div>

      {/* ── Danger Zone Card ── */}
      <div className="bg-[var(--color-white)] border border-[var(--color-line)] rounded-2xl px-6 py-6">
        <h2 className="body-l-medium text-[var(--color-primary-text-500)]">
          Danger Zone
        </h2>
        <p className="body-sm-regular text-[var(--color-subtext-500)] mt-1">
          Irreversible and sensitive actions.
        </p>

        <div className="mt-4 flex items-center justify-between gap-4 px-5 py-4 rounded-xl border border-[var(--color-danger-text)]/20 bg-[var(--color-danger-bg)]">
          <div className="flex items-start gap-3">
            <span className="text-[var(--color-danger-text)] shrink-0 mt-0.5">
              <Trash2 size={18} />
            </span>
            <div>
              <p className="body-sm-medium text-[var(--color-danger-text)]">
                Delete Account
              </p>
              <p className="text-xs text-[var(--color-primary-text-500)] mt-0.5">
                Once you delete your account, there is no going back.
              </p>
            </div>
          </div>

          <button
            type="button"
            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-[var(--color-danger-text)] bg-[var(--color-white)] text-[var(--color-danger-text)] body-sm-medium hover:bg-[var(--color-danger-bg)] transition-colors shrink-0"
          >
            <Trash2 size={16} />
            Delete Account
          </button>
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

// ── Reusable outline button (Manage / View) ──
function OutlineButton({ children }: { children: React.ReactNode }) {
  return (
    <button
      type="button"
      className="px-4 py-2 rounded-lg border border-[var(--color-line)] text-[var(--color-primary-text-500)] body-sm-medium hover:bg-[var(--color-surface)] transition-colors shrink-0"
    >
      {children}
    </button>
  );
}