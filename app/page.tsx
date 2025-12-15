import { CtaButton } from '@/components/cta-button'
import { FeatureBox } from '@/components/feature-box'
import { Footer } from '@/components/footer'
import { Header } from '@/components/header'
import { ImageCarousel } from '@/components/image-carousel'
import { StickyHeader } from '@/components/sticky-header'
import { getLatestRelease } from '@/lib/releases'

const FEATURES = [
  {
    title: 'Visual workflows',
    description:
      'Build AI pipelines on an infinite canvas. Connect text, JSON, and image nodes to prototype ideas without code.',
  },
  {
    title: 'Privacy first',
    description:
      'Everything stays on your device. API keys are encrypted locally and never leave your machine.',
  },
  {
    title: 'Multi-provider',
    description:
      'Connect OpenAI and Replicate from one interface. Generate text, images, and use vision capabilities across providers.',
  },
  {
    title: 'Latest models',
    description:
      'Access the latest image and text models as they release. New models added via app updates.',
  },
  {
    title: 'Portable projects',
    description:
      'Export workflows as single .njp files. Share with others or back up anywhere—no cloud sync needed.',
  },
  {
    title: 'Auto-save',
    description:
      'Projects save automatically with full undo/redo history. Portable .njp files you can back up anywhere.',
  },
] as const

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
            <ImageCarousel className="rounded-xs" />
          </section>
          <section className="space-y-24 my-40">
            <h2 className="text-2xl">Create with leading AI providers</h2>
            <ul className="flex items-center gap-12 justify-center lg:justify-between flex-wrap ">
              <li>
                <img
                  src="/images/openai.svg"
                  alt="OpenAI"
                  className="h-[40px] w-auto brightness-0"
                />
              </li>
              <li>
                <img
                  src="/images/replicate.svg"
                  alt="Replicate"
                  className="h-[36px] w-auto brightness-0"
                />
              </li>
              <li>
                <img
                  src="/images/anthropic.svg"
                  alt="Anthropic"
                  className="h-[26px] w-auto brightness-0"
                />
              </li>
              <li>
                <img
                  src="/images/gemini.svg"
                  alt="Google Gemini"
                  className="h-[46px] w-auto brightness-0 mb-[18px]"
                />
              </li>
              <li>
                <img
                  src="/images/fal.svg"
                  alt="Fal"
                  className="h-[32px] w-auto brightness-0 mb-[8px]"
                />
              </li>
            </ul>
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
