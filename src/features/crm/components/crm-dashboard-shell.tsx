"use client";

import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Bell, LogOut, Moon, Settings, Sun } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { AppSidebar, getSectionHref, roleNavigation, sectionToSlug } from "@/components/layout/app-sidebar";
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
    const requestedSection = roleNavigation[nextRole].find((section) => sectionToSlug(section) === requestedSectionSlug);

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

  const visibleSection = roleNavigation[role].includes(activeSection) ? activeSection : "Dashboard";

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
      <div className="loading-screen">
        <Image alt="AdsFixter" className="brand-logo large" height={44} src="/adsfixter-logo.png" width={44} />
        <p>Loading CRM workspace...</p>
      </div>
    );
  }

  return (
    <div className="app-shell">
      <AppSidebar role={role} activeSection={visibleSection} onSectionChange={setActiveSection} />

      <main className="main-content">
        <div className="content-container">
          <header className="dashboard-header">
            <div className="page-title">
              <p className="eyebrow">{role} Panel</p>
              <h1>{visibleSection}</h1>
            </div>

            <div className="header-actions">
              <button aria-label="Toggle theme" className="theme-toggle" onClick={toggleTheme} type="button">
                {theme === "light" ? <Moon aria-hidden="true" size={16} strokeWidth={1.9} /> : <Sun aria-hidden="true" size={16} strokeWidth={1.9} />}
              </button>
              <button aria-label="Notifications" className="notification-button" onClick={() => showToast("warning", "You have 7 unread notifications")} type="button">
                <Bell aria-hidden="true" size={16} strokeWidth={1.9} />
                <span className="notification-dot" />
              </button>
              <div className="profile-dropdown-wrap">
                <button className="profile-menu" onClick={() => setProfileMenuOpen((current) => !current)} type="button">
                  <span className="profile-avatar">{profileInitials}</span>
                </button>

                {profileMenuOpen ? (
                  <div className="profile-dropdown">
                    <button
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

          <div className="content-body">
            <div className="page-context">
              <div className="section-heading">
                <h2>{contentTitle}</h2>
                <span>{roleHint}</span>
              </div>
              <div className="topbar-actions">
                <button className="ghost-button" onClick={() => showToast("warning", "Meta API sync queued for review")} type="button">
                  Sync Meta API
                </button>
                <button className="primary-button" onClick={() => showToast("success", "New notification sent successfully")} type="button">
                  Create Notification
                </button>
              </div>
            </div>

            {visibleSection === "Dashboard" ? (
              role === "Customer" ? (
                <CustomerDashboard data={data} role={role} showToast={showToast} />
              ) : role === "Maintainer" ? (
                <MaintainerDashboard data={data} role={role} showToast={showToast} />
              ) : (
                <AdminDashboard data={data} role={role} showToast={showToast} />
              )
            ) : (
              <SectionRenderer data={data} section={visibleSection} role={role} showToast={showToast} />
            )}
          </div>
        </div>
      </main>

      <ToastStack onDismiss={dismissToast} toasts={toasts} />
    </div>
  );
}
