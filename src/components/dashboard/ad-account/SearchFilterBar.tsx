"use client";

import { useEffect, useRef, useState } from "react";

interface SearchFilterBarProps {
  value: string;
  onChange: (value: string) => void;

  platformOptions: string[];
  selectedPlatforms: string[];
  onPlatformsChange: (platforms: string[]) => void;

  statusOptions: string[];
  selectedStatuses: string[];
  onStatusesChange: (statuses: string[]) => void;
}

function toggleValue(list: string[], value: string) {
  return list.includes(value)
    ? list.filter((v) => v !== value)
    : [...list, value];
}

// Display labels for raw platform values coming from data (meta/google/tiktok).
function platformLabel(platform: string) {
  switch (platform) {
    case "meta":
      return "Meta";
    case "google":
      return "Google";
    case "tiktok":
      return "TikTok";
    default:
      return platform;
  }
}

export default function SearchFilterBar({
  value,
  onChange,
  platformOptions,
  selectedPlatforms,
  onPlatformsChange,
  statusOptions,
  selectedStatuses,
  onStatusesChange,
}: SearchFilterBarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const activeCount = selectedPlatforms.length + selectedStatuses.length;

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
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-2 rounded-[var(--btn-radius)] border border-[var(--color-line)] bg-white px-3 py-2.5">
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          className="text-[var(--color-subtext-500)]"
        >
          <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
          <path
            d="M21 21L16.65 16.65"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Search..."
          className="w-40 body-sm-regular text-[var(--color-primary-text-500)] outline-none placeholder:text-[var(--color-subtext-400)]"
        />
      </div>

      <div className="relative" ref={containerRef}>
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          className="flex items-center gap-2 rounded-[var(--btn-radius)] border border-[var(--color-line)] bg-white px-3.5 py-2.5 body-sm-medium text-[var(--color-primary-text-400)] hover:bg-[var(--color-surface)]"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path
              d="M4 6H20M7 12H17M10 18H14"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
          Filter
          {activeCount > 0 && (
            <span
              className="flex items-center justify-center rounded-full body-sm-s text-[var(--color-on-primary)]"
              style={{
                minWidth: 18,
                height: 18,
                padding: "0 5px",
                background: "var(--color-primary)",
              }}
            >
              {activeCount}
            </span>
          )}
        </button>

        {isOpen && (
          <div
            className="absolute right-0 z-20 mt-2 w-64 rounded-[var(--btn-radius)] border border-[var(--color-line)] bg-white p-4 shadow-lg"
            style={{ boxShadow: "0px 8px 24px 0px rgba(0,0,0,0.08)" }}
          >
            <div className="flex items-center justify-between">
              <span className="body-sm-medium text-[var(--color-primary-text-500)]">
                Filters
              </span>
              {activeCount > 0 && (
                <button
                  type="button"
                  onClick={() => {
                    onPlatformsChange([]);
                    onStatusesChange([]);
                  }}
                  className="body-xsm-medium text-[var(--color-primary)] hover:underline"
                >
                  Clear all
                </button>
              )}
            </div>

            <div className="mt-3">
              <p className="body-xsm-medium mb-2 text-[var(--color-subtext-500)]">
                Platform
              </p>
              <div className="flex flex-col gap-2">
                {platformOptions.map((platform) => (
                  <label
                    key={platform}
                    className="flex items-center gap-2 body-sm-regular text-[var(--color-primary-text-500)]"
                  >
                    <input
                      type="checkbox"
                      checked={selectedPlatforms.includes(platform)}
                      onChange={() =>
                        onPlatformsChange(
                          toggleValue(selectedPlatforms, platform),
                        )
                      }
                      className="h-4 w-4 rounded border-[var(--color-line)] accent-[var(--color-primary)]"
                    />
                    {platformLabel(platform)}
                  </label>
                ))}
              </div>
            </div>

            <div className="mt-4 border-t border-[var(--color-line)] pt-3">
              <p className="body-xsm-medium mb-2 text-[var(--color-subtext-500)]">
                Agency Status
              </p>
              <div className="flex max-h-40 flex-col gap-2 overflow-y-auto">
                {statusOptions.map((status) => (
                  <label
                    key={status}
                    className="flex items-center gap-2 body-sm-regular text-[var(--color-primary-text-500)]"
                  >
                    <input
                      type="checkbox"
                      checked={selectedStatuses.includes(status)}
                      onChange={() =>
                        onStatusesChange(toggleValue(selectedStatuses, status))
                      }
                      className="h-4 w-4 rounded border-[var(--color-line)] accent-[var(--color-primary)]"
                    />
                    {status}
                  </label>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
