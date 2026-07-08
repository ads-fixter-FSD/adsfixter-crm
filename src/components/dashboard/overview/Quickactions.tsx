import { FileEdit, TrendingUp, ArrowUpRight, Ticket, ArrowRight } from "lucide-react";

/* ------------------------------- Types ------------------------------- */

export interface QuickActionItem {
  id: string;
  title: string;
  subtitle: string;
  target?: string;
}

export interface QuickActionsProps {
  title?: string;
  actions: QuickActionItem[];
}

/* ------------------------------- Icon (DEMO) -------------------------------
   Placeholder icons only — swap ICON_MAP / ICON_BG with your own SVGs
   whenever you're ready. Keyed by action id so it's a one-line change.
   ---------------------------------------------------------------------- */
const ICON_MAP: Record<string, React.ReactNode> = {
  add_money: <FileEdit size={18} className="text-[#2563EB]" />,
  add_ad_account: <TrendingUp size={18} className="text-[#4285F4]" />,
  request_top_up: <ArrowUpRight size={18} className="text-[#16A34A]" />,
  ticket_open: <Ticket size={18} className="text-[#F97316]" />,
};

const ICON_BG: Record<string, string> = {
  add_money: "bg-[#EFF4FF]",
  add_ad_account: "bg-[#EEF3FF]",
  request_top_up: "bg-[#EAFBF0]",
  ticket_open: "bg-[#FFF1E6]",
};

/* ============================================================
   Quick Action Section
   - Outer: bg white, border 1px #EDEDED, radius 12, padding 16
   - Each card: height 67, padding 12/12/12/16 (T/R/B/L), gap 12,
     radius 10, border 1px #EDEDED, bg white
   - Left: icon (demo placeholder, swap with your own SVG)
   - Right: circular arrow button (28px, white, border #F5F5F5, soft shadow)
   No `style` attribute anywhere — Tailwind utility classes only.
   ============================================================ */
export default function QuickActions({
  title = "Quick Action",
  actions,
}: QuickActionsProps) {
  return (
    <section className="flex w-full flex-col gap-4 rounded-xl border border-[#EDEDED] bg-[var(--color-white,#ffffff)] p-4">
      <h2 className="m-0 font-sans text-xl font-medium leading-[120%] text-[var(--color-primary-text-500,#0e2038)]">
        {title}
      </h2>

      <div className="flex flex-col gap-3">
        {actions.map((action) => (
          <a
            key={action.id}
            href={action.target ?? "#"}
            className="flex h-[67px] w-full items-center gap-3 rounded-[10px] border border-[#EDEDED] bg-[var(--color-white,#ffffff)] py-3 pl-4 pr-3 transition-colors hover:bg-[var(--color-surface,#f7f8fa)]"
          >
            {/* Left icon — demo placeholder */}
            <span
              className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
                ICON_BG[action.id] ?? "bg-[var(--color-surface,#f7f8fa)]"
              }`}
            >
              {ICON_MAP[action.id] ?? (
                <span className="h-4 w-4 rounded-sm bg-[var(--color-subtext-400,#999d9b)]" />
              )}
            </span>

            {/* Title + subtitle */}
            <span className="flex min-w-0 flex-1 flex-col">
              <span className="truncate font-sans text-sm font-medium text-[var(--color-primary-text-500,#0e2038)]">
                {action.title}
              </span>
              <span className="truncate font-sans text-xs font-normal text-[var(--color-subtext-500,#7f8482)]">
                {action.subtitle}
              </span>
            </span>

            {/* Right arrow button */}
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[#F5F5F5] bg-[var(--color-white,#ffffff)] shadow-[0px_0px_14px_0px_rgba(0,0,0,0.06)]">
              <ArrowRight size={14} className="text-[var(--color-subtext-500,#7f8482)]" />
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}