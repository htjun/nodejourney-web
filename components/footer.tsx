'use client'

import Link from 'next/link'

export function Footer() {
  return (
    <footer className="py-16">
      <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2 text-sm text-gray-500">
        <div className="flex items-center gap-1 md:gap-6">
          <span>© {new Date().getFullYear()} Nodejourney</span>
          <span className="text-gray-300">·</span>
          <Link href="/terms" className="hover:underline underline-offset-2 font-medium">
            Terms & Privacy
          </Link>
        </div>
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
  )
}
