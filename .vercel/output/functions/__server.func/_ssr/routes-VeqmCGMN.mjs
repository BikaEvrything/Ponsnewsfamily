import { i as __toESM } from "../_runtime.mjs";
import { a as FALLBACK_STOCKS, c as articleMatchesFeed, h as timeAgo, n as DESK_ARTICLES, r as EMPTY_WIRE, t as CATEGORIES } from "./news-CHex8H38.mjs";
import { B as require_react, _ as Link, y as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as RefreshCw, i as Search, t as X } from "../_libs/lucide-react.mjs";
import { i as getPonsWire, r as Route$1 } from "./router-FpL2hewz.mjs";
import { t as PriceChart } from "./price-chart-B2AVQHKj.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-VeqmCGMN.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ArticleCard({ article, featured = false }) {
	const spark = article.spark;
	const up = !article.change?.startsWith("-");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
		to: "/article/$slug",
		params: { slug: article.slug },
		className: featured ? "group block rounded-[28px] border border-line bg-card p-6 sm:p-8" : "group grid gap-4 border-b border-line py-5 last:border-b-0 sm:grid-cols-[minmax(0,1fr)_160px] sm:items-center",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2 text-[11px] tracking-[0.12em] text-muted uppercase",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: article.category }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						"aria-hidden": true,
						children: "·"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "tabular-nums",
						children: article.time
					}),
					article.ticker ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						"aria-hidden": true,
						children: "·"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-mono tracking-normal text-ink-soft normal-case",
						children: article.ticker
					})] }) : null
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: featured ? "mt-3 font-serif text-[clamp(1.8rem,4vw,3.1rem)] leading-[1.12] tracking-tight text-balance text-ink group-hover:text-ink-soft" : "mt-2 font-serif text-[1.35rem] leading-snug tracking-tight text-balance text-ink group-hover:text-ink-soft",
				children: article.title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 max-w-2xl text-sm leading-relaxed text-muted text-pretty",
				children: article.dek
			})
		] }), spark?.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: featured ? "mt-6" : "",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PriceChart, {
				values: spark,
				up,
				height: featured ? 180 : 72,
				label: `${article.ticker ?? article.title} chart`
			})
		}) : null]
	});
}
function StatusBanner({ title, message }) {
	const [open, setOpen] = (0, import_react.useState)(true);
	if (!open || !title) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mx-auto mt-4 w-full max-w-6xl px-4 sm:px-6",
		role: "status",
		"aria-live": "polite",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-start gap-3 rounded-[18px] border border-line bg-paper-2 px-4 py-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "live-dot mt-1.5 size-1.5 shrink-0 rounded-full bg-warn",
					"aria-hidden": true
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "min-w-0 flex-1 text-sm leading-relaxed text-ink-soft",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "font-medium text-ink",
						children: [
							"PONS NEWS · ",
							title,
							". "
						]
					}), message]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "inline-flex size-9 shrink-0 items-center justify-center rounded-full text-muted",
					"aria-label": "Dismiss status notice",
					onClick: () => setOpen(false),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-3.5" })
				})
			]
		})
	});
}
var CHOICES = [
	{
		id: "pons",
		label: "Pons"
	},
	{
		id: "robinhood",
		label: "Robinhood"
	},
	{
		id: "stocks",
		label: "Stocks"
	}
];
function Ticker({ items, feed, onFeedChange }) {
	const source = feed ? items.filter((item) => item.topic === feed) : items;
	const rows = source.length ? source : [{
		label: "PONS NEWS wire",
		meta: "pick a beat",
		topic: "pons"
	}];
	const loop = [...rows, ...rows];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto mt-4 w-full max-w-6xl border-y border-line",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "px-4 pt-3 pb-2 sm:px-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-serif text-lg tracking-tight text-ink",
					children: "PONS NEWS"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-ink-soft",
					children: "Meme coin news on Pons, stocks, and Robinhood"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-3 grid grid-cols-3 gap-1.5",
					role: "tablist",
					"aria-label": "Choose news beat",
					children: CHOICES.map((item) => {
						const selected = feed === item.id;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							role: "tab",
							"aria-selected": selected,
							onClick: () => onFeedChange(selected ? null : item.id),
							className: selected ? "min-h-12 rounded-full bg-ink px-2 text-sm font-medium text-paper" : "min-h-12 rounded-full border border-line px-2 text-sm font-medium text-ink-soft",
							children: item.label
						}, item.id);
					})
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-3 overflow-hidden border-t border-line px-4 py-2.5 sm:px-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "shrink-0 text-[10px] font-medium tracking-[0.16em] text-live uppercase",
				children: feed ? CHOICES.find((item) => item.id === feed)?.label : "All"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "relative min-w-0 flex-1 overflow-hidden",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "ticker-track flex w-max gap-8 whitespace-nowrap text-xs text-ink-soft",
					children: loop.map((item, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "inline-flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: item.label }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-mono text-[11px] text-muted",
							children: item.meta
						})]
					}, `${item.label}-${index}`))
				})
			})]
		})]
	});
}
function ChangeText({ value, abs }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: abs >= 0 ? "font-mono text-xs tabular-nums text-live" : "font-mono text-xs tabular-nums text-muted",
		children: value
	});
}
function Home() {
	const initial = Route$1.useLoaderData() ?? EMPTY_WIRE;
	const [wire, setWire] = (0, import_react.useState)(initial);
	const [query, setQuery] = (0, import_react.useState)("");
	const [category, setCategory] = (0, import_react.useState)("All");
	const [feed, setFeed] = (0, import_react.useState)(null);
	const [syncing, setSyncing] = (0, import_react.useState)(false);
	const [mounted, setMounted] = (0, import_react.useState)(false);
	async function refresh() {
		setSyncing(true);
		try {
			const next = await getPonsWire();
			setWire(next.markets.length ? next : EMPTY_WIRE);
		} finally {
			setSyncing(false);
		}
	}
	(0, import_react.useEffect)(() => {
		setMounted(true);
		const stored = window.localStorage.getItem("ponsnews-feed");
		if (stored === "pons" || stored === "robinhood" || stored === "stocks") setFeed(stored);
		const tick = () => {
			if (document.visibilityState === "hidden") return;
			refresh();
		};
		const id = window.setInterval(tick, 15e3);
		window.addEventListener("focus", tick);
		document.addEventListener("visibilitychange", tick);
		tick();
		return () => {
			window.clearInterval(id);
			window.removeEventListener("focus", tick);
			document.removeEventListener("visibilitychange", tick);
		};
	}, []);
	function chooseFeed(next) {
		setFeed(next);
		if (next) window.localStorage.setItem("ponsnews-feed", next);
		else window.localStorage.removeItem("ponsnews-feed");
	}
	const articles = (0, import_react.useMemo)(() => [...wire.liveArticles, ...DESK_ARTICLES], [wire.liveArticles]);
	const filtered = (0, import_react.useMemo)(() => {
		const q = query.trim().toLowerCase();
		return articles.filter((article) => {
			if (!(category === "All" || article.category === category)) return false;
			if (feed && !articleMatchesFeed(article, feed)) return false;
			if (!q) return true;
			return article.title.toLowerCase().includes(q) || article.dek.toLowerCase().includes(q) || (article.ticker ?? "").toLowerCase().includes(q);
		});
	}, [
		articles,
		query,
		category,
		feed
	]);
	const featured = filtered[0];
	const rest = filtered.slice(1);
	const stockBook = wire.stocks?.length ? wire.stocks : FALLBACK_STOCKS;
	const visibleStocks = feed === "robinhood" ? stockBook.filter((row) => row.id === "hood") : stockBook;
	const showStocks = feed !== "pons";
	const showMarket = feed !== "stocks";
	const bookRows = feed === "stocks" ? stockBook : feed === "robinhood" ? [...stockBook.filter((row) => row.id === "hood"), ...wire.markets.slice(0, 3)] : feed === "pons" ? wire.markets : [...stockBook.slice(0, 6), ...wire.markets];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBanner, {
			title: wire.statusTitle,
			message: wire.statusMessage
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ticker, {
			items: wire.tape,
			feed,
			onFeedChange: chooseFeed
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mx-auto w-full max-w-6xl px-4 pt-8 sm:px-6 sm:pt-10",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[11px] font-medium tracking-[0.16em] text-muted uppercase",
					children: feed === "robinhood" ? "Robinhood wire" : feed === "stocks" ? "Stocks wire" : "Pons wire"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-3 max-w-3xl font-serif text-[clamp(2.2rem,6vw,4.4rem)] leading-[0.98] tracking-tight text-balance",
					children: feed === "robinhood" ? "Robinhood Chain. HOOD on the desk." : feed === "stocks" ? "Tokenized stocks on the Pons book." : "PONS NEWS. Updated when Pons updates."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 max-w-xl text-sm leading-relaxed text-muted text-pretty",
					children: feed === "robinhood" ? "Pons launches on Robinhood Chain. This wire keeps HOOD and the chain notes in one place." : feed === "stocks" ? "Approved V2 pairs: HOOD, NVDA, AAPL, TSLA, and the rest of the list." : "Protocol notes from Pons, live prints from the book, and the stock pairs."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-5 flex flex-wrap items-center gap-3 text-xs text-muted",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "inline-flex items-center gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "live-dot size-1.5 rounded-full bg-live",
								"aria-hidden": true
							}),
							"Live ",
							mounted ? timeAgo(wire.fetchedAt) : "now",
							" · auto every 15s"
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => void refresh(),
						className: "inline-flex h-10 items-center gap-2 rounded-full border border-line px-3 text-ink-soft",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { className: `size-3.5 ${syncing ? "animate-spin" : ""}` }), "Refresh wire"]
					})]
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "mx-auto mt-8 w-full max-w-6xl px-4 sm:px-6",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-3 sm:flex-row sm:items-center",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "flex min-h-12 flex-1 items-center gap-2 rounded-full border border-line bg-card px-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, {
						className: "size-4 text-muted",
						"aria-hidden": true
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						value: query,
						onChange: (event) => setQuery(event.target.value),
						placeholder: "Search this wire",
						className: "h-12 w-full bg-transparent text-sm text-ink outline-none placeholder:text-muted",
						"aria-label": "Search this wire"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex gap-1 overflow-x-auto rounded-full border border-line bg-card p-1",
					role: "tablist",
					"aria-label": "Filter PONS NEWS",
					children: CATEGORIES.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						role: "tab",
						"aria-selected": category === item,
						onClick: () => setCategory(item),
						className: category === item ? "rounded-full bg-ink px-3 py-2 text-xs font-medium whitespace-nowrap text-paper" : "rounded-full px-3 py-2 text-xs font-medium whitespace-nowrap text-ink-soft",
						children: item
					}, item))
				})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mx-auto mt-8 grid w-full max-w-6xl gap-6 px-4 sm:px-6 lg:grid-cols-[minmax(0,1.4fr)_minmax(16rem,0.8fr)]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [featured ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArticleCard, {
				article: featured,
				featured: true
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "rounded-[24px] border border-line bg-card p-8 text-sm text-muted",
				children: "No files on this wire."
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-2",
				children: rest.slice(0, 8).map((article) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArticleCard, { article }, article.slug))
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("aside", {
				className: "space-y-4",
				children: bookRows.slice(0, 8).map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/article/$slug",
					params: { slug: `live-${row.id}` },
					className: "block rounded-[20px] border border-line bg-card p-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-baseline justify-between gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "block font-mono text-xs text-muted",
							children: row.ticker
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-sm text-ink",
							children: row.name
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChangeText, {
							value: row.change,
							abs: row.changeAbs
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-3",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PriceChart, {
							values: row.spark ?? [],
							up: row.changeAbs >= 0,
							height: 64,
							label: `${row.ticker} chart`
						})
					})]
				}, `rail-${row.id}`))
			})]
		}),
		showStocks ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "mx-auto mt-8 w-full max-w-6xl px-4 sm:px-6",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-[28px] border border-line bg-card p-5 sm:p-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[11px] font-medium tracking-[0.14em] text-muted uppercase",
						children: feed === "robinhood" ? "Robinhood" : "Pons stocks"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-1 font-serif text-2xl tracking-tight text-ink",
						children: feed === "robinhood" ? "HOOD on the wire" : "Tokenized pairs on the book"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-5 grid gap-2 sm:grid-cols-2 lg:grid-cols-3",
						children: visibleStocks.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/article/$slug",
							params: { slug: `live-${row.id}` },
							className: "rounded-[16px] border border-line bg-paper p-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-baseline justify-between gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "min-w-0",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "block font-mono text-xs text-muted",
										children: row.ticker
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-sm text-ink",
										children: row.name
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "shrink-0 text-right",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "block font-mono text-sm tabular-nums text-ink",
										children: row.price
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChangeText, {
										value: row.change,
										abs: row.changeAbs
									})]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-2",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PriceChart, {
									values: row.spark ?? [],
									up: row.changeAbs >= 0,
									height: 56,
									label: `${row.ticker} chart`
								})
							})]
						}, `stk-${row.id}`))
					})
				]
			})
		}) : null,
		showMarket ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "mx-auto mt-4 w-full max-w-6xl px-4 pb-6 sm:px-6",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 lg:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-[28px] border border-line bg-card p-5 sm:p-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[11px] font-medium tracking-[0.14em] text-muted uppercase",
							children: "Pons market"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-1 font-serif text-2xl tracking-tight text-ink",
							children: "$PONS book"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
							className: "mt-5 grid grid-cols-3 gap-3 text-sm",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-[16px] border border-line bg-paper px-3 py-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
										className: "text-[11px] text-muted",
										children: "Last"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
										className: "mt-1 font-mono tabular-nums text-ink",
										children: wire.ponsPrice
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-[16px] border border-line bg-paper px-3 py-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
										className: "text-[11px] text-muted",
										children: "24h"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
										className: "mt-1 font-mono tabular-nums text-ink",
										children: wire.ponsChange
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-[16px] border border-line bg-paper px-3 py-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
										className: "text-[11px] text-muted",
										children: "Mcap"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
										className: "mt-1 font-mono tabular-nums text-ink",
										children: wire.ponsMcap
									})]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/article/$slug",
							params: { slug: "live-pons" },
							className: "mt-4 block",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PriceChart, {
								values: wire.markets.find((row) => row.id === "pons")?.spark ?? [],
								up: !wire.ponsChange.startsWith("-"),
								height: 120,
								label: "$PONS chart"
							})
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-[28px] border border-line bg-card p-5 sm:p-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[11px] font-medium tracking-[0.14em] text-muted uppercase",
							children: "Pons book"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-1 font-serif text-2xl tracking-tight text-ink",
							children: "Launchpad tape"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
							className: "mt-5 divide-y divide-line",
							children: bookRows.map((row, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/article/$slug",
								params: { slug: `live-${row.id}` },
								className: "flex items-baseline justify-between gap-3 py-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "min-w-0",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "mr-2 font-mono text-xs tabular-nums text-muted",
											children: String(index + 1).padStart(2, "0")
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-ink",
											children: row.name
										}),
										" ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-mono text-xs text-muted",
											children: row.ticker
										})
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChangeText, {
									value: row.change,
									abs: row.changeAbs
								})]
							}) }, `book-${row.id}`))
						})
					]
				})]
			})
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pb-6" })
	] });
}
//#endregion
export { Home as component };
