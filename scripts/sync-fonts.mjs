// Re-copies the self-hosted font files out of the @fontsource packages in
// node_modules and into `fonts/`, where next/font/local picks them up.
//
// Run with: npm run sync:fonts
//
// You only need this if you want newer font versions, or if you add a weight.
// Written in plain Node (no shell) so it behaves identically on Windows,
// macOS and Linux.

import { copyFileSync, mkdirSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

// [ package, source filename, destination filename ]
const FONTS = [
  ["cormorant-garamond", "cormorant-garamond-latin-500-normal.woff2", "cormorant-garamond-500.woff2"],
  ["cormorant-garamond", "cormorant-garamond-latin-600-normal.woff2", "cormorant-garamond-600.woff2"],
  ["cormorant-garamond", "cormorant-garamond-latin-700-normal.woff2", "cormorant-garamond-700.woff2"],
  ["eb-garamond", "eb-garamond-latin-400-normal.woff2", "eb-garamond-400.woff2"],
  ["eb-garamond", "eb-garamond-latin-500-normal.woff2", "eb-garamond-500.woff2"],
  ["eb-garamond", "eb-garamond-latin-600-normal.woff2", "eb-garamond-600.woff2"],
  ["mrs-saint-delafield", "mrs-saint-delafield-latin-400-normal.woff2", "mrs-saint-delafield-400.woff2"],
];

const dest = join(root, "fonts");
mkdirSync(dest, { recursive: true });

let copied = 0;

for (const [pkg, srcName, destName] of FONTS) {
  const src = join(root, "node_modules", "@fontsource", pkg, "files", srcName);

  if (!existsSync(src)) {
    console.error(`✗ missing ${src}\n  → is @fontsource/${pkg} installed? Try: npm install`);
    process.exitCode = 1;
    continue;
  }

  copyFileSync(src, join(dest, destName));
  console.log(`✓ fonts/${destName}`);
  copied += 1;
}

console.log(`\n${copied}/${FONTS.length} font files synced into fonts/`);
