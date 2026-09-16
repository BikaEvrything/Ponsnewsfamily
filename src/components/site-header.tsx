import { Link } from "@tanstack/react-router";
import { Moon, Play, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { replayLaunchFilm } from "@/components/launch-reel";

function XMark() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

export function SiteHeader() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const stored = window.localStorage.getItem("ponsnews-theme");
    const next =
      stored === "dark" || stored === "light"
        ? stored
        : window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light";
    setTheme(next);
    document.documentElement.dataset.theme = next;
  }, []);

  function toggleTheme() {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.dataset.theme = next;
    window.localStorage.setItem("ponsnews-theme", next);
  }

  return (
    <header className="sticky top-0 z-40 px-3 pt-3 sm:px-5">
      <div
        className="mx-auto flex max-w-6xl items-center justify-between gap-3 rounded-[22px] border border-line/80 bg-card/75 px-3 py-2 shadow-[0_1px_0_rgba(17,17,17,0.04)] backdrop-blur-[8px] saturate-150"
        style={{ WebkitBackdropFilter: "blur(8px) saturate(150%)" }}
      >
        <Link to="/" className="flex min-w-0 items-center gap-2.5" aria-label="PONS NEWS home">
          <img
            src="/logo-pons.png"
            alt=""
            width={40}
            height={40}
            className="size-10 shrink-0 rounded-[10px] object-contain sm:size-11"
          />
          <span className="font-serif text-lg leading-none tracking-tight text-ink sm:text-xl">
            PONS NEWS
          </span>
        </Link>
        <nav className="flex items-center gap-1.5 sm:gap-2">
          <button
            type="button"
            onClick={() => replayLaunchFilm()}
            className="hidden h-11 items-center gap-2 rounded-full border border-line px-3 text-xs font-medium text-ink-soft sm:inline-flex"
            aria-label="Play launch film"
          >
            <Play className="size-3.5" />
            Launch film
          </button>
          <a
            href="https://www.ponsfamily.com/launchpad"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden rounded-full border border-line px-3 py-2 text-xs font-medium text-ink-soft sm:inline-flex"
          >
            Launchpad
          </a>
          <a
            href="https://x.com/ponsnewsfamily"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-11 items-center gap-2 rounded-full border border-line bg-ink px-3.5 text-xs font-medium text-paper"
            aria-label="PONS NEWS on X, @ponsnewsfamily"
          >
            <XMark />
            <span className="hidden sm:inline">@ponsnewsfamily</span>
            <span className="sm:hidden">X</span>
          </a>
          <button
            type="button"
            onClick={toggleTheme}
            className="inline-flex size-11 items-center justify-center rounded-full border border-line text-ink-soft"
            aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
          >
            {theme === "dark" ? <Sun className="size-4" /> : <Moon className="size-4" />}
          </button>
        </nav>
      </div>
    </header>
  );
}
