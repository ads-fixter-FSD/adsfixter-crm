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
    <section className={`panel ${className}`}>
      <div className="panel-title">
        <h2>{title}</h2>
        {action ? (
          <button onClick={onAction} type="button">
            {action}
          </button>
        ) : null}
      </div>
      {children}
    </section>
  );
}
