"use client";

import { BriefcaseBusiness, CheckCircle2, ChevronRight, CreditCard, Headset, Megaphone, Play, Rocket } from "lucide-react";
import { PrimaryButton, SecondaryButton } from "@/components/shared-buttons";
import { getCustomerCurrentStepIndex, getCustomerOnboardingPhase } from "@/features/crm/client-dashboard/customer-onboarding-storage";

const onboardingSteps = [
  {
    title: "Verify Business",
    defaultDescription: "Submit your business details for reviews",
    completedDescription: "Your business account is verified",
    icon: BriefcaseBusiness,
  },
  {
    title: "Payment Setup",
    defaultDescription: "Wait for admin approval (1-2 Business days)",
    completedDescription: "Payment setup is verified",
    icon: CreditCard,
  },
  {
    title: "Request Ad Account",
    defaultDescription: "Request ad accounts for your business",
    completedDescription: "Ad account request submitted",
    icon: Megaphone,
  },
  {
    title: "Start Advertising",
    defaultDescription: "Get approved and run your campaigns",
    completedDescription: "You are ready to advertise",
    icon: Play,
  },
] as const;

type CustomerOnboardingStepsProps = {
  onContactSupport: () => void;
  onPaymentSetup: () => void;
  onRequestBusinessProfile: () => void;
};

type StepVisualState = "completed" | "current" | "upcoming";

function getStepVisualState(stepIndex: number, currentStepIndex: number): StepVisualState {
  if (stepIndex < currentStepIndex) {
    return "completed";
  }

  if (stepIndex === currentStepIndex) {
    return "current";
  }

  return "upcoming";
}

function StepConnector({ isActive, showArrow = false }: { isActive: boolean; showArrow?: boolean }) {
  return (
    <div aria-hidden="true" className="mt-7 flex min-w-10 max-w-28 flex-1 items-center px-1 max-[1180px]:hidden">
      <div className={`h-0 w-full border-t-2 border-dashed ${isActive ? "border-[var(--color-adsfixter-primary)]" : "border-[var(--line)]"}`} />
      {showArrow ? <ChevronRight className={`-ml-1 shrink-0 ${isActive ? "text-[var(--color-adsfixter-primary)]" : "text-[var(--line)]"}`} size={18} strokeWidth={2} /> : null}
    </div>
  );
}

function getStepDescription(stepIndex: number, visualState: StepVisualState) {
  const step = onboardingSteps[stepIndex];
  return visualState === "completed" ? step.completedDescription : step.defaultDescription;
}

export function CustomerOnboardingSteps({ onContactSupport, onPaymentSetup, onRequestBusinessProfile }: CustomerOnboardingStepsProps) {
  const phase = getCustomerOnboardingPhase();
  const currentStepIndex = getCustomerCurrentStepIndex();

  const primaryAction =
    phase === "verify_business"
      ? { icon: BriefcaseBusiness, label: "Request Business Profile", onClick: onRequestBusinessProfile }
      : phase === "waiting_approval"
        ? { icon: CreditCard, label: "Payment Setup", onClick: onPaymentSetup }
        : { icon: Megaphone, label: "Request Ad Account", onClick: onPaymentSetup };

  const PrimaryActionIcon = primaryAction.icon;

  return (
    <section className="rounded-xl border border-[var(--line)] bg-[var(--white)] p-5 max-[1180px]:p-4">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <h2 className="h6-medium m-0 primary-text">Complete these steps to get started</h2>

        <SecondaryButton className="min-h-10 gap-2 px-4" onClick={onContactSupport} type="button">
          <Headset aria-hidden="true" size={16} strokeWidth={1.8} />
          Contact Support
        </SecondaryButton>
      </div>

      <div className="mt-8 flex items-start max-[1180px]:grid max-[1180px]:grid-cols-1 max-[1180px]:gap-6">
        {onboardingSteps.map((step, index) => {
          const Icon = step.icon;
          const isLast = index === onboardingSteps.length - 1;
          const visualState = getStepVisualState(index, currentStepIndex);
          const isCompleted = visualState === "completed";

          return (
            <div className="contents max-[1180px]:block" key={step.title}>
              <div className="grid min-w-0 flex-1 justify-items-center gap-3 px-1 text-center max-[1180px]:grid-cols-[auto_1fr] max-[1180px]:items-start max-[1180px]:justify-items-start max-[1180px]:text-left">
                <span
                  className={`inline-flex h-16 w-16 items-center justify-center rounded-full border-2 transition-colors ${
                    isCompleted
                      ? "border-[var(--color-adsfixter-primary)] bg-[var(--color-adsfixter-primary)] text-[var(--white)]"
                      : "border-[var(--line)] bg-[var(--white)] text-[var(--muted)]"
                  }`}
                >
                  <Icon aria-hidden="true" size={24} strokeWidth={1.8} />
                </span>

                <div className="grid w-full max-w-44 gap-2">
                  <strong className="body-sm-medium primary-text">{step.title}</strong>
                  <p className="body-xsm-regular m-0 subtext">{getStepDescription(index, visualState)}</p>

                  {isCompleted && index === 0 ? (
                    <span className="body-xsm-medium inline-flex items-center justify-center gap-1.5 rounded-full bg-[var(--success-bg)] px-2.5 py-1 text-[var(--success-text)] max-[1180px]:justify-start">
                      <CheckCircle2 aria-hidden="true" size={12} strokeWidth={2} />
                      Verified
                    </span>
                  ) : null}

                  {isLast && visualState === "upcoming" ? (
                    <span className="body-xsm-medium inline-flex items-center justify-center gap-1.5 rounded-full bg-[var(--surface)] px-2.5 py-1 text-[var(--muted)] max-[1180px]:justify-start">
                      <Rocket aria-hidden="true" size={12} strokeWidth={2} />
                      Ready to Go
                    </span>
                  ) : null}
                </div>
              </div>

              {!isLast ? <StepConnector isActive={index < currentStepIndex} showArrow={index === 0} /> : null}
            </div>
          );
        })}
      </div>

      <div className="mt-8 flex justify-center">
        <PrimaryButton className="min-h-11 gap-2 px-8" onClick={primaryAction.onClick} type="button">
          <PrimaryActionIcon aria-hidden="true" size={16} strokeWidth={1.8} />
          {primaryAction.label}
        </PrimaryButton>
      </div>
    </section>
  );
}
