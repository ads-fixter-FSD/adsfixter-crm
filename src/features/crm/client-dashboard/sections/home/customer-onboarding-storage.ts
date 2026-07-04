import { getBusinessProfileRequests } from "@/features/crm/client-dashboard/sections/business-profile/business-profile-request-storage";
import {
  isAdAccountRequestSubmitted,
  isStartAdvertisingReady,
} from "@/features/crm/client-dashboard/sections/ad-account-request/ad-account-request-storage";
import { isPaymentSetupSubmitted } from "@/features/crm/client-dashboard/sections/payment-setup/payment-setup-storage";

export type CustomerOnboardingPhase =
  | "verify_business"
  | "payment_setup"
  | "request_ad_account"
  | "start_advertising"
  | "complete";

export function getCustomerOnboardingPhase(): CustomerOnboardingPhase {
  if (!hasSubmittedBusinessProfile()) {
    return "verify_business";
  }

  if (!isPaymentSetupSubmitted()) {
    return "payment_setup";
  }

  if (!isAdAccountRequestSubmitted()) {
    return "request_ad_account";
  }

  if (!isStartAdvertisingReady()) {
    return "start_advertising";
  }

  return "complete";
}

export function getCustomerCurrentStepIndex() {
  const phase = getCustomerOnboardingPhase();

  if (phase === "verify_business") {
    return 0;
  }

  if (phase === "payment_setup") {
    return 1;
  }

  if (phase === "request_ad_account") {
    return 2;
  }

  if (phase === "start_advertising") {
    return 3;
  }

  return 4;
}

export function hasSubmittedBusinessProfile() {
  return getBusinessProfileRequests().length > 0;
}

export function getOnboardingPrimaryAction() {
  const phase = getCustomerOnboardingPhase();

  if (phase === "verify_business") {
    return {
      phase,
      label: "Request Business Profile",
      target: "New Business Profile Request" as const,
    };
  }

  if (phase === "payment_setup") {
    return {
      phase,
      label: "Payment Setup",
      target: "Payment Setup" as const,
    };
  }

  if (phase === "request_ad_account") {
    return {
      phase,
      label: "Request Ad Account",
      target: "Request Account" as const,
    };
  }

  if (phase === "start_advertising") {
    return {
      phase,
      label: "Continue",
      target: "Dashboard" as const,
    };
  }

  return {
    phase,
    label: "Continue",
    target: "Dashboard" as const,
  };
}

export { isPaymentSetupSubmitted } from "@/features/crm/client-dashboard/sections/payment-setup/payment-setup-storage";
export {
  isAdAccountRequestSubmitted,
  isStartAdvertisingReady,
  markStartAdvertisingReady,
} from "@/features/crm/client-dashboard/sections/ad-account-request/ad-account-request-storage";
