// This site is deployed as a fully static bundle on Firebase Hosting's free
// (Spark) plan, so `next build` emits a plain `out/` folder of HTML/CSS/JS
// that any static host can serve — no Node server, no Cloud Functions.
//
// The letter is a single "use client" page, so nothing is lost by doing this.
//
// Escape hatch: `npm run build:server` sets NEXT_OUTPUT=server, which turns
// this back into a normal SSR build (into `.next/`) for a host with Node —
// Firebase Hosting + Cloud Functions on the Blaze plan, or Vercel/Netlify.
// That's the build you'd use to bring the optional /api/visit endpoint back;
// see extras/api-visit/README.md.
const isStatic = process.env.NEXT_OUTPUT !== "server";

/** @type {import('next').NextConfig} */
const nextConfig = {
  ...(isStatic ? { output: "export" } : {}),
  reactStrictMode: true,
  images: {
    // Firebase Hosting serves the original files straight from `out/`, and
    // Next's image optimiser only exists on a Node server. `unoptimized`
    // makes <Image> render a plain, perfectly good <img> instead of asking
    // for /_next/image, which would 404 on a static host.
    ...(isStatic
      ? { unoptimized: true }
      : { formats: ["image/avif", "image/webp"] }),
  },
  // Emits `out/index.html` rather than `out/index/index.html`, which keeps
  // URLs clean (https://your-project.web.app/) and matches Firebase's
  // `cleanUrls` setting in firebase.json.
  trailingSlash: false,
};

module.exports = nextConfig;
