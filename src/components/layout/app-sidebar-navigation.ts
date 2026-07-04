import { BadgeDollarSign, Bell, BriefcaseBusiness, CreditCard, HandCoins, LayoutDashboard, LifeBuoy, Megaphone, PlusCircle, ReceiptText, Settings, Share2, WalletCards, type LucideIcon } from "lucide-react";

export const customerMainNavigation = ["Dashboard"];

export const customerRequestsNavigation = ["Business Profile Requests", "Payment Setup", "Ad Account Requests"];

export type CustomerRequestsNavOptions = {
  showAdAccountRequests?: boolean;
  showBusinessProfileRequests?: boolean;
  showPaymentSetup?: boolean;
};

export function getCustomerRequestsNavigation(options?: CustomerRequestsNavOptions) {
  const items: string[] = [];

  if (options?.showBusinessProfileRequests) {
    items.push("Business Profile Requests");
  }

  if (options?.showPaymentSetup) {
    items.push("Payment Setup");
  }

  if (options?.showAdAccountRequests) {
    items.push("Ad Account Requests");
  }

  return items;
}

export const customerOtherNavigation = ["Help & Support", "Settings"];

export const customerHiddenNavigation = [
  "New Business Profile Request",
  "Payment Setup",
  "Ad Accounts",
  "Request Account",
  "Business Share",
  "Payments",
  "New Payment",
  "Payment History",
  "Balance History",
  "Notifications",
  "Setup Complete",
];

export const customerNavigation = [
  ...customerMainNavigation,
  ...customerRequestsNavigation,
  ...customerOtherNavigation,
  ...customerHiddenNavigation,
];

export const navigationIcons: Record<string, LucideIcon> = {
  "Ad Account Requests": Megaphone,
  "Ad Accounts": BriefcaseBusiness,
  "Balance History": WalletCards,
  "Business Profile Requests": BriefcaseBusiness,
  "Business Share": Share2,
  Dashboard: LayoutDashboard,
  "Help & Support": LifeBuoy,
  Home: LayoutDashboard,
  "My Accounts": BriefcaseBusiness,
  "New Business Profile Request": BriefcaseBusiness,
  "New Payment": HandCoins,
  Notifications: Bell,
  Payments: BadgeDollarSign,
  "Payment History": ReceiptText,
  "Payment Setup": CreditCard,
  "Request Account": PlusCircle,
  Settings: Settings,
};

export function convertSectionNameToUrlSlug(section: string) {
  return section.toLowerCase().replaceAll(" ", "-");
}

export function getSectionHref(section: string) {
  return section === "Dashboard" ? "/" : `/?section=${convertSectionNameToUrlSlug(section)}`;
}
