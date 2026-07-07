import { ChevronLeft, Plus } from "lucide-react";
import { SecondaryButton } from "@/components/shared-buttons";
import { FlatButton } from "@/components/shared-buttons/flat-button";

type AdAccountRequestHeaderProps = {
  onAddAnother: () => void;
  onBack: () => void;
};

export function AdAccountRequestHeader({ onAddAnother, onBack }: AdAccountRequestHeaderProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <button
        className="body-l-regular inline-flex items-center gap-1 border-0 bg-transparent p-0 primary-text hover:text-[var(--color-adsfixter-primary)]"
        onClick={onBack}
        type="button"
      >
        <ChevronLeft aria-hidden="true" size={18} strokeWidth={1.8} />
        Request Ad Account
      </button>

      <FlatButton className="min-h-10 gap-2 px-4" onClick={onAddAnother} type="button">
        <Plus aria-hidden="true" size={16} strokeWidth={1.8} />
        Request Another Ad Account
      </FlatButton>
    </div>
  );
}
