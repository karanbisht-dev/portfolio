# Karan Bisht — Portfolio

A fast, single-page developer portfolio built with **React 19 + Vite**. It compiles
to static files and is meant to be served from a CDN (Vercel), so it stays fast with
no lag no matter how many people visit at once.

## Why it scales effortlessly
There is **no backend and no per-request work**. `npm run build` produces a folder of
static HTML/CSS/JS (`dist/`). When deployed to Vercel, those files are cached at the
edge CDN and served straight to every visitor — the server does essentially nothing
per request, so 10 or 10,000 concurrent users feel identical.

## Local development
```bash
npm install       # first time only
npm run dev       # start dev server → http://localhost:5173
```

## Production build
```bash
npm run build     # outputs static site to dist/
npm run preview   # preview the production build locally
```

## Deploy to Vercel
1. Push this folder to a GitHub repo.
2. Go to https://vercel.com → **Add New → Project** → import the repo.
3. Vercel auto-detects Vite (settings already in `vercel.json`). Click **Deploy**.
4. Add your custom domain (e.g. `karanbisht.com`) in Project → Settings → Domains.

Or from the CLI:
```bash
npm i -g vercel
vercel            # preview deploy
vercel --prod     # production deploy
```

Netlify / GitHub Pages / Cloudflare Pages work too — just serve the `dist/` folder.

## Editing your content
All content lives in plain data at the top of the components — no CMS needed:
- **`index.html`** — page title, meta description and Open Graph tags.
- **`src/components/Hero.jsx`** — headline, tagline and social links.
- **`src/components/MainContent.jsx`** — about, stats, experience, projects,
  education, achievements and contact (edit the `stats`, `projects`,
  `experience` and `certifications` arrays).
- **`src/components/Journey.jsx`**, **`SkillShuffle.jsx`**, **`Marquee.jsx`** —
  journey timeline, skill cards and scrolling keywords.
- Colors and theme tokens live in `src/index.css` (`:root`).
