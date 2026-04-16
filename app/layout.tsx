import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Split Visionz — Private Tattoo Studio',
  description: 'Singular works of permanent art, made in intimate collaboration. By appointment only.',
  openGraph: {
    title: 'Split Visionz — Private Tattoo Studio',
    description: 'Singular works of permanent art. By appointment only.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
