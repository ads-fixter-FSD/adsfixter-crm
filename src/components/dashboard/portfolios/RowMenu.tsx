"use client";

import { useEffect, useRef, useState } from "react";
import { MoreVertical } from "lucide-react";

interface RowMenuProps {
  items: { label: string; onClick: () => void; danger?: boolean }[];
}

export default function RowMenu({ items }: RowMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={containerRef}>
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen((prev) => !prev);
        }}
        className="flex h-8 w-8 items-center justify-center rounded-md border border-[var(--color-line)] text-[var(--color-subtext-500)] hover:bg-[var(--color-surface)]"
      >
        <MoreVertical size={16} />
      </button>

      {isOpen && (
        <div
          className="absolute right-0 z-20 mt-1 w-44 rounded-[var(--btn-radius)] border border-[var(--color-line)] bg-white py-1 shadow-lg"
          style={{ boxShadow: "0px 8px 24px 0px rgba(0,0,0,0.08)" }}
        >
          {items.map((item) => (
            <button
              key={item.label}
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                item.onClick();
                setIsOpen(false);
              }}
              className={`flex w-full items-center px-3 py-2 text-left body-sm-regular hover:bg-[var(--color-surface)] ${
                item.danger ? "text-red-600" : "primary-text"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
