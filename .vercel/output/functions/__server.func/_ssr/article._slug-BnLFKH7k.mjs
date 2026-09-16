import { s as relatedArticles } from "./news-BS2Y30v9.mjs";
import { _ as Link, y as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as Route } from "./router-DvU-kFwj.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/article._slug-BnLFKH7k.js
var import_jsx_runtime = require_jsx_runtime();
function ArticlePage() {
	const { article, live } = Route.useLoaderData();
	const related = relatedArticles(article.slug, article.category, live);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto w-full max-w-3xl px-4 pt-8 pb-6 sm:px-6 sm:pt-12",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/",
				className: "text-xs font-medium tracking-[0.12em] text-muted uppercase",
				children: "PONS NEWS"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-5 flex flex-wrap items-center gap-2 text-[11px] tracking-[0.12em] text-muted uppercase",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: article.category }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						"aria-hidden": true,
						children: "·"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "tabular-nums",
						children: article.published
					}),
					article.live ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						"aria-hidden": true,
						children: "·"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-live",
						children: "Live"
					})] }) : null,
					article.ticker ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						"aria-hidden": true,
						children: "·"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-mono tracking-normal text-ink-soft normal-case",
						children: article.ticker
					})] }) : null
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-4 font-serif text-[clamp(2rem,5vw,3.4rem)] leading-[1.08] tracking-tight text-balance",
				children: article.title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 text-base leading-relaxed text-ink-soft text-pretty",
				children: article.dek
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-5 font-mono text-[11px] text-muted",
				children: ["Source · ", article.source]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-10 space-y-5 border-t border-line pt-8",
				children: article.body.map((paragraph) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[1.05rem] leading-[1.65] text-ink-soft text-pretty",
					children: paragraph
				}, paragraph))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
				href: "https://www.ponsfamily.com/launchpad",
				target: "_blank",
				rel: "noopener noreferrer",
				className: "mt-10 inline-flex h-12 items-center rounded-full bg-ink px-5 text-sm font-medium text-paper",
				children: "Open the Pons source"
			}),
			related.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-14 border-t border-line pt-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
					className: "text-[11px] font-medium tracking-[0.14em] text-muted uppercase",
					children: ["More PONS NEWS · ", article.category]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-4 space-y-4",
					children: related.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/article/$slug",
						params: { slug: item.slug },
						className: "font-serif text-xl leading-snug text-ink hover:text-ink-soft",
						children: item.title
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-xs text-muted",
						children: item.time
					})] }, item.slug))
				})]
			}) : null
		]
	});
}
//#endregion
export { ArticlePage as component };
