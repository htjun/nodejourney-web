import { CtaButton } from '@/components/cta-button'
import { Logo } from '@/components/icons/logo'

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen w-full max-w-7xl mx-auto items-stretch px-4">
      <header className="py-5">
        <div className="flex items-center gap-1.5">
          <Logo className="size-4" />
          <span className="text-[15px] font-semibold tracking-tight">Nodejourney</span>
        </div>
      </header>
      <main className="space-y-24 mt-16">
        <section className="flex flex-col gap-12">
          <h1 className="text-2xl">
            AI image gen canvas with no backend, no logins, no subs. <br />
            Use your own keys and save projects as files.
          </h1>
          <div className="flex items-center gap-6">
            <CtaButton size="md">Download for macOS</CtaButton>
            <small className="text-stone-400">v0.1.0-beta</small>
          </div>
        </section>
        <section className="aspect-video bg-stone-200 grid place-items-center rounded-xs">
          <span className="text-sm text-stone-400">placeholder for image</span>
        </section>
        <section>
          <aside>
            <ul>
              <li></li>
            </ul>
          </aside>
          <div></div>
        </section>
      </main>
    </div>
  )
}
