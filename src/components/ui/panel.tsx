import type { ReactNode } from "react";

type PanelProps = {
  title: string;
  children: ReactNode;
  action?: string;
  onAction?: () => void;
  className?: string;
};

export function Panel({ title, children, action, onAction, className = "" }: PanelProps) {
  return (
    <section className={`overflow-hidden rounded-xl border border-[var(--line)] bg-[var(--white)] p-3 ${className}`}>
      <div className="-mx-3 -mt-3 mb-3 flex items-center justify-between border-b border-[var(--line)] px-3 py-2">
        <h2 className="text-sm font-semibold text-[var(--brand-navy)]">{title}</h2>
        {action ? (
          <button className="rounded-lg border-0 bg-[var(--brand-orange)] px-3 py-2 text-sm font-semibold leading-tight text-[var(--white)] transition hover:bg-[var(--black)]" onClick={onAction} type="button">
            {action}
          </button>
        ) : null}
      </div>
      {children}
    </section>
  );
}
