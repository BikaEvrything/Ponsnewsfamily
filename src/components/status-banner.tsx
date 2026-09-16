import { useState } from "react";
import { X } from "lucide-react";

export function StatusBanner({
  title,
  message,
}: {
  title: string | null;
  message: string | null;
}) {
  const [open, setOpen] = useState(true);
  if (!open || !title) return null;

  return (
    <div className="mx-auto mt-4 w-full max-w-6xl px-4 sm:px-6" role="status" aria-live="polite">
      <div className="flex items-start gap-3 rounded-[18px] border border-line bg-paper-2 px-4 py-3">
        <span className="live-dot mt-1.5 size-1.5 shrink-0 rounded-full bg-warn" aria-hidden />
        <p className="min-w-0 flex-1 text-sm leading-relaxed text-ink-soft">
          <span className="font-medium text-ink">PONS NEWS · {title}. </span>
          {message}
        </p>
        <button
          type="button"
          className="inline-flex size-9 shrink-0 items-center justify-center rounded-full text-muted"
          aria-label="Dismiss status notice"
          onClick={() => setOpen(false)}
        >
          <X className="size-3.5" />
        </button>
      </div>
    </div>
  );
}
