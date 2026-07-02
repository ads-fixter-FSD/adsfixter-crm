import Image from "next/image";

export default function DashboardPreview() {
  return (
    <div
      aria-hidden="true"
      className="relative hidden select-none overflow-hidden rounded-2xl bg-neutral-50 lg:block lg:w-[420px]"
    >
      <Image
        src="/images/auth/dashboard.png"
        alt=""
        width={420}
        height={520}
        className="h-full w-full object-contain"
        priority
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2"
        style={{
          background:
            "linear-gradient(180deg, rgba(248, 249, 251, 0) 0%, #F8F9FB 100%)",
        }}
      />
    </div>
  );
}
