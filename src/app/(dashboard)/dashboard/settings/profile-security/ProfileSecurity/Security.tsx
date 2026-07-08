"use client";

import React, { useState } from "react";
import {
  Lock,
  ShieldCheck,
  Monitor,
  Smartphone,
  ChevronRight,
} from "lucide-react";

// ── Dummy session data ──
const sessions = [
  {
    id: 1,
    device: "Chrome on Windows",
    location: "Dhaka, Bangladesh",
    status: "Active now",
    current: true,
  },
  {
    id: 2,
    device: "Safari on iPhone 14",
    location: "Dhaka, Bangladesh",
    status: "3 hours ago",
    current: false,
  },
];

export default function Security() {
  const [twoFactorEnabled] = useState(true);
  const [activeSessionsEnabled, setActiveSessionsEnabled] = useState(true);

  return (
    <div className="bg-[var(--color-white)] border border-[var(--color-line)] rounded-xl p-5">
      {/* ── Header ── */}
      <div className="mb-5">
        <h1 className="h6-bold text-[var(--color-primary-text-500)]">
          Security
        </h1>
        <p className="body-sm-regular text-[var(--color-subtext-500)] mt-1">
          Keep your account secure.
        </p>
      </div>

      {/* ── Rows ── */}
      <div className="border border-[var(--color-line)] rounded-xl">
        {/* Change Password */}
        <Row
          icon={<Lock size={18} />}
          title="Change Password"
          subtitle="Update your account password"
          right={
            <button
              type="button"
              className="px-4 py-2 rounded-lg border border-[var(--color-adsfixter-primary)] text-[var(--color-adsfixter-primary)] body-sm-medium hover:bg-[var(--color-primary-soft)] transition-colors"
            >
              Change Password
            </button>
          }
        />

        {/* Two-Factor Authentication */}
        <Row
          icon={<ShieldCheck size={18} />}
          title="Two-Factor Authentication"
          subtitle="Add an extra layer of security to your account"
          right={
            <button
              type="button"
              className="flex items-center gap-3 group"
            >
              <span
                className={`px-2.5 py-1 rounded-md text-xs font-medium ${
                  twoFactorEnabled
                    ? "bg-[var(--color-success-bg)] text-[var(--color-success-text)]"
                    : "bg-[var(--color-surface)] text-[var(--color-subtext-500)]"
                }`}
              >
                {twoFactorEnabled ? "Enabled" : "Disabled"}
              </span>
              <ChevronRight
                size={16}
                className="text-[var(--color-subtext-500)] group-hover:text-[var(--color-primary-text-500)] transition-colors"
              />
            </button>
          }
        />

        {/* Login Sessions */}
        <Row
          icon={<Monitor size={18} />}
          title="Login Sessions"
          subtitle="Manage your active sessions across devices."
          right={
            <button type="button" aria-label="Manage login sessions">
              <ChevronRight
                size={16}
                className="text-[var(--color-subtext-500)] hover:text-[var(--color-primary-text-500)] transition-colors"
              />
            </button>
          }
        />

        {/* Active Sessions + toggle */}
        <Row
          icon={<Smartphone size={18} />}
          title="Active Sessions"
          subtitle={`${sessions.length} devices logged in`}
          right={
            <ToggleSwitch
              checked={activeSessionsEnabled}
              onChange={setActiveSessionsEnabled}
            />
          }
          bottomBorder={activeSessionsEnabled}
        />

        {/* Session list */}
        {activeSessionsEnabled && (
          <div className="px-6 pb-4">
            {sessions.map((session, idx) => (
              <div
                key={session.id}
                className={`flex items-center justify-between py-4 ${
                  idx !== sessions.length - 1
                    ? "border-b border-[var(--color-line)]"
                    : ""
                }`}
              >
                <div>
                  <p className="body-sm-medium text-[var(--color-primary-text-500)]">
                    {session.device}{" "}
                    <span className="text-[var(--color-subtext-500)] font-normal">
                      · {session.location}
                    </span>
                  </p>
                  <p className="text-xs text-[var(--color-subtext-400)] mt-0.5">
                    {session.status}
                  </p>
                </div>

                {session.current ? (
                  <span className="px-2.5 py-1 rounded-md bg-[var(--color-success-bg)] text-[var(--color-success-text)] text-xs font-medium">
                    Current
                  </span>
                ) : (
                  <button
                    type="button"
                    className="px-2.5 py-1 rounded-md bg-[var(--color-danger-bg)] text-[var(--color-danger-text)] text-xs font-medium hover:opacity-80 transition-opacity"
                  >
                    Sign Out
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
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
        checked ? "bg-[var(--color-adsfixter-primary)]" : "bg-[var(--color-neutral-track)]"
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