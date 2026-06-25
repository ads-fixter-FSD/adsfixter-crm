"use client";

import { useState } from "react";
import { PrimaryButton } from "@/components/shared-buttons";
import type { ToastType } from "@/features/crm/types/crm";

type ProfileUpdateSectionProps = {
  showToast: (type: ToastType, message: string) => void;
};

export function ProfileUpdateSection({ showToast }: ProfileUpdateSectionProps) {
  const [profile, setProfile] = useState({
    name: "Super Admin",
    email: "admin@adsfixter.com",
    phone: "+880 1700 000000",
    role: "Super Admin",
  });

  const updateProfile = (field: keyof typeof profile, value: string) => {
    setProfile((current) => ({ ...current, [field]: value }));
  };

  return (
    <section className="grid w-full gap-5">
      <div>
        <h2 className="m-0 text-2xl font-semibold text-[var(--brand-navy)]">Profile Update</h2>
        <p className="mt-1 text-sm text-[var(--muted)]">Update your admin profile information.</p>
      </div>

      <section className="rounded-xl border border-[var(--line)] bg-[var(--white)] p-5">
        <div className="grid gap-4">
          <label className="grid gap-1.5 text-sm font-semibold text-[var(--brand-navy)]">
            Name
            <input className="min-h-10 rounded-lg border border-[var(--line)] px-3 font-normal outline-none focus:border-[var(--brand-navy)]" onChange={(event) => updateProfile("name", event.target.value)} value={profile.name} />
          </label>
          <label className="grid gap-1.5 text-sm font-semibold text-[var(--brand-navy)]">
            Email
            <input className="min-h-10 rounded-lg border border-[var(--line)] px-3 font-normal outline-none focus:border-[var(--brand-navy)]" onChange={(event) => updateProfile("email", event.target.value)} type="email" value={profile.email} />
          </label>
          <label className="grid gap-1.5 text-sm font-semibold text-[var(--brand-navy)]">
            Phone
            <input className="min-h-10 rounded-lg border border-[var(--line)] px-3 font-normal outline-none focus:border-[var(--brand-navy)]" onChange={(event) => updateProfile("phone", event.target.value)} value={profile.phone} />
          </label>
          <label className="grid gap-1.5 text-sm font-semibold text-[var(--brand-navy)]">
            Role
            <input className="min-h-10 rounded-lg border border-[var(--line)] bg-[var(--surface)] px-3 font-normal outline-none" disabled value={profile.role} />
          </label>
          <PrimaryButton className="justify-self-start px-5" onClick={() => showToast("success", "Profile updated")} type="button">
            Save Profile
          </PrimaryButton>
        </div>
      </section>
    </section>
  );
}
