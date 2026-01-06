import { LogoIcon } from '@/components/icons/logo'

export function Logo() {
  return (
    <div className="flex items-center gap-1.5 select-none">
      <LogoIcon className="size-4" />
      <span className="text-[15px] font-semibold tracking-tight">Nodejourney</span>
    </div>
  )
}
