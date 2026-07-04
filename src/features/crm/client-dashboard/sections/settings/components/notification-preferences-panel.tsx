import { Bell } from "lucide-react";

type NotificationPreferencesPanelProps = {
  emailNotificationsEnabled: boolean;
  paymentAlertsEnabled: boolean;
  onToggleEmailNotifications: () => void;
  onTogglePaymentAlerts: () => void;
};

export function NotificationPreferencesPanel({
  emailNotificationsEnabled,
  paymentAlertsEnabled,
  onToggleEmailNotifications,
  onTogglePaymentAlerts,
}: NotificationPreferencesPanelProps) {
  return (
    <section className="rounded-xl border-2 border-[var(--line)] bg-[var(--white)] p-5">
      <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-[var(--brand-navy)]">
        <Bell aria-hidden="true" size={17} strokeWidth={1.9} />
        Notification Preferences
      </div>
      <div className="grid gap-3">
        <label className="flex items-center justify-between gap-3 rounded-lg border border-[var(--line)] p-3 text-sm text-[var(--brand-navy)]">
          Email notifications
          <input checked={emailNotificationsEnabled} onChange={onToggleEmailNotifications} type="checkbox" />
        </label>
        <label className="flex items-center justify-between gap-3 rounded-lg border border-[var(--line)] p-3 text-sm text-[var(--brand-navy)]">
          Payment alerts
          <input checked={paymentAlertsEnabled} onChange={onTogglePaymentAlerts} type="checkbox" />
        </label>
      </div>
    </section>
  );
}
