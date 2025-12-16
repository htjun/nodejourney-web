import { CtaButton } from '@/components/cta-button'
import { FeatureBox } from '@/components/feature-box'
import { Footer } from '@/components/footer'
import { Header } from '@/components/header'
import { ImageCarouselDom } from '@/components/image-carousel-dom'
import { ProviderLogos } from '@/components/provider-logos'
import { StickyHeader } from '@/components/sticky-header'
import { FEATURES, PROVIDERS } from '@/lib/data/home'
import { getLatestRelease } from '@/lib/releases'

export default async function Home() {
  const release = await getLatestRelease()

  return (
    <>
      <StickyHeader downloadUrl={release?.downloadUrl} />
      <div className="flex flex-col min-h-screen w-full max-w-7xl mx-auto items-stretch px-4">
        <Header />
        <main className="space-y-24 py-16">
          <section className="flex flex-col gap-12">
            <h1 className="text-2xl max-w-[600px]">
              AI image gen canvas with no backend, no logins, no subs. Use your own keys and save
              projects as files.
            </h1>
            <div id="hero-cta" className="flex items-center gap-6">
              <CtaButton size="md" href={release?.downloadUrl}>
                Download for macOS
              </CtaButton>
              {release && <small className="text-gray-400">{release.version}</small>}
            </div>
          </section>
          <section>
            <ImageCarouselDom className="rounded-xs" />
          </section>
          <section className="space-y-24 md:my-48 my-24">
            <h2 className="text-2xl">Create with leading AI providers</h2>
            <ProviderLogos providers={PROVIDERS} />
          </section>
          <section className="space-y-8">
            <h2 className="text-2xl">What you're getting</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {FEATURES.map((feature) => (
                <FeatureBox
                  key={feature.title}
                  title={feature.title}
                  description={feature.description}
                />
              ))}
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  )
}
