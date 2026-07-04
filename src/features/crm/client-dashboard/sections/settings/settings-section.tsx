"use client";

import { useState } from "react";
import { AccountRegionPanel } from "@/features/crm/client-dashboard/sections/settings/components/account-region-panel";
import { NotificationPreferencesPanel } from "@/features/crm/client-dashboard/sections/settings/components/notification-preferences-panel";
import { ProfileInformationPanel } from "@/features/crm/client-dashboard/sections/settings/components/profile-information-panel";
import { SecurityPanel } from "@/features/crm/client-dashboard/sections/settings/components/security-panel";
import type { ToastType } from "@/features/crm/types/crm";

type SettingsSectionProps = {
  showToast: (type: ToastType, message: string) => void;
};

export function SettingsSection({ showToast }: SettingsSectionProps) {
  const [profile, setProfile] = useState({
    name: "Boostfixter",
    email: "client@adsfixter.com",
    phone: "+880 1700 000000",
    timezone: "Asia/Dhaka",
  });
  const [emailNotificationsEnabled, setEmailNotificationsEnabled] = useState(true);
  const [paymentAlertsEnabled, setPaymentAlertsEnabled] = useState(true);

  const updateProfileValue = (field: keyof typeof profile, value: string) => {
    setProfile((current) => ({ ...current, [field]: value }));
  };

  return (
    <section className="grid gap-4">
      <div>
        <h2 className="m-0 text-xl font-semibold text-[var(--brand-navy)]">Settings</h2>
        <p className="mt-1 text-sm text-[var(--muted)]">Manage your profile, notifications, and account preferences.</p>
      </div>

      <div className="grid grid-cols-12 gap-4">
        <ProfileInformationPanel
          onChange={updateProfileValue}
          onReset={() => showToast("warning", "Changes reset")}
          onSave={() => showToast("success", "Settings saved")}
          profile={profile}
        />

        <aside className="col-span-4 grid gap-4 max-[1180px]:col-span-12">
          <NotificationPreferencesPanel
            emailNotificationsEnabled={emailNotificationsEnabled}
            onToggleEmailNotifications={() => setEmailNotificationsEnabled((current) => !current)}
            onTogglePaymentAlerts={() => setPaymentAlertsEnabled((current) => !current)}
            paymentAlertsEnabled={paymentAlertsEnabled}
          />
          <SecurityPanel onChangePassword={() => showToast("warning", "Password update flow coming soon")} />
          <AccountRegionPanel />
        </aside>
      </div>
    </section>
  );
}

export { SettingsSection as ClientSettingsSection };
