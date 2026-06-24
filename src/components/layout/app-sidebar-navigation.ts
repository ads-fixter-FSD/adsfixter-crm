import {
  Bell,
  BriefcaseBusiness,
  Building2,
  CircleDollarSign,
  CreditCard,
  TriangleAlert,
  LayoutDashboard,
  Megaphone,
  ScrollText,
  Settings,
  ShieldCheck,
  Share2,
  UserCog,
  Users,
  WalletCards,
  type LucideIcon,
} from "lucide-react";
import type { Role } from "@/features/crm/types/crm";

export const roleNavigation: Record<Role, string[]> = {
  "Super Admin": [
    "Dashboard",
    "Ad Accounts",
    "Requests",
    "Failed Top-ups",
    "Clients",
    "Business Managers",
    "Reports",
    "Wallet Settings",
    "Maintainers",
    "Notifications",
    "Security",
    "Settings",
  ],
  Maintainer: [
    "Dashboard",
    "Top-up Requests",
    "Account Requests",
    "Business Share",
    "Clients",
    "Notifications",
    "Security",
    "Settings",
  ],
  Customer: [
    "Dashboard",
    "My Accounts",
    "Request Account",
    "Business Share",
    "Payments",
    "Wallet",
    "Notifications",
    "Settings",
  ],
};

export const adAccountSubNavigation = ["Ad Accounts", "Create New Account", "Auto Add From Meta"];

export const requestSubNavigation = ["New Account Requests", "Top-Up Requests", "BM Share Requests"];

export const notificationSubNavigation = ["Create Notifications", "Notifications History"];

export const businessManagerSubNavigation = ["All Business Managers", "Pending Requests"];

export const clientSubNavigation = ["All Clients", "Pending Approvals"];

export const reportSubNavigation = ["Accounts Overview", "Revenue Reports"];

export const navigationIcons: Record<string, LucideIcon> = {
  "Account Requests": Megaphone,
  "Accounts Overview": ScrollText,
  "Ad Accounts": Megaphone,
  "Auto Add From Meta": Megaphone,
  "All Business Managers": Building2,
  "All Clients": Users,
  "Business Managers": Building2,
  "Business Share": Share2,
  "Clients": Users,
  "Create New Account": Megaphone,
  "Create Notifications": Bell,
  "Dashboard": LayoutDashboard,
  "Failed Top-ups": TriangleAlert,
  "Maintainers": UserCog,
  "My Accounts": BriefcaseBusiness,
  "New Account Requests": Megaphone,
  "Notifications": Bell,
  "Notifications History": Bell,
  "Payments": CreditCard,
  "Pending Requests": Megaphone,
  "Pending Approvals": Users,
  "Reports": ScrollText,
  "Revenue Reports": CircleDollarSign,
  "Request Account": Megaphone,
  "Requests": Megaphone,
  "BM Share Requests": Share2,
  "Security": ShieldCheck,
  "Settings": Settings,
  "Top-Up Requests": CircleDollarSign,
  "Top-up Requests": CircleDollarSign,
  "Wallet": WalletCards,
  "Wallet Settings": WalletCards,
};

export function convertSectionNameToUrlSlug(section: string) {
  return section.toLowerCase().replaceAll(" ", "-");
}

export function getSectionHref(section: string) {
  return section === "Dashboard" ? "/" : `/?section=${convertSectionNameToUrlSlug(section)}`;
}
