"use client";

import { BriefcaseBusiness, CheckCircle2, Megaphone, Play, Rocket, ShieldCheck, WalletCards } from "lucide-react";
import { PrimaryButton } from "@/components/shared-buttons";

const setupSummarySteps = [
  {
    title: "Business Profile",
    description: "Your business profile has been submitted and approved",
    icon: BriefcaseBusiness,
  },
  {
    title: "Payment Setup",
    description: "Payment method and primary currency have been configured",
    icon: WalletCards,
  },
  {
    title: "Ads Account Request",
    description: "You can now request ad accounts for your business.",
    icon: Megaphone,
  },
  {
    title: "You're Ready",
    description: "All Steps Completed. You can now start your advertising journey",
    icon: Play,
  },
] as const;

type CustomerSetupCompleteSectionProps = {
  onGrow: () => void;
};

export function CustomerSetupCompleteSection({ onGrow }: CustomerSetupCompleteSectionProps) {
  return (
    <div className="mx-auto grid max-w-4xl gap-6">
      <section className="rounded-2xl border border-[var(--line)] bg-[var(--white)] px-6 py-12 text-center max-[720px]:px-4 max-[720px]:py-10">
        <div className="relative mx-auto grid w-fit place-items-center">
          <span aria-hidden="true" className="absolute -left-10 top-1 text-xl">
            🎊
          </span>
          <span aria-hidden="true" className="absolute -right-10 top-0 text-lg">
            ✨
          </span>
          <span aria-hidden="true" className="absolute -left-6 bottom-2 text-base">
            🟡
          </span>
          <span aria-hidden="true" className="absolute -right-6 bottom-1 text-base">
            🟣
          </span>
          <span aria-hidden="true" className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-3 text-base">
            🟢
          </span>
          <span className="inline-flex h-24 w-24 items-center justify-center rounded-full bg-[#22c55e] text-white shadow-[0_8px_24px_rgba(34,197,94,0.28)]">
            <CheckCircle2 aria-hidden="true" size={48} strokeWidth={2} />
          </span>
        </div>

        <h1 className="h3 m-0 mt-6 primary-text">All Set, You&apos;re ready to Grow! 🥳</h1>
        <p className="body-regular mx-auto m-0 mt-3 max-w-2xl subtext">
          Thank you for trusting AdsFixter. You have successfully complete all the initial setup.
        </p>

        <PrimaryButton className="mx-auto mt-8 min-h-11 gap-2 px-8" onClick={onGrow} type="button">
          <Rocket aria-hidden="true" size={16} strokeWidth={1.8} />
          Grow With AdsFixter
        </PrimaryButton>

        <p className="body-sm-regular mx-auto m-0 mt-6 flex max-w-xl items-center justify-center gap-2 subtext">
          <ShieldCheck aria-hidden="true" className="shrink-0 text-[var(--success-text)]" size={16} strokeWidth={1.8} />
          Your data is secure with AdsFixter. We&apos;re here to help you succeed.
        </p>
      </section>

      <section className="rounded-2xl border border-[var(--line)] bg-[var(--white)] p-6 max-[720px]:p-4">
        <h2 className="h5 m-0 primary-text">Setup Summary</h2>

        <div className="mt-6 grid gap-0">
          {setupSummarySteps.map((step, index) => {
            const Icon = step.icon;
            const isLast = index === setupSummarySteps.length - 1;

            return (
              <div className="grid grid-cols-[auto_1fr_auto] gap-4 max-[720px]:grid-cols-[auto_1fr]" key={step.title}>
                <div className="grid justify-items-center">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-full border-2 border-[var(--color-adsfixter-primary)] bg-[var(--brand-orange-soft)] text-[var(--color-adsfixter-primary)]">
                    <Icon aria-hidden="true" size={18} strokeWidth={1.8} />
                  </span>
                  {!isLast ? (
                    <span
                      aria-hidden="true"
                      className="my-1 h-full min-h-10 w-0 border-l-2 border-dashed border-[var(--color-adsfixter-primary)]"
                    />
                  ) : null}
                </div>

                <div className={`grid gap-1 ${isLast ? "" : "pb-6"}`}>
                  <strong className="body-sm-medium primary-text">{step.title}</strong>
                  <p className="body-sm-regular m-0 subtext">{step.description}</p>
                </div>

                <span className="body-xsm-medium inline-flex h-fit items-center gap-1.5 self-start rounded-full bg-[var(--success-bg)] px-3 py-1 text-[var(--success-text)] max-[720px]:col-span-2 max-[720px]:col-start-2">
                  <CheckCircle2 aria-hidden="true" size={12} strokeWidth={2} />
                  Complete
                </span>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}

export { CustomerSetupCompleteSection as ClientSetupCompleteSection };
