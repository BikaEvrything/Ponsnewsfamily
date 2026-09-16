import { createServerFn } from "@tanstack/react-start";
import {
  FALLBACK_MARKETS,
  FALLBACK_STOCKS,
  articleFromHeadline,
  articleFromMarket,
  formatPct,
  formatUsd,
  snapshotFromMarkets,
  syntheticSpark,
  type Article,
  type MarketRow,
  type WireSnapshot,
} from "@/lib/news";

const CG =
  "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&category=pons-launchpad&order=market_cap_desc&per_page=15&page=1&sparkline=true";
const CG_PONS =
  "https://api.coingecko.com/api/v3/simple/price?ids=pons&vs_currencies=usd&include_market_cap=true&include_24hr_vol=true&include_24hr_change=true";
const PONS_SITE = "https://www.ponsfamily.com/launchpad";
const YAHOO_QUOTE = `https://query1.finance.yahoo.com/v7/finance/quote?symbols=${FALLBACK_STOCKS.map((row) => row.pair ?? row.ticker).join(",")}`;

type Cache = { at: number; data: WireSnapshot };
let cache: Cache | null = null;
let lastLiveMarkets: MarketRow[] = [];
let lastHeadlines: Article[] = [];
const TTL_MS = 12_000;

type Coin = {
  id: string;
  symbol: string;
  name: string;
  current_price: number;
  market_cap: number;
  total_volume: number;
  price_change_percentage_24h: number;
  sparkline_in_7d?: { price?: number[] };
};

function mergeBook(live: MarketRow[], fallback: MarketRow[]): MarketRow[] {
  const liveIds = new Set(live.map((row) => row.id));
  return [...live, ...fallback.filter((row) => !liveIds.has(row.id))];
}

async function pullHeadlines(): Promise<Article[]> {
  const queries: Array<{ q: string; ticker?: string; feed?: Article["feed"] }> = [
    { q: "HOOD", ticker: "HOOD", feed: "robinhood" },
    { q: "Robinhood Markets", ticker: "HOOD", feed: "robinhood" },
    { q: "Robinhood Chain", feed: "robinhood" },
    { q: "Pons launchpad", ticker: "$PONS", feed: "pons" },
    { q: "NVDA", ticker: "NVDA", feed: "stocks" },
    { q: "AAPL", ticker: "AAPL", feed: "stocks" },
    { q: "TSLA", ticker: "TSLA", feed: "stocks" },
  ];
  const seen = new Set<string>();
  const articles: Article[] = [];

  const batches = await Promise.all(
    queries.map(async ({ q, ticker, feed }) => {
      try {
        const url = `https://query1.finance.yahoo.com/v1/finance/search?q=${encodeURIComponent(q)}&newsCount=6&quotesCount=0`;
        const res = await fetch(url, { headers: { "user-agent": "PONSNEWS/1.0" } });
        if (!res.ok) return [] as Article[];
        const json = (await res.json()) as {
          news?: Array<{
            uuid?: string;
            title?: string;
            publisher?: string;
            providerPublishTime?: number;
          }>;
        };
        return (json.news ?? [])
          .filter((item) => item.title && item.uuid)
          .map((item) =>
            articleFromHeadline({
              id: item.uuid as string,
              title: item.title as string,
              publisher: item.publisher ?? "Wire",
              publishedAt: item.providerPublishTime,
              ticker,
              feed,
            }),
          );
      } catch {
        return [] as Article[];
      }
    }),
  );

  for (const batch of batches) {
    for (const article of batch) {
      const key = article.title.toLowerCase();
      if (seen.has(key)) continue;
      seen.add(key);
      articles.push(article);
    }
  }

  if (articles.length) lastHeadlines = articles.slice(0, 18);
  return lastHeadlines;
}

async function pullStocks(): Promise<MarketRow[]> {
  try {
    const res = await fetch(YAHOO_QUOTE, { headers: { "user-agent": "PONSNEWS/1.0" } });
    if (res.ok) {
      const json = (await res.json()) as {
        quoteResponse?: {
          result?: Array<{
            symbol?: string;
            regularMarketPrice?: number;
            regularMarketChangePercent?: number;
          }>;
        };
      };
      const bySymbol = new Map(
        (json.quoteResponse?.result ?? []).map((row) => [row.symbol?.toUpperCase(), row]),
      );
      if (bySymbol.size) {
        return FALLBACK_STOCKS.map((seed) => {
          const hit = bySymbol.get((seed.pair ?? seed.ticker).toUpperCase());
          const price = Number(hit?.regularMarketPrice);
          const changeAbs = Number(hit?.regularMarketChangePercent);
          if (!Number.isFinite(price)) return seed;
          return {
            ...seed,
            price: formatUsd(price),
            change: formatPct(Number.isFinite(changeAbs) ? changeAbs : seed.changeAbs),
            changeAbs: Number.isFinite(changeAbs) ? changeAbs : seed.changeAbs,
          };
        });
      }
    }
  } catch {
    /* chart fallback */
  }

  const rows = await Promise.all(
    FALLBACK_STOCKS.map(async (seed) => {
      const symbol = seed.pair ?? seed.ticker;
      try {
        const res = await fetch(
          `https://query1.finance.yahoo.com/v8/finance/chart/${symbol}?interval=1d&range=1mo`,
          { headers: { "user-agent": "PONSNEWS/1.0" } },
        );
        if (!res.ok) return { ...seed, spark: seed.spark ?? syntheticSpark(seed.changeAbs, seed.name.length) };
        const json = (await res.json()) as {
          chart?: {
            result?: Array<{
              meta?: Record<string, number | string>;
              indicators?: { quote?: Array<{ close?: Array<number | null> }> };
            }>;
          };
        };
        const result = json.chart?.result?.[0];
        const meta = result?.meta;
        const closes = (result?.indicators?.quote?.[0]?.close ?? []).filter(
          (value): value is number => typeof value === "number" && Number.isFinite(value),
        );
        const price = Number(meta?.regularMarketPrice);
        const prev = Number(meta?.chartPreviousClose ?? meta?.previousClose);
        if (!Number.isFinite(price)) {
          return { ...seed, spark: closes.length ? closes : seed.spark };
        }
        const changeAbs =
          Number.isFinite(prev) && prev !== 0 ? ((price - prev) / prev) * 100 : seed.changeAbs;
        return {
          ...seed,
          price: formatUsd(price),
          change: formatPct(changeAbs),
          changeAbs,
          spark: closes.length >= 2 ? closes : syntheticSpark(changeAbs, seed.name.length),
        };
      } catch {
        return seed;
      }
    }),
  );
  return rows;
}

async function pullCoins(): Promise<MarketRow[]> {
  try {
    const res = await fetch(CG, { headers: { accept: "application/json" } });
    if (res.ok) {
      const payload = await res.json();
      if (Array.isArray(payload) && payload.length) {
        return (payload as Coin[]).map((coin) => {
          const changeAbs = coin.price_change_percentage_24h ?? 0;
          const spark = coin.sparkline_in_7d?.price?.filter((value) => Number.isFinite(value)) ?? [];
          return {
            id: coin.id,
            name: coin.name,
            ticker: `$${coin.symbol.toUpperCase()}`,
            price: formatUsd(coin.current_price),
            change: formatPct(changeAbs),
            changeAbs,
            mcap: formatUsd(coin.market_cap),
            volume: formatUsd(coin.total_volume),
            kind: "token" as const,
            spark: spark.length >= 2 ? spark : syntheticSpark(changeAbs, coin.name.length),
          };
        });
      }
    }
  } catch {
    /* fall through */
  }

  try {
    const res = await fetch(CG_PONS, { headers: { accept: "application/json" } });
    if (!res.ok) return lastLiveMarkets;
    const json = (await res.json()) as Record<
      string,
      { usd?: number; usd_market_cap?: number; usd_24h_vol?: number; usd_24h_change?: number }
    >;
    const pons = json.pons;
    if (!pons?.usd) return lastLiveMarkets;
    const row: MarketRow = {
      id: "pons",
      name: "Pons",
      ticker: "$PONS",
      price: formatUsd(pons.usd),
      change: formatPct(pons.usd_24h_change ?? 0),
      changeAbs: pons.usd_24h_change ?? 0,
      mcap: formatUsd(pons.usd_market_cap ?? 0),
      volume: formatUsd(pons.usd_24h_vol ?? 0),
      kind: "token",
      spark: syntheticSpark(pons.usd_24h_change ?? 0, 4),
    };
    const rest = lastLiveMarkets.filter((item) => item.id !== "pons");
    return [row, ...rest];
  } catch {
    return lastLiveMarkets;
  }
}

async function pullWire(): Promise<WireSnapshot> {
  const fetchedAt = Date.now();
  let statusTitle: string | null = "Degraded performance";
  let statusMessage: string | null =
    "We are upgrading the backend ahead of a new rollout. Launches and market data may load slowly or read out of date.";

  const [liveCoins, siteRes, stocks, headlines] = await Promise.all([
    pullCoins(),
    fetch(PONS_SITE, { headers: { "user-agent": "PONSNEWS/1.0" } }).then(
      (res) => res,
      () => null,
    ),
    pullStocks(),
    pullHeadlines(),
  ]);

  if (liveCoins.length) lastLiveMarkets = liveCoins;

  if (siteRes?.ok) {
    const html = await siteRes.text();
    const title = html.match(/status-banner-title">([^<]+)/);
    const message = html.match(/status-banner-message">([^<]+)/);
    if (title?.[1]) statusTitle = title[1].trim();
    if (message?.[1]) statusMessage = message[1].trim();
  }

  const markets = mergeBook(liveCoins.length ? liveCoins : lastLiveMarkets, FALLBACK_MARKETS);
  const movers = [...stocks, ...markets].sort(
    (a, b) => Math.abs(b.changeAbs) - Math.abs(a.changeAbs),
  );
  const snap = snapshotFromMarkets(markets, statusTitle, statusMessage, fetchedAt, stocks);
  snap.liveArticles = [...headlines, ...movers.map((row) => articleFromMarket(row, fetchedAt))];
  snap.tape = [
    {
      label: `Live print ${new Date(fetchedAt).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" })}`,
      meta: "auto",
      topic: "pons",
    },
    ...headlines.slice(0, 6).map((article) => ({
      label: article.title.replace(/^PONS NEWS: /, ""),
      meta: article.ticker ?? "wire",
      topic: (article.feed ?? "stocks") as "pons" | "robinhood" | "stocks",
    })),
    ...snap.tape,
  ];
  return snap;
}

export const getPonsWire = createServerFn({ method: "GET" }).handler(async () => {
  if (cache && Date.now() - cache.at < TTL_MS) return cache.data;
  try {
    const data = await pullWire();
    cache = { at: Date.now(), data };
    return data;
  } catch {
    if (cache) return cache.data;
    return snapshotFromMarkets(
      lastLiveMarkets.length ? lastLiveMarkets : FALLBACK_MARKETS,
      "Degraded performance",
      "We are upgrading the backend ahead of a new rollout. Launches and market data may load slowly or read out of date.",
      Date.now(),
      FALLBACK_STOCKS,
    );
  }
});
