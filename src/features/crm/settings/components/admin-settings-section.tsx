"use client";

import { Bell, BellRing, Check, PlayCircle, Volume2 } from "lucide-react";
import { useState } from "react";
import type { ToastType } from "@/features/crm/types/crm";

type AdminSettingsSectionProps = {
  showToast: (type: ToastType, message: string) => void;
};

export function AdminSettingsSection({ showToast }: AdminSettingsSectionProps) {
  const [soundAlertsEnabled, setSoundAlertsEnabled] = useState(true);
  const [desktopNotificationsAllowed, setDesktopNotificationsAllowed] = useState(false);

  const allowDesktopNotifications = () => {
    setDesktopNotificationsAllowed(true);
    showToast("success", "Desktop notifications enabled");
  };

  const testSoundNotification = () => {
    showToast("success", "Sound notification test played");
  };

  return (
    <section className="grid w-full gap-6">
      <div>
        <h2 className="m-0 text-3xl font-bold tracking-[-0.03em] text-[var(--brand-navy)]">Admin Settings</h2>
        <p className="mt-2 text-base text-[var(--muted)]">Manage your admin panel preferences and notifications</p>
      </div>

      <section className="rounded-2xl border border-[var(--line)] bg-[var(--white)] p-7 shadow-sm">
        <div className="mb-6">
          <div className="flex items-center gap-2 text-lg font-semibold text-[var(--brand-navy)]">
            <Volume2 aria-hidden="true" size={20} strokeWidth={1.9} />
            Sound Notifications
          </div>
          <p className="mt-2 text-sm text-[var(--muted)]">Configure sound alerts for important payment-related events</p>
        </div>

        <div className="rounded-xl border border-sky-200 bg-slate-50 p-6">
          <div className="flex flex-wrap items-start justify-between gap-4 border-b border-[var(--line)] pb-5">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="m-0 text-lg font-semibold text-[var(--brand-navy)]">Enable Sound Alerts</h3>
                <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${soundAlertsEnabled ? "bg-green-100 text-green-700" : "bg-slate-200 text-slate-600"}`}>{soundAlertsEnabled ? "Active" : "Inactive"}</span>
              </div>
              <p className="mt-3 text-sm text-[var(--muted)]">Play a loud two-tone chime when new payment requests arrive, even when the browser tab is inactive</p>
            </div>

            <button
              aria-label="Toggle sound alerts"
              className={`relative h-9 w-16 rounded-xl border p-1 transition ${soundAlertsEnabled ? "border-green-200 bg-green-100" : "border-[var(--line)] bg-slate-200"}`}
              onClick={() => {
                setSoundAlertsEnabled((current) => !current);
                showToast(soundAlertsEnabled ? "warning" : "success", soundAlertsEnabled ? "Sound alerts disabled" : "Sound alerts enabled");
              }}
              type="button"
            >
              <span className={`block h-7 w-7 rounded-full bg-white shadow transition ${soundAlertsEnabled ? "translate-x-7 bg-green-500" : "translate-x-0"}`} />
            </button>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--line)] py-5">
            <div>
              <div className="flex flex-wrap items-center gap-2 text-sm font-semibold text-[var(--brand-navy)]">
                Desktop Notifications:
                <span className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs ${desktopNotificationsAllowed ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"}`}>
                  {desktopNotificationsAllowed ? <Check aria-hidden="true" size={12} strokeWidth={2} /> : null}
                  {desktopNotificationsAllowed ? "Allowed" : "Not Requested"}
                </span>
              </div>
              <p className="mt-2 text-sm text-amber-700">Click the button to enable desktop notifications for inactive tabs</p>
            </div>

            <button className="inline-flex min-h-10 items-center gap-2 rounded-lg border border-[var(--line)] bg-[var(--white)] px-4 text-sm font-semibold text-[var(--brand-navy)] hover:bg-[var(--surface)]" onClick={allowDesktopNotifications} type="button">
              <Bell aria-hidden="true" size={16} strokeWidth={1.9} />
              Allow Notifications
            </button>
          </div>

          <div className="pt-5">
            <button className="inline-flex min-h-10 items-center gap-2 rounded-lg border border-[var(--line)] bg-[var(--white)] px-4 text-sm font-semibold text-[var(--brand-navy)] hover:bg-[var(--surface)]" onClick={testSoundNotification} type="button">
              <PlayCircle aria-hidden="true" size={16} strokeWidth={1.9} />
              Test Sound
            </button>
            <p className="mt-3 text-sm text-[var(--muted)]">Click to hear what the notification will sound like</p>
          </div>
        </div>

        <div className="mt-7 rounded-xl bg-slate-50 p-6 text-sm text-[var(--muted)]">
          <div className="mb-3 flex items-center gap-2 font-semibold text-[var(--brand-navy)]">
            <BellRing aria-hidden="true" size={18} strokeWidth={1.9} />
            Sound notifications will trigger for:
          </div>
          <ul className="m-0 grid gap-2 pl-6">
            <li>Top-up payment requests from clients</li>
            <li>New ad account creation requests</li>
            <li>Business Manager share requests</li>
          </ul>

          <div className="mt-6 grid gap-2">
            <p className="m-0 font-semibold text-[var(--brand-navy)]">How it works:</p>
            <p className="m-0"><strong>Active tab:</strong> Plays notification sound immediately</p>
            <p className="m-0"><strong>Inactive tab:</strong> Shows desktop notification with sound</p>
            <p className="m-0"><strong>Cross-platform:</strong> Works on Windows, macOS, and Linux</p>
            <p className="m-0"><strong>Browsers:</strong> Chrome, Firefox, Edge, Safari (13.1+)</p>
          </div>

          <div className="mt-6">
            <p className="m-0 font-semibold text-[var(--brand-navy)]">macOS Note:</p>
            <p className="mt-2">Make sure notifications are enabled in <strong>System Settings to Notifications</strong> for your browser.</p>
          </div>
        </div>
      </section>
    </section>
  );
}
