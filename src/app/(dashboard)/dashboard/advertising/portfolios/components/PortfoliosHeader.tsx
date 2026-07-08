import { Plus } from "lucide-react";
import { PrimaryButton } from "@/components/shared-buttons";

export default function PortfoliosHeader() {
  return (
    <div className="flex w-full flex-col items-start justify-between gap-4 lg:flex-row lg:items-center">
      <div className="flex flex-col gap-1">
        <h1 className="m-0 font-sans text-2xl font-medium text-[var(--color-primary-text-500,#0e2038)]">
          Business Portfolios
        </h1>
        <p className="m-0 font-sans text-sm text-[var(--color-subtext-500,#7f8482)]">
          Your own Business Manager on each platform, and which assigned ad accounts are shared there.
        </p>
      </div>

      <PrimaryButton type="button" className="min-h-10 gap-2 px-4">
        <Plus size={16} strokeWidth={2.5} />
        Add Business Portfolios
      </PrimaryButton>
    </div>
  );
}
