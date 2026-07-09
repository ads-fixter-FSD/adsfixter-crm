"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { ChevronDown, GripVertical, Monitor, MoreVertical, Plus, Search } from "lucide-react";
import { getSectionHref } from "@/components/layout/app-sidebar-navigation";
import { PrimaryButton } from "@/components/shared-buttons";
import type {
  BusinessManager,
  BusinessManagerStatus,
  PlatformId,
  PortfolioAdAccount,
  PortfolioAdAccountStatus,
} from "../portfolios-data";
import { getAdAccountsByBusinessManager, PLATFORM_IMAGES } from "../portfolios-data";

const STATUS_STYLES: Record<BusinessManagerStatus, string> = {
  Active: "bg-[#E9F9EF] text-[#16A34A]",
  "Request Pending": "bg-[#FEF3E2] text-[#D97706]",
  "Access Removed": "bg-[#FEE2E2] text-[#DC2626]",
  Restricted: "bg-[#FEE2E2] text-[#DC2626]",
};

const AD_ACCOUNT_STATUS_STYLES: Record<PortfolioAdAccountStatus, string> = {
  Active: "bg-[#E9F9EF] text-[#16A34A]",
  Inactive: "bg-[#F3F4F6] text-[#6B7280]",
  Pending: "bg-[#FEF3E2] text-[#D97706]",
};

const PLATFORM_LABELS: Record<PlatformId, string> = {
  meta: "Meta",
  google: "Google",
  tiktok: "Tiktok",
};

type BusinessManagersListProps = {
  platform: PlatformId;
  managers: BusinessManager[];
};

function BusinessManagerCard({
  manager,
  platform,
  isExpanded,
  onToggle,
}: {
  manager: BusinessManager;
  platform: PlatformId;
  isExpanded: boolean;
  onToggle: () => void;
}) {
  const router = useRouter();
  const adAccounts = useMemo(() => getAdAccountsByBusinessManager(manager.id), [manager.id]);

  return (
    <div className="overflow-hidden rounded-[8px] border border-[#F0F0F0] bg-white shadow-[0px_1px_2px_0px_#0D0D120F]">
      <div className="flex items-center justify-between gap-3 p-4">
        <div className="flex min-w-0 flex-1 items-center gap-3">
          <GripVertical className="shrink-0 text-[var(--color-subtext-500,#7f8482)]" size={18} />

          <Image
            alt={PLATFORM_LABELS[platform]}
            className="h-8 w-8 shrink-0 object-contain"
            height={32}
            src={PLATFORM_IMAGES[platform]}
            width={32}
          />

          <button className="min-w-0 text-left" onClick={onToggle} type="button">
            <p className="m-0 truncate font-sans text-sm font-medium text-[var(--color-primary-text-500,#0e2038)]">
              {manager.name}
            </p>
            <p className="m-0 truncate font-sans text-xs text-[var(--color-subtext-500,#7f8482)]">
              ID: {manager.managerId}
            </p>
          </button>
        </div>

        <div className="flex shrink-0 items-center gap-3">
          <span className={`rounded-md px-2.5 py-1 text-xs font-medium ${STATUS_STYLES[manager.status]}`}>
            {manager.status}
          </span>
          <button
            aria-label="More actions"
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#E9E9E9] bg-white text-[var(--color-subtext-500,#7f8482)]"
            type="button"
          >
            <MoreVertical size={16} />
          </button>
          <button
            aria-expanded={isExpanded}
            aria-label={isExpanded ? "Collapse" : "Expand"}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#E9E9E9] bg-white text-[var(--color-subtext-500,#7f8482)]"
            onClick={onToggle}
            type="button"
          >
            <ChevronDown className={`transition-transform ${isExpanded ? "rotate-180" : ""}`} size={16} />
          </button>
        </div>
      </div>

      {isExpanded ? (
        <div className="border-t border-[#F0F0F0] bg-[#FAFAFA] px-4 py-4">
          {adAccounts.length === 0 ? (
            <div className="flex flex-col items-start justify-between gap-4 rounded-[8px] border border-[#F0F0F0] bg-white p-4 sm:flex-row sm:items-center">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-[#E9E9E9] bg-[#F9FAFB]">
                  <Monitor className="text-[var(--color-subtext-500,#7f8482)]" size={18} />
                </div>
                <div>
                  <p className="m-0 font-sans text-sm font-medium text-[var(--color-primary-text-500,#0e2038)]">
                    No ad accounts found in this Business Manager.
                  </p>
                  <p className="m-0 mt-1 font-sans text-xs leading-[150%] text-[var(--color-subtext-500,#7f8482)]">
                    This Business Manager doesn&apos;t have any ad accounts yet. Create an ad account to start running ads.
                  </p>
                </div>
              </div>

              <PrimaryButton
                className="min-h-10 shrink-0 gap-2 px-4"
                onClick={() => router.push(getSectionHref("Request Account"))}
                type="button"
              >
                <Plus size={16} strokeWidth={2.5} />
                Request Ad Account
              </PrimaryButton>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {adAccounts.map((account) => (
                <AdAccountRow key={account.id} account={account} platform={platform} />
              ))}

              <div className="flex justify-end pt-1">
                <PrimaryButton
                  className="min-h-10 gap-2 px-4"
                  onClick={() => router.push(getSectionHref("Request Account"))}
                  type="button"
                >
                  <Plus size={16} strokeWidth={2.5} />
                  Request Ad Account
                </PrimaryButton>
              </div>
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
}

function AdAccountRow({ account, platform }: { account: PortfolioAdAccount; platform: PlatformId }) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-[8px] border border-[#F0F0F0] bg-white p-4">
      <div className="flex min-w-0 items-center gap-3">
        <Image
          alt={PLATFORM_LABELS[platform]}
          className="h-7 w-7 shrink-0 object-contain"
          height={28}
          src={PLATFORM_IMAGES[platform]}
          width={28}
        />
        <div className="min-w-0">
          <p className="m-0 truncate font-sans text-sm font-medium text-[var(--color-primary-text-500,#0e2038)]">
            {account.name}
          </p>
          <p className="m-0 truncate font-sans text-xs text-[var(--color-subtext-500,#7f8482)]">
            ID: {account.accountId}
          </p>
        </div>
      </div>

      <span className={`rounded-md px-2.5 py-1 text-xs font-medium ${AD_ACCOUNT_STATUS_STYLES[account.status]}`}>
        {account.status}
      </span>
    </div>
  );
}

export default function BusinessManagersList({ platform, managers }: BusinessManagersListProps) {
  const [search, setSearch] = useState("");
  const [expandedManagerId, setExpandedManagerId] = useState<string | null>(null);
  const [expandedPlatform, setExpandedPlatform] = useState(platform);

  if (platform !== expandedPlatform) {
    setExpandedPlatform(platform);
    setExpandedManagerId(null);
  }

  const filteredManagers = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return managers;

    return managers.filter(
      (manager) =>
        manager.name.toLowerCase().includes(query) ||
        manager.managerId.includes(query) ||
        manager.status.toLowerCase().includes(query),
    );
  }, [managers, search]);

  return (
    <section className="flex w-full flex-col rounded-[12px] border border-[#EDEDED] bg-white">
      <div className="flex flex-col gap-4 border-b border-[#EDEDED] px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <Image
            alt={PLATFORM_LABELS[platform]}
            className="h-5 w-5 object-contain"
            height={20}
            src={PLATFORM_IMAGES[platform]}
            width={20}
          />
          <h2 className="m-0 font-sans text-base font-medium text-[var(--color-primary-text-500,#0e2038)]">
            {PLATFORM_LABELS[platform]} - your Business Managers
          </h2>
        </div>

        <div className="relative w-full sm:max-w-[280px]">
          <Search
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-subtext-500,#7f8482)]"
            size={16}
          />
          <input
            className="h-10 w-full rounded-lg border border-[#E9E9E9] bg-white pl-9 pr-3 text-sm text-[var(--color-primary-text-500,#0e2038)] outline-none placeholder:text-[var(--color-subtext-500,#7f8482)] focus:border-[var(--color-adsfixter-primary,#f74608)]"
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search..."
            type="search"
            value={search}
          />
        </div>
      </div>

      <div className="flex flex-col gap-3 p-4">
        {filteredManagers.length === 0 ? (
          <p className="m-0 py-10 text-center text-sm text-[var(--color-subtext-500,#7f8482)]">
            No business managers found for {PLATFORM_LABELS[platform]}.
          </p>
        ) : (
          filteredManagers.map((manager) => (
            <BusinessManagerCard
              key={manager.id}
              isExpanded={expandedManagerId === manager.id}
              manager={manager}
              onToggle={() =>
                setExpandedManagerId((current) => (current === manager.id ? null : manager.id))
              }
              platform={platform}
            />
          ))
        )}
      </div>
    </section>
  );
}
