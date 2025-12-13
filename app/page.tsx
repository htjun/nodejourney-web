import Image from 'next/image'
import { CtaButton } from '@/components/cta-button'
import { Logo } from '@/components/icons/logo'

const FeatureBox = ({ title, description }: { title: string; description: string }) => {
  return (
    <div className="flex flex-col gap-6 bg-gray-500/2 border border-gray-200/80 p-4 rounded-xs justify-between">
      <div className="flex flex-col gap-6">
        <h3 className="font-medium">{title}</h3>
        <p className="text-gray-500">{description}</p>
      </div>
      <div className="bg-white/30 aspect-square rounded-xs" />
    </div>
  )
}

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen w-full max-w-7xl mx-auto items-stretch px-4">
      <header className="py-5">
        <div className="flex items-center gap-1.5">
          <Logo className="size-4" />
          <span className="text-[15px] font-semibold tracking-tight">Nodejourney</span>
        </div>
      </header>
      <main className="space-y-24 py-16">
        <section className="flex flex-col gap-12">
          <h1 className="text-2xl">
            AI image gen canvas with no backend, no logins, no subs. <br />
            Use your own keys and save projects as files.
          </h1>
          <div className="flex items-center gap-6">
            <CtaButton size="md">Download for macOS</CtaButton>
            <small className="text-gray-400">v0.1.0</small>
          </div>
        </section>
        <section>
          <Image
            src="/images/app-01.jpg"
            alt="NodeJourney app screenshot"
            width={1400}
            height={900}
            className="rounded-xs"
          />
        </section>
        <section className="space-y-8">
          <h2 className="text-2xl">What you're getting</h2>
          <div className="grid grid-cols-3 gap-5">
            <FeatureBox
              title="Visual workflows"
              description="Build AI pipelines on an infinite canvas. Connect text, JSON, and image nodes to prototype ideas without code."
            />
            <FeatureBox
              title="Privacy first"
              description="Everything stays on your device. API keys are encrypted locally and never leave your machine."
            />
            <FeatureBox
              title="Multi-provider"
              description="Connect OpenAI and Replicate from one interface. Generate text, images, and use vision capabilities across providers."
            />
            <FeatureBox
              title="Latest models"
              description="Access the latest image and text models as they release. New models added via app updates."
            />
            <FeatureBox
              title="Portable projects"
              description="Export workflows as single .njp files. Share with others or back up anywhere—no cloud sync needed."
            />
            <FeatureBox
              title="Auto-save"
              description="Projects save automatically with full undo/redo history. Portable .njp files you can back up anywhere."
            />
          </div>
        </section>
      </main>
      <footer className="py-16">
        <div className="flex items-center justify-between gap-1.5 text-sm text-gray-500">
          <span>© {new Date().getFullYear()} Nodejourney</span>
          <span>
            Created by{' '}
            <a
              href="https://x.com/jsonjun"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium hover:underline underline-offset-2"
            >
              Jason Jun
            </a>
          </span>
        </div>
      </footer>
    </div>
  )
}
