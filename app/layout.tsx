import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/next'

import { BodyBackground } from '@/components/body-background'
import { geistMono, geistSans } from '@/lib/fonts'
import { ThemeProvider } from '@/lib/theme-context'
import { cn } from '@/lib/utils'

import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://nodejourney.com'),
  title: 'Nodejourney - AI Image Generation Canvas',
  description:
    'AI image generation canvas with no backend, no logins, no subscriptions. Use your own API keys and save projects as portable files.',
  keywords: [
    'AI image generation',
    'canvas',
    'OpenAI',
    'Replicate',
    'Anthropic',
    'Gemini',
    'Fal',
    'privacy-first',
  ],
  authors: [{ name: 'Jason Jun', url: 'https://x.com/jsonjun' }],
  creator: 'Jason Jun',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://nodejourney.com',
    siteName: 'Nodejourney',
    title: 'Nodejourney - AI Image Generation Canvas',
    description:
      'AI image generation canvas with no backend, no logins, no subscriptions. Use your own API keys.',
    images: [
      {
        url: '/images/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Nodejourney logo and tagline',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nodejourney - AI Image Generation Canvas',
    description: 'AI image generation canvas with no backend, no logins, no subscriptions.',
    creator: '@jsonjun',
    images: ['/images/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
}

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Nodejourney',
  url: 'https://nodejourney.com',
  logo: 'https://nodejourney.com/icon.png',
  sameAs: ['https://x.com/jsonjun'],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body
        className={cn(
          'min-h-screen font-sans antialiased bg-background',
          geistSans.variable,
          geistMono.variable
        )}
      >
        <ThemeProvider>
          <BodyBackground>{children}</BodyBackground>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
