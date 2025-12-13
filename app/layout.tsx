import type { Metadata } from 'next'
import { geistMono, geistSans } from '@/lib/fonts'
import { cn } from '@/lib/utils'
import './globals.css'

export const metadata: Metadata = {
  title: 'Nodejourney',
  description: 'Nodejourney',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
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
