import type { ActivityItem } from "../overview-data";

const STATUS_STYLES: Record<ActivityItem["status"], string> = {
  Pending: "bg-[#FEF3E2] text-[#D97706]",
  Approved: "bg-[#E9F9EF] text-[#16A34A]",
  Rejected: "bg-[#FEE2E2] text-[#DC2626]",
};

type RecentActivityProps = {
  activities: ActivityItem[];
};

export default function RecentActivity({ activities }: RecentActivityProps) {
  return (
    <section className="flex w-full flex-col gap-4 rounded-xl border border-[#EDEDED] bg-white p-4">
      <div className="flex items-center justify-between gap-3">
        <h2 className="m-0 font-sans text-lg font-medium text-[var(--color-primary-text-500,#0e2038)]">
          Recent Activity
        </h2>
        <button
          type="button"
          className="rounded-lg border border-[var(--color-line,#eceff3)] bg-white px-4 py-2 text-sm font-medium text-[var(--color-subtext-500,#7f8482)] hover:bg-[#FAFAFA]"
        >
          View All
        </button>
      </div>

      {activities.length === 0 ? (
        <p className="m-0 py-8 text-center text-sm text-[var(--color-subtext-500,#7f8482)]">
          No activity found for the selected date range.
        </p>
      ) : (
        <div className="flex flex-col divide-y divide-[#F0F0F0]">
          {activities.map((activity) => (
            <div
              key={activity.id}
              className="flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="flex flex-col gap-1">
                <span className="font-sans text-sm font-medium text-[var(--color-primary-text-500,#0e2038)]">
                  {activity.title}
                </span>
                <span className="font-sans text-xs text-[var(--color-subtext-500,#7f8482)]">
                  {activity.description}
                </span>
              </div>

              <div className="flex items-center gap-4">
                <span className="text-xs text-[var(--color-subtext-500,#7f8482)]">{activity.timeAgo}</span>
                <span
                  className={`rounded-md px-2.5 py-1 text-xs font-medium ${STATUS_STYLES[activity.status]}`}
                >
                  {activity.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
