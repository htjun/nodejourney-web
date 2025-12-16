'use client'

import { CtaButton } from '@/components/cta-button'
import { ImageCarouselDom } from '@/components/image-carousel-dom'
import { IMAGE_THEMES } from '@/lib/data/home'
import { useTheme } from '@/lib/theme-context'

interface HeroSectionProps {
  downloadUrl?: string
  version?: string
}

export function HeroSection({ downloadUrl, version }: HeroSectionProps) {
  const { imageIndex, setImageIndex } = useTheme()

  return (
    <>
      <section className="flex flex-col gap-12">
        <h1 className="text-2xl max-w-[600px]">
          AI image gen canvas with no backend, no logins, no subs. Use your own keys and save
          projects as files.
        </h1>
        <div id="hero-cta" className="flex items-center gap-6">
          <CtaButton size="md" href={downloadUrl} colors={IMAGE_THEMES[imageIndex].colors}>
            Download for macOS
          </CtaButton>
          {version && <small className="text-gray-400">{version}</small>}
        </div>
      </section>
      <section>
        <ImageCarouselDom className="rounded-xs" onIndexChange={setImageIndex} />
      </section>
    </>
  )
}
