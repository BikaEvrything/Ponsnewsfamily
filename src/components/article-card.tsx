import { Link } from "@tanstack/react-router";
import { PriceChart } from "@/components/price-chart";
import type { Article } from "@/lib/news";

export function ArticleCard({ article, featured = false }: { article: Article; featured?: boolean }) {
  const spark = article.spark;
  const up = !article.change?.startsWith("-");
  return (
    <Link
      to="/article/$slug"
      params={{ slug: article.slug }}
      className={
        featured
          ? "group block rounded-[28px] border border-line bg-card p-6 sm:p-8"
          : "group grid gap-4 border-b border-line py-5 last:border-b-0 sm:grid-cols-[minmax(0,1fr)_160px] sm:items-center"
      }
    >
      <div>
        <div className="flex items-center gap-2 text-[11px] tracking-[0.12em] text-muted uppercase">
          <span>{article.category}</span>
          <span aria-hidden>·</span>
          <span className="tabular-nums">{article.time}</span>
          {article.ticker ? (
            <>
              <span aria-hidden>·</span>
              <span className="font-mono tracking-normal text-ink-soft normal-case">{article.ticker}</span>
            </>
          ) : null}
        </div>
        <h2
          className={
            featured
              ? "mt-3 font-serif text-[clamp(1.8rem,4vw,3.1rem)] leading-[1.12] tracking-tight text-balance text-ink group-hover:text-ink-soft"
              : "mt-2 font-serif text-[1.35rem] leading-snug tracking-tight text-balance text-ink group-hover:text-ink-soft"
          }
        >
          {article.title}
        </h2>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted text-pretty">{article.dek}</p>
      </div>
      {spark?.length ? (
        <div className={featured ? "mt-6" : ""}>
          <PriceChart values={spark} up={up} height={featured ? 180 : 72} label={`${article.ticker ?? article.title} chart`} />
        </div>
      ) : null}
    </Link>
  );
}
