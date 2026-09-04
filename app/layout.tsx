import type { Metadata } from "next";
import localFont from "next/font/local";
import { meta } from "@/lib/content";
import "./globals.css";

// Fonts are self-hosted from the `fonts/` folder rather than pulled with
// `next/font/google`.
//
// Why: `next/font/google` downloads the font files from fonts.googleapis.com
// *at build time*, and the build fails outright if it can't reach Google.
// That makes deploys depend on a third party being up and reachable from
// whatever machine runs the build. Self-hosting removes that failure mode,
// and it also means Daniella's browser makes no request to Google at all.
//
// The CSS variable names below are unchanged (`--font-display`, `--font-body`,
// `--font-hand`), so tailwind.config.ts and every component work exactly as
// before — nothing else needed editing.
//
// Files are copied from the @fontsource packages in devDependencies. Refresh
// them any time with: npm run sync:fonts
const display = localFont({
  src: [
    { path: "../fonts/cormorant-garamond-500.woff2", weight: "500", style: "normal" },
    { path: "../fonts/cormorant-garamond-600.woff2", weight: "600", style: "normal" },
    { path: "../fonts/cormorant-garamond-700.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-display",
  display: "swap",
  fallback: ["Georgia", "Times New Roman", "serif"],
});

const body = localFont({
  src: [
    { path: "../fonts/eb-garamond-400.woff2", weight: "400", style: "normal" },
    { path: "../fonts/eb-garamond-500.woff2", weight: "500", style: "normal" },
    { path: "../fonts/eb-garamond-600.woff2", weight: "600", style: "normal" },
  ],
  variable: "--font-body",
  display: "swap",
  fallback: ["Georgia", "Times New Roman", "serif"],
});

const hand = localFont({
  src: [{ path: "../fonts/mrs-saint-delafield-400.woff2", weight: "400", style: "normal" }],
  variable: "--font-hand",
  display: "swap",
  fallback: ["Segoe Script", "Bradley Hand", "cursive"],
});

export const metadata: Metadata = {
  title: meta.title,
  description: meta.description,
  openGraph: {
    title: meta.title,
    description: meta.description,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: meta.title,
    description: meta.description,
  },
  icons: {
    // SVG scales crisply at any size and is supported by every modern browser.
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
    apple: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${hand.variable}`}>
      <body className="bg-charcoal text-ink font-serif antialiased">
        {children}
      </body>
    </html>
  );
}
