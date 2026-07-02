"use client";

import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Bell, CalendarDays, Download, LogOut, Menu, Moon, Settings, Sun } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { adAccountSubNavigation, AppSidebar, businessManagerSubNavigation, clientSubNavigation, getSectionHref, notificationSubNavigation, paymentSubNavigation, reportSubNavigation, requestSubNavigation, roleNavigation, sectionToSlug, settingsSubNavigation } from "@/components/layout/app-sidebar";
import { createDefaultDateRange, DateRangeFilter, formatDateRangeLabel, isDateWithinRange } from "@/components/ui/date-range-filter";
import { ToastStack, type Toast } from "@/components/ui/toast-stack";
import { getCrmOverview, crmQueryKeys } from "@/features/crm/api/crm-queries";
import { AdminDashboard, CustomerDashboard, MaintainerDashboard, SectionRenderer } from "@/features/crm/components/dashboard-sections";
import type { Role, ToastType } from "@/features/crm/types/crm";
import { useClickOutside } from "@/hooks/use-click-outside";

export function CrmDashboardShell() {
  const router = useRouter();
  const profileMenuRef = useRef<HTMLDivElement | null>(null);
  const printableContentRef = useRef<HTMLDivElement | null>(null);
  const [role, setRole] = useState<Role>("Super Admin");
  const [activeSection, setActiveSection] = useState("Dashboard");
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [selectedDateRange, setSelectedDateRange] = useState(() => createDefaultDateRange());
  const [toasts, setToasts] = useState<Toast[]>([]);

  const { data, isLoading } = useQuery({
    queryKey: crmQueryKeys.overview,
    queryFn: getCrmOverview,
  });

  useEffect(() => {
    const savedRole = window.localStorage.getItem("adsfixter-role") as Role | null;
    const nextRole = savedRole && roleNavigation[savedRole] ? savedRole : "Super Admin";
    const requestedSectionSlug = new URLSearchParams(window.location.search).get("section");
    const allowedSections = [...roleNavigation[nextRole], ...adAccountSubNavigation, ...requestSubNavigation, ...notificationSubNavigation, ...businessManagerSubNavigation, ...clientSubNavigation, ...reportSubNavigation, ...paymentSubNavigation, ...settingsSubNavigation];
    const requestedSection = allowedSections.find((section) => sectionToSlug(section) === requestedSectionSlug);

    window.queueMicrotask(() => {
      setRole(nextRole);
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

  const allowedSections = [...roleNavigation[role], ...adAccountSubNavigation, ...requestSubNavigation, ...notificationSubNavigation, ...businessManagerSubNavigation, ...clientSubNavigation, ...reportSubNavigation, ...paymentSubNavigation, ...settingsSubNavigation];
  const visibleSection = allowedSections.includes(activeSection) ? activeSection : "Dashboard";
  const filteredData = useMemo(() => {
    if (!data) return data;

    return {
      ...data,
      requests: data.requests.filter((request) => isDateWithinRange(request.date, selectedDateRange)),
      accounts: data.accounts.filter((account) => isDateWithinRange(account.date, selectedDateRange)),
      clients: data.clients.filter((client) => isDateWithinRange(client.date, selectedDateRange)),
      wallet: data.wallet.filter((walletLine) => isDateWithinRange(walletLine.date, selectedDateRange)),
      activities: data.activities.filter((activity) => isDateWithinRange(activity.date, selectedDateRange)),
    };
  }, [data, selectedDateRange]);
  const filteredRecordCount = filteredData
    ? filteredData.requests.length + filteredData.accounts.length + filteredData.clients.length + filteredData.wallet.length + filteredData.activities.length
    : 0;
  const hasFilteredData = filteredRecordCount > 0;
  const shouldShowGlobalExportButton = visibleSection !== "Ad Accounts";
  const shouldEmbedOverviewToolbar = visibleSection === "Dashboard" && role === "Super Admin";
  const shouldHideOverviewToolbar = visibleSection === "Ad Accounts" && role !== "Customer";
  const shouldFrameOverviewToolbar = visibleSection === "Create New Account";

  const profileInitials = role === "Customer" ? "CU" : role === "Maintainer" ? "MT" : "SA";

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

  const toggleTheme = () => {
    const nextTheme = theme === "light" ? "dark" : "light";
    setTheme(nextTheme);
    document.documentElement.dataset.theme = nextTheme;
    window.localStorage.setItem("adsfixter-theme", nextTheme);
  };

  const getExportFileName = (extension: "txt") => {
    return `adsfixter-${visibleSection.toLowerCase().replaceAll(" ", "-")}-${selectedDateRange.startDate}-to-${selectedDateRange.endDate}.${extension}`;
  };

  const formattedSelectedDateRange = formatDateRangeLabel(selectedDateRange.startDate, selectedDateRange.endDate);
  const selectedDateRangeKey = `${selectedDateRange.startDate}-${selectedDateRange.endDate}`;

  const downloadCurrentPageInfo = () => {
    const pageText = printableContentRef.current?.innerText.trim();

    if (!pageText) {
      showToast("error", "No page content available to download");
      return;
    }

    const fileContent = [`AdsFixter CRM`, `Section: ${visibleSection}`, `Filtered range: ${formattedSelectedDateRange}`, "", pageText].join("\n");
    const blob = new Blob([fileContent], { type: "text/plain;charset=utf-8" });
    const downloadUrl = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = downloadUrl;
    anchor.download = getExportFileName("txt");
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    URL.revokeObjectURL(downloadUrl);
    showToast("success", "Current page information downloaded");
  };

  useClickOutside(profileMenuRef, () => setProfileMenuOpen(false));

  if (isLoading || !data || !filteredData) {
    return (
      <div className="grid min-h-screen place-content-center gap-4 text-center">
        <Image alt="AdsFixter" className="block h-10 w-10 object-contain" height={44} src="/adsfixter-logo.png" width={44} />
        <p>Loading CRM workspace...</p>
      </div>
    );
  }

  const overviewToolbar = (
    <section className={`flex flex-wrap items-start justify-between gap-3 ${shouldFrameOverviewToolbar ? "rounded-xl border-2 border-[var(--line)] bg-[var(--white)] p-4" : ""}`}>
      <div>
        <h2 className="m-0 text-xl font-semibold tracking-[-0.02em] text-[var(--brand-navy)]">{visibleSection === "Dashboard" ? "Overview" : visibleSection}</h2>
        <p className="mt-1 text-sm text-[var(--muted)]">
          {hasFilteredData
            ? `Showing ${filteredData.requests.length} request(s), ${filteredData.accounts.length} account(s), ${filteredData.clients.length} client(s), ${filteredData.activities.length} activity item(s) for ${formattedSelectedDateRange}.`
            : `No data found for ${formattedSelectedDateRange}.`}
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-end gap-2 max-[720px]:w-full max-[720px]:justify-start">
        <DateRangeFilter onChange={setSelectedDateRange} value={selectedDateRange} />
        {shouldShowGlobalExportButton ? (
          <button className="inline-flex min-h-9 items-center justify-center gap-2 rounded-lg bg-[var(--toolbar-button-bg)] px-3 text-sm font-light text-[var(--toolbar-button-text)] transition hover:bg-[var(--toolbar-button-hover)] max-[720px]:flex-1" onClick={downloadCurrentPageInfo} type="button">
            <Download aria-hidden="true" size={15} strokeWidth={1.9} />
            Export
          </button>
        ) : null}
      </div>
    </section>
  );
  const dateFilterControl = <DateRangeFilter onChange={setSelectedDateRange} value={selectedDateRange} />;

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-[var(--surface)] p-3 max-[720px]:p-2">
      <div className="flex min-h-[calc(100vh-1.5rem)] w-full overflow-hidden rounded-2xl border-2 border-[var(--line)] bg-[var(--white)] max-[1180px]:block max-[720px]:min-h-[calc(100vh-1rem)]">
        {isSidebarVisible ? <AppSidebar role={role} activeSection={visibleSection} onSectionChange={setActiveSection} /> : null}

        <main className="min-w-0 flex-1 bg-[var(--white)]">
          <header className="flex min-h-14 w-full items-center justify-between gap-4 border-b border-[var(--line)] bg-[var(--white)] px-4 max-[720px]:flex-col max-[720px]:items-start max-[720px]:p-3">
            <div className="flex min-w-0 items-center gap-2">
              <button
                aria-label={isSidebarVisible ? "Hide sidebar" : "Show sidebar"}
                className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-[var(--line)] bg-[var(--white)] text-[var(--brand-navy)] transition hover:border-[var(--brand-navy)] hover:bg-[var(--surface)]"
                onClick={() => setIsSidebarVisible((current) => !current)}
                type="button"
              >
                <Menu aria-hidden="true" size={16} strokeWidth={1.9} />
              </button>
              <h1 className="m-0 text-sm font-semibold text-[var(--brand-navy)]">{visibleSection}</h1>
            </div>

            <div className="flex flex-wrap items-center gap-2 max-[720px]:w-full">
              <button aria-label="Toggle theme" className="inline-flex min-h-8 items-center justify-center gap-1.5 rounded-lg border border-[var(--line)] bg-[var(--white)] px-2.5 text-[var(--brand-navy)] hover:bg-[var(--surface)] max-[720px]:flex-1" onClick={toggleTheme} type="button">
                {theme === "light" ? <Moon aria-hidden="true" size={16} strokeWidth={1.9} /> : <Sun aria-hidden="true" size={16} strokeWidth={1.9} />}
              </button>
              <button aria-label="Notifications" className="relative inline-flex min-h-8 items-center justify-center gap-1.5 rounded-lg border border-[var(--line)] bg-[var(--white)] px-2.5 text-[var(--brand-navy)] hover:bg-[var(--surface)] max-[720px]:flex-1" onClick={() => showToast("warning", "You have 7 unread notifications")} type="button">
                <Bell aria-hidden="true" size={16} strokeWidth={1.9} />
                <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-[var(--danger-text)]" />
              </button>
              <div className="relative" ref={profileMenuRef}>
                <button className="inline-flex min-h-8 items-center justify-center gap-1.5 rounded-lg border border-[var(--line)] bg-[var(--white)] px-2.5 text-[var(--brand-navy)] hover:bg-[var(--surface)] max-[720px]:flex-1" onClick={() => setProfileMenuOpen((current) => !current)} type="button">
                  <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[var(--brand-navy)] text-xs font-bold text-[var(--white)]">{profileInitials}</span>
                </button>

                {profileMenuOpen ? (
                  <div className="absolute right-0 top-[calc(100%+0.45rem)] z-20 grid min-w-40 gap-1 rounded-xl border border-[var(--line)] bg-[var(--white)] p-1.5">
                    <button
                      className="flex items-center gap-2 rounded-lg px-2.5 py-2 text-sm text-[var(--brand-navy)] hover:bg-[var(--surface)]"
                      onClick={() => {
                        handleSectionChange("Settings");
                        setProfileMenuOpen(false);
                      }}
                      type="button"
                    >
                      <Settings aria-hidden="true" size={15} strokeWidth={1.8} />
                      Settings
                    </button>
                    <Link
                      className="flex items-center gap-2 rounded-lg px-2.5 py-2 text-sm text-[var(--danger-text)] no-underline hover:bg-[var(--surface)]"
                      href="/login"
                      onClick={() => {
                        window.localStorage.removeItem("adsfixter-role");
                        setProfileMenuOpen(false);
                      }}
                    >
                      <LogOut aria-hidden="true" size={15} strokeWidth={1.8} />
                      Logout
                    </Link>
                  </div>
                ) : null}
              </div>
            </div>
          </header>

          <div className="grid w-full gap-6 p-6 max-[1180px]:gap-5 max-[1180px]:p-5 max-[720px]:p-4">
            {!shouldEmbedOverviewToolbar && !shouldHideOverviewToolbar ? overviewToolbar : null}

            <div ref={printableContentRef}>
              {!hasFilteredData ? (
                <section className="grid min-h-64 place-items-center rounded-xl border border-[var(--line)] bg-[var(--white)] p-8 text-center">
                  <div>
                    <CalendarDays aria-hidden="true" className="mx-auto text-[var(--muted)]" size={34} strokeWidth={1.7} />
                    <h2 className="mt-4 mb-1 text-lg font-semibold text-[var(--brand-navy)]">No data found</h2>
                    <p className="m-0 text-sm text-[var(--muted)]">There is no dashboard activity or page information for {formattedSelectedDateRange}.</p>
                  </div>
                </section>
              ) : visibleSection === "Dashboard" ? (
                role === "Customer" ? (
                  <CustomerDashboard data={filteredData} dateRangeKey={selectedDateRangeKey} dateRangeLabel={formattedSelectedDateRange} showToast={showToast} />
                ) : role === "Maintainer" ? (
                  <MaintainerDashboard data={filteredData} dateRangeKey={selectedDateRangeKey} dateRangeLabel={formattedSelectedDateRange} showToast={showToast} />
                ) : (
                  <AdminDashboard data={filteredData} dateRangeKey={selectedDateRangeKey} dateRangeLabel={formattedSelectedDateRange} overviewHeader={overviewToolbar} role={role} showToast={showToast} onSectionChange={handleSectionChange} />
                )
              ) : (
                <SectionRenderer data={filteredData} dateFilterControl={dateFilterControl} dateRangeLabel={formattedSelectedDateRange} section={visibleSection} role={role} showToast={showToast} onSectionChange={handleSectionChange} />
              )}
            </div>
          </div>
        </main>
      </div>

      <ToastStack onDismiss={dismissToast} toasts={toasts} />
    </div>
  );
}
