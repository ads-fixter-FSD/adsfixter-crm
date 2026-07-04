import { isAdAccountRequestSubmitted } from "@/features/crm/client-dashboard/sections/ad-account-request/ad-account-request-storage";
import {
  getBusinessProfileRequests,
  isBusinessProfileRequestsNavEnabled,
} from "@/features/crm/client-dashboard/sections/business-profile/business-profile-request-storage";
import { isPaymentSetupSubmitted } from "@/features/crm/client-dashboard/sections/payment-setup/payment-setup-storage";
import { getCustomerRequestsNavigation } from "@/components/layout/app-sidebar-navigation";

export function getCustomerRequestsNavState() {
  const showBusinessProfileRequests = isBusinessProfileRequestsNavEnabled() || getBusinessProfileRequests().length > 0;
  const showPaymentSetup = isPaymentSetupSubmitted();
  const showAdAccountRequests = isAdAccountRequestSubmitted();

  const requestItems = getCustomerRequestsNavigation({
    showAdAccountRequests,
    showBusinessProfileRequests,
    showPaymentSetup,
  });

  return {
    requestItems,
    showAdAccountRequests,
    showBusinessProfileRequests,
    showPaymentSetup,
    showRequestsNav: requestItems.length > 0,
  };
}
