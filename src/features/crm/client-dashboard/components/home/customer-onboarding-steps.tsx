"use client";

import {
  BriefcaseBusiness,
  CheckCircle2,
  ChevronRight,
  CreditCard,
  Headset,
  Megaphone,
  Play,
  Rocket,
} from "lucide-react";
import { PrimaryButton, SecondaryButton } from "@/components/shared-buttons";

import Image from "next/image";
<<<<<<< HEAD
import {
  getCustomerCurrentStepIndex,
  getCustomerOnboardingPhase,
} from "../../sections";
=======
import { getCustomerCurrentStepIndex, getCustomerOnboardingPhase } from "../../sections";
>>>>>>> 9deb623 (modify)

const onboardingSteps = [
  {
    title: "Verify Business",
    defaultDescription: "Submit your business details for reviews",
    completedDescription: "Your business account is verified",
    icon: "/images/briefcase.png",
  },
  {
    title: "Payment Setup",
    defaultDescription: "Wait for admin approval (1-2 Business days)",
    completedDescription: "Payment setup is verified",
    icon: "/images/credit-card.png",
  },
  {
    title: "Request Ad Account",
    defaultDescription: "Request ad accounts for your business",
    completedDescription: "Ad account request submitted",
    icon: "/images/ads.png",
  },
  {
    title: "Start Advertising",
    defaultDescription: "Get approved and run your campaigns",
    completedDescription: "You are ready to advertise",
    icon: "/images/play.png",
  },
] as const;

type CustomerOnboardingStepsProps = {
  onContactSupport: () => void;
  onPaymentSetup: () => void;
  onRequestBusinessProfile: () => void;
};

type StepVisualState = "completed" | "current" | "upcoming";

function getStepVisualState(
  stepIndex: number,
  currentStepIndex: number,
): StepVisualState {
  if (stepIndex < currentStepIndex) {
    return "completed";
  }

  if (stepIndex === currentStepIndex) {
    return "current";
  }

  return "upcoming";
}
function StepConnector({ isActive }: { isActive: boolean }) {
  return (
    <div
      aria-hidden="true"
      className="mt-7 flex min-w-10 max-w-64 flex-1 items-center px-1 max-[1180px]:hidden"
    >
      <div
        className={`h-0 w-full border-t-2 border-dashed ${isActive ? "border-[var(--color-adsfixter-primary)]" : "border-[var(--line)]"}`}
      />
      {isActive ? (
        <ChevronRight
          className="-ml-1 shrink-0 text-[var(--color-adsfixter-primary)]"
          size={18}
          strokeWidth={2}
        />
      ) : null}
    </div>
  );
}

function getStepDescription(stepIndex: number, visualState: StepVisualState) {
  const step = onboardingSteps[stepIndex];
  return visualState === "completed"
    ? step.completedDescription
    : step.defaultDescription;
}

export function CustomerOnboardingSteps({
  onContactSupport,
  onPaymentSetup,
  onRequestBusinessProfile,
}: CustomerOnboardingStepsProps) {
  const phase = getCustomerOnboardingPhase();
  const currentStepIndex = getCustomerCurrentStepIndex();

  const primaryAction =
    phase === "verify_business"
      ? {
          icon: BriefcaseBusiness,
          label: "Request Business Profile",
          onClick: onRequestBusinessProfile,
        }
<<<<<<< HEAD
      : phase === "payment_setup"
        ? { icon: CreditCard, label: "Payment Setup", onClick: onPaymentSetup }
        : {
            icon: Megaphone,
            label: "Request Ad Account",
=======
      : phase === "waiting_approval"
        ? { icon: CreditCard, label: "Payment Setup", onClick: onPaymentSetup }
        : {
            icon: Megaphone,
            label: "Request Ad Account",  
>>>>>>> 9deb623 (modify)
            onClick: onPaymentSetup,
          };

  const PrimaryActionIcon = primaryAction.icon;

  return (
    <section className="rounded-xl border border-[var(--line)] bg-[var(--white)] ">
      <div className="flex flex-wrap p-5 items-center justify-between gap-4">
        <div>
          <h2 className="h6-medium m-0 primary-text">
            Complete these steps to get started
          </h2>
          <p className="body-regular subtext-500 mt-3 max-w-[600px]">
            Each stage (Business Profile, Payment Setup, Ad Account Request)
            requires admin approval. You can move to the next stage only after
            the previous one is approved.
          </p>
        </div>

        <SecondaryButton
          className="min-h-9 gap-2 px-4"
          onClick={onContactSupport}
          type="button"
        >
          <Headset aria-hidden="true" size={16} strokeWidth={1.8} />
          Contact Support
        </SecondaryButton>
      </div>

      <hr className="text-[#ededed]" />

      <div className="mt-8 flex items-start max-[1180px]:grid max-[1180px]:grid-cols-1 max-[1180px]:gap-6 p-5">
        {onboardingSteps.map((step, index) => {
          const Icon = step.icon;
          const isLast = index === onboardingSteps.length - 1;
          const visualState = getStepVisualState(index, currentStepIndex);
          const isCompleted = visualState === "completed";

          return (
            <div className="contents max-[1180px]:block" key={step.title}>
              <div className="grid min-w-0 flex-1 justify-items-center gap-3 px-1 text-center max-[1180px]:grid-cols-[auto_1fr] max-[1180px]:items-start max-[1180px]:justify-items-start max-[1180px]:text-left">
                <span
                  className={`inline-flex h-15 w-15 items-center justify-center rounded-full border transition-colors ${
                    isCompleted
                      ? "border-[var(--color-adsfixter-primary)] bg-[var(--color-adsfixter-primary)]"
                      : "border-[var(--line)] bg-[var(--white)]"
                  }`}
                >
                  <Image
                    src={step.icon}
                    alt={step.title}
                    width={32}
                    height={32}
                    className={`object-contain transition-all ${
                      isCompleted ? "brightness-0 invert" : ""
                    }`}
                  />
                </span>

                <div className="grid w-full max-w-48 gap-2">
                  <strong className="title-medium primary-text">
                    {step.title}
                  </strong>

                  <p className="body-sm-regular m-0 subtext">
                    {getStepDescription(index, visualState)}
                  </p>

                  {isCompleted && index === 0 && (
                    <span className="body-xsm-medium inline-flex items-center justify-center gap-1.5 rounded-full bg-[var(--success-bg)] px-2.5 py-1 text-[var(--success-text)] max-[1180px]:justify-start">
                      <CheckCircle2
                        aria-hidden="true"
                        size={12}
                        strokeWidth={2}
                      />
                      Verified
                    </span>
                  )}

                  {isLast && visualState === "upcoming" && (
                    <span className="body-xsm-medium inline-flex items-center justify-center gap-1.5 rounded-full bg-[var(--surface)] px-2.5 py-1 text-[var(--muted)] max-[1180px]:justify-start">
                      <Rocket aria-hidden="true" size={12} strokeWidth={2} />
                      Ready to Go
                    </span>
                  )}
                </div>
              </div>

              {!isLast ? (
                <StepConnector isActive={index < currentStepIndex} />
              ) : null}
            </div>
          );
        })}
      </div>

      <div className="pt-8 pb-10 flex justify-center">
        <PrimaryButton
          className="min-h-11 gap-2 px-8"
          onClick={primaryAction.onClick}
          type="button"
        >
          <PrimaryActionIcon aria-hidden="true" size={16} strokeWidth={1.8} />
          {primaryAction.label}
        </PrimaryButton>
      </div>
    </section>
  );
}
