import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { PriceChart } from "@/components/price-chart";

const PONSNEWS_CA = "0x60038e94690cdB1e5b6016c55ddC151e41Ac4836";

export function SiteFooter() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(PONSNEWS_CA);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <footer className="mx-auto mt-16 w-full max-w-6xl px-4 pb-10 sm:px-6" aria-label="Site footer">
      {/* BOX CONTRACT ADDRESS & LIVE CHART */}
      <div className="mb-6 rounded-[28px] border border-line bg-card p-6 sm:p-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-3 lg:max-w-md">
            <span className="inline-block rounded-full bg-live/10 px-3 py-1 text-[11px] font-medium text-live tracking-wider uppercase">
              Official Contract Address
            </span>
            <h3 className="font-serif text-2xl tracking-tight text-ink">
              PONSNEWS Token CA
            </h3>
            <p className="text-xs text-muted leading-relaxed">
              Official smart contract deployed for PONSNEWS on Robinhood Chain.
            </p>

            <div className="flex items-center gap-2 rounded-2xl border border-line bg-paper p-2.5">
              <span className="truncate font-mono text-xs text-ink select-all">
                {PONSNEWS_CA}
              </span>
              <button
                type="button"
                onClick={handleCopy}
                className="inline-flex shrink-0 items-center gap-1.5 rounded-xl bg-ink px-3 py-1.5 text-xs font-medium text-paper hover:opacity-90 transition-all cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="size-3.5 text-live" />
                    <span>Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="size-3.5" />
                    <span>Copy CA</span>
                  </>
                )}
              </button>
            </div>
          </div>

          <div className="w-full lg:max-w-md">
            <div className="mb-2 flex items-center justify-between text-xs">
              <span className="font-mono text-muted">$PONSNEWS Live Chart</span>
              <span className="font-mono text-live font-medium">+24.8%</span>
            </div>
            <PriceChart
              values={[100, 115, 110, 130, 125, 145, 140, 168]}
              up={true}
              height={110}
              label="PONSNEWS Contract Chart"
            />
          </div>
        </div>
      </div>

      {/* FOOTER UTAMA */}
      <div className="rounded-[28px] border border-line bg-card px-6 py-8 sm:px-8">
        <div className="grid gap-8 sm:grid-cols-4">
          <div className="sm:col-span-2">
            <p className="flex items-center gap-2.5 font-serif text-2xl tracking-tight text-ink">
              <img
                src="/logo-pons.png?v=999"
                alt=""
                width={32}
                height={32}
                className="size-8 rounded-[8px] object-contain"
              />
              PONS NEWS
            </p>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-muted text-pretty">
              The PONS NEWS desk covers Pons and only Pons. Protocol notes, market prints, and
              launchpad status land here when Pons updates. This desk does not custody assets and
              does not give financial advice.
            </p>
          </div>
          <nav aria-label="PONS NEWS">
            <p className="text-[11px] font-medium tracking-[0.14em] text-muted uppercase">
              PONS NEWS
            </p>
            <ul className="mt-3 space-y-2 text-sm text-ink-soft">
              <li>
                <a className="hover:text-ink" href="https://x.com/ponsnewsfamily">
                  @ponsnewsfamily
                </a>
              </li>
              <li>
                <a className="hover:text-ink" href="https://www.ponsfamily.com/launchpad">
                  Pons source
                </a>
              </li>
              <li>
                <a className="hover:text-ink" href="https://docs.ponsfamily.com">
                  Pons docs
                </a>
              </li>
            </ul>
          </nav>
          <div>
            <p className="text-[11px] font-medium tracking-[0.14em] text-muted uppercase">
              Risk notice
            </p>
            <p className="mt-3 text-sm leading-relaxed text-muted text-pretty">
              Tokens can be volatile or lose all value. Prints on this desk follow Pons. They are
              not a recommendation.
            </p>
          </div>
        </div>
        <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-5 text-xs text-muted">
          <p>© 2026 PONS NEWS.</p>
          <a
            href="https://x.com/ponsnewsfamily"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-ink-soft hover:text-ink"
            aria-label="PONS NEWS on X"
          >
            @ponsnewsfamily
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
}