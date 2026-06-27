"use client";

import { Bell, Globe2, Lock, UserRound } from "lucide-react";
import { useState } from "react";
import { PrimaryButton, SecondaryButton } from "@/components/shared-buttons";
import type { ToastType } from "@/features/crm/types/crm";

type ClientSettingsSectionProps = {
  showToast: (type: ToastType, message: string) => void;
};

export function ClientSettingsSection({ showToast }: ClientSettingsSectionProps) {
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
        <section className="col-span-8 rounded-xl border-2 border-[var(--line)] bg-[var(--white)] p-5 max-[1180px]:col-span-12">
          <div className="mb-4 flex items-center gap-2 text-base font-semibold text-[var(--brand-navy)]">
            <UserRound aria-hidden="true" size={18} strokeWidth={1.9} />
            Profile Information
          </div>

          <div className="grid grid-cols-2 gap-4 max-[720px]:grid-cols-1">
            <label className="grid gap-1.5 text-sm font-semibold text-[var(--brand-navy)]">
              Full Name
              <input className="min-h-10 rounded-lg border border-[var(--line)] bg-[var(--white)] px-3 text-sm font-normal outline-none focus:border-[var(--brand-navy)]" onChange={(event) => updateProfileValue("name", event.target.value)} value={profile.name} />
            </label>
            <label className="grid gap-1.5 text-sm font-semibold text-[var(--brand-navy)]">
              Email Address
              <input className="min-h-10 rounded-lg border border-[var(--line)] bg-[var(--white)] px-3 text-sm font-normal outline-none focus:border-[var(--brand-navy)]" onChange={(event) => updateProfileValue("email", event.target.value)} type="email" value={profile.email} />
            </label>
            <label className="grid gap-1.5 text-sm font-semibold text-[var(--brand-navy)]">
              Phone Number
              <input className="min-h-10 rounded-lg border border-[var(--line)] bg-[var(--white)] px-3 text-sm font-normal outline-none focus:border-[var(--brand-navy)]" onChange={(event) => updateProfileValue("phone", event.target.value)} value={profile.phone} />
            </label>
            <label className="grid gap-1.5 text-sm font-semibold text-[var(--brand-navy)]">
              Timezone
              <select className="min-h-10 rounded-lg border border-[var(--line)] bg-[var(--white)] px-3 text-sm font-normal outline-none focus:border-[var(--brand-navy)]" onChange={(event) => updateProfileValue("timezone", event.target.value)} value={profile.timezone}>
                <option value="Asia/Dhaka">Asia/Dhaka</option>
                <option value="Asia/Kolkata">Asia/Kolkata</option>
                <option value="UTC">UTC</option>
              </select>
            </label>
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-2">
            <PrimaryButton className="px-4" onClick={() => showToast("success", "Settings saved")} type="button">
              Save Changes
            </PrimaryButton>
            <SecondaryButton className="px-4" onClick={() => showToast("warning", "Changes reset")} type="button">
              Reset
            </SecondaryButton>
          </div>
        </section>

        <aside className="col-span-4 grid gap-4 max-[1180px]:col-span-12">
          <section className="rounded-xl border-2 border-[var(--line)] bg-[var(--white)] p-5">
            <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-[var(--brand-navy)]">
              <Bell aria-hidden="true" size={17} strokeWidth={1.9} />
              Notification Preferences
            </div>
            <div className="grid gap-3">
              <label className="flex items-center justify-between gap-3 rounded-lg border border-[var(--line)] p-3 text-sm text-[var(--brand-navy)]">
                Email notifications
                <input checked={emailNotificationsEnabled} onChange={() => setEmailNotificationsEnabled((current) => !current)} type="checkbox" />
              </label>
              <label className="flex items-center justify-between gap-3 rounded-lg border border-[var(--line)] p-3 text-sm text-[var(--brand-navy)]">
                Payment alerts
                <input checked={paymentAlertsEnabled} onChange={() => setPaymentAlertsEnabled((current) => !current)} type="checkbox" />
              </label>
            </div>
          </section>

          <section className="rounded-xl border-2 border-[var(--line)] bg-[var(--white)] p-5">
            <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-[var(--brand-navy)]">
              <Lock aria-hidden="true" size={17} strokeWidth={1.9} />
              Security
            </div>
            <p className="m-0 text-sm text-[var(--muted)]">Keep your account safe by updating your password regularly.</p>
            <SecondaryButton className="mt-4 px-4" onClick={() => showToast("warning", "Password update flow coming soon")} type="button">
              Change Password
            </SecondaryButton>
          </section>

          <section className="rounded-xl border-2 border-[var(--line)] bg-[var(--white)] p-5">
            <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-[var(--brand-navy)]">
              <Globe2 aria-hidden="true" size={17} strokeWidth={1.9} />
              Account Region
            </div>
            <p className="m-0 text-sm font-semibold text-[var(--brand-navy)]">Bangladesh</p>
            <p className="mt-1 text-xs text-[var(--muted)]">Currency and billing settings are configured by AdsFixter.</p>
          </section>
        </aside>
      </div>
    </section>
  );
}
