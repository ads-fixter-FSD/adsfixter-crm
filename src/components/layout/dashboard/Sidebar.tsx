"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { menuItems } from "@/features/crm/types/constants/sidebar-menu";

const ACTIVE_ICON_FILTER =
  "brightness(0) saturate(100%) invert(38%) sepia(84%) saturate(3000%) hue-rotate(0deg) brightness(101%) contrast(101%)";

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [openMenu, setOpenMenu] = React.useState<string | null>(null);

  // পেজ লোড হওয়ার সময় বর্তমান route এর parent menu automatically খোলা রাখা
  React.useEffect(() => {
    const activeParent = menuItems.find(
      (item) =>
        item.children &&
        item.children.some((child) => pathname === child.href)
    );
    if (activeParent) {
      setOpenMenu(activeParent.name);
    }
  }, [pathname]);

  const handleParentClick = (item: (typeof menuItems)[number]) => {
    const isOpen = openMenu === item.name;
    setOpenMenu(isOpen ? null : item.name);

    // প্রথমবার menu open করলে সাথে সাথে প্রথম child route এ navigate করে দেওয়া হচ্ছে
    if (!isOpen && item.children && item.children.length > 0) {
      router.push(item.children[0].href);
    }
  };

  return (
    <aside className="w-72 bg-[var(--color-white)] border-r border-[var(--color-line)] flex flex-col justify-between p-3 hidden lg:flex h-full shrink-0">
      <div>
        {/* Logo / Brand Info */}
        <div
          className="flex justify-between items-center py-3 border-b"
          style={{ borderBottomColor: "#F0F0F0", borderBottomWidth: "1px" }}
        >
          <div className="flex items-center gap-2 ">
            <Image
              src={"/images/dashboard/sitebar/Apex.svg"}
              width={40}
              height={40}
              alt="logo"
            ></Image>
            <div className="space-y-1">
              <h2 className="body-sm-medium text-[var(--color-primary-text-500)]">
                Meta Bari
              </h2>
              <p className="text-[var(--color-subtext-500)] body-xsm-regular">
                Meta Ads CRM Platform
              </p>
            </div>
          </div>
          <div
            className="w-6 h-6 flex items-center justify-center gap-0.5 p-0.5 rounded-md border"
            style={{
              background: "var(--Natural-White, #FFFFFF)",
              borderColor: "#F0F0F0",
              borderWidth: "1px",
              boxShadow: "0px 2px 4px 0px #1B1C1D0A",
            }}
          >
            <Image
              src={"/images/dashboard/sitebar/Vector.svg"}
              width={9.55}
              height={5.83}
              alt="toggle icon"
            />
          </div>
        </div>

        {/* Navigation Links */}
        <div className="py-5 space-y-3">
          <h1 className="body-xsm-medium text-[#A9ADAB] px-4">MAIN</h1>
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
                          ? "text-[#F74608]"
                          : "text-[#525866] hover:bg-gray-50"
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
                          isParentActive ? "text-[#F74608]" : "text-[#A9ADAB]"
                        }`}
                      />
                    </button>
                  ) : (
                    <Link
                      href={item.href ?? "#"}
                      className={`flex items-center justify-between px-4 py-3.5 rounded-2xl transition-all ${
                        isParentActive
                          ? "bg-[#FFF1EC] text-[#F74608]"
                          : "text-[#525866] hover:bg-gray-50"
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
                              className={`block px-3 py-2.5 rounded-xl body-sm-medium transition-all ${
                                isChildActive
                                  ? "bg-[#FFF1EC] text-[#F74608] font-semibold"
                                  : "text-[#525866] hover:bg-gray-50"
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
        <div className="w-10 h-10 bg-gray-200 rounded-full overflow-hidden relative">
          <img
            src="/avatar-placeholder.png"
            alt="Abdullah"
            className="w-full h-full object-cover"
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