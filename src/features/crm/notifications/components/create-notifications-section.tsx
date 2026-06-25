"use client";

import { Eye, History, Send, Trash2 } from "lucide-react";
import { useMemo, useState } from "react";
import { PrimaryButton, SecondaryButton } from "@/components/shared-buttons";
import type { ToastType } from "@/features/crm/types/crm";

type CreateNotificationsSectionProps = {
  showToast: (type: ToastType, message: string) => void;
};

type SentNotification = {
  id: number;
  title: string;
  description: string;
  contentDescription: string;
  sentAt: string;
};

export function CreateNotificationsSection({ showToast }: CreateNotificationsSectionProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [contentDescription, setContentDescription] = useState("");
  const [history, setHistory] = useState<SentNotification[]>([]);

  const hasPreviewContent = useMemo(() => {
    return title.trim() || description.trim() || contentDescription.trim();
  }, [contentDescription, description, title]);

  const sendNotificationToAll = () => {
    if (!hasPreviewContent) {
      showToast("warning", "Write notification content first");
      return;
    }

    setHistory((current) => [
      {
        id: Date.now(),
        title: title || "Untitled notification",
        description: description || "-",
        contentDescription: contentDescription || "-",
        sentAt: "Just now",
      },
      ...current,
    ]);
    setTitle("");
    setDescription("");
    setContentDescription("");
    showToast("success", "Notification sent to all clients");
  };

  return (
    <section className="grid gap-4">
      <div>
        <h2 className="m-0 text-xl font-semibold text-[var(--brand-navy)]">Notification Management</h2>
        <p className="mt-1 text-sm text-[var(--muted)]">Create and preview notifications for client dashboards</p>
      </div>

      <div className="grid grid-cols-2 gap-4 max-[1180px]:grid-cols-1">
        <section className="rounded-xl border border-[var(--line)] bg-[var(--white)] p-4">
          <div className="mb-4 flex items-center gap-2 text-sm font-semibold text-[var(--brand-navy)]">
            <Send aria-hidden="true" size={16} strokeWidth={1.9} />
            Create Notification
          </div>

          <div className="grid gap-3">
            <label className="grid gap-1.5 text-xs font-semibold text-[var(--brand-navy)]">
              Title
              <input className="min-h-10 rounded-lg border border-[var(--line)] bg-[var(--white)] px-3 text-sm font-normal text-[var(--brand-navy)] outline-none focus:border-[var(--brand-navy)]" onChange={(event) => setTitle(event.target.value)} placeholder="Enter notification title..." type="text" value={title} />
            </label>

            <label className="grid gap-1.5 text-xs font-semibold text-[var(--brand-navy)]">
              Description (English)
              <textarea className="min-h-24 resize-none rounded-lg border border-[var(--line)] bg-[var(--white)] px-3 py-2 text-sm font-normal text-[var(--brand-navy)] outline-none focus:border-[var(--brand-navy)]" onChange={(event) => setDescription(event.target.value)} placeholder="Enter the main notification message in English..." value={description} />
            </label>

            <label className="grid gap-1.5 text-xs font-semibold text-[var(--brand-navy)]">
              Content Description
              <textarea className="min-h-28 resize-none rounded-lg border border-[var(--line)] bg-[var(--white)] px-3 py-2 text-sm font-normal text-[var(--brand-navy)] outline-none focus:border-[var(--brand-navy)]" onChange={(event) => setContentDescription(event.target.value)} placeholder="Details here..." value={contentDescription} />
            </label>

            <div className="mt-1 flex flex-wrap items-center justify-between gap-3">
              <SecondaryButton type="button">
                <Eye aria-hidden="true" size={15} strokeWidth={1.9} />
                Preview
              </SecondaryButton>
              <PrimaryButton className="min-w-64 max-[720px]:min-w-0 max-[720px]:flex-1" onClick={sendNotificationToAll} type="button">
                <Send aria-hidden="true" size={15} strokeWidth={1.9} />
                Send to All
              </PrimaryButton>
            </div>
          </div>
        </section>

        <section className="rounded-xl border border-[var(--line)] bg-[var(--white)] p-4">
          <div className="mb-4 flex items-center gap-2 text-sm font-semibold text-[var(--brand-navy)]">
            <Eye aria-hidden="true" size={16} strokeWidth={1.9} />
            Live Preview
          </div>

          <div className="grid min-h-[330px] place-items-center rounded-xl bg-[var(--surface)] p-6 text-center">
            {hasPreviewContent ? (
              <article className="w-full max-w-md rounded-xl border border-[var(--line)] bg-[var(--white)] p-4 text-left shadow-sm">
                <h3 className="m-0 text-base font-semibold text-[var(--brand-navy)]">{title || "Untitled notification"}</h3>
                <p className="mt-2 text-sm text-[var(--brand-navy)]">{description || "No description yet."}</p>
                <p className="mt-3 rounded-lg bg-[var(--surface)] p-3 text-sm text-[var(--muted)]">{contentDescription || "No content details yet."}</p>
              </article>
            ) : (
              <div className="grid justify-items-center gap-3 text-sm text-[var(--muted)]">
                <Send aria-hidden="true" className="text-slate-300" size={36} strokeWidth={1.4} />
                <p>Fill in the form to see live preview</p>
              </div>
            )}
          </div>
        </section>
      </div>

      <section className="rounded-xl border border-[var(--line)] bg-[var(--white)] p-4">
        <div className="mb-4 flex items-center gap-2 text-sm font-semibold text-[var(--brand-navy)]">
          <History aria-hidden="true" size={16} strokeWidth={1.9} />
          Notification History
        </div>

        {history.length === 0 ? (
          <div className="grid min-h-40 place-items-center text-center text-sm text-[var(--muted)]">
            <div className="grid justify-items-center gap-2">
              <History aria-hidden="true" className="text-slate-300" size={34} strokeWidth={1.5} />
              <p>No notifications sent yet</p>
            </div>
          </div>
        ) : (
          <div className="grid gap-2">
            {history.map((notification) => (
              <article className="flex flex-wrap items-start justify-between gap-3 rounded-xl border border-[var(--line)] bg-[var(--surface)] p-3" key={notification.id}>
                <div className="min-w-0">
                  <h3 className="m-0 text-sm font-semibold text-[var(--brand-navy)]">{notification.title}</h3>
                  <p className="mt-1 text-sm text-[var(--muted)]">{notification.description}</p>
                  <p className="mt-1 text-xs text-[var(--muted)]">{notification.sentAt}</p>
                </div>
                <SecondaryButton className="min-h-0 p-2" onClick={() => setHistory((current) => current.filter((item) => item.id !== notification.id))} type="button">
                  <Trash2 aria-hidden="true" size={15} strokeWidth={1.9} />
                </SecondaryButton>
              </article>
            ))}
          </div>
        )}
      </section>
    </section>
  );
}
