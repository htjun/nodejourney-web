'use client'

import { CtaButton } from '@/components/cta-button'
import { ImageCarousel } from '@/components/image-carousel'
import { IMAGE_THEMES } from '@/lib/data/home'
import { useTheme } from '@/lib/theme-context'
import Link from 'next/link'

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
        <div id="hero-cta" className="flex flex-col gap-3">
          <div className="flex items-center gap-6">
            <CtaButton size="md" href={downloadUrl} colors={IMAGE_THEMES[imageIndex].colors}>
              Download for macOS
            </CtaButton>
            {version && <small className="text-gray-400">{version}</small>}
          </div>
          <p className="text-xs text-gray-400">
            By downloading, you agree to our{' '}
            <Link href="/terms" className="underline underline-offset-2 hover:text-gray-600">
              Terms of Service
            </Link>
            .
          </p>
        </div>
      </section>
      <section>
        <ImageCarousel className="rounded-xs" onIndexChange={setImageIndex} />
      </section>
    </>
  )
}
