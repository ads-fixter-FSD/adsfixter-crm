import Image from "next/image";
import { ChevronRight } from "lucide-react";
import type { PlatformSummary } from "../overview-data";

const PLATFORM_IMAGES: Record<PlatformSummary["id"], string> = {
  meta: "/advertising/meta.png",
  google: "/advertising/google.png",
  tiktok: "/advertising/tiktok.png",
};

type PlatformProps = {
  platforms: PlatformSummary[];
};

export default function Platform({ platforms }: PlatformProps) {
  return (
    <section className="flex w-full flex-col rounded-[12px] border border-[#EDEDED] bg-white">
      <div className="border-b border-[#EDEDED] px-5 py-4">
        <h2 className="title-medium primary-text-500">
          Platforms
        </h2>
      </div>

      <div className="flex w-full gap-3 p-4 max-[900px]:flex-col">
        {platforms.map((platform) => (
          <button
            key={platform.id}
            type="button"
            className="flex h-[72px] min-w-0 flex-1 basis-[345px] items-center justify-between rounded-[8px] border border-[#F0F0F0] bg-white p-4 text-left shadow-[0px_1px_2px_0px_#0D0D120F] transition hover:border-[var(--color-adsfixter-primary,#f74608)]"
          >
            <div className="flex min-w-0 items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center ">
                <Image
                  alt={platform.name}
                  className="h-10 w-10 object-contain"
                  height={20}
                  src={PLATFORM_IMAGES[platform.id]}
                  width={20}
                />
              </div>
              <span className="truncate font-sans text-sm font-medium text-[var(--color-primary-text-500,#0e2038)]">
                {platform.name}
              </span>
            </div>

            <div className="flex shrink-0 items-center gap-2">
              <span className="whitespace-nowrap font-sans text-xs text-[var(--color-subtext-500,#7f8482)]">
                {platform.accounts} accounts • ${platform.spend.toFixed(0)}
              </span>
              <ChevronRight size={16} className="text-[var(--color-subtext-500,#7f8482)]" />
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}
