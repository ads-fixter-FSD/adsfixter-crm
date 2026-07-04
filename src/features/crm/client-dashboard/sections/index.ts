export { ClientPaymentSetupSection } from "@/features/crm/client-dashboard/sections/payment-setup";
export { ClientNewPaymentSection } from "@/features/crm/client-dashboard/sections/payments/new-payment";
export { ClientAdAccountsSection } from "@/features/crm/client-dashboard/sections/ad-accounts";
export { ClientSettingsSection } from "@/features/crm/client-dashboard/sections/settings";
export { ClientBusinessProfileRequestSection, ClientBusinessProfileRequestsListSection } from "@/features/crm/client-dashboard/sections/business-profile";
export { ClientAdAccountRequestsListSection } from "@/features/crm/client-dashboard/sections/ad-account-request/ad-account-requests-list-section";
export { ClientHelpSupportSection } from "@/features/crm/client-dashboard/sections/help-support";
export { ClientNotificationsSection } from "@/features/crm/client-dashboard/sections/notifications";
export { ClientPaymentHistorySection } from "@/features/crm/client-dashboard/sections/payments/payment-history";
export { ClientBalanceHistorySection } from "@/features/crm/client-dashboard/sections/payments/balance-history";

export {
  enableBusinessProfileRequestsNav,
  isBusinessProfileRequestsNavEnabled,
} from "@/features/crm/client-dashboard/sections/business-profile/business-profile-request-storage";

export {
  getCustomerCurrentStepIndex,
  getCustomerOnboardingPhase,
  hasSubmittedBusinessProfile,
  isAdAccountRequestSubmitted,
  isPaymentSetupSubmitted,
  isStartAdvertisingReady,
  markStartAdvertisingReady,
} from "@/features/crm/client-dashboard/sections/home/customer-onboarding-storage";
