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

Portfolio images live in `public/images/portfolio/`. The grid expects six files named exactly:

```
public/images/portfolio/photo1.jpg
public/images/portfolio/photo2.jpg
public/images/portfolio/photo3.jpg
public/images/portfolio/photo4.jpg
public/images/portfolio/photo5.jpg
public/images/portfolio/photo6.jpg
```

To update the portfolio:
1. Save your JPG files into `public/images/portfolio/` with the names above.
2. Commit and push to GitHub — Vercel will auto-deploy.

Any missing file falls back to a dark placeholder with a gold border, so the layout won't break. The SV monogram at `public/images/sv-logo.png` behaves the same way — if it's absent, an ornate gold "SV" text monogram renders instead.

## Customisation checklist
- [ ] Replace studio name / branding in `app/layout.tsx` and `Nav.tsx`
- [ ] Swap SVG artwork placeholders in `Portfolio.tsx` with real photography
- [ ] Update contact email in `Booking.tsx`
- [ ] Add real Instagram URL in `Footer.tsx`
- [ ] Wire booking form to Railway API
- [ ] Add custom domain in Vercel dashboard
