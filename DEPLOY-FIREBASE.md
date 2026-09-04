# Deploying to Firebase Hosting (free plan)

This site is already configured for Firebase Hosting. You only need to run a
handful of commands — no card, no paid plan, no server to manage.

Estimated time: about 10 minutes the first time, ~30 seconds every time after.

---

## What's already been done for you

You don't need to touch any of this, but here's why the repo looks the way it
does now:

| Change | Why |
| --- | --- |
| `next.config.js` sets `output: "export"` | Makes `next build` produce a plain `out/` folder of static files — what Firebase Hosting serves on the free plan. No Node server or Cloud Functions needed. |
| `next.config.js` sets `images.unoptimized` | Next's image resizer only exists on a Node server. Without this, every photo would request `/_next/image` and 404. |
| Fonts moved into `fonts/` + `next/font/local` | `next/font/google` downloads fonts from Google **at build time** and the build fails outright if it can't reach them. Self-hosting removes that failure mode, and Daniella's browser makes no request to Google either. |
| `app/api/visit/` moved to `extras/api-visit/` | Static builds can't contain API routes. It was already a no-op without a database, so nothing is lost. `app/page.tsx` no longer calls it. See `extras/api-visit/README.md`. |
| `public/favicon.svg` | `layout.tsx` pointed at a `/favicon.ico` that didn't exist, so the browser tab had no icon. |
| `next` 14.2.15 → 14.2.35 | 14.2.15 has a published security advisory. Patch-level bump, nothing else changed. |

Verified: `npm run build` produces 38 files / 7.7 MB in `out/`, and every
`src`/`href` in the output is a relative local path — **zero** third-party
requests.

---

## Step 1 — Install the Firebase CLI

```bash
npm install -g firebase-tools
firebase --version
```

**Windows:** if PowerShell refuses with *"running scripts is disabled"*, use
Command Prompt instead, or run PowerShell as Administrator. If `firebase`
isn't recognised after installing, run `npm config get prefix` and add that
folder to your PATH.

## Step 2 — Log in to your Google account

```bash
firebase login
```

A browser window opens. Sign in and allow access. No browser on that machine?
Use `firebase login --no-localhost` — it gives you a URL and a code to paste
back.

Check it worked:

```bash
firebase login:list
```

## Step 3 — Create a Firebase project (one time)

1. Go to <https://console.firebase.google.com>
2. Click **Add project** (or **Create a project**).
3. Name it something you'll recognise, e.g. `For Daniella`.
4. **Google Analytics: turn it off.** This site doesn't use it, and switching
   it off avoids a few extra prompts.
5. Click **Create project**, wait for it to finish, then **Continue**.

Now find your **Project ID** — it's shown at the top of the project Overview
page, and in *Project settings → General*. It looks like
`for-daniella-4c2a1`. Firebase generates it from your project name; you can
click **Edit** to pick your own, but it has to be globally unique across all
of Firebase, so expect to add a few numbers.

> You do **not** need to enable Hosting in the console, add a payment method,
> or upgrade to Blaze. New projects are on the free Spark plan by default and
> Hosting is included.

## Step 4 — Point this repo at that project

`.firebaserc` is **already set to `for-daniella`**. If that's your Project ID,
skip this step entirely — go straight to Step 5.

If your Project ID is different, run this with your real one:

```bash
firebase use for-daniella-4c2a1
```

That rewrites `.firebaserc` for you. Confirm with:

```bash
firebase use            # prints the active project
firebase projects:list  # lists everything your account can see
```

> **Gotcha:** the Firebase CLI reads and validates `.firebaserc` *before* it
> runs any command. If that file contains a malformed Project ID — an
> uppercase letter, a space, a placeholder — then **every** command fails with
> `Error: Invalid project id`, including `firebase login` and the very
> `firebase use` you'd use to fix it. The escape is to edit `.firebaserc`
> directly in a text editor. Project IDs must be lowercase letters, digits
> and hyphens only.

## Step 5 — Build and deploy

```bash
npm install
npm run build
firebase deploy --only hosting
```

Or as a single command, which does both:

```bash
npm run deploy
```

The first deploy takes a minute or two to upload ~7.7 MB. At the end you'll
see:

```
Hosting URL: https://for-daniella-4c2a1.web.app
```

Open it. **Both** of these URLs work and both have free SSL:

- `https://<project-id>.web.app`
- `https://<project-id>.firebaseapp.com`

## Step 6 — Check it before you send it

Open the URL on your **phone**, not just your computer:

- Break the wax seal — the envelope should open.
- Scroll the entire letter; each section should fade in.
- Confirm the three photos appear (and aren't the dashed "a memory" box).
- Confirm the fonts look like elegant serifs and handwriting, not plain
  Times New Roman.
- Check the browser tab shows the wax-seal favicon.

---

## Updating the letter later

Edit `lib/content.ts`, or drop new photos into `public/images/`, then:

```bash
npm run deploy
```

Live in about 30 seconds. Firebase keeps the previous release, so if you
break something: **Console → Hosting → Release history → rollback**.

### Previewing a change privately first

Send a draft to yourself without touching the live letter:

```bash
npm run build
firebase hosting:channel:deploy draft1
```

That gives you a temporary preview URL only you have. Delete it with
`firebase hosting:channel:delete draft1`.

### Checking the build locally

```bash
npm run build
npm run preview:static   # serves out/ at http://localhost:5000
```

This serves the exact files Firebase will serve — closer to production than
`npm run dev`.

---

## Optional: a custom domain

If you'd rather send `https://fordaniella.com` than a `.web.app` address:

1. Buy a domain (Namecheap, Cloudflare, Google's successors, etc.).
2. **Console → Hosting → Add custom domain.**
3. Firebase gives you two DNS records to add at your registrar.
4. Wait for it to verify and issue the certificate — usually 15 minutes to a
   few hours. SSL is free and auto-renewing.

The `.web.app` URL keeps working alongside it.

---

## Three things worth knowing

### 1. The free plan caps you at 360 MB of transfer per day

A first visit currently downloads about **3.3 MB**, because `us-02.jpg` alone
is 2.4 MB. That's roughly **100 first-time visits per day**.

For one person reading one letter, that's plenty. But if the link gets shared
around and you exceed 360 MB, the free plan **blocks the site until the daily
quota resets** — it does not silently charge you. Worth compressing the
photos if you think this will circulate; shrinking them to ~300 KB total
would raise the ceiling to several hundred visits a day and load much faster
on mobile data.

### 2. Photos you aren't using are still publicly downloadable

`public/images/` holds 11 photos (6.6 MB) but the letter only references
three: `childhood-01.jpg`, `daniella-02.jpg` and `us-02.jpg`. Everything in
`public/` gets deployed, so all 11 are reachable by anyone who guesses the
filename — e.g. `https://<project-id>.web.app/images/daniella-01.jpg`.

If that bothers you, move the eight unused photos somewhere outside
`public/` (a `private-photos/` folder in the repo works and never deploys).

### 3. A Hosting URL is public, not password-protected

Anyone with the link can read the letter. Firebase Hosting on the free plan
has no built-in authentication. The Project ID in the URL is effectively
unguessable, which is fine for sharing with one person — just don't post the
link publicly if the letter is meant to be private.

Also keep the GitHub repository **private**: it contains her photos and the
letter text.

---

## Troubleshooting

**`Error: Invalid project id: YOUR-PROJECT-ID` (or any other ID) — on every command, including `firebase login`**
`.firebaserc` holds an ID Firebase rejects, and the CLI validates that file
before running anything. Project IDs must be **lowercase letters, digits and
hyphens only** — no capitals, no spaces, no underscores. Edit `.firebaserc`
directly in a text editor and put the real lowercase ID in, then retry. You
cannot fix this with `firebase use`, because `firebase use` is itself blocked
by it.

**`Error: Failed to get Firebase project <id>`**
The ID is well-formed but doesn't exist, or your logged-in account can't see
it. Check `firebase projects:list`.

**`HTTP Error: 404, Project ... does not exist`**
Wrong Project ID, or you're logged into a different Google account than the
one that owns the project. Check `firebase login:list` and
`firebase projects:list`.

**`HTTP Error: 403, Permission denied`**
Your account isn't an Owner or Editor of that project. Fix membership in
*Console → IAM & Admin*.

**Photos show the dashed "a memory" placeholder**
The filename in `lib/content.ts` doesn't match the file in `public/images/`.
Firebase is **case-sensitive** even though Windows isn't — `Daniella-02.jpg`
and `daniella-02.jpg` are different files. Match the case exactly.

**Fonts look like plain Georgia / Times New Roman**
The `fonts/` folder didn't get copied. Run `npm run sync:fonts`, then rebuild.

**Build fails with "Failed to fetch ... from Google Fonts"**
Only happens if you switch back to `next/font/google`. The current setup
self-hosts fonts and can't hit this. If you do want Google Fonts back, see
`app/layout.tsx` for what changed.

**`firebase deploy` uploads nothing / says the site is up to date**
You probably forgot to rebuild. `npm run deploy` builds and deploys together.

---

## Switching to SSR later

If you ever want server-side rendering — to bring back `/api/visit`, or to add
pages that need a database — Firebase can do it with Cloud Functions, but that
requires the paid **Blaze** plan. The repo is already set up for it:

```bash
npm run build:server   # NEXT_OUTPUT=server → normal .next/ build, Prisma regenerated
firebase init hosting  # choose "Next.js" when asked about framework support
```

Then restore the endpoint per `extras/api-visit/README.md`. For this letter,
the static setup above is the better choice: free, faster, and nothing about
the site needs a server.

---

## Alternative hosts

Same static build works anywhere. `npm run build` produces `out/`, and any of
these will serve it:

- **Vercel** — best fit for Next.js; auto-deploys from GitHub on every push.
- **Netlify** — drag the `out/` folder onto their deploy page, done.
- **GitHub Pages** — free, but the repo would need to be public, which you
  don't want for a personal letter.
- **Cloudflare Pages** — free, generous bandwidth, private repo support.

Firebase Hosting is a good choice; it just isn't uniquely required.
