'use client'

import { useEffect, useState } from 'react'
import { Logo } from '@/components/icons/logo'
import { CtaButton } from '@/components/cta-button'

export function StickyHeader() {
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
      className={`fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b border-gray-200/50 transition-transform duration-300 ease-out ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <div className="flex items-center justify-between w-full max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center gap-1.5">
          <Logo className="size-4" />
          <span className="text-[15px] font-semibold tracking-tight">Nodejourney</span>
        </div>
        <CtaButton size="xs">Download for macOS</CtaButton>
      </div>
    </div>
  )
}
