import { Plus } from "lucide-react";

type AddAnotherBusinessAccountButtonProps = {
  onClick: () => void;
};

export function AddAnotherBusinessAccountButton({ onClick }: AddAnotherBusinessAccountButtonProps) {
  return (
    <button
      className="inline-flex min-h-10 items-center gap-2 rounded-lg border border-[var(--line)] bg-[var(--white)] px-4 text-sm font-medium text-[var(--brand-navy)] transition hover:bg-[var(--surface)]"
      onClick={onClick}
      type="button"
    >
      <Plus aria-hidden="true" size={16} strokeWidth={1.8} />
      Add Multiple business account
    </button>
  );
}
