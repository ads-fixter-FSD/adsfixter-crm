import {
  Bell,
  BriefcaseBusiness,
  Building2,
  CircleDollarSign,
  CreditCard,
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

export const navigationIcons: Record<string, LucideIcon> = {
  "Account Requests": Megaphone,
  "Ad Accounts": Megaphone,
  "Auto Add From Meta": Megaphone,
  "Business Managers": Building2,
  "Business Share": Share2,
  "Clients": Users,
  "Create New Account": Megaphone,
  "Dashboard": LayoutDashboard,
  "Maintainers": UserCog,
  "My Accounts": BriefcaseBusiness,
  "Notifications": Bell,
  "Payments": CreditCard,
  "Reports": ScrollText,
  "Request Account": Megaphone,
  "Requests": Megaphone,
  "Security": ShieldCheck,
  "Settings": Settings,
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
