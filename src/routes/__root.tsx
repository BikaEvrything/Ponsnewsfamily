import { createRootRoute, HeadContent, Outlet, Scripts } from "@tanstack/react-router";
import { AuthProvider } from "@/lib/auth/provider";
import { LaunchReel } from "@/components/launch-reel";
import { PreviewHostBridge } from "@/components/preview-host-bridge";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import appCss from "../styles.css?url";

const APP_NAME = "PONS NEWS";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: APP_NAME },
      { name: "description", content: "News from the pons launchpad on Robinhood Chain." },
      { name: "theme-color", content: "#f6f4ef" },
    ],
    links: [
      { rel: "icon", type: "image/png", href: "/logo-pons.png" },
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
      { rel: "stylesheet", href: appCss },
      { rel: "manifest", href: "/__grok/manifest.webmanifest" },
      { rel: "apple-touch-icon", href: "/__grok/icon-180.png" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500&family=Instrument+Serif&family=Inter:ital,opsz,wght@0,14..32,400..600;1,14..32,400..600&display=swap",
      },
    ],
  }),
  component: RootDocument,
});

function RootDocument() {
  return (
    <html lang="en" suppressHydrationWarning className="antialiased">
      <head>
        <HeadContent />
      </head>
      <body>
        <PreviewHostBridge />
        <AuthProvider>
          <LaunchReel />
          <div className="min-h-dvh bg-paper text-ink">
            <SiteHeader />
            <Outlet />
            <SiteFooter />
          </div>
        </AuthProvider>
        <Scripts />
      </body>
    </html>
  );
}
