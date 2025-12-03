import type { Metadata } from 'next'
import { geistMono, geistSans } from '@/lib/fonts'
import './globals.css'

export const metadata: Metadata = {
  title: 'NodeJourney',
  description: 'NodeJourney',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>{children}</body>
    </html>
  )
}
