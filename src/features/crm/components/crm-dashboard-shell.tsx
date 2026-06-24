"use client";

import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Bell, LogOut, Moon, Settings, Sun } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { adAccountSubNavigation, AppSidebar, getSectionHref, roleNavigation, sectionToSlug } from "@/components/layout/app-sidebar";
import { ToastStack, type Toast } from "@/components/ui/toast-stack";
import { getCrmOverview, crmQueryKeys } from "@/features/crm/api/crm-queries";
import { AdminDashboard, CustomerDashboard, MaintainerDashboard, SectionRenderer } from "@/features/crm/components/dashboard-sections";
import type { Role, ToastType } from "@/features/crm/types/crm";

export function CrmDashboardShell() {
  const router = useRouter();
  const [role, setRole] = useState<Role>("Super Admin");
  const [activeSection, setActiveSection] = useState("Dashboard");
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [toasts, setToasts] = useState<Toast[]>([]);

  const { data, isLoading } = useQuery({
    queryKey: crmQueryKeys.overview,
    queryFn: getCrmOverview,
  });

  useEffect(() => {
    const savedRole = window.localStorage.getItem("adsfixter-role") as Role | null;
    const nextRole = savedRole && roleNavigation[savedRole] ? savedRole : "Super Admin";
    const requestedSectionSlug = new URLSearchParams(window.location.search).get("section");
    const allowedSections = [...roleNavigation[nextRole], ...adAccountSubNavigation];
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

  const allowedSections = [...roleNavigation[role], ...adAccountSubNavigation];
  const visibleSection = allowedSections.includes(activeSection) ? activeSection : "Dashboard";

  const roleHint = useMemo(() => {
    if (role === "Super Admin") return "Full access: dollar rate, wallet adjustment, maintainer creation, and system settings.";
    if (role === "Maintainer") return "Operations access: approve top-ups, account requests, and business share requests.";
    return "Customer access: wallet, payments, ad account requests, notifications, and optional 2FA.";
  }, [role]);

  const profileInitials = role === "Customer" ? "CU" : role === "Maintainer" ? "MT" : "SA";
  const contentTitle = visibleSection === "Dashboard" ? "Overview" : visibleSection;

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

  if (isLoading || !data) {
    return (
      <div className="grid min-h-screen place-content-center gap-4 text-center">
        <Image alt="AdsFixter" className="block h-10 w-10 object-contain" height={44} src="/adsfixter-logo.png" width={44} />
        <p>Loading CRM workspace...</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-[var(--surface)] max-[1180px]:block">
      <AppSidebar role={role} activeSection={visibleSection} onSectionChange={setActiveSection} />

      <main className="min-w-0 flex-1 bg-[var(--surface)]">
        <div className="m-3 min-h-[calc(100vh-1.7rem)] overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--white)]">
          <header className="flex min-h-14 items-center justify-between gap-4 border-b border-[var(--line)] bg-[var(--white)] px-4 max-[720px]:flex-col max-[720px]:items-start max-[720px]:p-4">
            <div className="min-w-0">
              <p className="mb-1 text-xs font-bold uppercase tracking-widest text-[var(--brand-orange)]">{role} Panel</p>
              <h1 className="m-0 text-[clamp(1rem,2vw,1.1rem)] font-semibold leading-tight tracking-[-0.01em] text-[var(--brand-navy)]">{visibleSection}</h1>
            </div>

            <div className="flex flex-wrap items-center gap-2 max-[720px]:w-full">
              <button aria-label="Toggle theme" className="inline-flex min-h-8 items-center justify-center gap-1.5 rounded-lg border border-[var(--line)] bg-[var(--white)] px-2.5 text-[var(--brand-navy)] hover:bg-[var(--surface)] max-[720px]:flex-1" onClick={toggleTheme} type="button">
                {theme === "light" ? <Moon aria-hidden="true" size={16} strokeWidth={1.9} /> : <Sun aria-hidden="true" size={16} strokeWidth={1.9} />}
              </button>
              <button aria-label="Notifications" className="relative inline-flex min-h-8 items-center justify-center gap-1.5 rounded-lg border border-[var(--line)] bg-[var(--white)] px-2.5 text-[var(--brand-navy)] hover:bg-[var(--surface)] max-[720px]:flex-1" onClick={() => showToast("warning", "You have 7 unread notifications")} type="button">
                <Bell aria-hidden="true" size={16} strokeWidth={1.9} />
                <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-red-500" />
              </button>
              <div className="relative">
                <button className="inline-flex min-h-8 items-center justify-center gap-1.5 rounded-lg border border-[var(--line)] bg-[var(--white)] px-2.5 text-[var(--brand-navy)] hover:bg-[var(--surface)] max-[720px]:flex-1" onClick={() => setProfileMenuOpen((current) => !current)} type="button">
                  <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[var(--brand-navy)] text-xs font-bold text-[var(--white)]">{profileInitials}</span>
                </button>

                {profileMenuOpen ? (
                  <div className="absolute right-0 top-[calc(100%+0.45rem)] z-20 grid min-w-40 gap-1 rounded-xl border border-[var(--line)] bg-[var(--white)] p-1.5 shadow-xl">
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
                      className="flex items-center gap-2 rounded-lg px-2.5 py-2 text-sm text-red-600 no-underline hover:bg-[var(--surface)]"
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

          <div className="p-4 max-[720px]:p-3">
            <div className="mb-3 flex items-center justify-between gap-4 max-[720px]:flex-col max-[720px]:items-start">
              <div className="grid gap-0.5">
                <h2 className="m-0 text-base font-semibold text-slate-900">{contentTitle}</h2>
                <span className="text-xs text-[var(--muted)]">{roleHint}</span>
              </div>
              <div className="flex flex-wrap items-center gap-2 max-[720px]:w-full">
                <button className="rounded-lg border border-[var(--line)] bg-[var(--white)] px-3 py-2 text-sm font-semibold leading-tight text-[var(--brand-navy)] transition hover:bg-[var(--surface)] max-[720px]:flex-1" onClick={() => showToast("warning", "Meta API sync queued for review")} type="button">
                  Sync Meta API
                </button>
                <button className="rounded-lg border-0 bg-[var(--brand-orange)] px-3 py-2 text-sm font-semibold leading-tight text-[var(--white)] transition hover:bg-[var(--black)] max-[720px]:flex-1" onClick={() => showToast("success", "New notification sent successfully")} type="button">
                  Create Notification
                </button>
              </div>
            </div>

            {visibleSection === "Dashboard" ? (
              role === "Customer" ? (
                <CustomerDashboard data={data} showToast={showToast} />
              ) : role === "Maintainer" ? (
                <MaintainerDashboard data={data} showToast={showToast} />
              ) : (
                <AdminDashboard data={data} role={role} showToast={showToast} />
              )
            ) : (
              <SectionRenderer data={data} section={visibleSection} role={role} showToast={showToast} onSectionChange={handleSectionChange} />
            )}
          </div>
        </div>
      </main>

      <ToastStack onDismiss={dismissToast} toasts={toasts} />
    </div>
  );
}
