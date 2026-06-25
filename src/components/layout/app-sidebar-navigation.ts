import {
  BadgeDollarSign,
  Bell,
  BellRing,
  BriefcaseBusiness,
  Building2,
  ChartNoAxesColumnIncreasing,
  CircleDollarSign,
  ClipboardList,
  CreditCard,
  FileClock,
  HandCoins,
  History,
  TriangleAlert,
  LayoutDashboard,
  Megaphone,
  PlusCircle,
  ReceiptText,
  RefreshCw,
  ScrollText,
  Send,
  Settings,
  ShieldCheck,
  Share2,
  UserCog,
  UserCheck,
  UserPlus,
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
    "Maintainers",
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
    "Ad Accounts",
    "Request Account",
    "Business Share",
    "Payments",
    "Balance History",
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

export const paymentSubNavigation = ["New Payment", "Payment History"];

export const settingsSubNavigation = ["Notifications", "Wallet Settings", "Security", "Profile Update"];

export const navigationIcons: Record<string, LucideIcon> = {
  "Account Requests": UserPlus,
  "Accounts Overview": ChartNoAxesColumnIncreasing,
  "Ad Accounts": BriefcaseBusiness,
  "Auto Add From Meta": RefreshCw,
  "Balance History": WalletCards,
  "All Business Managers": Building2,
  "All Clients": Users,
  "Business Managers": Building2,
  "Business Share": Share2,
  "Clients": Users,
  "Create New Account": PlusCircle,
  "Create Notifications": Send,
  "Dashboard": LayoutDashboard,
  "Failed Top-ups": TriangleAlert,
  "Maintainers": UserCog,
  "My Accounts": BriefcaseBusiness,
  "New Account Requests": UserPlus,
  "New Payment": HandCoins,
  "Notifications": Bell,
  "Notifications History": BellRing,
  "Payments": BadgeDollarSign,
  "Payment History": ReceiptText,
  "Pending Requests": FileClock,
  "Pending Approvals": UserCheck,
  "Profile Update": UserCog,
  "Reports": ScrollText,
  "Revenue Reports": CircleDollarSign,
  "Request Account": PlusCircle,
  "Requests": ClipboardList,
  "BM Share Requests": Share2,
  "Security": ShieldCheck,
  "Settings": Settings,
  "Top-Up Requests": CircleDollarSign,
  "Top-up Requests": CircleDollarSign,
  "Wallet": CreditCard,
  "Wallet Settings": WalletCards,
};

export function convertSectionNameToUrlSlug(section: string) {
  return section.toLowerCase().replaceAll(" ", "-");
}

export function getSectionHref(section: string) {
  return section === "Dashboard" ? "/" : `/?section=${convertSectionNameToUrlSlug(section)}`;
}
