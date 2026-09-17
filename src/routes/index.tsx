import { Link, createFileRoute } from "@tanstack/react-router";
import { Check, Copy, RefreshCw, Search } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { ArticleCard } from "@/components/article-card";
import { PriceChart } from "@/components/price-chart";
import { StatusBanner } from "@/components/status-banner";
import { Ticker } from "@/components/ticker";
import {
  CATEGORIES,
  DESK_ARTICLES,
  EMPTY_WIRE,
  FALLBACK_STOCKS,
  articleMatchesFeed,
  timeAgo,
  type Article,
  type Feed,
} from "@/lib/news";
import { getPonsWire } from "@/lib/pons-sync";

const PONSNEWS_CA = "0x60038e94690cdB1e5b6016c55ddC151e41Ac4836";

export const Route = createFileRoute("/")({
  loader: () => getPonsWire(),
  component: Home,
});

function ChangeText({ value, abs }: { value: string; abs: number }) {
  return (
    <span
      className={
        abs >= 0 ? "font-mono text-xs tabular-nums text-live" : "font-mono text-xs tabular-nums text-muted"
      }
    >
      {value}
    </span>
  );
}

function PonsCaSection() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(PONSNEWS_CA);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="mx-auto mt-6 w-full max-w-6xl px-4 pb-12 sm:px-6">
      <div className="rounded-[28px] border border-line bg-card p-6 sm:p-8">
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
    </section>
  );
}

function Home() {
  const initial = Route.useLoaderData() ?? EMPTY_WIRE;
  const [wire, setWire] = useState(initial);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<(typeof CATEGORIES)[number]>("All");
  const [feed, setFeed] = useState<Feed | null>(null);
  const [syncing, setSyncing] = useState(false);
  const [mounted, setMounted] = useState(false);

  async function refresh() {
    setSyncing(true);
    try {
      const next = await getPonsWire();
      setWire(next.markets.length ? next : EMPTY_WIRE);
    } finally {
      setSyncing(false);
    }
  }

  useEffect(() => {
    setMounted(true);
    const stored = window.localStorage.getItem("ponsnews-feed");
    if (stored === "pons" || stored === "robinhood" || stored === "stocks") {
      setFeed(stored);
    }
    const tick = () => {
      if (document.visibilityState === "hidden") return;
      void refresh();
    };
    const id = window.setInterval(tick, 15_000);
    window.addEventListener("focus", tick);
    document.addEventListener("visibilitychange", tick);
    tick();
    return () => {
      window.clearInterval(id);
      window.removeEventListener("focus", tick);
      document.removeEventListener("visibilitychange", tick);
    };
  }, []);

  function chooseFeed(next: Feed | null) {
    setFeed(next);
    if (next) window.localStorage.setItem("ponsnews-feed", next);
    else window.localStorage.removeItem("ponsnews-feed");
  }

  const articles: Article[] = useMemo(
    () => [...wire.liveArticles, ...DESK_ARTICLES],
    [wire.liveArticles],
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return articles.filter((article) => {
      const inCat = category === "All" || article.category === category;
      if (!inCat) return false;
      if (feed && !articleMatchesFeed(article, feed)) return false;
      if (!q) return true;
      return (
        article.title.toLowerCase().includes(q) ||
        article.dek.toLowerCase().includes(q) ||
        (article.ticker ?? "").toLowerCase().includes(q)
      );
    });
  }, [articles, query, category, feed]);

  const featured = filtered[0];
  const rest = filtered.slice(1);
  const stockBook = wire.stocks?.length ? wire.stocks : FALLBACK_STOCKS;
  const visibleStocks =
    feed === "robinhood" ? stockBook.filter((row) => row.id === "hood") : stockBook;
  const showStocks = feed !== "pons";
  const showMarket = feed !== "stocks";
  const bookRows =
    feed === "stocks"
      ? stockBook
      : feed === "robinhood"
        ? [...stockBook.filter((row) => row.id === "hood"), ...wire.markets.slice(0, 3)]
        : feed === "pons"
          ? wire.markets
          : [...stockBook.slice(0, 6), ...wire.markets];

  return (
    <main>
      <StatusBanner title={wire.statusTitle} message={wire.statusMessage} />
      <Ticker items={wire.tape} feed={feed} onFeedChange={chooseFeed} />

      <section className="mx-auto w-full max-w-6xl px-4 pt-8 sm:px-6 sm:pt-10">
        <p className="text-[11px] font-medium tracking-[0.16em] text-muted uppercase">
          {feed === "robinhood" ? "Robinhood wire" : feed === "stocks" ? "Stocks wire" : "Pons wire"}
        </p>
        <h1 className="mt-3 max-w-3xl font-serif text-[clamp(2.2rem,6vw,4.4rem)] leading-[0.98] tracking-tight text-balance">
          {feed === "robinhood"
            ? "Robinhood Chain. HOOD on the desk."
            : feed === "stocks"
              ? "Tokenized stocks on the Pons book."
              : "PONS NEWS. Updated when Pons updates."}
        </h1>
        <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted text-pretty">
          {feed === "robinhood"
            ? "Pons launches on Robinhood Chain. This wire keeps HOOD and the chain notes in one place."
            : feed === "stocks"
              ? "Approved V2 pairs: HOOD, NVDA, AAPL, TSLA, and the rest of the list."
              : "Protocol notes from Pons, live prints from the book, and the stock pairs."}
        </p>
        <div className="mt-5 flex flex-wrap items-center gap-3 text-xs text-muted">
          <span className="inline-flex items-center gap-2">
            <span className="live-dot size-1.5 rounded-full bg-live" aria-hidden />
            Live {mounted ? timeAgo(wire.fetchedAt) : "now"} · auto every 15s
          </span>
          <button
            type="button"
            onClick={() => void refresh()}
            className="inline-flex h-10 items-center gap-2 rounded-full border border-line px-3 text-ink-soft cursor-pointer"
          >
            <RefreshCw className={`size-3.5 ${syncing ? "animate-spin" : ""}`} />
            Refresh wire
          </button>
        </div>
      </section>

      <section className="mx-auto mt-8 w-full max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <label className="flex min-h-12 flex-1 items-center gap-2 rounded-full border border-line bg-card px-4">
            <Search className="size-4 text-muted" aria-hidden />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search this wire"
              className="h-12 w-full bg-transparent text-sm text-ink outline-none placeholder:text-muted"
              aria-label="Search this wire"
            />
          </label>
          <div
            className="flex gap-1 overflow-x-auto rounded-full border border-line bg-card p-1"
            role="tablist"
            aria-label="Filter PONS NEWS"
          >
            {CATEGORIES.map((item) => (
              <button
                key={item}
                type="button"
                role="tab"
                aria-selected={category === item}
                onClick={() => setCategory(item)}
                className={
                  category === item
                    ? "rounded-full bg-ink px-3 py-2 text-xs font-medium whitespace-nowrap text-paper cursor-pointer"
                    : "rounded-full px-3 py-2 text-xs font-medium whitespace-nowrap text-ink-soft cursor-pointer"
                }
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto mt-8 grid w-full max-w-6xl gap-6 px-4 sm:px-6 lg:grid-cols-[minmax(0,1.4fr)_minmax(16rem,0.8fr)]">
        <div>
          {featured ? (
            <ArticleCard article={featured} featured />
          ) : (
            <p className="rounded-[24px] border border-line bg-card p-8 text-sm text-muted">
              No files on this wire.
            </p>
          )}
          <div className="mt-2">
            {rest.slice(0, 8).map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
        </div>
        <aside className="space-y-4">
          {bookRows.slice(0, 8).map((row) => (
            <Link
              key={`rail-${row.id}`}
              to="/article/$slug"
              params={{ slug: `live-${row.id}` }}
              className="block rounded-[20px] border border-line bg-card p-4"
            >
              <div className="flex items-baseline justify-between gap-3">
                <span>
                  <span className="block font-mono text-xs text-muted">{row.ticker}</span>
                  <span className="text-sm text-ink">{row.name}</span>
                </span>
                <ChangeText value={row.change} abs={row.changeAbs} />
              </div>
              <div className="mt-3">
                <PriceChart
                  values={row.spark ?? []}
                  up={row.changeAbs >= 0}
                  height={64}
                  label={`${row.ticker} chart`}
                />
              </div>
            </Link>
          ))}
        </aside>
      </section>

      {showStocks ? (
        <section className="mx-auto mt-8 w-full max-w-6xl px-4 sm:px-6">
          <div className="rounded-[28px] border border-line bg-card p-5 sm:p-6">
            <p className="text-[11px] font-medium tracking-[0.14em] text-muted uppercase">
              {feed === "robinhood" ? "Robinhood" : "Pons stocks"}
            </p>
            <h2 className="mt-1 font-serif text-2xl tracking-tight text-ink">
              {feed === "robinhood" ? "HOOD on the wire" : "Tokenized pairs on the book"}
            </h2>
            <div className="mt-5 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {visibleStocks.map((row) => (
                <Link
                  key={`stk-${row.id}`}
                  to="/article/$slug"
                  params={{ slug: `live-${row.id}` }}
                  className="rounded-[16px] border border-line bg-paper p-3"
                >
                  <div className="flex items-baseline justify-between gap-3">
                    <span className="min-w-0">
                      <span className="block font-mono text-xs text-muted">{row.ticker}</span>
                      <span className="text-sm text-ink">{row.name}</span>
                    </span>
                    <span className="shrink-0 text-right">
                      <span className="block font-mono text-sm tabular-nums text-ink">{row.price}</span>
                      <ChangeText value={row.change} abs={row.changeAbs} />
                    </span>
                  </div>
                  <div className="mt-2">
                    <PriceChart values={row.spark ?? []} up={row.changeAbs >= 0} height={56} label={`${row.ticker} chart`} />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {showMarket ? (
        <section className="mx-auto mt-4 w-full max-w-6xl px-4 pb-4 sm:px-6">
          <div className="grid gap-4 lg:grid-cols-2">
            <div className="rounded-[28px] border border-line bg-card p-5 sm:p-6">
              <p className="text-[11px] font-medium tracking-[0.14em] text-muted uppercase">
                Pons market
              </p>
              <h2 className="mt-1 font-serif text-2xl tracking-tight text-ink">$PONS book</h2>
              <dl className="mt-5 grid grid-cols-3 gap-3 text-sm">
                <div className="rounded-[16px] border border-line bg-paper px-3 py-3">
                  <dt className="text-[11px] text-muted">Last</dt>
                  <dd className="mt-1 font-mono tabular-nums text-ink">{wire.ponsPrice}</dd>
                </div>
                <div className="rounded-[16px] border border-line bg-paper px-3 py-3">
                  <dt className="text-[11px] text-muted">24h</dt>
                  <dd className="mt-1 font-mono tabular-nums text-ink">{wire.ponsChange}</dd>
                </div>
                <div className="rounded-[16px] border border-line bg-paper px-3 py-3">
                  <dt className="text-[11px] text-muted">Mcap</dt>
                  <dd className="mt-1 font-mono tabular-nums text-ink">{wire.ponsMcap}</dd>
                </div>
              </dl>
              <Link to="/article/$slug" params={{ slug: "live-pons" }} className="mt-4 block">
                <PriceChart
                  values={wire.markets.find((row) => row.id === "pons")?.spark ?? []}
                  up={!wire.ponsChange.startsWith("-")}
                  height={120}
                  label="$PONS chart"
                />
              </Link>
            </div>
            <div className="rounded-[28px] border border-line bg-card p-5 sm:p-6">
              <p className="text-[11px] font-medium tracking-[0.14em] text-muted uppercase">
                Pons book
              </p>
              <h2 className="mt-1 font-serif text-2xl tracking-tight text-ink">Launchpad tape</h2>
              <ol className="mt-5 divide-y divide-line">
                {bookRows.map((row, index) => (
                  <li key={`book-${row.id}`}>
                    <Link
                      to="/article/$slug"
                      params={{ slug: `live-${row.id}` }}
                      className="flex items-baseline justify-between gap-3 py-3"
                    >
                      <span className="min-w-0">
                        <span className="mr-2 font-mono text-xs tabular-nums text-muted">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <span className="text-ink">{row.name}</span>{" "}
                        <span className="font-mono text-xs text-muted">{row.ticker}</span>
                      </span>
                      <ChangeText value={row.change} abs={row.changeAbs} />
                    </Link>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>
      ) : (
        <div className="pb-2" />
      )}

      {/* PONSNEWS CA & CHART SECTION DI PALING BAWAH */}
      <PonsCaSection />
    </main>
  );
}