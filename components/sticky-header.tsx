'use client'

import { useEffect, useState } from 'react'

import { CtaButton } from '@/components/cta-button'
import { Logo } from '@/components/logo'
import { IMAGE_THEMES } from '@/lib/data/home'
import { useTheme } from '@/lib/theme-context'
import { cn } from '@/lib/utils'

type StickyHeaderProps = {
  downloadUrl?: string
}

export function StickyHeader({ downloadUrl }: StickyHeaderProps) {
  const [isVisible, setIsVisible] = useState(false)
  const { imageIndex } = useTheme()

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

  const bgColor = IMAGE_THEMES[imageIndex].bgColor

  return (
    <div
      className={cn(
        'fixed top-0 left-0 right-0 z-50 backdrop-blur-sm border-b border-gray-200/50 transition-all duration-300 ease-out',
        isVisible ? 'translate-y-0' : '-translate-y-full'
      )}
      style={{ backgroundColor: `${bgColor}cc` }}
    >
      <div className="flex items-center justify-between w-full max-w-7xl mx-auto px-4 py-3">
        <Logo />
        <CtaButton size="xs" href={downloadUrl} colors={IMAGE_THEMES[imageIndex].colors}>
          Download
        </CtaButton>
      </div>
    </div>
  )
}
