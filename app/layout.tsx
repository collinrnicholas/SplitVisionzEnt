import type { Metadata } from 'next'
import './globals.css'

const SITE_URL = 'https://splitvisionzentertainment.com'

export const metadata: Metadata = {
  title: 'Split Visionz | Custom Tattoo Artist | Springfield, VA | Elliot Brawner',
  description:
    'Private custom tattoo studio in Springfield, Virginia. Ornate, illustrative, and botanical tattooing by Elliot Brawner. By appointment only.',
  keywords: [
    'tattoo artist Springfield VA',
    'custom tattoo Northern Virginia',
    'private tattoo studio',
    'Elliot Brawner tattoo',
    'Split Visionz',
  ],
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    title: 'Split Visionz | Custom Tattoo Artist | Springfield, VA',
    description:
      'Private custom tattoo studio in Springfield, Virginia. Ornate, illustrative, and botanical tattooing by Elliot Brawner. By appointment only.',
    type: 'website',
    url: SITE_URL,
    siteName: 'Split Visionz',
    images: [
      {
        url: `${SITE_URL}/images/sv-logo2.jpeg`,
        width: 1200,
        height: 630,
        alt: 'Split Visionz — private tattoo studio by Elliot Brawner in Springfield, Virginia',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Split Visionz | Custom Tattoo Artist | Springfield, VA',
    description:
      'Private custom tattoo studio in Springfield, Virginia. Ornate, illustrative, and botanical tattooing by Elliot Brawner. By appointment only.',
    images: [`${SITE_URL}/images/sv-logo2.jpeg`],
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'Split Visionz',
  description:
    'Private custom tattoo studio in Springfield, Virginia. By appointment only.',
  url: SITE_URL,
  image: `${SITE_URL}/images/sv-logo2.jpeg`,
  priceRange: '$$$$',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Springfield',
    addressRegion: 'VA',
    addressCountry: 'US',
  },
  founder: {
    '@type': 'Person',
    name: 'Elliot Brawner',
  },
  sameAs: ['https://instagram.com/sv_ink'],
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    description: 'By appointment only',
  },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Custom Tattoo Services',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Custom Tattoo',
          description:
            'Ornate, illustrative, and botanical custom tattoos by Elliot Brawner',
        },
      },
    ],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
