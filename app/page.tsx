export default function Home() {
  return (
    <div className="flex flex-col min-h-screen w-full max-w-7xl mx-auto items-stretch px-4">
      <header className="py-4">
        <div className="text-sm font-semibold">NodeJourney</div>
      </header>
      <main className="space-y-24 mt-24">
        <section className="flex flex-col gap-4">
          <h1 className="text-2xl">
            AI image gen canvas with no backend, no logins, no subs. <br />
            Use your own keys and save projects as files.
          </h1>
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
