import Link from 'next/link'
import { Logo } from '@/components/logo'

export function Header() {
  return (
    <header className="py-5">
      <Link href="/" className="cursor-pointer inline-flex hover:opacity-80 transition-opacity">
        <Logo />
      </Link>
    </header>
  )
}
