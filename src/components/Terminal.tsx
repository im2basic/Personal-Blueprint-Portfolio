import { useEffect, useState } from 'react'
import { prefersReducedMotion } from '../lib/capabilities'

const LINES = [
  '$ portfolio.build()',
  '> loading modules... ok',
  '> preparing components... ok',
  '> drafting blueprint... ok',
  '$ ready — scroll to construct',
]

export function Terminal() {
  const [visibleCount, setVisibleCount] = useState(
    prefersReducedMotion() ? LINES.length : 0,
  )

  useEffect(() => {
    if (visibleCount >= LINES.length) return
    const timer = setInterval(() => {
      setVisibleCount((n) => {
        if (n + 1 >= LINES.length) clearInterval(timer)
        return n + 1
      })
    }, 420)
    return () => clearInterval(timer)
    // run once on mount; visibleCount checked only for the reduced-motion fast path
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="border-grid/80 bg-blueprint/70 w-72 rounded-md border font-mono text-xs leading-6 shadow-[0_0_24px_rgba(9,29,59,0.8)] backdrop-blur-sm">
      <div className="border-grid/80 flex items-center gap-1.5 border-b px-3 py-2">
        <span className="bg-construction/80 h-2 w-2 rounded-full" />
        <span className="bg-success/80 h-2 w-2 rounded-full" />
        <span className="bg-accent/80 h-2 w-2 rounded-full" />
        <span className="text-accent/60 ml-2">terminal</span>
      </div>
      <div className="min-h-[8.5rem] px-3 py-2">
        {LINES.slice(0, visibleCount).map((line) => (
          <p
            key={line}
            className={line.startsWith('$') ? 'text-accent' : 'text-white/60'}
          >
            {line}
          </p>
        ))}
        {visibleCount < LINES.length && (
          <span className="bg-accent inline-block h-3.5 w-2 animate-pulse" />
        )}
      </div>
    </div>
  )
}
