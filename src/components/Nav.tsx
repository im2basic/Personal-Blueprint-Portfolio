import type { Mode } from '../lib/capabilities'
import { site } from '../content/site'

const LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' },
]

export function Nav({ mode }: { mode: Mode }) {
  return (
    <nav
      className={`js-nav border-grid/60 bg-blueprint/80 fixed inset-x-0 top-0 z-40 border-b backdrop-blur-md ${
        mode === 'full' ? 'opacity-0' : ''
      }`}
      aria-label="Primary"
    >
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-y-1 px-4 py-3 sm:px-6">
        <a href="#top" className="font-mono text-sm font-semibold tracking-tight">
          <span className="text-accent">&gt;</span> {site.shortName.toLowerCase()}
          <span className="text-accent">.build</span>
        </a>
        <div className="flex flex-wrap items-center gap-1 sm:gap-2">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded px-2 py-1 font-mono text-xs whitespace-nowrap text-white/70 transition-colors hover:text-white sm:px-3 sm:text-sm"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  )
}
