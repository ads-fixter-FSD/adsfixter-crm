"use client";

import Image from "next/image";
import type { PlatformId } from "../portfolios-data";
import { PLATFORM_IMAGES, PLATFORM_TABS } from "../portfolios-data";

type PlatformSelectorProps = {
  selectedPlatform: PlatformId;
  onSelect: (platform: PlatformId) => void;
};

export default function PlatformSelector({ selectedPlatform, onSelect }: PlatformSelectorProps) {
  return (
    <section className="flex w-full flex-col rounded-[12px] border border-[#EDEDED] bg-white">
      <div className="flex w-full gap-3 p-4 max-[900px]:flex-col">
        {PLATFORM_TABS.map((platform) => {
          const isSelected = selectedPlatform === platform.id;

          return (
            <button
              key={platform.id}
              type="button"
              onClick={() => onSelect(platform.id)}
              className={`flex h-[72px] min-w-0 flex-1 basis-[345px] items-center justify-between rounded-[8px] border p-4 text-left shadow-[0px_1px_2px_0px_#0D0D120F] transition ${
                isSelected
                  ? "border-[var(--color-adsfixter-primary,#f74608)] bg-[#FFF7F4]"
                  : "border-[#F0F0F0] bg-white hover:border-[#E0E0E0]"
              }`}
            >
              <div className="flex min-w-0 items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center">
                  <Image
                    alt={platform.name}
                    className="h-10 w-10 object-contain"
                    height={40}
                    src={PLATFORM_IMAGES[platform.id]}
                    width={40}
                  />
                </div>
                <div className="flex min-w-0 flex-col gap-0.5">
                  <span className="truncate font-sans text-sm font-medium text-[var(--color-primary-text-500,#0e2038)]">
                    {platform.name}
                  </span>
                  <span className="truncate font-sans text-xs text-[var(--color-subtext-500,#7f8482)]">
                    {platform.accountsLabel}
                  </span>
                </div>
              </div>

              <span
                className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 ${
                  isSelected
                    ? "border-[var(--color-adsfixter-primary,#f74608)]"
                    : "border-[#D1D5DB]"
                }`}
              >
                {isSelected ? (
                  <span className="h-2.5 w-2.5 rounded-full bg-[var(--color-adsfixter-primary,#f74608)]" />
                ) : null}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
