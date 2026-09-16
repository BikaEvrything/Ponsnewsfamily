//#region node_modules/.nitro/vite/services/ssr/assets/news-BS2Y30v9.js
var CATEGORIES = [
	"All",
	"Wire",
	"Protocol",
	"Markets",
	"Desk"
];
var DESK_ARTICLES = [
	{
		slug: "ponsnews-desk-covers-pons",
		title: "PONS NEWS is the desk. Pons is the beat.",
		dek: "Every print on this site is a PONS NEWS story. When Pons moves — protocol, fees, burns, or the launchpad — the desk updates.",
		category: "Desk",
		time: "desk",
		published: "September 5, 2026",
		source: "PONS NEWS",
		body: [
			"PONS NEWS is not a second launchpad. It is the news desk for Pons.",
			"The wire on the home page reads the live Pons market tape and the status line on ponsfamily.com. When those numbers change, the PONS NEWS print changes with them.",
			"Official notes from Pons — Uniswap alignment, creator fees, supply burns, backend rollouts — are filed here under Protocol and Desk. Markets is the live book.",
			"Follow the desk on X at @ponsnewsfamily. The launchpad remains the source for trades. This page does not custody assets and does not give financial advice."
		]
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
		body: [
			"PONS NEWS is carrying the Pons note from September 3: Uniswap Labs purchased PONS (ethereum:0x07f5b6823751c2e2cd4560f28af75ff887102241) for long-term alignment.",
			"Pons builds on Uniswap. Graduation on the launchpad still seeds a locked pool. This purchase is a partnership print, not a change to how a launch clears the curve.",
			"The desk will update this file if Pons posts a follow-up on the same token or the same partnership."
		]
	},
	{
		slug: "creators-earned-34m",
		title: "PONS NEWS: token creators have earned $34,000,000 on Pons.",
		dek: "Fees land in stock tokens, ETH, USDG, or other supported tokens. The figure is the one Pons published.",
		category: "Protocol",
		time: "Sep 3",
		published: "September 3, 2026",
		source: "Pons · @ponsdotfamily",
		body: [
			"Pons posted that token creators have now earned $34,000,000 on the platform.",
			"PONS NEWS repeats the fee units Pons named: stock tokens, ETH, USDG, or other supported tokens. The desk does not add a forecast to that number.",
			"Holder fee sharing on Create can route a launch's creator fees to holders, split pro-rata. That toggle is separate from the $34M print."
		]
	},
	{
		slug: "pons-supply-burn",
		title: "PONS NEWS: 29.34% of PONS supply burned to date.",
		dek: "Pons says 80% of protocol fees programmatically accumulate PONS. The burn figure is theirs.",
		category: "Protocol",
		ticker: "$PONS",
		time: "Sep 3",
		published: "September 3, 2026",
		source: "Pons · @ponsdotfamily",
		body: ["Pons published two lines the desk is keeping on the wire: 29.34% of total PONS supply has been burned, and 80% of protocol fees go toward programmatically accumulating PONS.", "PONS NEWS will refresh the burn share when Pons prints a new figure. Until then this is the last official number."]
	},
	{
		slug: "backend-upgrade-rollout",
		title: "PONS NEWS: Pons flags degraded performance ahead of a rollout.",
		dek: "The launchpad banner says launches and market data may load slowly or read out of date.",
		category: "Desk",
		time: "Sep 4",
		published: "September 4, 2026",
		source: "ponsfamily.com/launchpad",
		body: [
			"Pons posted a status banner on Explore: the team is upgrading the backend ahead of a new rollout.",
			"PONS NEWS mirrors that banner at the top of the desk whenever it is still live on the launchpad. When Pons takes it down, this wire drops the warning on the next refresh.",
			"Trades still go through the wallet. The desk does not halt coverage while the backend is mid-upgrade."
		]
	}
];
function getDeskArticle(slug) {
	return DESK_ARTICLES.find((article) => article.slug === slug);
}
function relatedArticles(slug, category, extra = []) {
	return [...extra, ...DESK_ARTICLES].filter((article) => article.slug !== slug && article.category === category).slice(0, 3);
}
var EMPTY_WIRE = {
	fetchedAt: Date.now(),
	statusTitle: null,
	statusMessage: null,
	ponsPrice: "—",
	ponsChange: "—",
	ponsMcap: "—",
	markets: [],
	tape: [{
		label: "PONS NEWS wire",
		meta: "syncing"
	}],
	liveArticles: []
};
function formatUsd(value) {
	if (!Number.isFinite(value)) return "—";
	if (value >= 1e9) return `$${(value / 1e9).toFixed(2)}B`;
	if (value >= 1e6) return `$${(value / 1e6).toFixed(2)}M`;
	if (value >= 1e3) return `$${(value / 1e3).toFixed(1)}K`;
	if (value >= 1) return `$${value.toFixed(2)}`;
	return `$${value.toFixed(5)}`;
}
function formatPct(value) {
	if (!Number.isFinite(value)) return "—";
	return `${value > 0 ? "+" : ""}${value.toFixed(2)}%`;
}
function timeAgo(ts) {
	const delta = Math.max(0, Date.now() - ts);
	const sec = Math.round(delta / 1e3);
	if (sec < 10) return "just now";
	if (sec < 60) return `${sec}s ago`;
	const min = Math.round(sec / 60);
	if (min < 60) return `${min}m ago`;
	return `${Math.round(min / 60)}h ago`;
}
//#endregion
export { formatUsd as a, timeAgo as c, formatPct as i, DESK_ARTICLES as n, getDeskArticle as o, EMPTY_WIRE as r, relatedArticles as s, CATEGORIES as t };
