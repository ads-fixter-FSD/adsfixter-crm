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
    <section className={`overflow-visible rounded-xl border-2 border-[var(--line)] bg-[var(--white)] p-5 ${className}`}>
      <div className="-mx-5 -mt-5 mb-5 flex items-center justify-between border-b border-[var(--line)] px-5 py-3">
        <h2 className="text-sm font-semibold text-[var(--brand-navy)]">{title}</h2>
        {action ? (
          <PrimaryButton className="px-3 font-light" onClick={onAction} type="button">
            {action}
          </PrimaryButton>
        ) : null}
      </div>
      {children}
    </section>
  );
}
