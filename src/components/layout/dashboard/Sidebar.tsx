"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { ChevronDown, X } from "lucide-react";
import { menuItems } from "@/features/crm/types/constants/sidebar-menu";

const ACTIVE_ICON_FILTER =
  "brightness(0) saturate(100%) invert(38%) sepia(84%) saturate(3000%) hue-rotate(0deg) brightness(101%) contrast(101%)";

function findActiveParentName(pathname: string): string | null {
  const activeParent = menuItems.find(
    (item) =>
      item.children && item.children.some((child) => pathname === child.href)
  );
  return activeParent ? activeParent.name : null;
}

export default function Sidebar({
  isMobileOpen = false,
  onMobileClose,
}: {
  isMobileOpen?: boolean;
  onMobileClose?: () => void;
}) {
  const pathname = usePathname();
  const router = useRouter();

  // route অনুযায়ী কোন menu খোলা থাকবে সেটা প্রথমে render-time এ ঠিক করা হচ্ছে
  const [openMenu, setOpenMenu] = React.useState<string | null>(() =>
    findActiveParentName(pathname)
  );
  const [prevPathname, setPrevPathname] = React.useState(pathname);

  // পথ পরিবর্তন হলে render এর সময়ই state adjust করা হচ্ছে (effect এর বদলে) —
  // এটাই React এর সুপারিশকৃত প্যাটার্ন "Adjusting state when a prop changes"
  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    const activeParentName = findActiveParentName(pathname);
    if (activeParentName) {
      setOpenMenu(activeParentName);
    }
  }

  const handleParentClick = (item: (typeof menuItems)[number]) => {
    const isOpen = openMenu === item.name;
    setOpenMenu(isOpen ? null : item.name);

    if (!isOpen && item.children && item.children.length > 0) {
      router.push(item.children[0].href);
    }
  };

  const handleMobileLinkClick = () => {
    onMobileClose?.();
  };

  return (
    <aside
      className={`w-72 bg-[var(--color-white)] border-r border-[var(--color-line)] flex flex-col justify-between p-3 h-full shrink-0 fixed lg:static inset-y-0 left-0 z-50 transition-transform duration-300 ease-in-out ${
        isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      }`}
    >
      <div className="overflow-y-auto">
        {/* Logo / Brand Info */}
        <div
          className="flex items-center justify-between border-b border-[var(--color-line)] py-3"
        >
          <div className="flex items-center gap-2 min-w-0">
            <Image
              src={"/images/dashboard/sitebar/Apex.svg"}
              width={40}
              height={40}
              alt="logo"
            ></Image>
            <div className="space-y-1 min-w-0">
              <h2 className="body-sm-medium text-[var(--color-primary-text-500)] truncate">
                Meta Bari
              </h2>
              <p className="text-[var(--color-subtext-500)] body-xsm-regular truncate">
                Meta Ads CRM Platform
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <div className="flex h-6 w-6 items-center justify-center gap-0.5 rounded-md border border-[var(--color-line)] bg-[var(--color-white)] p-0.5 shadow-[0px_2px_4px_0px_#1B1C1D0A]">
              <Image
                src={"/images/dashboard/sitebar/Vector.svg"}
                width={9.55}
                height={5.83}
                alt="toggle icon"
              />
            </div>

            <button
              type="button"
              aria-label="Close menu"
              onClick={onMobileClose}
              className="lg:hidden w-6 h-6 flex items-center justify-center text-[var(--color-subtext-500)]"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="py-5 space-y-3">
          <h1 className="body-xsm-medium px-4 text-[var(--color-subtext-400)]">MAIN</h1>
          <nav className="space-y-1">
            {menuItems.map((item) => {
              const hasChildren = !!item.children && item.children.length > 0;
              const isParentActive =
                (!!item.href && pathname === item.href) ||
                (hasChildren &&
                  item.children!.some((child) => pathname === child.href));
              const isOpen = openMenu === item.name;

              return (
                <div key={item.name}>
                  {hasChildren ? (
                    <button
                      type="button"
                      onClick={() => handleParentClick(item)}
                      className={`w-full flex items-center justify-between px-4 py-3.5 rounded-2xl transition-all ${
                        isParentActive
                          ? "text-[var(--color-adsfixter-primary)]"
                          : "text-[var(--color-primary-text-400)] hover:bg-[var(--color-surface)]"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Image
                          src={item.icon}
                          width={20}
                          height={20}
                          alt={`${item.name} icon`}
                          style={{
                            filter: isParentActive
                              ? ACTIVE_ICON_FILTER
                              : "none",
                            transition: "filter 0.2s ease-in-out",
                          }}
                        />
                        <span
                          className={`body-sm-medium ${
                            isParentActive ? "font-semibold" : ""
                          }`}
                        >
                          {item.name}
                        </span>
                      </div>
                      <ChevronDown
                        size={18}
                        className={`transition-transform duration-300 ease-in-out ${
                          isOpen ? "rotate-180" : "rotate-0"
                        } ${
                          isParentActive ? "text-[var(--color-adsfixter-primary)]" : "text-[var(--color-subtext-400)]"
                        }`}
                      />
                    </button>
                  ) : (
                    <Link
                      href={item.href ?? "#"}
                      onClick={handleMobileLinkClick}
                      className={`flex items-center justify-between px-4 py-3.5 rounded-2xl transition-all ${
                        isParentActive
                          ? "bg-[var(--color-primary-soft)] text-[var(--color-adsfixter-primary)]"
                          : "text-[var(--color-primary-text-400)] hover:bg-[var(--color-surface)]"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Image
                          src={item.icon}
                          width={20}
                          height={20}
                          alt={`${item.name} icon`}
                          style={{
                            filter: isParentActive
                              ? ACTIVE_ICON_FILTER
                              : "none",
                            transition: "filter 0.2s ease-in-out",
                          }}
                        />
                        <span className="body-sm-medium">{item.name}</span>
                      </div>
                    </Link>
                  )}

                  {/* Submenu with slide/fade animation */}
                  {hasChildren && (
                    <div
                      className={`overflow-hidden transition-all duration-300 ease-in-out ${
                        isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                      }`}
                    >
                      <div className="pl-11 pr-2 pt-1 pb-2 space-y-1">
                        {item.children!.map((child) => {
                          const isChildActive = pathname === child.href;
                          return (
                            <Link
                              key={child.href}
                              href={child.href}
                              onClick={handleMobileLinkClick}
                              className={`block rounded-xl px-3 py-2.5 body-sm-medium transition-all ${
                                isChildActive
                                  ? "bg-[var(--color-primary-soft)] font-semibold text-[var(--color-adsfixter-primary)]"
                                  : "text-[var(--color-primary-text-400)] hover:bg-[var(--color-surface)]"
                              }`}
                            >
                              {child.name}
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </nav>
        </div>
      </div>

      {/* User Profile Info (Bottom of Sidebar) */}
      <div className="border-t border-[var(--color-line)] pt-4 flex items-center gap-3">
        <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full bg-[var(--color-surface)]">
          <Image
            src="/avatar-placeholder.png"
            alt="Abdullah"
            fill
            className="object-cover"
          />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-[var(--color-primary-text-500)] truncate">
            Abdullah
          </p>
          <p className="text-xs text-[var(--color-subtext-400)] truncate">
            abdullah@gmail.com
          </p>
        </div>
      </div>
    </aside>
  );
}