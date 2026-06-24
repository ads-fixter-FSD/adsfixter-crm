import type { ToastType } from "@/features/crm/types/crm";

export type ToastAction = (type: ToastType, message: string) => void;
