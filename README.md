# Karan Bisht — Portfolio

A fast, single-page developer portfolio built with **React 19 + Vite** — the same
stack and architecture used by the reference site (anubhavchoubey.com). It compiles
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

## Deploy to Vercel (recommended — matches the reference site)
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
- **`src/components/Sidebar.jsx`** — name, tagline, social links, résumé button.
- **`src/components/MainContent.jsx`** — about, skills, projects, experience,
  education, certifications, contact (edit the `skills`, `projects`, `experience`,
  `certifications` arrays).
- **`public/Karan_Bisht_Resume.pdf`** — replace to update the résumé download.
- Colors and theme tokens live in `src/index.css` (`:root`).

## Adding your photo
Drop a square image at `src/assets/karan.png`, then in `Sidebar.jsx` replace the
`<div className="avatar">…</div>` block with:
```jsx
import karan from '../assets/karan.png'
// ...
<img className="avatar" src={karan} alt="Karan Bisht" />
```
