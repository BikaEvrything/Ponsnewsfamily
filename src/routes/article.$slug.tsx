import { Link, createFileRoute, notFound } from "@tanstack/react-router";
import { PriceChart } from "@/components/price-chart";
import {
  FALLBACK_MARKETS,
  FALLBACK_STOCKS,
  articleFromMarket,
  getDeskArticle,
  relatedArticles,
  syntheticSpark,
} from "@/lib/news";
import { getPonsWire } from "@/lib/pons-sync";

export const Route = createFileRoute("/article/$slug")({
  loader: async ({ params }) => {
    const desk = getDeskArticle(params.slug);
    if (desk) return { article: desk, live: [] as ReturnType<typeof articleFromMarket>[] };
    const wire = await getPonsWire();
    const liveList = wire.liveArticles.length
      ? wire.liveArticles
      : [...FALLBACK_STOCKS, ...FALLBACK_MARKETS].map((row) => articleFromMarket(row));
    const live = liveList.find((item) => item.slug === params.slug);
    if (!live) throw notFound();
    return { article: live, live: liveList };
  },
  component: ArticlePage,
});

function ArticlePage() {
  const { article, live } = Route.useLoaderData();
  const related = relatedArticles(article.slug, article.category, live);
  const spark = article.spark?.length
    ? article.spark
    : article.live
      ? syntheticSpark(article.change?.startsWith("-") ? -4 : 4, article.slug.length)
      : [];
  const up = !article.change?.startsWith("-");

  return (
    <main className="mx-auto w-full max-w-3xl px-4 pt-8 pb-6 sm:px-6 sm:pt-12">
      <Link to="/" className="text-xs font-medium tracking-[0.12em] text-muted uppercase">
        PONS NEWS
      </Link>
      <p className="mt-5 flex flex-wrap items-center gap-2 text-[11px] tracking-[0.12em] text-muted uppercase">
        <span>{article.category}</span>
        <span aria-hidden>·</span>
        <span className="tabular-nums">{article.published}</span>
        {article.live ? (
          <>
            <span aria-hidden>·</span>
            <span className="text-live">Live</span>
          </>
        ) : null}
        {article.ticker ? (
          <>
            <span aria-hidden>·</span>
            <span className="font-mono tracking-normal text-ink-soft normal-case">{article.ticker}</span>
          </>
        ) : null}
      </p>
      <h1 className="mt-4 font-serif text-[clamp(2rem,5vw,3.4rem)] leading-[1.08] tracking-tight text-balance">
        {article.title}
      </h1>
      <p className="mt-4 text-base leading-relaxed text-ink-soft text-pretty">{article.dek}</p>
      {spark.length ? (
        <div className="mt-8">
          <p className="mb-3 text-[11px] font-medium tracking-[0.14em] text-muted uppercase">
            {article.ticker ?? "Print"} chart
          </p>
          <PriceChart values={spark} up={up} height={220} label={`${article.ticker ?? "Print"} chart`} />
        </div>
      ) : null}
      <p className="mt-5 font-mono text-[11px] text-muted">Source · {article.source}</p>

      <div className="mt-10 space-y-5 border-t border-line pt-8">
        {article.body.map((paragraph) => (
          <p key={paragraph} className="text-[1.05rem] leading-[1.65] text-ink-soft text-pretty">
            {paragraph}
          </p>
        ))}
      </div>

      {related.length > 0 ? (
        <section className="mt-14 border-t border-line pt-8">
          <h2 className="text-[11px] font-medium tracking-[0.14em] text-muted uppercase">
            More PONS NEWS · {article.category}
          </h2>
          <ul className="mt-4 space-y-5">
            {related.map((item) => (
              <li key={item.slug}>
                <Link
                  to="/article/$slug"
                  params={{ slug: item.slug }}
                  className="font-serif text-xl leading-snug text-ink hover:text-ink-soft"
                >
                  {item.title}
                </Link>
                <p className="mt-1 text-xs text-muted">{item.time}</p>
              </li>
            ))}
          </ul>
        </section>
      ) : (
        <section className="mt-14 border-t border-line pt-8">
          <h2 className="text-[11px] font-medium tracking-[0.14em] text-muted uppercase">Pons book</h2>
          <ul className="mt-4 space-y-3">
            {live.slice(0, 6).map((item) => (
              <li key={item.slug}>
                <Link to="/article/$slug" params={{ slug: item.slug }} className="text-sm text-ink">
                  {item.ticker ?? item.title}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </main>
  );
}
