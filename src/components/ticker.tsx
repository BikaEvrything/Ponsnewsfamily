import type { Feed } from "@/lib/news";

const CHOICES: Array<{ id: Feed; label: string }> = [
  { id: "pons", label: "Pons" },
  { id: "robinhood", label: "Robinhood" },
  { id: "stocks", label: "Stocks" },
];

type Item = { label: string; meta: string; topic?: Feed };

export function Ticker({
  items,
  feed,
  onFeedChange,
}: {
  items: Item[];
  feed: Feed | null;
  onFeedChange: (next: Feed | null) => void;
}) {
  const source = feed ? items.filter((item) => item.topic === feed) : items;
  const rows = source.length
    ? source
    : [{ label: "PONS NEWS wire", meta: "pick a beat", topic: "pons" as Feed }];
  const loop = [...rows, ...rows];

  return (
    <div className="mx-auto mt-4 w-full max-w-6xl border-y border-line">
      <div className="px-4 pt-3 pb-2 sm:px-6">
        <p className="font-serif text-lg tracking-tight text-ink">PONS NEWS</p>
        <p className="mt-1 text-sm text-ink-soft">
          Meme coin news on Pons, stocks, and Robinhood
        </p>
        <div className="mt-3 grid grid-cols-3 gap-1.5" role="tablist" aria-label="Choose news beat">
          {CHOICES.map((item) => {
            const selected = feed === item.id;
            return (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={selected}
                onClick={() => onFeedChange(selected ? null : item.id)}
                className={
                  selected
                    ? "min-h-12 rounded-full bg-ink px-2 text-sm font-medium text-paper"
                    : "min-h-12 rounded-full border border-line px-2 text-sm font-medium text-ink-soft"
                }
              >
                {item.label}
              </button>
            );
          })}
        </div>
      </div>
      <div className="flex items-center gap-3 overflow-hidden border-t border-line px-4 py-2.5 sm:px-6">
        <span className="shrink-0 text-[10px] font-medium tracking-[0.16em] text-live uppercase">
          {feed ? CHOICES.find((item) => item.id === feed)?.label : "All"}
        </span>
        <div className="relative min-w-0 flex-1 overflow-hidden">
          <div className="ticker-track flex w-max gap-8 whitespace-nowrap text-xs text-ink-soft">
            {loop.map((item, index) => (
              <span key={`${item.label}-${index}`} className="inline-flex items-center gap-2">
                <span>{item.label}</span>
                <span className="font-mono text-[11px] text-muted">{item.meta}</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
