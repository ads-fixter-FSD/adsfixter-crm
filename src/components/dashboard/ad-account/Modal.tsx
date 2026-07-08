"use client";

import { useEffect, type ReactNode } from "react";

interface ModalProps {
  onClose: () => void;
  children: ReactNode;
  widthClassName?: string;
}

export default function Modal({
  onClose,
  children,
  widthClassName = "max-w-lg",
}: ModalProps) {
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[var(--color-modal-backdrop)] p-4"
      onClick={onClose}
    >
      <div
        className={`w-full ${widthClassName} max-h-[90vh] overflow-y-auto rounded-xl bg-[var(--color-white)] p-6 shadow-xl`}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}
