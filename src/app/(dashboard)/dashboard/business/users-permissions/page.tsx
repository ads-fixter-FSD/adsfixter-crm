"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import {
  Plus,
  ClipboardList,
  Download,
  DollarSign,
  ShieldCheck,
  MoreVertical,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  MessageSquare,
  ArrowUpDown,
} from "lucide-react";
import { PrimaryButton } from "@/components/shared-buttons";

// ---- Custom up/down arrows icon (used in the Role dropdown) ----
const UpDownIcon = ({ size = 16 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M11.3307 6.33333L7.9974 3L4.66406 6.33333H11.3307ZM11.3307 9.66667L7.9974 13L4.66406 9.66667H11.3307Z"
      fill="#828282"
    />
  </svg>
);

type Role = "Owner" | "Admin" | "Staff";

type TeamUser = {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
  role: Role;
  lastActive: string;
  adAccounts: string;
  permissions: string;
};

const initialUsers: TeamUser[] = [
  {
    id: "1",
    name: "Abdullah Al Nur",
    email: "abdullah@gmail.com,",
    avatarUrl:
      "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=128&q=80",
    role: "Owner",
    lastActive: "2 min ago",
    adAccounts: "12",
    permissions: "Full Access",
  },
  {
    id: "2",
    name: "Abdullah Al Nur",
    email: "abdullah@gmail.com,",
    avatarUrl:
      "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=128&q=80",
    role: "Admin",
    lastActive: "5 min ago",
    adAccounts: "8",
    permissions: "Admin",
  },
  {
    id: "3",
    name: "Abdullah Al Nur",
    email: "abdullah@gmail.com,",
    avatarUrl:
      "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=128&q=80",
    role: "Staff",
    lastActive: "12 min ago",
    adAccounts: "Wallet Only",
    permissions: "Finance",
  },
  {
    id: "4",
    name: "Abdullah Al Nur",
    email: "abdullah@gmail.com,",
    avatarUrl:
      "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=128&q=80",
    role: "Staff",
    lastActive: "15 min ago",
    adAccounts: "4",
    permissions: "Ad Manager",
  },
  {
    id: "5",
    name: "Abdullah Al Nur",
    email: "abdullah@gmail.com,",
    avatarUrl:
      "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=128&q=80",
    role: "Staff",
    lastActive: "30 min ago",
    adAccounts: "Read Only",
    permissions: "Viwer",
  },
  {
    id: "6",
    name: "Abdullah Al Nur",
    email: "abdullah@gmail.com,",
    avatarUrl:
      "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=128&q=80",
    role: "Staff",
    lastActive: "1 hrs ago",
    adAccounts: "6",
    permissions: "Admin",
  },
  {
    id: "7",
    name: "Abdullah Al Nur",
    email: "abdullah@gmail.com,",
    avatarUrl:
      "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=128&q=80",
    role: "Staff",
    lastActive: "1 days ago",
    adAccounts: "2",
    permissions: "Viwer",
  },
];

const roleStyles: Record<Role, string> = {
  Owner: "bg-[#FFECE6] border-[#FFECE6] text-[#F74608]",
  Admin: "bg-white border-[#E4E4E7] text-[#334155]",
  Staff: "bg-white border-[#E4E4E7] text-[#334155]",
};

const ROLE_OPTIONS: Role[] = ["Owner", "Admin", "Staff"];

const RoleSelect = ({
  role,
  onChange,
}: {
  role: Role;
  onChange: (role: Role) => void;
}) => {
  const [open, setOpen] = useState(false);
  const [coords, setCoords] = useState({ top: 0, left: 0 });
  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  // Calculate a fixed-position spot for the menu so it can never be
  // clipped by the table's overflow-x-auto / card's overflow-hidden.
  const openMenu = () => {
    const rect = buttonRef.current?.getBoundingClientRect();
    if (rect) {
      const menuHeight = ROLE_OPTIONS.length * 36 + 8; // approx menu height
      const spaceBelow = window.innerHeight - rect.bottom;
      const shouldFlipUp = spaceBelow < menuHeight + 12;

      setCoords({
        top: shouldFlipUp ? rect.top - menuHeight - 6 : rect.bottom + 6,
        left: rect.left,
      });
    }
    setOpen((prev) => !prev);
  };

  useEffect(() => {
    if (!open) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (
        buttonRef.current &&
        !buttonRef.current.contains(e.target as Node) &&
        menuRef.current &&
        !menuRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    // Close on scroll/resize too, since a stale fixed position would
    // otherwise float away from the button.
    const handleScrollOrResize = () => setOpen(false);

    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("scroll", handleScrollOrResize, true);
    window.addEventListener("resize", handleScrollOrResize);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("scroll", handleScrollOrResize, true);
      window.removeEventListener("resize", handleScrollOrResize);
    };
  }, [open]);

  return (
    <>
      <button
        ref={buttonRef}
        type="button"
        onClick={openMenu}
        className={`inline-flex h-9 items-center gap-2 rounded-lg border px-3 text-sm font-medium transition hover:opacity-80 ${roleStyles[role]}`}
      >
        {role}
        <UpDownIcon size={14} />
      </button>

      {open && (
        <div
          ref={menuRef}
          style={{ top: coords.top, left: coords.left }}
          className="fixed z-[200] w-32 rounded-lg border border-[#EDEDED] bg-white p-1 shadow-lg"
        >
          {ROLE_OPTIONS.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => {
                onChange(option);
                setOpen(false);
              }}
              className={`flex w-full items-center justify-between rounded-md px-2.5 py-2 text-left text-sm font-medium transition hover:bg-[#F8FAFC] ${
                option === role ? "text-[#F74608]" : "text-[#334155]"
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </>
  );
};

const statCards = [
  {
    label: "Total Users",
    value: "12",
    caption: "Registered team members",
    icon: ClipboardList,
  },
  {
    label: "Active Uses",
    value: "10",
    caption: "Currently active",
    icon: Download,
  },
  {
    label: "Pending Invitations",
    value: "2",
    caption: "Waiting for acceptance",
    icon: DollarSign,
  },
  {
    label: "Roles",
    value: "5",
    caption: "Permission groups",
    icon: ShieldCheck,
  },
];

const columnHeaders: { key: string; label: string; sortable: boolean }[] = [
  { key: "user", label: "User", sortable: true },
  { key: "role", label: "Role", sortable: true },
  { key: "lastActive", label: "Last Active", sortable: true },
  { key: "adAccounts", label: "Ad Accounts", sortable: true },
  { key: "permissions", label: "Permissions", sortable: true },
  { key: "action", label: "Action", sortable: false },
];

const TeamOverviewPage = () => {
  const [users, setUsers] = useState<TeamUser[]>(initialUsers);
  const [perPage, setPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 5;

  const handleRoleChange = (userId: string, role: Role) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === userId ? { ...u, role } : u))
    );
  };

  return (
    <div className="min-h-screen p-6 max-[640px]:p-4">
      <div className="mx-auto space-y-6">
        {/* Overview Card */}
        <div className="rounded-xl border border-[#F0F0F0] p-6">
          <div className="flex items-center justify-between max-[640px]:flex-col max-[640px]:items-start max-[640px]:gap-4">
            <h2 className="text-lg font-semibold text-[#0F172A]">Overview</h2>
            <PrimaryButton className="min-h-10 gap-2 px-4 py-2 !bg-[#F74608] hover:!bg-[#e03d04] border-0 text-white max-[640px]:w-full">
              <Plus size={16} />
              Invite User
            </PrimaryButton>
          </div>

          <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {statCards.map((card) => {
              const Icon = card.icon;
              return (
                <div
                  key={card.label}
                  className="rounded-xl border border-[#F0F0F0] p-4"
                >
                  <div className="flex items-center gap-2 text-sm text-[#71717A]">
                    <Icon size={16} strokeWidth={1.5} className="text-[#71717A]" />
                    <span>{card.label}</span>
                  </div>
                  <div className="mt-3 text-2xl font-semibold text-[#0F172A]">
                    {card.value}
                  </div>
                  <div className="mt-1 text-xs text-[#94A3B8]">
                    {card.caption}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Users Card */}
        <div className="overflow-hidden rounded-xl border border-[#F0F0F0]">
          <div className="flex items-center justify-between border-b border-[#F0F0F0] p-6 max-[640px]:flex-col max-[640px]:items-start max-[640px]:gap-4">
            <div>
              <h2 className="text-lg font-semibold text-[#0F172A]">Users</h2>
              <p className="mt-1 text-sm text-gray-400">
                Manage your business team members, roles and permissions.
              </p>
            </div>
            <PrimaryButton className="min-h-10 gap-2 px-4 py-2 !bg-[#F74608] hover:!bg-[#e03d04] border-0 text-white max-[640px]:w-full">
              <Plus size={16} />
              Invite User
            </PrimaryButton>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px] border-collapse text-left">
              <thead>
                <tr className="bg-[#F2F3F3]">
                  {columnHeaders.map((col, idx) => (
                    <th
                      key={col.key}
                      className={`px-6 py-3 text-xs font-medium text-[#71717A] border-b ${
                        idx !== columnHeaders.length - 1 ? "border-r" : ""
                      } border-[#EDEDED]`}
                    >
                      <span className="inline-flex items-center gap-1.5">
                        {col.label}
                        {col.sortable && (
                         <div><svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M11.3307 6.33333L7.9974 3L4.66406 6.33333H11.3307ZM11.3307 9.66667L7.9974 13L4.66406 9.66667H11.3307Z" fill="#828282"/>
</svg>
</div>
                        )}
                      </span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr
                    key={user.id}
                    className={
                      index !== users.length - 1
                        ? "border-b border-[#EDEDED]"
                        : ""
                    }
                  >
                    <td className="border-r border-[#EDEDED] px-6 py-4">
                      <div className="flex items-center gap-3">
                        <Image
                          src={user.avatarUrl}
                          alt={user.name}
                          width={36}
                          height={36}
                          className="h-9 w-9 shrink-0 rounded-full object-cover"
                        />
                        <div>
                          <div className="text-sm font-semibold text-[#0F172A]">
                            {user.name}
                          </div>
                          <div className="text-xs text-[#94A3B8]">
                            {user.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="border-r border-[#EDEDED] px-6 py-4">
                      <RoleSelect
                        role={user.role}
                        onChange={(role) => handleRoleChange(user.id, role)}
                      />
                    </td>
                    <td className="border-r border-[#EDEDED] px-6 py-4 text-sm font-medium text-[#334155]">
                      {user.lastActive}
                    </td>
                    <td className="border-r border-[#EDEDED] px-6 py-4 text-sm font-medium text-[#334155]">
                      {user.adAccounts}
                    </td>
                    <td className="border-r border-[#EDEDED] px-6 py-4 text-sm font-medium text-[#334155]">
                      {user.permissions}
                    </td>
                    <td className="px-6 py-4">
                      <button
                        type="button"
                        aria-label={`Actions for ${user.name}`}
                        className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#E4E4E7] text-[#94A3B8] transition hover:bg-[#F8FAFC] hover:text-[#475569]"
                      >
                        <MoreVertical size={15} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination Footer */}
          <div className="flex items-center justify-between border-t border-[#F0F0F0] p-5 max-[640px]:flex-col max-[640px]:items-start max-[640px]:gap-4">
            <div className="flex items-center gap-2 text-sm text-[#64748B]">
              <span>Show</span>
              <div className="relative">
                <select
                  value={perPage}
                  onChange={(e) => setPerPage(Number(e.target.value))}
                  className="h-9 appearance-none rounded-lg border border-[#E4E4E7] bg-white pl-3 pr-8 text-sm font-medium text-[#334155] outline-none"
                >
                  <option value={10}>10</option>
                  <option value={25}>25</option>
                  <option value={50}>50</option>
                </select>
                <ChevronDown
                  size={14}
                  className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-[#94A3B8]"
                />
              </div>
              <span>Per Page</span>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                aria-label="Previous page"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#E4E4E7] text-[#94A3B8] transition hover:bg-[#F8FAFC] disabled:opacity-40 disabled:hover:bg-white"
              >
                <ChevronLeft size={16} />
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <button
                    key={page}
                    type="button"
                    onClick={() => setCurrentPage(page)}
                    className={`flex h-9 w-9 items-center justify-center rounded-lg text-sm font-semibold transition ${
                      currentPage === page
                        ? "bg-[#F74608] text-white"
                        : "border border-[#E4E4E7] text-[#334155] hover:bg-[#F8FAFC]"
                    }`}
                  >
                    {page}
                  </button>
                )
              )}

              <button
                type="button"
                onClick={() =>
                  setCurrentPage((p) => Math.min(totalPages, p + 1))
                }
                disabled={currentPage === totalPages}
                aria-label="Next page"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#E4E4E7] text-[#94A3B8] transition hover:bg-[#F8FAFC] disabled:opacity-40 disabled:hover:bg-white"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Floating chat button */}
      <button
        type="button"
        className="fixed bottom-6 right-6 flex h-14 w-14 items-center justify-center rounded-full bg-[#F74608] text-white shadow-lg hover:bg-[#e03d04] transition-transform hover:scale-105"
        aria-label="Open chat"
      >
        <MessageSquare size={22} />
      </button>
    </div>
  );
};

export default TeamOverviewPage;