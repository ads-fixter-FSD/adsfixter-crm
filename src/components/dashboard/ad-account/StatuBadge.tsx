import type { MetaStatus } from "@/types/account";

const STATUS_STYLES: Record<MetaStatus, { bg: string; accent: string }> = {
  Active: {
    bg: "#E6FFEE",
    accent: "#166534",
  },
  Disable: {
    bg: "#FFF3F3",
    accent: "#BE1C23",
  },
  Inactive: {
    bg: "#FFECE6",
    accent: "#F74608",
  },
};

export default function StatusBadge({ status }: { status: MetaStatus }) {
  const style = STATUS_STYLES[status];

  return (
    <span
      className="inline-flex items-center justify-center"
      style={{
        width: 84,
        height: 26,
        paddingTop: 4,
        paddingRight: 8,
        paddingBottom: 4,
        paddingLeft: 4,
        gap: 4,
        borderRadius: 6,
        background: style.bg,
      }}
    >
      <span
        className="shrink-0 rounded-full"
        style={{ width: 6, height: 6, background: style.accent }}
      />
      <span
        className="whitespace-nowrap"
        style={{
          fontFamily: "var(--font-aeonik)",
          fontWeight: 400,
          fontSize: 12,
          lineHeight: "150%",
          letterSpacing: "0%",
          verticalAlign: "middle",
          color: style.accent,
        }}
      >
        {status}
      </span>
    </span>
  );
}
