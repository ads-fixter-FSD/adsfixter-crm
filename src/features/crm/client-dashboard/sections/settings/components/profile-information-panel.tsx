import { UserRound } from "lucide-react";
import { PrimaryButton, SecondaryButton } from "@/components/shared-buttons";

type ProfileInformationPanelProps = {
  profile: {
    name: string;
    email: string;
    phone: string;
    timezone: string;
  };
  onChange: (field: "name" | "email" | "phone" | "timezone", value: string) => void;
  onSave: () => void;
  onReset: () => void;
};

export function ProfileInformationPanel({ profile, onChange, onSave, onReset }: ProfileInformationPanelProps) {
  return (
    <section className="col-span-8 rounded-xl border-2 border-[var(--line)] bg-[var(--white)] p-5 max-[1180px]:col-span-12">
      <div className="mb-4 flex items-center gap-2 text-base font-semibold text-[var(--brand-navy)]">
        <UserRound aria-hidden="true" size={18} strokeWidth={1.9} />
        Profile Information
      </div>

      <div className="grid grid-cols-2 gap-4 max-[720px]:grid-cols-1">
        <label className="grid gap-1.5 text-sm font-semibold text-[var(--brand-navy)]">
          Full Name
          <input
            className="min-h-10 rounded-lg border border-[var(--line)] bg-[var(--white)] px-3 text-sm font-normal outline-none focus:border-[var(--brand-navy)]"
            onChange={(event) => onChange("name", event.target.value)}
            value={profile.name}
          />
        </label>
        <label className="grid gap-1.5 text-sm font-semibold text-[var(--brand-navy)]">
          Email Address
          <input
            className="min-h-10 rounded-lg border border-[var(--line)] bg-[var(--white)] px-3 text-sm font-normal outline-none focus:border-[var(--brand-navy)]"
            onChange={(event) => onChange("email", event.target.value)}
            type="email"
            value={profile.email}
          />
        </label>
        <label className="grid gap-1.5 text-sm font-semibold text-[var(--brand-navy)]">
          Phone Number
          <input
            className="min-h-10 rounded-lg border border-[var(--line)] bg-[var(--white)] px-3 text-sm font-normal outline-none focus:border-[var(--brand-navy)]"
            onChange={(event) => onChange("phone", event.target.value)}
            value={profile.phone}
          />
        </label>
        <label className="grid gap-1.5 text-sm font-semibold text-[var(--brand-navy)]">
          Timezone
          <select
            className="min-h-10 rounded-lg border border-[var(--line)] bg-[var(--white)] px-3 text-sm font-normal outline-none focus:border-[var(--brand-navy)]"
            onChange={(event) => onChange("timezone", event.target.value)}
            value={profile.timezone}
          >
            <option value="Asia/Dhaka">Asia/Dhaka</option>
            <option value="Asia/Kolkata">Asia/Kolkata</option>
            <option value="UTC">UTC</option>
          </select>
        </label>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <PrimaryButton className="px-4" onClick={onSave} type="button">
          Save Changes
        </PrimaryButton>
        <SecondaryButton className="px-4" onClick={onReset} type="button">
          Reset
        </SecondaryButton>
      </div>
    </section>
  );
}
