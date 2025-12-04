import { Logo } from '@/components/icons/logo'
import { cn } from '@/lib/utils'

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen w-full max-w-7xl mx-auto items-stretch px-4">
      <header className="py-5">
        <div className="flex items-center gap-1.5">
          <Logo className="size-4" />
          <span className="text-sm font-medium tracking-tight">NodeJourney</span>
        </div>
      </header>
      <main className="space-y-24 mt-16">
        <section className="flex flex-col gap-12">
          <h1 className="text-2xl">
            AI image gen canvas with no backend, no logins, no subs. <br />
            Use your own keys and save projects as files.
          </h1>
          <div className="flex items-center gap-4">
            <button
              className={cn(
                'group relative w-fit overflow-hidden',
                'rounded-full py-3 px-6',
                'font-medium text-white bg-stone-900',
                'transition-all duration-300 cursor-pointer',
                // Default shadow
                'shadow-[0_8px_20px_-8px_rgba(120,113,108,0.5),inset_0_1px_2px_rgba(250,250,249,0.1)]',
                // Hover states
                'hover:bg-orange-600',
                'hover:shadow-[0_18px_40px_-15px_rgba(234,88,12,0.85),inset_0_8px_12px_rgba(255,247,237,0.5)]'
              )}
            >
              <div className="group-hover:translate-y-0 group-hover:opacity-0 transition-all duration-300 bg-white/10 absolute inset-0 translate-y-full" />
              <span className="flex items-center gap-2 relative">Download for macOS</span>
            </button>
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
