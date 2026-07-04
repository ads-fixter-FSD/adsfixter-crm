import { getBusinessProfileRequests } from "@/features/crm/client-dashboard/sections/business-profile/business-profile-request-storage";
import { isPaymentSetupSubmitted } from "@/features/crm/client-dashboard/sections/payment-setup/payment-setup-storage";

export type CustomerOnboardingPhase = "verify_business" | "waiting_approval" | "payment_submitted";

export function getCustomerOnboardingPhase(): CustomerOnboardingPhase {
  const hasBusinessRequests = getBusinessProfileRequests().length > 0;

  if (!hasBusinessRequests) {
    return "verify_business";
  }

  if (!isPaymentSetupSubmitted()) {
    return "waiting_approval";
  }

  return "payment_submitted";
}

export function getCustomerCurrentStepIndex() {
  const phase = getCustomerOnboardingPhase();

  if (phase === "verify_business") {
    return 0;
  }

  if (phase === "waiting_approval") {
    return 1;
  }

  return 2;
}

export function hasSubmittedBusinessProfile() {
  return getBusinessProfileRequests().length > 0;
}

export { isPaymentSetupSubmitted } from "@/features/crm/client-dashboard/sections/payment-setup/payment-setup-storage";
