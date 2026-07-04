"use client";

import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { Menu } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { CustomerSidebar, CustomerSidebarBrand, getSectionHref, sectionToSlug } from "@/components/layout/app-sidebar";
import { CustomerDashboardTopbar } from "@/components/layout/customer-dashboard-topbar";
import { getCustomerAllowedSections } from "@/components/layout/customer-navigation";
import { createDefaultDateRange, isDateWithinRange } from "@/components/ui/date-range-filter";
import { ToastStack, type Toast } from "@/components/ui/toast-stack";
import { getCrmOverview, crmQueryKeys } from "@/features/crm/api/crm-queries";
import { enableBusinessProfileRequestsNav, isBusinessProfileRequestsNavEnabled } from "@/features/crm/client-dashboard/sections/business-profile/business-profile-request-storage";
import { CustomerDashboard, SectionRenderer } from "@/features/crm/components/dashboard-sections";
import type { ToastType } from "@/features/crm/types/crm";

export function CrmDashboardShell() {
  const router = useRouter();
  const [activeSection, setActiveSection] = useState("Dashboard");
  const [showRequestsNav, setShowRequestsNav] = useState(false);
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [selectedDateRange] = useState(() => createDefaultDateRange());
  const [toasts, setToasts] = useState<Toast[]>([]);

  const { data, isLoading } = useQuery({
    queryKey: crmQueryKeys.overview,
    queryFn: getCrmOverview,
  });

  const enableRequestsNav = useCallback(() => {
    enableBusinessProfileRequestsNav();
    setShowRequestsNav(true);
  }, []);

  useEffect(() => {
    const requestsNavEnabled = isBusinessProfileRequestsNavEnabled();
    const requestedSectionSlug = new URLSearchParams(window.location.search).get("section");
    const allowedSections = getCustomerAllowedSections({ showRequestsNav: requestsNavEnabled });
    const requestedSection = allowedSections.find((section) => sectionToSlug(section) === requestedSectionSlug);

    if (
      requestedSectionSlug === sectionToSlug("Business Profile Requests") ||
      requestedSectionSlug === sectionToSlug("New Business Profile Request")
    ) {
      enableBusinessProfileRequestsNav();
    }

    window.queueMicrotask(() => {
      setShowRequestsNav(
        requestsNavEnabled ||
          requestedSectionSlug === sectionToSlug("Business Profile Requests") ||
          requestedSectionSlug === sectionToSlug("New Business Profile Request"),
      );
      setActiveSection(requestedSection ?? "Dashboard");
    });
  }, []);

  useEffect(() => {
    const savedTheme = window.localStorage.getItem("adsfixter-theme");
    const nextTheme = savedTheme === "dark" ? "dark" : "light";

    window.queueMicrotask(() => {
      setTheme(nextTheme);
      document.documentElement.dataset.theme = nextTheme;
    });
  }, []);

  const allowedSections = getCustomerAllowedSections({ showRequestsNav });
  const visibleSection = allowedSections.includes(activeSection) ? activeSection : "Dashboard";
  const filteredData = useMemo(() => {
    if (!data) return data;

    return {
      ...data,
      accounts: data.accounts.filter((account) => isDateWithinRange(account.date, selectedDateRange)),
      wallet: data.wallet.filter((walletLine) => isDateWithinRange(walletLine.date, selectedDateRange)),
      activities: data.activities.filter((activity) => isDateWithinRange(activity.date, selectedDateRange)),
    };
  }, [data, selectedDateRange]);

  const showToast = (type: ToastType, message: string) => {
    const id = Date.now();
    setToasts((current) => [...current, { id, type, message }]);
    window.setTimeout(() => {
      setToasts((current) => current.filter((toast) => toast.id !== id));
    }, 3200);
  };

  const dismissToast = (id: number) => {
    setToasts((current) => current.filter((toast) => toast.id !== id));
  };

  const handleSectionChange = (section: string) => {
    setActiveSection(section);
    router.push(getSectionHref(section));
  };

  const handleRequestBusinessProfile = () => {
    enableRequestsNav();
    handleSectionChange("New Business Profile Request");
  };

  const toggleTheme = () => {
    const nextTheme = theme === "light" ? "dark" : "light";
    setTheme(nextTheme);
    document.documentElement.dataset.theme = nextTheme;
    window.localStorage.setItem("adsfixter-theme", nextTheme);
  };

  const topbar = (
    <CustomerDashboardTopbar
      activeSection={visibleSection}
      onNavigateHome={() => handleSectionChange("Dashboard")}
      onOpenNotifications={() => showToast("warning", "You have 7 unread notifications")}
      onOpenSearch={() => showToast("success", "Global search coming soon")}
      onOpenSettings={() => handleSectionChange("Settings")}
      onToggleTheme={toggleTheme}
      profileMenuOpen={profileMenuOpen}
      setProfileMenuOpen={setProfileMenuOpen}
      theme={theme}
    />
  );

  if (isLoading || !data || !filteredData) {
    return (
      <div className="grid min-h-screen place-content-center gap-4 text-center">
        <Image alt="AdsFixter" className="block h-10 w-10 object-contain" height={44} src="/adsfixter-logo.png" width={44} />
        <p>Loading CRM workspace...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-[var(--surface)] p-3 max-[720px]:p-2">
      <div className="flex min-h-[calc(100vh-1.5rem)] w-full overflow-hidden rounded-2xl border-2 border-[var(--line)] bg-[var(--white)] max-[720px]:min-h-[calc(100vh-1rem)]">
        {isSidebarVisible ? (
          <aside className="hidden w-[clamp(260px,18vw,300px)] shrink-0 flex-col border-r border-[var(--line)] bg-[var(--white)] min-[1181px]:flex">
            <CustomerSidebarBrand />
            <CustomerSidebar activeSection={visibleSection} onSectionChange={setActiveSection} showRequestsNav={showRequestsNav} />
          </aside>
        ) : null}

        <div className="flex min-h-0 min-w-0 flex-1 flex-col">
          <div className="flex items-stretch bg-[var(--white)]">
            <button
              aria-label={isSidebarVisible ? "Hide sidebar" : "Show sidebar"}
              className="my-auto ml-3 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-[var(--line)] bg-[var(--white)] text-[var(--brand-navy)] transition hover:border-[var(--brand-navy)] hover:bg-[var(--surface)] min-[1181px]:hidden"
              onClick={() => setIsSidebarVisible((current) => !current)}
              type="button"
            >
              <Menu aria-hidden="true" size={16} strokeWidth={1.9} />
            </button>
            <div className="min-w-0 flex-1">{topbar}</div>
          </div>

          {isSidebarVisible ? (
            <div className="border-b border-[var(--line)] min-[1181px]:hidden">
              <CustomerSidebarBrand />
              <CustomerSidebar activeSection={visibleSection} onSectionChange={setActiveSection} showRequestsNav={showRequestsNav} />
            </div>
          ) : null}

          <main className="min-h-0 flex-1 overflow-y-auto bg-[var(--white)] p-6 max-[1180px]:p-5 max-[720px]:p-4">
            {visibleSection === "Dashboard" ? (
              <CustomerDashboard data={filteredData} showToast={showToast} onRequestBusinessProfile={handleRequestBusinessProfile} onSectionChange={handleSectionChange} />
            ) : (
              <SectionRenderer data={filteredData} section={visibleSection} showToast={showToast} onSectionChange={handleSectionChange} />
            )}
          </main>
        </div>
      </div>

      <ToastStack onDismiss={dismissToast} toasts={toasts} />
    </div>
  );
}
