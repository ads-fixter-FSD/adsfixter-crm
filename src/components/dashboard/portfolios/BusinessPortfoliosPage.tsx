"use client";

import { useMemo, useState } from "react";
import { Plus, Search } from "lucide-react";
import { SiMeta } from "react-icons/si";
import GoogleIcon from "./GoogleIcon";
import TikTokIcon from "./TikTokIcon";
import type {
  BusinessManager,
  PlatformInfo,
  PlatformKey,
} from "@/types/businessPortfolios";
import BusinessManagerRow from "./BusinessManagerRow";
import PlatformTabCard from "./PlatformTabCard";
import PlatformNotConnected from "./PlatformNotConnected";

const PLATFORMS: PlatformInfo[] = [
  { key: "meta", label: "Meta", accountsCount: 4, connected: true },
  { key: "google", label: "Google", accountsCount: 4, connected: false },
  { key: "tiktok", label: "Tiktok", accountsCount: null, connected: false },
];

const META_BUSINESS_MANAGERS: BusinessManager[] = [
  {
    id: "bm-1",
    name: "Retallix Business Manager",
    bmId: "78234190183475",
    status: "active",
    adAccounts: [
      {
        id: "acc-1",
        name: "UrbanCart - Ad Account 01",
        accountId: "23894650123746",
        status: "active",
        isPrimary: true,
      },
      {
        id: "acc-2",
        name: "Nurova Home Decor - Ad Account 02",
        accountId: "23894650123746",
        status: "disabled",
      },
      {
        id: "acc-3",
        name: "Nurova Home Decor - Ad Account 02",
        accountId: "23894650123746",
        status: "inactive",
      },
      {
        id: "acc-4",
        name: "Ratallix Ad Account",
        accountId: "23894650123746",
        status: "request-pending",
      },
    ],
  },
  {
    id: "bm-2",
    name: "Vantico Fitness BM",
    bmId: "78234190183475",
    status: "request-pending",
    adAccounts: [],
  },
  {
    id: "bm-3",
    name: "Ad Fixter LLC",
    bmId: "78234190183475",
    status: "access-removed",
    adAccounts: [],
  },
  {
    id: "bm-4",
    name: "TechZayan LLC",
    bmId: "78234190183475",
    status: "restricted",
    adAccounts: [],
  },
];

export default function BusinessPortfoliosPage() {
  const [activePlatform, setActivePlatform] = useState<PlatformKey>("meta");
  const [search, setSearch] = useState("");

  const filteredBMs = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (query === "") return META_BUSINESS_MANAGERS;
    return META_BUSINESS_MANAGERS.filter((bm) =>
      bm.name.toLowerCase().includes(query),
    );
  }, [search]);

  return (
    <div className="rounded-xl border border-[var(--color-line)] bg-[var(--color-white)] p-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="title-medium primary-text">Business Portfolios</h2>
          <p className="body-sm-regular subtext-400 mt-1">
            Your own Business Manager on each platform, and which assigned ad
            accounts are shared there.
          </p>
        </div>
        <button
          type="button"
          className="flex items-center gap-2 rounded-[var(--btn-radius)] bg-[var(--color-primary)] px-4 py-3 body-sm-medium text-[var(--color-on-primary)] transition-colors hover:bg-[var(--color-primary-hover)]"
        >
          <Plus size={16} />
          Add Business Portfolios
        </button>
      </div>

      <div className="mt-5 flex flex-wrap gap-3">
        <PlatformTabCard
          icon={<SiMeta size={18} color="#0866FF" />}
          label="Meta"
          statusLabel="4 accounts"
          isActive={activePlatform === "meta"}
          onClick={() => setActivePlatform("meta")}
        />
        <PlatformTabCard
          icon={<GoogleIcon size={18} />}
          label="Google"
          statusLabel={
            PLATFORMS.find((p) => p.key === "google")?.connected
              ? "4 accounts"
              : "Not Connected"
          }
          isActive={activePlatform === "google"}
          onClick={() => setActivePlatform("google")}
        />
        <PlatformTabCard
          icon={<TikTokIcon size={18} />}
          label="Tiktok"
          statusLabel="Not Connected"
          isActive={activePlatform === "tiktok"}
          onClick={() => setActivePlatform("tiktok")}
        />
      </div>

      <div className="mt-5 rounded-xl border border-[var(--color-line)]">
        {activePlatform === "meta" && (
          <>
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--color-line)] px-4 py-3.5">
              <span className="flex items-center gap-2">
                <SiMeta size={16} color="#0866FF" />
                <span className="body-sm-medium primary-text">
                  Meta - your Business Managers
                </span>
              </span>
              <div className="flex items-center gap-2 rounded-[var(--btn-radius)] border border-[var(--color-line)] px-3 py-2 w-full sm:w-64">
                <Search size={15} className="text-[var(--color-subtext-500)]" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search..."
                  className="w-full body-sm-regular text-[var(--color-primary-text-500)] outline-none placeholder:text-[var(--color-subtext-400)]"
                />
              </div>
            </div>

            <div className="flex flex-col gap-3 p-4">
              {filteredBMs.length === 0 ? (
                <p className="py-8 text-center body-sm-regular subtext-400">
                  No Business Managers match your search.
                </p>
              ) : (
                filteredBMs.map((bm) => (
                  <BusinessManagerRow
                    key={bm.id}
                    bm={bm}
                    onRequestAdAccount={(b) => console.log("request", b.id)}
                  />
                ))
              )}
            </div>
          </>
        )}

        {activePlatform === "google" && (
          <>
            <div className="flex items-center gap-2 border-b border-[var(--color-line)] px-4 py-3.5">
              <GoogleIcon size={16} />
              <span className="body-sm-medium primary-text">
                Google - your Manager Account
              </span>
            </div>
            <PlatformNotConnected
              icon={<GoogleIcon size={40} />}
              badgeIcon={<GoogleIcon size={20} />}
              title="No ad accounts found in this Business Manager"
              description="Connect your Google Manager Account to manage your google Ads account in one place"
              buttonLabel="Add Business Portfolios"
              onConnect={() => console.log("connect google")}
            />
          </>
        )}

        {activePlatform === "tiktok" && (
          <>
            <div className="flex items-center gap-2 border-b border-[var(--color-line)] px-4 py-3.5">
              <TikTokIcon size={16} />
              <span className="body-sm-medium primary-text">
                Tiktok - your Manager Account
              </span>
            </div>
            <PlatformNotConnected
              icon={<TikTokIcon size={40} />}
              badgeIcon={<TikTokIcon size={20} />}
              title="No TikTok Business Center connected Yet"
              description="Connect your tiktok business center to manage your tiktok ad accounts in one place."
              buttonLabel="Add Business Portfolios"
              onConnect={() => console.log("connect tiktok")}
            />
          </>
        )}
      </div>
    </div>
  );
}
