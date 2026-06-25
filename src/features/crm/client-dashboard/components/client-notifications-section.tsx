import { Bell } from "lucide-react";

const clientNotifications: Array<{
  id: string;
  title: string;
  message: string;
  createdAt: string;
}> = [];

export function ClientNotificationsSection() {
  return (
    <section className="grid gap-5">
      <div>
        <h2 className="m-0 text-xl font-semibold text-[var(--brand-navy)]">Notifications</h2>
        <p className="mt-1 text-sm text-[var(--muted)]">View all notifications and announcements</p>
      </div>

      <section className="rounded-xl border border-[var(--line)] bg-[var(--white)] p-4">
        <div className="mb-4 flex items-center gap-2 text-sm font-semibold text-[var(--brand-navy)]">
          <Bell aria-hidden="true" size={16} strokeWidth={1.9} />
          Notification History
        </div>

        {clientNotifications.length === 0 ? (
          <div className="grid min-h-40 place-items-center text-center text-sm text-[var(--muted)]">
            <div className="grid justify-items-center gap-2">
              <Bell aria-hidden="true" className="text-slate-300" size={34} strokeWidth={1.5} />
              <p>No notifications yet</p>
            </div>
          </div>
        ) : (
          <div className="grid gap-2">
            {clientNotifications.map((notification) => (
              <article className="rounded-xl border border-[var(--line)] bg-[var(--surface)] p-3" key={notification.id}>
                <h3 className="m-0 text-sm font-semibold text-[var(--brand-navy)]">{notification.title}</h3>
                <p className="mt-1 text-sm text-[var(--muted)]">{notification.message}</p>
                <span className="mt-2 block text-xs text-[var(--muted)]">{notification.createdAt}</span>
              </article>
            ))}
          </div>
        )}
      </section>
    </section>
  );
}
