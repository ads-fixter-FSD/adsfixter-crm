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
    <div className="fixed left-1/2 top-5 z-30 grid w-[min(420px,calc(100vw-2rem))] -translate-x-1/2 gap-2">
      {toasts.map((toast) => {
        const toastClassName =
          toast.type === "success"
            ? "border-green-300 bg-green-50 text-green-800 before:bg-green-500"
            : toast.type === "error"
              ? "border-red-300 bg-red-50 text-red-800 before:bg-red-500"
              : "border-amber-300 bg-amber-50 text-amber-800 before:bg-amber-500";

        return (
          <div
            className={`grid grid-cols-[auto_1fr_auto] gap-x-3 gap-y-1 rounded-2xl border p-3 shadow-xl before:mt-1.5 before:h-2.5 before:w-2.5 before:rounded-full before:content-[''] ${toastClassName}`}
            key={toast.id}
          >
            <strong className="text-sm font-bold capitalize">{toast.type}</strong>
            <span className="col-start-2 text-sm">{toast.message}</span>
            <button aria-label="Close toast" className="col-start-3 row-span-2 inline-flex h-6 w-6 items-center justify-center rounded-full border-0 bg-transparent p-0 opacity-75 hover:bg-black/5 hover:opacity-100" onClick={() => onDismiss(toast.id)} type="button">
              <X aria-hidden="true" size={14} strokeWidth={2} />
            </button>
          </div>
        );
      })}
    </div>
  );
}
