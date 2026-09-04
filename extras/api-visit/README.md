# Preserved: the optional "letter opened" endpoint

`route.ts` in this folder used to live at `app/api/visit/route.ts`.

It was moved **out** of `app/` — not deleted — because `next.config.js` now
sets `output: "export"`, which builds the site into a plain folder of static
files for Firebase Hosting's free plan. Static builds cannot contain API
routes, so leaving this file inside `app/` would fail the build.

Nothing of value was lost. Without a `DATABASE_URL` this endpoint already
returned `{ "recorded": false }` and did nothing at all — the letter has
never depended on it.

`app/page.tsx` no longer calls it either. That call is now gated behind
`NEXT_PUBLIC_VISIT_ENDPOINT`, which is unset in the static build, so the
browser makes **zero** requests to a dead URL.

## Putting it back

Only worth doing if you move to a host with SSR (Firebase Hosting + Cloud
Functions on the Blaze plan, or Vercel/Netlify):

```bash
mkdir -p app/api/visit
cp extras/api-visit/route.ts app/api/visit/route.ts
```

Then remove `output: "export"` and `images.unoptimized` from `next.config.js`,
run `npm run build:server` (which regenerates the Prisma client), and set
`NEXT_PUBLIC_VISIT_ENDPOINT=/api/visit` so the page starts reporting again.
