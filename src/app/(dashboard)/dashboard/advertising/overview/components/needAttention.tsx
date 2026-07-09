import { Copy } from "lucide-react";
import type { AttentionRow } from "../overview-data";

const PLATFORM_ICON: Record<AttentionRow["platform"], React.ReactNode> = {
  meta: (
    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="#1877F2">
      <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5 3.66 9.15 8.44 9.94v-7.03H7.9v-2.91h2.54V9.85c0-2.51 1.49-3.9 3.77-3.9 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56v1.89h2.78l-.44 2.91h-2.34V22c4.78-.79 8.44-4.94 8.44-9.94z" />
    </svg>
  ),
  google: (
    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.99.66-2.26 1.06-3.71 1.06-2.86 0-5.28-1.93-6.15-4.53H2.18v2.85A10.99 10.99 0 0 0 12 23z" />
      <path fill="#FBBC05" d="M5.85 13.1a6.6 6.6 0 0 1 0-4.2V6.05H2.18a11 11 0 0 0 0 9.9l3.67-2.85z" />
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 6.9l3.67 2.85C6.72 7.31 9.14 5.38 12 5.38z" />
    </svg>
  ),
  tiktok: (
    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="#000000">
      <path d="M16.6 5.82c-.9-.98-1.4-2.26-1.4-3.6h-3.02v13.2c0 1.5-1.22 2.72-2.72 2.72a2.72 2.72 0 0 1 0-5.44c.28 0 .55.04.8.12V9.7a5.74 5.74 0 0 0-.8-.06A5.75 5.75 0 1 0 15.2 15.4V9.28a8.62 8.62 0 0 0 5 1.6V7.85a5.6 5.6 0 0 1-3.6-2.03z" />
    </svg>
  ),
};

const TICKET_STYLES: Record<AttentionRow["ticketTone"], string> = {
  neutral: "text-[var(--color-subtext-500,#7f8482)]",
  progress: "text-[#D97706]",
  working: "text-[#2563EB] underline",
  waiting: "text-[#D97706]",
  error: "text-[#DC2626]",
};

type NeedAttentionProps = {
  rows: AttentionRow[];
};

export default function NeedAttention({ rows }: NeedAttentionProps) {
  return (
    <section className="flex w-full flex-col gap-4 rounded-xl border border-[#EDEDED] bg-white p-4">
      <div className="flex items-center justify-between gap-3">
        <h2 className="m-0 font-sans text-lg font-medium text-[var(--color-primary-text-500,#0e2038)]">
          Needs Attention
        </h2>
        <span className="rounded-full bg-[#FEE2E2] px-3 py-1 text-xs font-medium text-[#DC2626]">
          {rows.length} Issues
        </span>
      </div>

      {rows.length === 0 ? (
        <p className="m-0 py-8 text-center text-sm text-[var(--color-subtext-500,#7f8482)]">
          No issues found for the selected date range.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[960px] border-collapse text-left">
            <thead>
              <tr className="border-b border-[#F0F0F0] text-xs font-medium uppercase tracking-wide text-[var(--color-subtext-500,#7f8482)]">
                <th className="px-3 py-3 font-medium">ID</th>
                <th className="px-3 py-3 font-medium">Account Details</th>
                <th className="px-3 py-3 font-medium">Meta Status</th>
                <th className="px-3 py-3 font-medium">Summary</th>
                <th className="px-3 py-3 font-medium">Update</th>
                <th className="px-3 py-3 font-medium">Ticket Status</th>
                <th className="px-3 py-3 font-medium">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F0F0F0]">
              {rows.map((row, index) => (
                <tr key={`${row.id}-${index}`} className="text-sm">
                  <td className="px-3 py-4 font-medium text-[var(--color-primary-text-500,#0e2038)]">
                    {row.id}
                  </td>
                  <td className="px-3 py-4">
                    <div className="flex items-center gap-2">
                      <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#F6F6F6]">
                        {PLATFORM_ICON[row.platform]}
                      </div>
                      <div className="flex flex-col gap-0.5">
                        <span className="font-medium text-[var(--color-primary-text-500,#0e2038)]">
                          {row.accountName}
                        </span>
                        <span className="flex items-center gap-1 text-xs text-[var(--color-subtext-500,#7f8482)]">
                          {row.accountId}
                          <Copy size={12} className="cursor-pointer" />
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="px-3 py-4 text-[var(--color-primary-text-500,#0e2038)]">{row.metaStatus}</td>
                  <td className="max-w-[220px] px-3 py-4 text-[var(--color-subtext-500,#7f8482)]">{row.summary}</td>
                  <td className="px-3 py-4 text-[var(--color-subtext-500,#7f8482)]">{row.updatedAgo}</td>
                  <td className={`px-3 py-4 text-sm font-medium ${TICKET_STYLES[row.ticketTone]}`}>
                    {row.ticketStatus}
                  </td>
                  <td className="px-3 py-4">
                    <button
                      type="button"
                      className="rounded-lg border border-[var(--color-line,#eceff3)] bg-white px-3 py-1.5 text-xs font-medium text-[var(--color-primary-text-500,#0e2038)] hover:bg-[#FAFAFA]"
                    >
                      {row.actionLabel}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
