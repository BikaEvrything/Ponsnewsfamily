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
    <footer className="mx-auto w-full max-w-6xl px-4 pb-12 sm:px-6">
      {/* BOX CA PONSNEWS TERBARU */}
      <div className="mb-8 rounded-[28px] border border-line bg-card p-6 sm:p-8">
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

      {/* FOOTER BAWAAN YANG ADA DI GAMBAR */}
      <div className="rounded-[28px] border border-line bg-card p-6 sm:p-8">
        <div className="flex flex-col gap-6 md:flex-row md:justify-between">
          <div className="max-w-md space-y-3">
            <div className="flex items-center gap-2">
              <img src="/logo-pons.png?v=999" alt="Logo" className="size-5" />
              <span className="font-serif text-lg font-semibold tracking-tight">PONS NEWS</span>
            </div>
            <p className="text-xs text-muted leading-relaxed">
              The PONS NEWS desk covers Pons and only Pons. Protocol notes, market prints, and launchpad status land here when Pons updates. This desk does not custody assets and does not give financial advice.
            </p>
          </div>
          <div className="flex gap-12 text-xs">
            <div>
              <p className="font-mono text-[11px] text-muted uppercase tracking-wider">PONS NEWS</p>
              <ul className="mt-2 space-y-1.5 text-ink-soft">
                <li><a href="https://x.com/ponsnewsfamily" target="_blank" rel="noreferrer" className="hover:underline">@ponsnewsfamily</a></li>
                <li><a href="#" className="hover:underline">Pons source</a></li>
                <li><a href="#" className="hover:underline">Pons docs</a></li>
              </ul>
            </div>
            <div>
              <p className="font-mono text-[11px] text-muted uppercase tracking-wider">RISK NOTICE</p>
              <p className="mt-2 max-w-xs text-muted leading-relaxed">
                Tokens can be volatile or lose all value. Prints on this desk follow Pons. They are not a recommendation.
              </p>
            </div>
          </div>
        </div>
        <div className="mt-8 flex items-center justify-between border-t border-line pt-4 text-xs text-muted">
          <p>© 2026 PONS NEWS.</p>
          <a href="https://x.com/ponsnewsfamily" target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:underline">
            @ponsnewsfamily <span>𝕏</span>
          </a>
        </div>
      </div>
    </footer>
  );
}