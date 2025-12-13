'use client'

import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'
import { Logo } from '@/components/logo'
import { CtaButton } from '@/components/cta-button'

type StickyHeaderProps = {
  downloadUrl?: string
}

export function StickyHeader({ downloadUrl }: StickyHeaderProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const ctaButton = document.getElementById('hero-cta')
    if (!ctaButton) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(!entry.isIntersecting)
      },
      { threshold: 0 }
    )

    observer.observe(ctaButton)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      className={cn(
        'fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b border-gray-200/50 transition-transform duration-300 ease-out',
        isVisible ? 'translate-y-0' : '-translate-y-full'
      )}
    >
      <div className="flex items-center justify-between w-full max-w-7xl mx-auto px-4 py-3">
        <Logo />
        <CtaButton size="xs" href={downloadUrl}>
          Download for macOS
        </CtaButton>
      </div>
    </div>
  )
}
