import type { Platform } from "@/types/account";

const PLATFORM_META: Record<
  Platform,
  { label: string; bg: string; text: string; glyph: string }
> = {
  meta: {
    label: "Meta",
    bg: "bg-[#e7f0ff]",
    text: "text-[#1877f2]",
    glyph: "M",
  },
  tiktok: {
    label: "TikTok",
    bg: "bg-[#111111]",
    text: "text-white",
    glyph: "T",
  },
  google: {
    label: "Google",
    bg: "bg-[#fef3e2]",
    text: "text-[#ea4335]",
    glyph: "G",
  },
};

export default function PlatformIcon({ platform }: { platform: Platform }) {
  const meta = PLATFORM_META[platform];

  return (
    <span
      title={meta.label}
      className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full body-sm-medium ${meta.bg} ${meta.text}`}
    >
      {meta.glyph}
    </span>
  );
}
