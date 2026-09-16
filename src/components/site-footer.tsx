export function SiteFooter() {
  return (
    <footer className="mx-auto mt-16 w-full max-w-6xl px-4 pb-10 sm:px-6" aria-label="Site footer">
      <div className="rounded-[28px] border border-line bg-card px-6 py-8 sm:px-8">
        <div className="grid gap-8 sm:grid-cols-4">
          <div className="sm:col-span-2">
            <p className="flex items-center gap-2.5 font-serif text-2xl tracking-tight text-ink">
              <img
                src="/logo-pons.png"
                alt=""
                width={32}
                height={32}
                className="size-8 rounded-[8px] object-contain"
              />
              PONS NEWS
            </p>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-muted text-pretty">
              The PONS NEWS desk covers Pons and only Pons. Protocol notes, market prints, and
              launchpad status land here when Pons updates. This desk does not custody assets and
              does not give financial advice.
            </p>
          </div>
          <nav aria-label="PONS NEWS">
            <p className="text-[11px] font-medium tracking-[0.14em] text-muted uppercase">
              PONS NEWS
            </p>
            <ul className="mt-3 space-y-2 text-sm text-ink-soft">
              <li>
                <a className="hover:text-ink" href="https://x.com/ponsnewsfamily">
                  @ponsnewsfamily
                </a>
              </li>
              <li>
                <a className="hover:text-ink" href="https://www.ponsfamily.com/launchpad">
                  Pons source
                </a>
              </li>
              <li>
                <a className="hover:text-ink" href="https://docs.ponsfamily.com">
                  Pons docs
                </a>
              </li>
            </ul>
          </nav>
          <div>
            <p className="text-[11px] font-medium tracking-[0.14em] text-muted uppercase">
              Risk notice
            </p>
            <p className="mt-3 text-sm leading-relaxed text-muted text-pretty">
              Tokens can be volatile or lose all value. Prints on this desk follow Pons. They are
              not a recommendation.
            </p>
          </div>
        </div>
        <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-5 text-xs text-muted">
          <p>© 2026 PONS NEWS.</p>
          <a
            href="https://x.com/ponsnewsfamily"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-ink-soft hover:text-ink"
            aria-label="PONS NEWS on X"
          >
            @ponsnewsfamily
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
}
