import type { Metadata } from "next";
import { Cormorant_Garamond, EB_Garamond, Mrs_Saint_Delafield } from "next/font/google";
import { meta } from "@/lib/content";
import "./globals.css";

const display = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display",
});

const body = EB_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
});

const hand = Mrs_Saint_Delafield({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-hand",
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
    icon: "/favicon.ico",
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
