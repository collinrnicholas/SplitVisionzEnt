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

## Customisation checklist
- [ ] Replace studio name / branding in `app/layout.tsx` and `Nav.tsx`
- [ ] Swap SVG artwork placeholders in `Portfolio.tsx` with real photography
- [ ] Update contact email in `Booking.tsx`
- [ ] Add real Instagram URL in `Footer.tsx`
- [ ] Wire booking form to Railway API
- [ ] Add custom domain in Vercel dashboard
