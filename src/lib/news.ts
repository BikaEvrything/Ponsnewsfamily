export type Category = "Wire" | "Protocol" | "Markets" | "Stocks" | "Desk";
export type Feed = "pons" | "robinhood" | "stocks";

export type Article = {
  slug: string;
  title: string;
  dek: string;
  body: string[];
  category: Category;
  ticker?: string;
  fdv?: string;
  change?: string;
  time: string;
  published: string;
  source: string;
  live?: boolean;
  feed?: Feed;
  spark?: number[];
};

export type MarketRow = {
  id: string;
  name: string;
  ticker: string;
  price: string;
  change: string;
  changeAbs: number;
  mcap: string;
  volume: string;
  kind?: "token" | "stock";
  pair?: string;
  spark?: number[];
};

export type WireSnapshot = {
  fetchedAt: number;
  statusTitle: string | null;
  statusMessage: string | null;
  ponsPrice: string;
  ponsChange: string;
  ponsMcap: string;
  markets: MarketRow[];
  stocks: MarketRow[];
  tape: Array<{ label: string; meta: string; topic: Feed }>;
  liveArticles: Article[];
};

export const FEEDS: Array<{ id: "all" | Feed; label: string }> = [
  { id: "pons", label: "Pons" },
  { id: "robinhood", label: "Robinhood" },
  { id: "stocks", label: "Stocks" },
];

export const CATEGORIES: Array<"All" | Category> = [
  "All",
  "Wire",
  "Protocol",
  "Markets",
  "Stocks",
  "Desk",
];

export function syntheticSpark(changeAbs: number, seed = 0): number[] {
  const points = 28;
  const end = 100;
  const start = end / (1 + changeAbs / 100);
  return Array.from({ length: points }, (_, index) => {
    const t = index / (points - 1);
    const wave = Math.sin((index + seed) * 0.55) * Math.max(1.2, Math.abs(changeAbs) * 0.12);
    return start + (end - start) * t + wave;
  });
}

export const FALLBACK_MARKETS: MarketRow[] = [
  { id: "pons", name: "Pons", ticker: "$PONS", price: "$0.73", change: "+22.18%", changeAbs: 22.18, mcap: "$518.66M", volume: "$208.69M", kind: "token" },
  { id: "thinking-cat", name: "Thinking Cat", ticker: "$HMM", price: "$0.018", change: "-28.04%", changeAbs: -28.04, mcap: "$17.95M", volume: "$2.38M", kind: "token" },
  { id: "yolo-2", name: "YOLO", ticker: "$YOLO", price: "$0.010", change: "-24.42%", changeAbs: -24.42, mcap: "$10.09M", volume: "$1.28M", kind: "token" },
  { id: "the-bull", name: "The Bull", ticker: "$BULL", price: "$0.0084", change: "+6.12%", changeAbs: 6.12, mcap: "$8.41M", volume: "$940.2K", kind: "token" },
  { id: "microduck", name: "microduck", ticker: "$microduck", price: "$0.0041", change: "+3.20%", changeAbs: 3.2, mcap: "$4.12M", volume: "$510.0K", kind: "token" },
  { id: "avola-protocol", name: "Avola Protocol", ticker: "$AVOLA", price: "$0.0027", change: "+11.40%", changeAbs: 11.4, mcap: "$2.71M", volume: "$388.0K", kind: "token" },
  { id: "pitcoin", name: "PITCOIN", ticker: "$P", price: "$0.0019", change: "-8.55%", changeAbs: -8.55, mcap: "$1.92M", volume: "$221.0K", kind: "token" },
  { id: "fartlon", name: "fartlon", ticker: "$FART", price: "$0.0008", change: "+4.10%", changeAbs: 4.1, mcap: "$812.0K", volume: "$96.4K", kind: "token" },
].map((row) => ({ ...row, kind: "token" as const, spark: syntheticSpark(row.changeAbs, row.name.length) }));

export const FALLBACK_STOCKS: MarketRow[] = [
  { id: "hood", name: "Robinhood Markets", ticker: "HOOD", price: "$122.11", change: "+14.13%", changeAbs: 14.13, mcap: "Equity", volume: "Pons pair", kind: "stock", pair: "HOOD" },
  { id: "nvda", name: "NVIDIA", ticker: "NVDA", price: "$230.36", change: "+2.65%", changeAbs: 2.65, mcap: "Equity", volume: "Pons pair", kind: "stock", pair: "NVDA" },
  { id: "aapl", name: "Apple", ticker: "AAPL", price: "$319.97", change: "-1.54%", changeAbs: -1.54, mcap: "Equity", volume: "Pons pair", kind: "stock", pair: "AAPL" },
  { id: "tsla", name: "Tesla", ticker: "TSLA", price: "$354.08", change: "-0.82%", changeAbs: -0.82, mcap: "Equity", volume: "Pons pair", kind: "stock", pair: "TSLA" },
  { id: "msft", name: "Microsoft", ticker: "MSFT", price: "$499.70", change: "+0.58%", changeAbs: 0.58, mcap: "Equity", volume: "Pons pair", kind: "stock", pair: "MSFT" },
  { id: "amzn", name: "Amazon", ticker: "AMZN", price: "$258.51", change: "+1.38%", changeAbs: 1.38, mcap: "Equity", volume: "Pons pair", kind: "stock", pair: "AMZN" },
  { id: "meta", name: "Meta Platforms", ticker: "META", price: "$616.77", change: "+4.03%", changeAbs: 4.03, mcap: "Equity", volume: "Pons pair", kind: "stock", pair: "META" },
  { id: "googl", name: "Alphabet", ticker: "GOOGL", price: "$211.98", change: "+1.10%", changeAbs: 1.1, mcap: "Equity", volume: "Pons pair", kind: "stock", pair: "GOOGL" },
  { id: "amd", name: "AMD", ticker: "AMD", price: "$162.40", change: "+3.22%", changeAbs: 3.22, mcap: "Equity", volume: "Pons pair", kind: "stock", pair: "AMD" },
  { id: "intc", name: "Intel", ticker: "INTC", price: "$24.18", change: "-0.40%", changeAbs: -0.4, mcap: "Equity", volume: "Pons pair", kind: "stock", pair: "INTC" },
  { id: "orcl", name: "Oracle", ticker: "ORCL", price: "$226.10", change: "+0.90%", changeAbs: 0.9, mcap: "Equity", volume: "Pons pair", kind: "stock", pair: "ORCL" },
  { id: "pltr", name: "Palantir", ticker: "PLTR", price: "$157.22", change: "+2.10%", changeAbs: 2.1, mcap: "Equity", volume: "Pons pair", kind: "stock", pair: "PLTR" },
  { id: "baba", name: "Alibaba", ticker: "BABA", price: "$134.55", change: "+0.70%", changeAbs: 0.7, mcap: "Equity", volume: "Pons pair", kind: "stock", pair: "BABA" },
  { id: "amc", name: "AMC Entertainment", ticker: "AMC", price: "$2.84", change: "-1.20%", changeAbs: -1.2, mcap: "Equity", volume: "Pons pair", kind: "stock", pair: "AMC" },
  { id: "gme", name: "GameStop", ticker: "GME", price: "$19.16", change: "+1.00%", changeAbs: 1.0, mcap: "Equity", volume: "Pons pair", kind: "stock", pair: "GME" },
  { id: "qqq", name: "Invesco QQQ", ticker: "QQQ", price: "$568.40", change: "+0.45%", changeAbs: 0.45, mcap: "ETF", volume: "Pons pair", kind: "stock", pair: "QQQ" },
  { id: "spy", name: "SPDR S&P 500", ticker: "SPY", price: "$646.12", change: "+0.32%", changeAbs: 0.32, mcap: "ETF", volume: "Pons pair", kind: "stock", pair: "SPY" },
  { id: "slv", name: "iShares Silver", ticker: "SLV", price: "$36.80", change: "+1.55%", changeAbs: 1.55, mcap: "ETF", volume: "Pons pair", kind: "stock", pair: "SLV" },
].map((row) => ({ ...row, kind: "stock" as const, spark: syntheticSpark(row.changeAbs, row.name.length) }));

export function articleFromHeadline(input: {
  id: string;
  title: string;
  publisher: string;
  publishedAt?: number;
  ticker?: string;
  feed?: Feed;
}): Article {
  const blob = `${input.title} ${input.ticker ?? ""}`.toLowerCase();
  const feed: Feed = input.feed
    ? input.feed
    : blob.includes("pons")
      ? "pons"
      : blob.includes("robinhood") || blob.includes("hood")
        ? "robinhood"
        : "stocks";
  const published = input.publishedAt
    ? new Date(input.publishedAt * 1000).toLocaleString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : new Date().toLocaleString("en-US", { month: "long", day: "numeric", year: "numeric" });
  return {
    slug: `wire-${input.id}`,
    title: `PONS NEWS: ${input.title}`,
    dek: `${input.publisher} on a name that sits on the Pons / Robinhood stock board.`,
    category: feed === "pons" ? "Wire" : "Stocks",
    ticker: input.ticker,
    time: "live",
    published,
    source: `${input.publisher} · auto wire`,
    live: true,
    feed,
    body: [
      `PONS NEWS picked this print up automatically from the stock wire covering Pons and Robinhood pairs.`,
      input.title,
      `The desk refreshes this file when a new headline lands on HOOD or another approved Pons pair. This is not a brokerage ticket.`,
    ],
  };
}

export function articleFromMarket(row: MarketRow, fetchedAt = Date.now()): Article {
  const verb = row.changeAbs >= 0 ? "bids" : "offers";
  const isStock = row.kind === "stock";
  return {
    slug: `live-${row.id}`,
    title: isStock
      ? `PONS NEWS: ${row.ticker} ${verb} ${row.change}. Approved Pons pair.`
      : `PONS NEWS: ${row.name} ${row.ticker} ${verb} ${row.change} on the session.`,
    dek: isStock
      ? `${row.name} last ${row.price}. Pons V2 lets a launch pair against tokenized ${row.ticker}.`
      : `Last print ${row.price}. Market cap ${row.mcap}. Volume ${row.volume}.`,
    category: row.id === "pons" ? "Wire" : isStock ? "Stocks" : "Markets",
    ticker: row.ticker,
    fdv: row.mcap,
    change: row.change,
    time: "live",
    published: new Date(fetchedAt).toLocaleString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    }),
    source: isStock ? "PONS NEWS · Pons stocks" : "PONS NEWS · Pons market / Pons book",
    live: true,
    feed: isStock ? (row.id === "hood" ? "robinhood" : "stocks") : "pons",
    spark: row.spark?.length ? row.spark : syntheticSpark(row.changeAbs, row.name.length),
    body: isStock
      ? [
          `PONS NEWS files ${row.name} (${row.ticker}) as a Pons stock pair.`,
          `Last print ${row.price}, ${row.change} on the cash session. Pons V2 can pair a launch against tokenized ${row.ticker} instead of ETH.`,
          `This is not a brokerage ticket. It is the reference print the desk keeps next to the Pons book.`,
        ]
      : [
          `PONS NEWS keeps ${row.name} on the Pons market and the Pons book.`,
          `${row.name} (${row.ticker}) last printed ${row.price}, ${row.change} over 24 hours. Market cap ${row.mcap}. 24h volume ${row.volume}.`,
          `This file updates when Pons reprints the book. Tokens launched through Pons are user-created and experimental.`,
        ],
  };
}

export function snapshotFromMarkets(
  markets: MarketRow[],
  statusTitle: string | null,
  statusMessage: string | null,
  fetchedAt = Date.now(),
  stocks: MarketRow[] = FALLBACK_STOCKS,
): WireSnapshot {
  const pons = markets.find((row) => row.id === "pons") ?? markets[0];
  const tape = [
    ...stocks.map((row) => ({
      label: `${row.name} ${row.ticker} ${row.change}`,
      meta: row.price,
      topic: (row.id === "hood" ? "robinhood" : "stocks") as Feed,
    })),
    ...markets.map((row) => ({
      label: `${row.name} ${row.ticker} ${row.change}`,
      meta: row.price,
      topic: "pons" as Feed,
    })),
  ];
  return {
    fetchedAt,
    statusTitle,
    statusMessage,
    ponsPrice: pons?.price ?? "—",
    ponsChange: pons?.change ?? "—",
    ponsMcap: pons?.mcap ?? "—",
    markets,
    stocks,
    tape,
    liveArticles: [...stocks, ...markets].map((row) => articleFromMarket(row, fetchedAt)),
  };
}

export const EMPTY_WIRE: WireSnapshot = snapshotFromMarkets(
  FALLBACK_MARKETS,
  "Degraded performance",
  "We are upgrading the backend ahead of a new rollout. Launches and market data may load slowly or read out of date.",
  Date.now(),
  FALLBACK_STOCKS,
);

export const DESK_ARTICLES: Article[] = [
  {
    slug: "ponsnews-desk-covers-pons",
    title: "PONS NEWS is the desk. Pons is the beat.",
    dek: "Every print on this site is a PONS NEWS story. When Pons moves — protocol, fees, burns, or the launchpad — the desk updates.",
    category: "Desk",
    time: "desk",
    published: "September 5, 2026",
    source: "PONS NEWS",
    feed: "pons",
    body: [
      "PONS NEWS is not a second launchpad. It is the news desk for Pons.",
      "The wire reads the Pons market, the Pons book, and the Pons stock pairs. When those numbers change, the print changes.",
      "Follow the desk on X at @ponsnewsfamily.",
    ],
  },
  {
    slug: "pons-stock-pairs",
    title: "PONS NEWS: V2 pairs can clear against tokenized stocks.",
    dek: "HOOD, NVDA, AAPL, TSLA, and the rest of the approved list sit on the Pons stocks board.",
    category: "Stocks",
    time: "desk",
    published: "September 5, 2026",
    source: "Pons V2 · docs",
    feed: "stocks",
    body: [
      "Pons V2 lets a creator set the paired asset at launch. Tokenized stocks on this board include HOOD, NVDA, AAPL, TSLA and the rest of the list.",
      "The pair carries into the locked pool at graduation.",
    ],
  },
  {
    slug: "robinhood-chain-beat",
    title: "PONS NEWS: Pons runs on Robinhood Chain. HOOD is the house pair.",
    dek: "Launches clear on Robinhood Chain. Tokenized HOOD sits on the stocks board as a pairing asset.",
    category: "Desk",
    ticker: "HOOD",
    time: "desk",
    published: "September 5, 2026",
    source: "PONS NEWS · Robinhood Chain",
    feed: "robinhood",
    body: [
      "Pons is a launchpad on Robinhood Chain.",
      "HOOD is the house name on this desk.",
    ],
  },
  {
    slug: "uniswap-labs-alignment",
    title: "PONS NEWS: Uniswap Labs buys PONS for long-term alignment.",
    dek: "Pons said Uniswap Labs purchased the PONS token. The desk files it as a protocol note, not a price call.",
    category: "Protocol",
    ticker: "$PONS",
    time: "Sep 3",
    published: "September 3, 2026",
    source: "Pons · @ponsdotfamily",
    feed: "pons",
    body: ["PONS NEWS is carrying the Pons note: Uniswap Labs purchased PONS for long-term alignment."],
  },
  {
    slug: "creators-earned-34m",
    title: "PONS NEWS: token creators have earned $34,000,000 on Pons.",
    dek: "Fees land in stock tokens, ETH, USDG, or other supported tokens.",
    category: "Protocol",
    time: "Sep 3",
    published: "September 3, 2026",
    source: "Pons · @ponsdotfamily",
    feed: "pons",
    body: ["Pons posted that token creators have now earned $34,000,000 on the platform."],
  },
  {
    slug: "pons-supply-burn",
    title: "PONS NEWS: 29.34% of PONS supply burned to date.",
    dek: "Pons says 80% of protocol fees programmatically accumulate PONS.",
    category: "Protocol",
    ticker: "$PONS",
    time: "Sep 3",
    published: "September 3, 2026",
    source: "Pons · @ponsdotfamily",
    feed: "pons",
    body: ["29.34% of total PONS supply has been burned."],
  },
  {
    slug: "backend-upgrade-rollout",
    title: "PONS NEWS: Pons flags degraded performance ahead of a rollout.",
    dek: "The launchpad banner says launches and market data may load slowly or read out of date.",
    category: "Desk",
    time: "Sep 4",
    published: "September 4, 2026",
    source: "ponsfamily.com/launchpad",
    feed: "pons",
    body: ["Pons posted a status banner on Explore: the team is upgrading the backend ahead of a new rollout."],
  },
];

export function articleMatchesFeed(article: Article, feed: "all" | Feed) {
  if (feed === "all") return true;
  if (article.feed) return article.feed === feed;
  if (feed === "stocks") return article.category === "Stocks";
  if (feed === "robinhood") {
    const blob = `${article.title} ${article.dek} ${article.ticker ?? ""}`.toLowerCase();
    return blob.includes("robinhood") || blob.includes("hood");
  }
  return article.feed !== "stocks" && article.feed !== "robinhood";
}

export function getDeskArticle(slug: string) {
  return DESK_ARTICLES.find((article) => article.slug === slug);
}

export function relatedArticles(slug: string, category: Category, extra: Article[] = []) {
  return [...extra, ...DESK_ARTICLES]
    .filter((article) => article.slug !== slug && article.category === category)
    .slice(0, 3);
}

export function formatUsd(value: number) {
  if (!Number.isFinite(value)) return "—";
  if (value >= 1_000_000_000) return `$${(value / 1_000_000_000).toFixed(2)}B`;
  if (value >= 1_000_000) return `$${(value / 1_000_000).toFixed(2)}M`;
  if (value >= 1_000) return `$${(value / 1_000).toFixed(1)}K`;
  if (value >= 1) return `$${value.toFixed(2)}`;
  return `$${value.toFixed(5)}`;
}

export function formatPct(value: number) {
  if (!Number.isFinite(value)) return "—";
  const sign = value > 0 ? "+" : "";
  return `${sign}${value.toFixed(2)}%`;
}

export function timeAgo(ts: number) {
  const delta = Math.max(0, Date.now() - ts);
  const sec = Math.round(delta / 1000);
  if (sec < 10) return "just now";
  if (sec < 60) return `${sec}s ago`;
  const min = Math.round(sec / 60);
  if (min < 60) return `${min}m ago`;
  const hr = Math.round(min / 60);
  return `${hr}h ago`;
}
