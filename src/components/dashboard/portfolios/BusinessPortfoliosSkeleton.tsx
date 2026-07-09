function Bone({ className = "" }: { className?: string }) {
  return (
    <div
      className={`animate-pulse rounded-md bg-[var(--color-line)] ${className}`}
    />
  );
}

function SkeletonTabCard() {
  return (
    <div className="flex flex-1 items-center justify-between rounded-[var(--btn-radius)] border border-[var(--color-line)] px-4 py-3.5">
      <div className="flex items-center gap-2.5">
        <Bone className="h-5 w-5 rounded-full" />
        <Bone className="h-4 w-16" />
      </div>
      <div className="flex items-center gap-3">
        <Bone className="h-3 w-16" />
        <Bone className="h-4 w-4 rounded-full" />
      </div>
    </div>
  );
}

function SkeletonBMRow() {
  return (
    <div className="rounded-[var(--btn-radius)] border border-[var(--color-line)] px-4 py-3.5">
      <div className="flex items-center gap-3">
        <Bone className="h-4 w-4" />
        <Bone className="h-8 w-8 rounded-full shrink-0" />
        <div className="flex-1 flex flex-col gap-1.5">
          <Bone className="h-3.5 w-40" />
          <Bone className="h-3 w-28" />
        </div>
        <Bone className="h-6 w-24 rounded-full" />
        <Bone className="h-8 w-8 rounded-md" />
        <Bone className="h-8 w-8 rounded-md" />
      </div>
    </div>
  );
}

export default function BusinessPortfoliosSkeleton() {
  return (
    <div className="rounded-xl border border-[var(--color-line)] bg-white p-6">
      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="flex flex-col gap-2">
          <Bone className="h-5 w-44" />
          <Bone className="h-3.5 w-72" />
        </div>
        <Bone className="h-10 w-48 rounded-[var(--btn-radius)]" />
      </div>

      {/* Platform tabs */}
      <div className="mt-5 flex flex-col gap-3 sm:flex-row">
        <SkeletonTabCard />
        <SkeletonTabCard />
        <SkeletonTabCard />
      </div>

      {/* Panel */}
      <div className="mt-5 rounded-xl border border-[var(--color-line)]">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--color-line)] px-4 py-3.5">
          <div className="flex items-center gap-2">
            <Bone className="h-4 w-4 rounded-full" />
            <Bone className="h-4 w-44" />
          </div>
          <Bone className="h-9 w-full sm:w-64 rounded-[var(--btn-radius)]" />
        </div>

        <div className="flex flex-col gap-3 p-4">
          <SkeletonBMRow />
          <SkeletonBMRow />
          <SkeletonBMRow />
          <SkeletonBMRow />
        </div>
      </div>
    </div>
  );
}
