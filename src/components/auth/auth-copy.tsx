type AuthCopyProps = {
  eyebrow: string;
  title: string;
  description: string;
};

export function AuthCopy({ eyebrow, title, description }: AuthCopyProps) {
  return (
    <div className="grid gap-1">
      <p className="mb-1 text-xs font-bold uppercase tracking-widest text-[var(--brand-orange)]">{eyebrow}</p>
      <h1 className="m-0 text-[clamp(1rem,2vw,1.1rem)] font-semibold leading-tight tracking-[-0.01em] text-[var(--brand-navy)]">{title}</h1>
      <span className="text-sm text-[var(--muted)]">{description}</span>
    </div>
  );
}
