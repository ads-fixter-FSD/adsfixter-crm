"use client";

import Link from "next/link";
import Image from "next/image";
import { LayoutDashboard, Search } from "lucide-react";
import { useState } from "react";
import { adAccountSubNavigation, getSectionHref, navigationIcons, requestSubNavigation, roleNavigation } from "@/components/layout/app-sidebar-navigation";
import type { Role } from "@/features/crm/types/crm";

type AppSidebarProps = {
  role: Role;
  activeSection: string;
  onSectionChange: (section: string) => void;
};

export function AppSidebar({ role, activeSection, onSectionChange }: AppSidebarProps) {
  const [isAdAccountOpen, setIsAdAccountOpen] = useState(adAccountSubNavigation.includes(activeSection));
  const [isRequestsOpen, setIsRequestsOpen] = useState(requestSubNavigation.includes(activeSection));

  return (
    <aside className="sticky top-0 flex min-h-screen w-[226px] flex-col gap-3 border-r border-[var(--line)] bg-[var(--surface)] p-3 text-[var(--black)] max-[1180px]:static max-[1180px]:min-h-0 max-[1180px]:w-full">
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
        <p className="ml-1 mt-1 mb-1 text-xs font-semibold text-[var(--sidebar-label)]">Main</p>
        {roleNavigation[role].map((item) => {
          const Icon = navigationIcons[item] ?? LayoutDashboard;

          if (item === "Ad Accounts") {
            return (
              <div className="grid gap-1" key={item}>
                <button
                  className={`flex min-h-8 w-full items-center gap-2 rounded-lg px-2.5 py-2 text-left text-sm font-medium transition hover:bg-[var(--brand-navy)] hover:text-[var(--white)] ${
                    adAccountSubNavigation.includes(activeSection) ? "bg-[var(--brand-navy)] text-[var(--white)] shadow-[inset_3px_0_0_var(--brand-orange)]" : "text-[var(--sidebar-link)]"
                  }`}
                  onClick={() => setIsAdAccountOpen((current) => !current)}
                  type="button"
                >
                  <Icon aria-hidden="true" size={17} strokeWidth={1.9} />
                  <span>{item}</span>
                  <span aria-hidden="true" className={`ml-auto text-xs font-bold transition-transform ${isAdAccountOpen ? "rotate-180" : ""}`}>
                    v
                  </span>
                </button>

                {isAdAccountOpen ? (
                  <div className="grid gap-0.5 pl-5">
                    {adAccountSubNavigation.map((subItem) => (
                      <Link
                        className={`rounded-lg px-2 py-1.5 text-xs font-medium no-underline hover:bg-[var(--white)] hover:text-[var(--brand-navy)] ${subItem === activeSection ? "bg-[var(--white)] text-[var(--brand-navy)]" : "text-[var(--sidebar-link)]"}`}
                        href={getSectionHref(subItem)}
                        key={subItem}
                        onClick={() => onSectionChange(subItem)}
                      >
                        {subItem}
                      </Link>
                    ))}
                  </div>
                ) : null}
              </div>
            );
          }

          if (item === "Requests") {
            return (
              <div className="grid gap-1" key={item}>
                <button
                  className={`flex min-h-8 w-full items-center gap-2 rounded-lg px-2.5 py-2 text-left text-sm font-medium transition hover:bg-[var(--brand-navy)] hover:text-[var(--white)] ${
                    requestSubNavigation.includes(activeSection) ? "bg-[var(--brand-navy)] text-[var(--white)] shadow-[inset_3px_0_0_var(--brand-orange)]" : "text-[var(--sidebar-link)]"
                  }`}
                  onClick={() => setIsRequestsOpen((current) => !current)}
                  type="button"
                >
                  <Icon aria-hidden="true" size={17} strokeWidth={1.9} />
                  <span>{item}</span>
                  <span aria-hidden="true" className={`ml-auto text-xs font-bold transition-transform ${isRequestsOpen ? "rotate-180" : ""}`}>
                    v
                  </span>
                </button>

                {isRequestsOpen ? (
                  <div className="grid gap-0.5 pl-5">
                    {requestSubNavigation.map((subItem) => (
                      <Link
                        className={`rounded-lg px-2 py-1.5 text-xs font-medium no-underline hover:bg-[var(--white)] hover:text-[var(--brand-navy)] ${subItem === activeSection ? "bg-[var(--white)] text-[var(--brand-navy)]" : "text-[var(--sidebar-link)]"}`}
                        href={getSectionHref(subItem)}
                        key={subItem}
                        onClick={() => onSectionChange(subItem)}
                      >
                        {subItem}
                      </Link>
                    ))}
                  </div>
                ) : null}
              </div>
            );
          }

          return (
            <Link
              className={`flex min-h-8 w-full items-center gap-2 rounded-lg px-2.5 py-2 text-left text-sm font-medium no-underline transition hover:bg-[var(--brand-navy)] hover:text-[var(--white)] ${
                item === activeSection ? "bg-[var(--brand-navy)] text-[var(--white)] shadow-[inset_3px_0_0_var(--brand-orange)]" : "text-[var(--sidebar-link)]"
              }`}
              href={getSectionHref(item)}
              key={item}
              onClick={() => onSectionChange(item)}
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

export { adAccountSubNavigation, convertSectionNameToUrlSlug as sectionToSlug, getSectionHref, requestSubNavigation, roleNavigation } from "@/components/layout/app-sidebar-navigation";
