"use client";

import {
  BriefcaseBusiness,
  CheckCircle2,
  ChevronRight,
  CreditCard,
  Headset,
  Loader,
  Megaphone,
  Play,
} from "lucide-react";
import { PrimaryButton, SecondaryButton } from "@/components/shared-buttons";
import {
  getCustomerCurrentStepIndex,
  getCustomerOnboardingPhase,
  isAdAccountRequestSubmitted,
  isStartAdvertisingReady,
  type CustomerOnboardingPhase,
} from "@/features/crm/client-dashboard/sections/home/customer-onboarding-storage";
import { getBusinessProfileRequests } from "@/features/crm/client-dashboard/sections/business-profile/business-profile-request-storage";

const onboardingSteps = [
  {
    title: "Verify Business",
    defaultDescription: "Submit your business details for review",
    completedDescription: "Your business profile is submitted",
    icon: BriefcaseBusiness,
  },
  {
    title: "Payment Setup",
    defaultDescription: "Choose currency and payment methods",
    completedDescription: "Payment setup is complete",
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
  onNavigate: (section: string) => void;
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

function getPrimaryAction(phase: CustomerOnboardingPhase) {
  if (phase === "verify_business") {
    return {
      icon: BriefcaseBusiness,
      label: "Request Business Profile",
      section: null as string | null,
    };
  }

  if (phase === "payment_setup") {
    return {
      icon: CreditCard,
      label: "Payment Setup",
      section: "Payment Setup",
    };
  }

  if (phase === "request_ad_account") {
    return {
      icon: Megaphone,
      label: "Request Ad Account",
      section: "Request Account",
    };
  }

  if (phase === "start_advertising") {
    return {
      icon: CheckCircle2,
      label: "Continue",
      section: null as string | null,
    };
  }

  return {
    icon: CheckCircle2,
    label: "Continue",
    section: null as string | null,
  };
}

export function CustomerOnboardingSteps({
  onContactSupport,
  onNavigate,
  onRequestBusinessProfile,
}: CustomerOnboardingStepsProps) {
  const phase = getCustomerOnboardingPhase();
  const currentStepIndex = getCustomerCurrentStepIndex();
  const primaryAction = getPrimaryAction(phase);
  const PrimaryActionIcon = primaryAction.icon;
  const isFullyComplete = phase === "complete";
  const shouldShowSetupCompleteContinue =
    isAdAccountRequestSubmitted() && !isStartAdvertisingReady();
  const displayStepIndex = shouldShowSetupCompleteContinue
    ? onboardingSteps.length
    : currentStepIndex;

  const handlePrimaryClick = () => {
    if (shouldShowSetupCompleteContinue) {
      onNavigate("Setup Complete");
      return;
    }

    if (primaryAction.section) {
      onNavigate(primaryAction.section);
      return;
    }

    onRequestBusinessProfile();
  };

  return (
    <section className="rounded-xl border border-[var(--line)] bg-[var(--white)] ">
      <div className="flex flex-wrap items-start  p-4 justify-between gap-4">
        <div>
          <h2 className="h6-medium m-0 primary-text">
            Complete these steps to get started
          </h2>
          {currentStepIndex === 0 ? (
            <p className="body-regular subtext max-w-[700px] mt-3">
              Each stage (Business Profile, Payment Setup, Ad Account Request)
              requires admin approval. You can move to the next stage only after
              the previous one is approved.
            </p>
          ) : null}
        </div>

        <SecondaryButton
          className="min-h-10 gap-2 px-4"
          onClick={onContactSupport}
          type="button"
        >
          <Headset aria-hidden="true" size={16} strokeWidth={1.8} />
          Contact Support
        </SecondaryButton>
      </div>

      <hr className="text-[var(--line)]" />

      <div className="mt-8 flex items-start max-[1180px]:grid max-[1180px]:grid-cols-1 max-[1180px]:gap-6 p-4">
        {onboardingSteps.map((step, index) => {
          const Icon = step.icon;
          const isLast = index === onboardingSteps.length - 1;
          const visualState = getStepVisualState(index, displayStepIndex);
          const isCompleted = visualState === "completed";
          const isCurrent = visualState === "current";

          return (
            <div className="contents max-[1180px]:block" key={step.title}>
              <div className="grid min-w-0 flex-1 justify-items-center gap-3 px-1 text-center max-[1180px]:grid-cols-[auto_1fr] max-[1180px]:items-start max-[1180px]:justify-items-start max-[1180px]:text-left">
                <span
                  className={`inline-flex h-16 w-16 items-center justify-center rounded-full border-2 transition-colors ${
                    isCompleted
                      ? "border-[var(--color-adsfixter-primary)] bg-[var(--color-adsfixter-primary)] text-[var(--white)]"
                      : isCurrent
                        ? "border-[var(--color-adsfixter-primary)] bg-[var(--brand-orange-soft)] text-[var(--color-adsfixter-primary)]"
                        : "border-[var(--line)] bg-[var(--white)] text-[var(--muted)]"
                  }`}
                >
                  <Icon aria-hidden="true" size={24} strokeWidth={1.8} />
                </span>

                <div className="grid w-full max-w-44 gap-2">
                  <strong className="title-medium primary-text">
                    {step.title}
                  </strong>
                  <p className="body-sm-regular m-0 subtext">
                    {getStepDescription(index, visualState)}
                  </p>

                  {isCompleted && index === 0
                    ? (() => {
                        const isApproved = getBusinessProfileRequests().some(
                          (request) => request.status === "Approved",
                        );

                        return (
                          <span
                            className={`body-xsm-regular inline-flex items-center justify-center gap-1.5 rounded-full px-2.5 py-1 max-[1180px]:justify-start ${
                              isApproved
                                ? "bg-[var(--success-bg)] text-[var(--success-text)]"
                                : "bg-[#ffece6] adsfixter-primary-text"
                            }`}
                          >
                            {isApproved ? (
                              <CheckCircle2
                                aria-hidden="true"
                                size={12}
                                strokeWidth={2}
                              />
                            ) : (
                              <Loader
                                aria-hidden="true"
                                className="animate-spin"
                                size={12}
                                strokeWidth={2}
                              />
                            )}
                            {isApproved ? "Verified" : "Waiting for approval"}
                          </span>
                        );
                      })()
                    : null}
                  {isCompleted && index === 1 ? (
                    <span className="body-xsm-regular inline-flex items-center justify-center gap-1.5 rounded-full bg-[var(--success-bg)] px-2.5 py-1 text-[var(--success-text)] max-[1180px]:justify-start">
                      <CheckCircle2
                        aria-hidden="true"
                        size={12}
                        strokeWidth={2}
                      />
                      Complete
                    </span>
                  ) : null}

                  {isCompleted && index === 2 ? (
                    <span className="body-xsm-regular inline-flex items-center justify-center gap-1.5 rounded-full bg-[var(--success-bg)] px-2.5 py-1 text-[var(--success-text)] max-[1180px]:justify-start">
                      <CheckCircle2
                        aria-hidden="true"
                        size={12}
                        strokeWidth={2}
                      />
                      Submitted
                    </span>
                  ) : null}

                  {isLast &&
                  (visualState === "completed" || isFullyComplete) ? (
                    <span className="body-xsm-regular inline-flex items-center justify-center gap-1.5 rounded-full bg-[var(--success-bg)] px-2.5 py-1 text-[var(--success-text)] max-[1180px]:justify-start">
                      <CheckCircle2
                        aria-hidden="true"
                        size={12}
                        strokeWidth={2}
                      />
                      Complete
                    </span>
                  ) : null}
                </div>
              </div>

              {!isLast ? (
                <StepConnector isActive={index < currentStepIndex} />
              ) : null}
            </div>
          );
        })}
      </div>

      {shouldShowSetupCompleteContinue ? (
        <div className="mt-8 flex justify-center py-8">
          <PrimaryButton
            className="min-h-9 gap-2 px-8"
            onClick={handlePrimaryClick}
            type="button"
          >
            <CheckCircle2 aria-hidden="true" size={16} strokeWidth={1.8} />
            Continue
          </PrimaryButton>
        </div>
      ) : !isFullyComplete ? (
        <div className="mt-8 flex justify-center py-8">
          <PrimaryButton
            className="min-h-9 gap-2 px-8"
            onClick={handlePrimaryClick}
            type="button"
          >
            <PrimaryActionIcon aria-hidden="true" size={16} strokeWidth={1.8} />
            {primaryAction.label}
          </PrimaryButton>
        </div>
      ) : null}
    </section>
  );
}
