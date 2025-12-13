import { Logo } from '@/components/icons/logo'

export function Header() {
  return (
    <header className="py-5">
      <div className="flex items-center gap-1.5">
        <Logo className="size-4" />
        <span className="text-[15px] font-semibold tracking-tight">Nodejourney</span>
      </div>
    </header>
  )
}
