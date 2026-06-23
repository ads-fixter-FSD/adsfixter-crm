import type { ToastType } from "@/features/crm/types/crm";
import { X } from "lucide-react";

export type Toast = {
  id: number;
  type: ToastType;
  message: string;
};

type ToastStackProps = {
  toasts: Toast[];
  onDismiss: (id: number) => void;
};

export function ToastStack({ toasts, onDismiss }: ToastStackProps) {
  return (
    <div className="toast-stack">
      {toasts.map((toast) => (
        <div className={`toast ${toast.type}`} key={toast.id}>
          <strong>{toast.type}</strong>
          <span>{toast.message}</span>
          <button aria-label="Close toast" className="toast-close" onClick={() => onDismiss(toast.id)} type="button">
            <X aria-hidden="true" size={14} strokeWidth={2} />
          </button>
        </div>
      ))}
    </div>
  );
}
