"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChevronRight, LayoutDashboard, Search } from "lucide-react";
import { useState } from "react";
import { adAccountSubNavigation, businessManagerSubNavigation, clientSubNavigation, getSectionHref, navigationIcons, notificationSubNavigation, paymentSubNavigation, reportSubNavigation, requestSubNavigation, roleNavigation, settingsSubNavigation } from "@/components/layout/app-sidebar-navigation";
import type { Role } from "@/features/crm/types/crm";

type AppSidebarProps = {
  role: Role;
  activeSection: string;
  onSectionChange: (section: string) => void;
};

function getSubNavigationLinkClassName(isActive: boolean) {
  return `flex min-h-8 w-full items-center rounded-lg px-2.5 py-2 text-left text-sm font-medium no-underline transition hover:bg-[var(--brand-navy)] hover:text-[var(--white)] ${
    isActive ? "bg-[var(--brand-navy)] text-[var(--white)]" : "text-[var(--sidebar-link)]"
  }`;
}

function getSubNavigationPanelClassName(isOpen: boolean) {
  return `grid transition-all duration-200 ease-out ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`;
}

type SidebarDropdown = "adAccounts" | "requests" | "notifications" | "businessManagers" | "clients" | "reports" | "payments" | "settings";

export function AppSidebar({ role, activeSection, onSectionChange }: AppSidebarProps) {
  const router = useRouter();
  const [isAdAccountOpen, setIsAdAccountOpen] = useState(adAccountSubNavigation.includes(activeSection));
  const [isRequestsOpen, setIsRequestsOpen] = useState(requestSubNavigation.includes(activeSection));
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(notificationSubNavigation.includes(activeSection));
  const [isBusinessManagersOpen, setIsBusinessManagersOpen] = useState(businessManagerSubNavigation.includes(activeSection));
  const [isClientsOpen, setIsClientsOpen] = useState(clientSubNavigation.includes(activeSection));
  const [isReportsOpen, setIsReportsOpen] = useState(reportSubNavigation.includes(activeSection));
  const [isPaymentsOpen, setIsPaymentsOpen] = useState(paymentSubNavigation.includes(activeSection));
  const [isSettingsOpen, setIsSettingsOpen] = useState(settingsSubNavigation.includes(activeSection));

  const closeAllDropdowns = () => {
    setIsAdAccountOpen(false);
    setIsRequestsOpen(false);
    setIsNotificationsOpen(false);
    setIsBusinessManagersOpen(false);
    setIsClientsOpen(false);
    setIsReportsOpen(false);
    setIsPaymentsOpen(false);
    setIsSettingsOpen(false);
  };

  const isDropdownOpen = (dropdown: SidebarDropdown) => {
    if (dropdown === "adAccounts") return isAdAccountOpen;
    if (dropdown === "requests") return isRequestsOpen;
    if (dropdown === "notifications") return isNotificationsOpen;
    if (dropdown === "businessManagers") return isBusinessManagersOpen;
    if (dropdown === "clients") return isClientsOpen;
    if (dropdown === "reports") return isReportsOpen;
    if (dropdown === "payments") return isPaymentsOpen;
    return isSettingsOpen;
  };

  const openOnlyDropdown = (dropdown: SidebarDropdown) => {
    setIsAdAccountOpen(dropdown === "adAccounts");
    setIsRequestsOpen(dropdown === "requests");
    setIsNotificationsOpen(dropdown === "notifications");
    setIsBusinessManagersOpen(dropdown === "businessManagers");
    setIsClientsOpen(dropdown === "clients");
    setIsReportsOpen(dropdown === "reports");
    setIsPaymentsOpen(dropdown === "payments");
    setIsSettingsOpen(dropdown === "settings");
  };

  const toggleDropdownFirstSection = (dropdown: SidebarDropdown, firstSection: string) => {
    if (isDropdownOpen(dropdown)) {
      closeAllDropdowns();
      return;
    }

    openOnlyDropdown(dropdown);
    onSectionChange(firstSection);
    router.push(getSectionHref(firstSection));
  };

  const handleDropdownChildClick = (dropdown: SidebarDropdown, section: string) => {
    openOnlyDropdown(dropdown);
    onSectionChange(section);
  };

  const handleLeafClick = (section: string) => {
    closeAllDropdowns();
    onSectionChange(section);
  };

  return (
    <aside className="sticky top-0 flex min-h-screen w-[clamp(280px,18vw,350px)] shrink-0 flex-col gap-3 border-r border-[var(--line)] bg-[var(--surface)] p-3 text-[var(--black)] max-[1180px]:static max-[1180px]:min-h-0 max-[1180px]:w-full max-[720px]:border-b max-[720px]:border-r-0 max-[720px]:p-2.5">
      <div className="flex min-h-[4.4rem] flex-col items-start gap-1">
        <span className="inline-flex items-center rounded-md p-0.5 [html[data-theme='dark']_&]:bg-white">
          <Image alt="AdsFixter" className="block h-10 w-29 object-contain" height={110} src="/adsfixter-logo.png" width={110} />
        </span>
      </div>

      <label className="flex h-8 items-center gap-2 rounded-lg border border-[var(--line)] bg-[var(--white)] px-2.5 text-[var(--muted)]">
        <Search aria-hidden="true" size={15} strokeWidth={1.8} />
        <input className="min-w-0 flex-1 bg-transparent text-sm text-[var(--brand-navy)] outline-none placeholder:text-slate-400" placeholder="Search..." type="search" />
      </label>

      <nav className="grid gap-1 max-[1180px]:grid-cols-2 max-[720px]:grid-cols-1">
        {roleNavigation[role].map((item) => {
          const Icon = navigationIcons[item] ?? LayoutDashboard;

          if (item === "Ad Accounts" && role !== "Customer") {
            return (
              <div className="grid gap-1" key={item}>
                <button
                  className={`flex min-h-8 w-full items-center gap-2 rounded-lg px-2.5 py-2 text-left text-sm font-medium transition hover:bg-[var(--brand-navy)] hover:text-[var(--white)] ${
                    adAccountSubNavigation.includes(activeSection) ? "bg-[var(--brand-navy)] text-[var(--white)]" : "text-[var(--sidebar-link)]"
                  }`}
                  onClick={() => toggleDropdownFirstSection("adAccounts", adAccountSubNavigation[0])}
                  type="button"
                >
                  <Icon aria-hidden="true" size={17} strokeWidth={1.9} />
                  <span>{item}</span>
                  <ChevronRight aria-hidden="true" className={`ml-auto transition-transform ${isAdAccountOpen ? "rotate-90" : ""}`} size={15} strokeWidth={2.1} />
                </button>

                <div className={getSubNavigationPanelClassName(isAdAccountOpen)}>
                  <div className="min-h-0 overflow-hidden">
                    <div className="grid gap-0.5 pl-5">
                    {adAccountSubNavigation.map((subItem) => (
                      <Link
                        className={getSubNavigationLinkClassName(subItem === activeSection)}
                        href={getSectionHref(subItem)}
                        key={subItem}
                        onClick={() => handleDropdownChildClick("adAccounts", subItem)}
                        tabIndex={isAdAccountOpen ? 0 : -1}
                      >
                        {subItem}
                      </Link>
                    ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          }

          if (item === "Requests") {
            return (
              <div className="grid gap-1" key={item}>
                <button
                  className={`flex min-h-8 w-full items-center gap-2 rounded-lg px-2.5 py-2 text-left text-sm font-medium transition hover:bg-[var(--brand-navy)] hover:text-[var(--white)] ${
                    requestSubNavigation.includes(activeSection) ? "bg-[var(--brand-navy)] text-[var(--white)]" : "text-[var(--sidebar-link)]"
                  }`}
                  onClick={() => toggleDropdownFirstSection("requests", requestSubNavigation[0])}
                  type="button"
                >
                  <Icon aria-hidden="true" size={17} strokeWidth={1.9} />
                  <span>{item}</span>
                  <ChevronRight aria-hidden="true" className={`ml-auto transition-transform ${isRequestsOpen ? "rotate-90" : ""}`} size={15} strokeWidth={2.1} />
                </button>

                <div className={getSubNavigationPanelClassName(isRequestsOpen)}>
                  <div className="min-h-0 overflow-hidden">
                    <div className="grid gap-0.5 pl-5">
                    {requestSubNavigation.map((subItem) => (
                      <Link
                        className={getSubNavigationLinkClassName(subItem === activeSection)}
                        href={getSectionHref(subItem)}
                        key={subItem}
                        onClick={() => handleDropdownChildClick("requests", subItem)}
                        tabIndex={isRequestsOpen ? 0 : -1}
                      >
                        {subItem}
                      </Link>
                    ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          }

          if (item === "Notifications" && role !== "Customer") {
            return (
              <div className="grid gap-1" key={item}>
                <button
                  className={`flex min-h-8 w-full items-center gap-2 rounded-lg px-2.5 py-2 text-left text-sm font-medium transition hover:bg-[var(--brand-navy)] hover:text-[var(--white)] ${
                    notificationSubNavigation.includes(activeSection) ? "bg-[var(--brand-navy)] text-[var(--white)]" : "text-[var(--sidebar-link)]"
                  }`}
                  onClick={() => toggleDropdownFirstSection("notifications", notificationSubNavigation[0])}
                  type="button"
                >
                  <Icon aria-hidden="true" size={17} strokeWidth={1.9} />
                  <span>{item}</span>
                  <ChevronRight aria-hidden="true" className={`ml-auto transition-transform ${isNotificationsOpen ? "rotate-90" : ""}`} size={15} strokeWidth={2.1} />
                </button>

                <div className={getSubNavigationPanelClassName(isNotificationsOpen)}>
                  <div className="min-h-0 overflow-hidden">
                    <div className="grid gap-0.5 pl-5">
                    {notificationSubNavigation.map((subItem) => (
                      <Link
                        className={getSubNavigationLinkClassName(subItem === activeSection)}
                        href={getSectionHref(subItem)}
                        key={subItem}
                        onClick={() => handleDropdownChildClick("notifications", subItem)}
                        tabIndex={isNotificationsOpen ? 0 : -1}
                      >
                        {subItem}
                      </Link>
                    ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          }

          if (item === "Business Managers") {
            return (
              <div className="grid gap-1" key={item}>
                <button
                  className={`flex min-h-8 w-full items-center gap-2 rounded-lg px-2.5 py-2 text-left text-sm font-medium transition hover:bg-[var(--brand-navy)] hover:text-[var(--white)] ${
                    businessManagerSubNavigation.includes(activeSection) ? "bg-[var(--brand-navy)] text-[var(--white)]" : "text-[var(--sidebar-link)]"
                  }`}
                  onClick={() => toggleDropdownFirstSection("businessManagers", businessManagerSubNavigation[0])}
                  type="button"
                >
                  <Icon aria-hidden="true" size={17} strokeWidth={1.9} />
                  <span>{item}</span>
                  <ChevronRight aria-hidden="true" className={`ml-auto transition-transform ${isBusinessManagersOpen ? "rotate-90" : ""}`} size={15} strokeWidth={2.1} />
                </button>

                <div className={getSubNavigationPanelClassName(isBusinessManagersOpen)}>
                  <div className="min-h-0 overflow-hidden">
                    <div className="grid gap-0.5 pl-5">
                    {businessManagerSubNavigation.map((subItem) => (
                      <Link
                        className={getSubNavigationLinkClassName(subItem === activeSection)}
                        href={getSectionHref(subItem)}
                        key={subItem}
                        onClick={() => handleDropdownChildClick("businessManagers", subItem)}
                        tabIndex={isBusinessManagersOpen ? 0 : -1}
                      >
                        {subItem}
                      </Link>
                    ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          }

          if (item === "Clients") {
            return (
              <div className="grid gap-1" key={item}>
                <button
                  className={`flex min-h-8 w-full items-center gap-2 rounded-lg px-2.5 py-2 text-left text-sm font-medium transition hover:bg-[var(--brand-navy)] hover:text-[var(--white)] ${
                    clientSubNavigation.includes(activeSection) ? "bg-[var(--brand-navy)] text-[var(--white)]" : "text-[var(--sidebar-link)]"
                  }`}
                  onClick={() => toggleDropdownFirstSection("clients", clientSubNavigation[0])}
                  type="button"
                >
                  <Icon aria-hidden="true" size={17} strokeWidth={1.9} />
                  <span>{item}</span>
                  <ChevronRight aria-hidden="true" className={`ml-auto transition-transform ${isClientsOpen ? "rotate-90" : ""}`} size={15} strokeWidth={2.1} />
                </button>

                <div className={getSubNavigationPanelClassName(isClientsOpen)}>
                  <div className="min-h-0 overflow-hidden">
                    <div className="grid gap-0.5 pl-5">
                    {clientSubNavigation.map((subItem) => (
                      <Link
                        className={getSubNavigationLinkClassName(subItem === activeSection)}
                        href={getSectionHref(subItem)}
                        key={subItem}
                        onClick={() => handleDropdownChildClick("clients", subItem)}
                        tabIndex={isClientsOpen ? 0 : -1}
                      >
                        {subItem}
                      </Link>
                    ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          }

          if (item === "Reports") {
            return (
              <div className="grid gap-1" key={item}>
                <button
                  className={`flex min-h-8 w-full items-center gap-2 rounded-lg px-2.5 py-2 text-left text-sm font-medium transition hover:bg-[var(--brand-navy)] hover:text-[var(--white)] ${
                    reportSubNavigation.includes(activeSection) ? "bg-[var(--brand-navy)] text-[var(--white)]" : "text-[var(--sidebar-link)]"
                  }`}
                  onClick={() => toggleDropdownFirstSection("reports", reportSubNavigation[0])}
                  type="button"
                >
                  <Icon aria-hidden="true" size={17} strokeWidth={1.9} />
                  <span>{item}</span>
                  <ChevronRight aria-hidden="true" className={`ml-auto transition-transform ${isReportsOpen ? "rotate-90" : ""}`} size={15} strokeWidth={2.1} />
                </button>

                <div className={getSubNavigationPanelClassName(isReportsOpen)}>
                  <div className="min-h-0 overflow-hidden">
                    <div className="grid gap-0.5 pl-5">
                    {reportSubNavigation.map((subItem) => (
                      <Link
                        className={getSubNavigationLinkClassName(subItem === activeSection)}
                        href={getSectionHref(subItem)}
                        key={subItem}
                        onClick={() => handleDropdownChildClick("reports", subItem)}
                        tabIndex={isReportsOpen ? 0 : -1}
                      >
                        {subItem}
                      </Link>
                    ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          }

          if (item === "Payments") {
            return (
              <div className="grid gap-1" key={item}>
                <button
                  className={`flex min-h-8 w-full items-center gap-2 rounded-lg px-2.5 py-2 text-left text-sm font-medium transition hover:bg-[var(--brand-navy)] hover:text-[var(--white)] ${
                    paymentSubNavigation.includes(activeSection) ? "bg-[var(--brand-navy)] text-[var(--white)]" : "text-[var(--sidebar-link)]"
                  }`}
                  onClick={() => toggleDropdownFirstSection("payments", paymentSubNavigation[0])}
                  type="button"
                >
                  <Icon aria-hidden="true" size={17} strokeWidth={1.9} />
                  <span>{item}</span>
                  <ChevronRight aria-hidden="true" className={`ml-auto transition-transform ${isPaymentsOpen ? "rotate-90" : ""}`} size={15} strokeWidth={2.1} />
                </button>

                <div className={getSubNavigationPanelClassName(isPaymentsOpen)}>
                  <div className="min-h-0 overflow-hidden">
                    <div className="grid gap-0.5 pl-5">
                    {paymentSubNavigation.map((subItem) => (
                      <Link
                        className={getSubNavigationLinkClassName(subItem === activeSection)}
                        href={getSectionHref(subItem)}
                        key={subItem}
                        onClick={() => handleDropdownChildClick("payments", subItem)}
                        tabIndex={isPaymentsOpen ? 0 : -1}
                      >
                        {subItem}
                      </Link>
                    ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          }

          if (item === "Settings" && role === "Super Admin") {
            return (
              <div className="grid gap-1" key={item}>
                <button
                  className={`flex min-h-8 w-full items-center gap-2 rounded-lg px-2.5 py-2 text-left text-sm font-medium transition hover:bg-[var(--brand-navy)] hover:text-[var(--white)] ${
                    settingsSubNavigation.includes(activeSection) ? "bg-[var(--brand-navy)] text-[var(--white)]" : "text-[var(--sidebar-link)]"
                  }`}
                  onClick={() => toggleDropdownFirstSection("settings", settingsSubNavigation[0])}
                  type="button"
                >
                  <Icon aria-hidden="true" size={17} strokeWidth={1.9} />
                  <span>{item}</span>
                  <ChevronRight aria-hidden="true" className={`ml-auto transition-transform ${isSettingsOpen ? "rotate-90" : ""}`} size={15} strokeWidth={2.1} />
                </button>

                <div className={getSubNavigationPanelClassName(isSettingsOpen)}>
                  <div className="min-h-0 overflow-hidden">
                    <div className="grid gap-0.5 pl-5">
                    {settingsSubNavigation.map((subItem) => (
                      <Link
                        className={getSubNavigationLinkClassName(subItem === activeSection)}
                        href={getSectionHref(subItem)}
                        key={subItem}
                        onClick={() => handleDropdownChildClick("settings", subItem)}
                        tabIndex={isSettingsOpen ? 0 : -1}
                      >
                        {subItem}
                      </Link>
                    ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          }

          return (
            <Link
              className={`flex min-h-8 w-full items-center gap-2 rounded-lg px-2.5 py-2 text-left text-sm font-medium no-underline transition hover:bg-[var(--brand-navy)] hover:text-[var(--white)] ${
                item === activeSection ? "bg-[var(--brand-navy)] text-[var(--white)]" : "text-[var(--sidebar-link)]"
              }`}
              href={getSectionHref(item)}
              key={item}
              onClick={() => handleLeafClick(item)}
            >
              <Icon aria-hidden="true" size={17} strokeWidth={1.9} />
              <span>{item}</span>
            </Link>
          );
        })}
      </nav>

    </aside>
  );
}

export { adAccountSubNavigation, businessManagerSubNavigation, clientSubNavigation, convertSectionNameToUrlSlug as sectionToSlug, getSectionHref, notificationSubNavigation, paymentSubNavigation, reportSubNavigation, requestSubNavigation, roleNavigation, settingsSubNavigation } from "@/components/layout/app-sidebar-navigation";
