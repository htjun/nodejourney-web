'use client'

import { useEffect, type ReactNode } from 'react'

import { IMAGE_THEMES } from '@/lib/data/home'
import { useTheme } from '@/lib/theme-context'

export function BodyBackground({ children }: { children: ReactNode }) {
  const { imageIndex } = useTheme()

  useEffect(() => {
    const bgColor = IMAGE_THEMES[imageIndex].bgColor
    document.body.style.backgroundColor = bgColor
    document.body.style.transition = 'background-color 800ms ease-out'
  }, [imageIndex])

  return <>{children}</>
}
