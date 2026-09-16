import { a as formatUsd, i as formatPct } from "./news-BS2Y30v9.mjs";
import { n as TSS_SERVER_FUNCTION, t as createServerFn } from "./ssr.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/pons-sync-Dn7jEF-x.js
var createServerRpc = (serverFnMeta, splitImportFn) => {
	const url = "/_serverFn/" + serverFnMeta.id;
	return Object.assign(splitImportFn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var CG = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&category=pons-launchpad&order=market_cap_desc&per_page=15&page=1";
var PONS_SITE = "https://www.ponsfamily.com/launchpad";
var cache = null;
var TTL_MS = 25e3;
function articleFromCoin(coin, fetchedAt) {
	const ticker = `$${coin.symbol.toUpperCase()}`;
	const pct = coin.price_change_percentage_24h ?? 0;
	const verb = pct >= 0 ? "bids" : "offers";
	return {
		slug: `live-${coin.id}`,
		title: `PONS NEWS: ${coin.name} ${ticker} ${verb} ${formatPct(pct)} on the session.`,
		dek: `Last print ${formatUsd(coin.current_price)}. Market cap ${formatUsd(coin.market_cap)}. Volume ${formatUsd(coin.total_volume)}.`,
		category: coin.id === "pons" ? "Wire" : "Markets",
		ticker,
		fdv: coin.fully_diluted_valuation ? formatUsd(coin.fully_diluted_valuation) : formatUsd(coin.market_cap),
		change: formatPct(pct),
		time: "live",
		published: new Date(fetchedAt).toLocaleString("en-US", {
			month: "long",
			day: "numeric",
			year: "numeric"
		}),
		source: "Pons market tape · CoinGecko Pons Launchpad",
		live: true,
		body: [
			`PONS NEWS is updating this file from the live Pons launchpad book.`,
			`${coin.name} (${ticker}) last printed ${formatUsd(coin.current_price)}, ${formatPct(pct)} over 24 hours. Market cap ${formatUsd(coin.market_cap)}. 24h volume ${formatUsd(coin.total_volume)}.`,
			`When Pons or the Pons Launchpad category reprints this name, this page refreshes on the next desk poll.`,
			`Tokens launched through Pons are user-created and experimental. PONS NEWS does not custody assets and does not give financial advice.`
		]
	};
}
async function pullWire() {
	const fetchedAt = Date.now();
	let coins = [];
	let statusTitle = null;
	let statusMessage = null;
	const [marketsRes, siteRes] = await Promise.allSettled([fetch(CG, { headers: { accept: "application/json" } }), fetch(PONS_SITE, { headers: { "user-agent": "PONSNEWS/1.0" } })]);
	if (marketsRes.status === "fulfilled" && marketsRes.value.ok) coins = await marketsRes.value.json();
	if (siteRes.status === "fulfilled" && siteRes.value.ok) {
		const html = await siteRes.value.text();
		const title = html.match(/status-banner-title">([^<]+)/);
		const message = html.match(/status-banner-message">([^<]+)/);
		statusTitle = title?.[1]?.trim() ?? null;
		statusMessage = message?.[1]?.trim() ?? null;
	}
	const markets = coins.map((coin) => ({
		id: coin.id,
		name: coin.name,
		ticker: `$${coin.symbol.toUpperCase()}`,
		price: formatUsd(coin.current_price),
		change: formatPct(coin.price_change_percentage_24h ?? 0),
		changeAbs: coin.price_change_percentage_24h ?? 0,
		mcap: formatUsd(coin.market_cap),
		volume: formatUsd(coin.total_volume)
	}));
	const pons = coins.find((coin) => coin.id === "pons");
	const liveArticles = coins.slice(0, 8).map((coin) => articleFromCoin(coin, fetchedAt));
	const tape = markets.slice(0, 10).map((row) => ({
		label: `PONS NEWS · ${row.name} ${row.ticker}`,
		meta: `${row.price} ${row.change}`
	}));
	if (statusTitle) tape.unshift({
		label: `PONS NEWS · ${statusTitle}`,
		meta: "Pons status"
	});
	return {
		fetchedAt,
		statusTitle,
		statusMessage,
		ponsPrice: pons ? formatUsd(pons.current_price) : "—",
		ponsChange: pons ? formatPct(pons.price_change_percentage_24h ?? 0) : "—",
		ponsMcap: pons ? formatUsd(pons.market_cap) : "—",
		markets,
		tape: tape.length ? tape : [{
			label: "PONS NEWS wire waiting on Pons",
			meta: "retry"
		}],
		liveArticles
	};
}
var getPonsWire_createServerFn_handler = createServerRpc({
	id: "3cb9ff35510caf9ed68df92119ac90a339bcfa7cd8dc820daf144ffce18f56d9",
	name: "getPonsWire",
	filename: "src/lib/pons-sync.ts"
}, (opts) => getPonsWire.__executeServer(opts));
var getPonsWire = createServerFn({ method: "GET" }).handler(getPonsWire_createServerFn_handler, async () => {
	if (cache && Date.now() - cache.at < TTL_MS) return cache.data;
	const data = await pullWire();
	cache = {
		at: Date.now(),
		data
	};
	return data;
});
//#endregion
export { getPonsWire_createServerFn_handler };
