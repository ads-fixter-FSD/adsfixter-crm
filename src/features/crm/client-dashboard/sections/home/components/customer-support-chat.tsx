"use client";

import { Headset, MessageCircle, Send, X } from "lucide-react";
import { useState } from "react";

type CustomerSupportChatProps = {
  isLauncherVisible: boolean;
  onCloseLauncher: () => void;
};

export function CustomerSupportChat({ isLauncherVisible, onCloseLauncher }: CustomerSupportChatProps) {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [message, setMessage] = useState("");

  if (!isLauncherVisible) {
    return null;
  }

  return (
    <div className="fixed bottom-5 left-5 z-50 grid gap-3">
      {isChatOpen ? (
        <section className="grid w-[min(320px,calc(100vw-2.5rem))] overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--white)]">
          <header className="flex items-center justify-between gap-3 border-b border-[var(--line)] bg-[var(--surface)] px-4 py-3">
            <div className="flex items-center gap-2">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[var(--brand-orange-soft)] text-[var(--color-adsfixter-primary)]">
                <Headset aria-hidden="true" size={16} strokeWidth={1.8} />
              </span>
              <div>
                <strong className="body-sm-medium primary-text">Support Chat</strong>
                <p className="body-xsm-regular m-0 subtext">We usually reply in a few minutes</p>
              </div>
            </div>
            <button
              aria-label="Close support chat"
              className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-[var(--line)] text-[var(--muted)] hover:bg-[var(--white)]"
              onClick={() => setIsChatOpen(false)}
              type="button"
            >
              <X aria-hidden="true" size={15} strokeWidth={1.8} />
            </button>
          </header>

          <div className="grid max-h-56 gap-3 overflow-y-auto px-4 py-4">
            <div className="max-w-[85%] rounded-xl rounded-bl-sm bg-[var(--surface)] px-3 py-2">
              <p className="body-sm-regular m-0 primary-text">Hi! How can we help you today?</p>
            </div>
          </div>

          <form
            className="flex items-center gap-2 border-t border-[var(--line)] px-3 py-3"
            onSubmit={(event) => {
              event.preventDefault();
              setMessage("");
            }}
          >
            <input
              className="min-h-9 flex-1 rounded-lg border border-[var(--line)] bg-[var(--field-bg)] px-3 text-sm text-[var(--brand-navy)] outline-none focus:border-[var(--color-adsfixter-primary)]"
              onChange={(event) => setMessage(event.target.value)}
              placeholder="Type your message..."
              value={message}
            />
            <button
              aria-label="Send message"
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--color-adsfixter-primary)] text-[var(--white)]"
              type="submit"
            >
              <Send aria-hidden="true" size={15} strokeWidth={1.8} />
            </button>
          </form>
        </section>
      ) : null}

      <div className="flex items-center gap-2">
        <button
          className="inline-flex min-h-11 items-center gap-2 rounded-full border border-[var(--line)] bg-[var(--white)] px-4 text-[var(--brand-navy)] transition hover:border-[var(--color-adsfixter-primary)]"
          onClick={() => setIsChatOpen((current) => !current)}
          type="button"
        >
          <MessageCircle aria-hidden="true" size={18} strokeWidth={1.8} />
          <span className="body-sm-medium">Chat with support</span>
        </button>
        <button
          aria-label="Hide support button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[var(--line)] bg-[var(--white)] text-[var(--muted)] hover:bg-[var(--surface)]"
          onClick={onCloseLauncher}
          type="button"
        >
          <X aria-hidden="true" size={16} strokeWidth={1.8} />
        </button>
      </div>
    </div>
  );
}
