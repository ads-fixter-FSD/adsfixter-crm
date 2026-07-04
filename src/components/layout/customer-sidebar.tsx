"use client";

import Image from "next/image";
import Link from "next/link";
import { BadgeCheck, ChevronDown, ChevronRight, Headset, Home, LifeBuoy, Settings, X } from "lucide-react";
import { useState } from "react";
import { customerMainNavigation, customerOtherNavigation, customerRequestsNavigation, getSectionHref, navigationIcons } from "@/components/layout/app-sidebar-navigation";
import { getCustomerSectionLabel } from "@/components/layout/customer-navigation";

type CustomerSidebarProps = {
  activeSection: string;
  onSectionChange: (section: string) => void;
  showRequestsNav?: boolean;
};

function getCustomerNavClassName(isActive: boolean) {
  return `flex min-h-10 w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-left text-sm font-medium no-underline transition ${
    isActive
      ? "bg-[var(--brand-orange-soft)] text-[var(--color-adsfixter-primary)]"
      : "text-[var(--sidebar-link)] hover:bg-[var(--surface)] hover:text-[var(--brand-navy)]"
  }`;
}

export function CustomerSidebarBrand() {
  return (
    <div className="flex min-h-[72px] items-center justify-between gap-3 border-b border-[var(--line)] bg-[var(--white)] px-4 py-4">
      <div className="flex min-w-0 items-center gap-3">
        <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--brand-orange-soft)]">
          <Image alt="AdsFixter" className="block h-5 w-5 object-contain [html[data-theme='dark']_&]:hidden" height={20} src="/adsfixter-logo.png" width={20} />
          <Image alt="AdsFixter" className="hidden h-5 w-5 object-contain [html[data-theme='dark']_&]:block" height={20} src="/adfixterdark.svg" width={20} />
        </span>
        <div className="min-w-0">
          <strong className="body-sm-medium block truncate primary-text">AdsFixter</strong>
          <p className="body-xsm-regular m-0 truncate subtext">Meta Ads CRM Platform</p>
        </div>
      </div>
      <button aria-label="Switch workspace" className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-[var(--muted)] hover:bg-[var(--surface)]" type="button">
        <ChevronDown aria-hidden="true" size={16} strokeWidth={1.8} />
      </button>
    </div>
  );
}

export function CustomerSidebar({ activeSection, onSectionChange, showRequestsNav = false }: CustomerSidebarProps) {
  const [isSupportCardVisible, setIsSupportCardVisible] = useState(true);

  const renderNavItem = (section: string) => {
    const Icon = section === "Dashboard" ? Home : section === "Help & Support" ? LifeBuoy : (navigationIcons[section] ?? Home);
    const label = getCustomerSectionLabel(section);
    const isActive = activeSection === section || (section === "Business Profile Requests" && activeSection === "New Business Profile Request");

    return (
      <Link
        className={getCustomerNavClassName(isActive)}
        href={getSectionHref(section)}
        key={section}
        onClick={() => onSectionChange(section)}
      >
        <Icon aria-hidden="true" size={17} strokeWidth={isActive ? 2 : 1.8} />
        <span>{label}</span>
      </Link>
    );
  };

  return (
    <div className="flex min-h-0 flex-1 flex-col px-3 pb-4 pt-3">
      <nav className="grid flex-1 content-start gap-5">
        <div className="grid gap-2">
          <p className="body-xsm-regular m-0 px-2 uppercase tracking-[0.08em] subtext">Main</p>
          <div className="grid gap-1">{customerMainNavigation.map(renderNavItem)}</div>
        </div>

        {showRequestsNav ? (
          <div className="grid gap-2">
            <p className="body-xsm-regular m-0 px-2 uppercase tracking-[0.08em] subtext">Requests</p>
            <div className="grid gap-1">{customerRequestsNavigation.map(renderNavItem)}</div>
          </div>
        ) : null}

        <div className="grid gap-2">
          <p className="body-xsm-regular m-0 px-2 uppercase tracking-[0.08em] subtext">Other</p>
          <div className="grid gap-1">{customerOtherNavigation.map(renderNavItem)}</div>
        </div>
      </nav>

      <div className="mt-6 grid gap-3">
        {isSupportCardVisible ? (
          <div className="relative rounded-xl border border-[var(--line)] bg-[var(--surface)] p-4">
            <button
              aria-label="Hide support card"
              className="absolute right-3 top-3 text-[var(--muted)] hover:text-[var(--brand-navy)]"
              onClick={() => setIsSupportCardVisible(false)}
              type="button"
            >
              <X aria-hidden="true" size={14} strokeWidth={1.8} />
            </button>
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[var(--info-bg)] text-[var(--info-text)]">
              <Headset aria-hidden="true" size={16} strokeWidth={1.8} />
            </span>
            <strong className="body-sm-medium mt-3 block primary-text">NEED SUPPORT?</strong>
            <p className="body-xsm-regular m-0 mt-1 subtext">Contact with one of our experts to get support.</p>
          </div>
        ) : null}

        <button className="flex w-full items-center gap-3 rounded-xl border border-[var(--line)] bg-[var(--white)] p-3 text-left transition hover:bg-[var(--surface)]" type="button">
          <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[linear-gradient(135deg,#f6a623,#e85d2d)] text-sm font-semibold text-white">
            A
          </span>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1">
              <strong className="body-sm-medium truncate primary-text">Abdullah</strong>
              <BadgeCheck aria-hidden="true" className="shrink-0 text-[var(--info-text)]" size={14} strokeWidth={1.8} />
            </div>
            <p className="body-xsm-regular m-0 truncate subtext">abdullah@adsfixter.com</p>
          </div>
          <ChevronRight aria-hidden="true" className="shrink-0 text-[var(--muted)]" size={16} strokeWidth={1.8} />
        </button>
      </div>
    </div>
  );
}
