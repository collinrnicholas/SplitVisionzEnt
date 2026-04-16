# Split Visionz — Private Tattoo Studio

Next.js 16 · TypeScript · Tailwind · App Router

## Stack
- **Frontend**: Next.js (App Router, static export)
- **Hosting**: Vercel (frontend) + Railway (API/backend)
- **Fonts**: Bebas Neue, Cormorant Garamond, Space Mono via Google Fonts

## Local dev

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Deploy

Push to `main` → Vercel auto-deploys.

## Connecting the booking form to Railway

In `app/components/Booking.tsx`, find the commented line:

```ts
// await fetch('/api/inquire', { method: 'POST', body: new FormData(e.currentTarget) })
```

Uncomment and point the URL to your Railway API endpoint.
Set `NEXT_PUBLIC_API_URL` in Vercel environment variables.

## Adding portfolio photos

Portfolio images live in `public/images/portfolio/`. The grid expects these six JPG files:

```
public/images/portfolio/DSC03411.jpg
public/images/portfolio/IMG_4496.jpg
public/images/portfolio/IMG_4957.jpg
public/images/portfolio/IMG_5231.jpg
public/images/portfolio/IMG_5333.jpg
public/images/portfolio/IMG_6086.jpg
```

**If you have HEIC files** (e.g. from iPhone), drop them into the folder and run:

```bash
./scripts/convert-images.sh
```

This uses macOS `sips` to convert all `.heic` files to `.jpg` (quality 85) and deletes the originals.

To update the portfolio:
1. Add or replace JPG files in `public/images/portfolio/` with the names above.
2. Commit and push to GitHub — Vercel will auto-deploy.

Any missing file falls back to a dark placeholder with a gold border, so the layout won't break. The SV monogram at `public/images/sv-logo.png` behaves the same way — if it's absent, an ornate gold "SV" text monogram renders instead.

## Customisation checklist
- [ ] Replace studio name / branding in `app/layout.tsx` and `Nav.tsx`
- [ ] Swap SVG artwork placeholders in `Portfolio.tsx` with real photography
- [ ] Update contact email in `Booking.tsx`
- [ ] Add real Instagram URL in `Footer.tsx`
- [ ] Wire booking form to Railway API
- [ ] Add custom domain in Vercel dashboard
