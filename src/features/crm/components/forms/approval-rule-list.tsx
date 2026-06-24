export function ApprovalRuleList() {
  return (
    <div className="grid gap-3">
      <p className="m-0 text-[var(--brand-navy)]">Verify payment screenshot and transaction ID before top-up approval.</p>
      <p className="m-0 text-[var(--brand-navy)]">Customer wallet updates use BDT deposit divided by current dollar rate.</p>
      <p className="m-0 text-[var(--brand-navy)]">Approval and rejection actions require notes for audit history.</p>
      <p className="m-0 text-[var(--brand-navy)]">Super Admin 2FA is mandatory before sensitive setting changes.</p>
    </div>
  );
}
