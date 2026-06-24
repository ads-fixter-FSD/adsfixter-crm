import type { WalletLine } from "@/features/crm/types/crm";

type WalletStatementProps = {
  rows: WalletLine[];
};

export function WalletStatement({ rows }: WalletStatementProps) {
  return (
    <div className="grid gap-3">
      {rows.map((row) => {
        const amountClassName = row.type === "positive" || row.type === "strong" ? "text-[var(--success)]" : row.type === "negative" ? "text-[var(--error)]" : row.type === "warning" ? "text-[var(--warning)]" : "";

        return (
        <div className="flex items-center justify-between rounded-xl bg-[var(--surface)] px-3 py-2" key={row.item}>
          <span>{row.item}</span>
          <strong className={amountClassName}>{row.amount}</strong>
        </div>
        );
      })}
    </div>
  );
}
