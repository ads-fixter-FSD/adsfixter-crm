import Link from "next/link";
import Image from "next/image";
import {
  Bell,
  BriefcaseBusiness,
  Building2,
  CircleDollarSign,
  CreditCard,
  LayoutDashboard,
  Megaphone,
  Search,
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

export function sectionToSlug(section: string) {
  return section.toLowerCase().replaceAll(" ", "-");
}

export function getSectionHref(section: string) {
  return section === "Dashboard" ? "/" : `/?section=${sectionToSlug(section)}`;
}

const navIcons: Record<string, LucideIcon> = {
  "Account Requests": Megaphone,
  "Ad Accounts": Megaphone,
  "Business Managers": Building2,
  "Business Share": Share2,
  "Clients": Users,
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

type AppSidebarProps = {
  role: Role;
  activeSection: string;
  onSectionChange: (section: string) => void;
};

export function AppSidebar({ role, activeSection, onSectionChange }: AppSidebarProps) {
  return (
    <aside className="sidebar">
      <div className="brand-card">
        <span className="sidebar-logo-wrap">
          <Image alt="AdsFixter" className="brand-logo sidebar-brand-logo" height={110} src="/adsfixter-logo.png" width={110} />
        </span>
      </div>

      <label className="sidebar-search">
        <Search aria-hidden="true" size={15} strokeWidth={1.8} />
        <input placeholder="Search..." type="search" />
      </label>

      <nav>
        <p className="nav-group-label">Main</p>
        {roleNavigation[role].map((item) => {
          const Icon = navIcons[item] ?? LayoutDashboard;

          return (
            <Link className={item === activeSection ? "nav-item active" : "nav-item"} href={getSectionHref(item)} key={item} onClick={() => onSectionChange(item)}>
              <Icon aria-hidden="true" size={17} strokeWidth={1.9} />
              <span>{item}</span>
            </Link>
          );
        })}
      </nav>

    </aside>
  );
}
