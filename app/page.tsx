import { FeatureBox } from '@/components/feature-box'
import { Footer } from '@/components/footer'
import { Header } from '@/components/header'
import { HeroSection } from '@/components/hero-section'
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
          <HeroSection downloadUrl={release?.downloadUrl} version={release?.version} />
          <section className="space-y-24 md:my-48 my-24">
            <h2 className="text-2xl">Create with leading AI providers</h2>
            <ProviderLogos providers={PROVIDERS} />
          </section>
          <section className="space-y-8">
            <h2 className="text-2xl">What you're getting</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {FEATURES.map((feature) => (
                <FeatureBox
                  key={feature.id}
                  id={feature.id}
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
