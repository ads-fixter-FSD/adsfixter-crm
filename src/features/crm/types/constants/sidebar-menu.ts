export type SubMenuItem = {
  name: string;
  href: string;
};

export type MenuItem = {
  name: string;
  href?: string; // submenu থাকা parent এর জন্য href optional (ক্লিক করলে প্রথম child এ navigate হবে)
  icon: string;
  children?: SubMenuItem[];
};

export const menuItems: MenuItem[] = [
  {
    name: "Home",
    href: "/dashboard",
    icon: "/images/dashboard/sitebar/home.svg",
  },
  {
    name: "Advertising",
    icon: "/images/dashboard/sitebar/advertising.svg",
    children: [
      { name: "Overview", href: "/dashboard/advertising/overview" },
      { name: "Ad Accounts", href: "/dashboard/advertising/ad-account" },
      { name: "Portfolios", href: "/dashboard/advertising/portfolios" },
      { name: "Campaigns", href: "/dashboard/advertising/campaigns" },
      { name: "Ads", href: "/dashboard/advertising/ads" },
      { name: "Funding History", href: "/dashboard/advertising/funding-history" },
    ],
  },
  {
    name: "Wallet",
    icon: "/images/dashboard/sitebar/wallet.svg",
    children: [
      { name: "Overview", href: "/dashboard/wallet/overview" },
      { name: "Deposit", href: "/dashboard/wallet/deposit" },
      { name: "Statement", href: "/dashboard/wallet/statement" },
      { name: "Wallet Activity", href: "/dashboard/wallet/wallet-activity" },
      { name: "Saved Bank Accounts", href: "/dashboard/wallet/saved-bank-accounts" },
      { name: "Refund", href: "/dashboard/wallet/refund" },
    ],
  },
  {
    name: "Help & Support",
    icon: "/images/dashboard/sitebar/support.svg",
    children: [
      { name: "Tickets", href: "/dashboard/support/tickets" },
      
    ],
  },
  {
    name: "My Business",
    icon: "/images/dashboard/sitebar/business.svg",
    children: [
      { name: "Business Profile", href: "/dashboard/business/business-profile" },
      { name: "Documents", href: "/dashboard/business/documents" },
      { name: "Users & Permissions", href: "/dashboard/business/users-permissions" },
    ],
  },
  {
    name: "Settings",
    icon: "/images/dashboard/sitebar/settings.svg",
    children: [
      { name: "Profile & Security", href: "/dashboard/settings/profile-security" },
      { name: "Notifications", href: "/dashboard/settings/notifications" },
      { name: "Preferences", href: "/dashboard/settings/preferences" },
      { name: "Billing & Plan", href: "/dashboard/settings/billing-plan" },
    ],
  },
];