import { Globe2 } from "lucide-react";

export function AccountRegionPanel() {
  return (
    <section className="rounded-xl border-2 border-[var(--line)] bg-[var(--white)] p-5">
      <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-[var(--brand-navy)]">
        <Globe2 aria-hidden="true" size={17} strokeWidth={1.9} />
        Account Region
      </div>
      <p className="m-0 text-sm font-semibold text-[var(--brand-navy)]">Bangladesh</p>
      <p className="mt-1 text-xs text-[var(--muted)]">Currency and billing settings are configured by AdsFixter.</p>
    </section>
  );
}
