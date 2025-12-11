import { Logo } from '@/components/icons/logo'

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen w-full max-w-4xl mx-auto items-stretch px-4">
      <header className="py-5">
        <div className="flex items-center gap-1.5">
          <Logo className="size-4" />
          <span className="text-sm font-medium tracking-tight">NodeJourney</span>
        </div>
      </header>
      <main className="bg-white/40 rounded-xl p-6"></main>
    </div>
  )
}
