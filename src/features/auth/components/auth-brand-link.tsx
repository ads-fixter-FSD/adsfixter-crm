import Image from "next/image";
import Link from "next/link";

export function AuthBrandLink() {
  return (
    <div className="-mx-5 -mt-5 border-b border-[var(--line)] px-5 py-4">
      <Link className="inline-flex items-center gap-2 text-[var(--brand-navy)] no-underline" href="/">
        <Image alt="AdsFixter" className="block h-[1.65rem] w-[1.65rem] object-contain" height={28} src="/adsfixter-logo.png" width={28} />
        <span>
          <strong className="block text-base font-semibold">AdsFixter</strong>
          <small className="text-sm text-[var(--muted)]">Meta Wallet CRM</small>
        </span>
      </Link>
    </div>
  );
}
