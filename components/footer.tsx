export function Footer() {
  return (
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
  )
}
