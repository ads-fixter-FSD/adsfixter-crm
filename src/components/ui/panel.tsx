import type { ReactNode } from "react";
import { PrimaryButton } from "@/components/shared-buttons";

type PanelProps = {
  title: string;
  children: ReactNode;
  action?: string;
  onAction?: () => void;
  className?: string;
};

export function Panel({ title, children, action, onAction, className = "" }: PanelProps) {
  return (
    <section className={`overflow-visible rounded-xl border border-[var(--line)] bg-[var(--white)] p-3 ${className}`}>
      <div className="-mx-3 -mt-3 mb-3 flex items-center justify-between border-b border-[var(--line)] px-3 py-2">
        <h2 className="text-sm font-semibold text-[var(--brand-navy)]">{title}</h2>
        {action ? (
          <PrimaryButton className="px-3" onClick={onAction} type="button">
            {action}
          </PrimaryButton>
        ) : null}
      </div>
      {children}
    </section>
  );
}
