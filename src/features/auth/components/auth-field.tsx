type AuthFieldProps = {
  label: string;
  placeholder: string;
  type?: string;
  defaultValue?: string;
};

export function AuthField({ label, placeholder, type = "text", defaultValue }: AuthFieldProps) {
  return (
    <label className="grid gap-2">
      <span className="text-sm font-semibold text-[var(--brand-navy)]">{label}</span>
      <input className="min-h-9 w-full rounded-lg border border-[var(--line)] bg-[var(--white)] px-3 py-2 text-sm text-[var(--brand-navy)] outline-none focus:border-[var(--brand-navy)]" defaultValue={defaultValue} placeholder={placeholder} type={type} />
    </label>
  );
}
