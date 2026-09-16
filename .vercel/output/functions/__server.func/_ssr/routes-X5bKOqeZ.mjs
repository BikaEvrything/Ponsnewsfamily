import { i as __toESM } from "../_runtime.mjs";
import { c as timeAgo, n as DESK_ARTICLES, r as EMPTY_WIRE, t as CATEGORIES } from "./news-BS2Y30v9.mjs";
import { B as require_react, _ as Link, y as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as RefreshCw, i as Search, t as X } from "../_libs/lucide-react.mjs";
import { i as getPonsWire, r as Route$1 } from "./router-DvU-kFwj.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-X5bKOqeZ.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ArticleCard({ article, featured = false }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
		to: "/article/$slug",
		params: { slug: article.slug },
		className: featured ? "group block rounded-[28px] border border-line bg-card p-6 sm:p-8" : "group block border-b border-line py-5 last:border-b-0",
		children: [
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
			}),
			article.fdv ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-4 font-mono text-xs tabular-nums text-ink-soft",
				children: [article.fdv, " FDV"]
			}) : null
		]
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
function Ticker({ items }) {
	const source = items.length ? items : [{
		label: "PONS NEWS wire",
		meta: "syncing"
	}];
	const loop = [...source, ...source];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mx-auto mt-4 w-full max-w-6xl overflow-hidden border-y border-line px-0",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-3 px-4 py-2 sm:px-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "shrink-0 text-[10px] font-medium tracking-[0.16em] text-live uppercase",
				children: "PONS NEWS"
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
		})
	});
}
function Home() {
	const initial = Route$1.useLoaderData() ?? EMPTY_WIRE;
	const [wire, setWire] = (0, import_react.useState)(initial);
	const [query, setQuery] = (0, import_react.useState)("");
	const [category, setCategory] = (0, import_react.useState)("All");
	const [syncing, setSyncing] = (0, import_react.useState)(false);
	async function refresh() {
		setSyncing(true);
		try {
			const next = await getPonsWire();
			setWire(next);
		} finally {
			setSyncing(false);
		}
	}
	(0, import_react.useEffect)(() => {
		const id = window.setInterval(() => {
			refresh();
		}, 45e3);
		return () => window.clearInterval(id);
	}, []);
	const articles = (0, import_react.useMemo)(() => [...wire.liveArticles, ...DESK_ARTICLES], [wire.liveArticles]);
	const filtered = (0, import_react.useMemo)(() => {
		const q = query.trim().toLowerCase();
		return articles.filter((article) => {
			if (!(category === "All" || article.category === category)) return false;
			if (!q) return true;
			return article.title.toLowerCase().includes(q) || article.dek.toLowerCase().includes(q) || (article.ticker ?? "").toLowerCase().includes(q);
		});
	}, [
		articles,
		query,
		category
	]);
	const featured = filtered[0];
	const rest = filtered.slice(1);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBanner, {
			title: wire.statusTitle,
			message: wire.statusMessage
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ticker, { items: wire.tape }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mx-auto w-full max-w-6xl px-4 pt-8 sm:px-6 sm:pt-10",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[11px] font-medium tracking-[0.16em] text-muted uppercase",
					children: "PONS NEWS desk"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-3 max-w-3xl font-serif text-[clamp(2.2rem,6vw,4.4rem)] leading-[0.98] tracking-tight text-balance",
					children: "PONS NEWS. Updated when Pons updates."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 max-w-xl text-sm leading-relaxed text-muted text-pretty",
					children: "Protocol notes from Pons, live prints from the Pons launchpad book, and desk files — all under the PONS NEWS masthead."
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
							"Synced ",
							timeAgo(wire.fetchedAt)
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
						placeholder: "Search PONS NEWS",
						className: "h-12 w-full bg-transparent text-sm text-ink outline-none placeholder:text-muted",
						"aria-label": "Search PONS NEWS"
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
			className: "mx-auto mt-8 grid w-full max-w-6xl gap-8 px-4 pb-6 sm:px-6 lg:grid-cols-[minmax(0,1fr)_280px]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [featured ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArticleCard, {
				article: featured,
				featured: true
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "rounded-[24px] border border-line bg-card p-8 text-sm text-muted",
				children: "No PONS NEWS files match that search."
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-2",
				children: rest.map((article) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArticleCard, { article }, article.slug))
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
				className: "space-y-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-[24px] border border-line bg-card p-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[11px] font-medium tracking-[0.14em] text-muted uppercase",
							children: "$PONS on the wire"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
							className: "mt-4 space-y-3 text-sm",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-baseline justify-between gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
										className: "text-muted",
										children: "Last"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
										className: "font-mono tabular-nums text-ink",
										children: wire.ponsPrice
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-baseline justify-between gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
										className: "text-muted",
										children: "24h"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
										className: "font-mono tabular-nums text-ink",
										children: wire.ponsChange
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-baseline justify-between gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
										className: "text-muted",
										children: "Mcap"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
										className: "font-mono tabular-nums text-ink",
										children: wire.ponsMcap
									})]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "https://www.ponsfamily.com/launchpad",
							target: "_blank",
							rel: "noopener noreferrer",
							className: "mt-5 inline-flex h-11 w-full items-center justify-center rounded-full border border-line text-xs font-medium text-ink",
							children: "Open Pons"
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-[24px] border border-line bg-card p-5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[11px] font-medium tracking-[0.14em] text-muted uppercase",
						children: "Pons book"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
						className: "mt-4 space-y-3 text-sm",
						children: [wire.markets.slice(0, 6).map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex items-baseline justify-between gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-ink",
									children: row.name
								}),
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-mono text-xs text-muted",
									children: row.ticker
								})
							] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-mono text-xs tabular-nums text-ink-soft",
								children: row.change
							})]
						}, row.id)), wire.markets.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
							className: "text-muted",
							children: "Waiting on the next Pons print."
						}) : null]
					})]
				})]
			})]
		})
	] });
}
//#endregion
export { Home as component };
