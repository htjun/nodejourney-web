import type { Metadata } from 'next'
import { geistMono, geistSans } from '@/lib/fonts'
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
        url: '/images/app-01.jpg',
        width: 1400,
        height: 900,
        alt: 'Nodejourney app screenshot',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nodejourney - AI Image Generation Canvas',
    description: 'AI image generation canvas with no backend, no logins, no subscriptions.',
    creator: '@jsonjun',
    images: ['/images/app-01.jpg'],
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
        {children}
      </body>
    </html>
  )
}
