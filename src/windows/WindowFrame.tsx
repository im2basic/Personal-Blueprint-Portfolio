import { useRef, type ReactNode } from 'react'
import { useFocusTrap } from '../lib/useFocusTrap'

interface WindowFrameProps {
  title: string
  statusBar: string
  onClose: () => void
  children: ReactNode
}

/**
 * Retro desktop window reinterpreted in the blueprint palette: the "shipped
 * product" payoff of the blueprint story. Modal, focus-trapped, Esc to close;
 * body scroll locks while open so scroll position is preserved exactly.
 */
export function WindowFrame({ title, statusBar, onClose, children }: WindowFrameProps) {
  const frameRef = useRef<HTMLDivElement>(null)
  useFocusTrap(frameRef, true, onClose)

  return (
    <div
      className="window-overlay fixed inset-0 z-50 flex items-center justify-center bg-[#040d1d]/70 p-4 backdrop-blur-sm sm:p-8"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div
        ref={frameRef}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className="window-frame border-accent/50 bg-blueprint flex max-h-[88vh] w-full max-w-3xl flex-col overflow-hidden rounded-lg border shadow-[0_0_0_1px_rgba(9,29,59,1),0_24px_64px_rgba(0,0,0,0.6),0_0_48px_rgba(105,184,255,0.15)]"
      >
        {/* title bar */}
        <div className="from-grid/90 to-blueprint border-accent/40 flex shrink-0 items-center justify-between border-b bg-gradient-to-r px-3 py-2">
          <span className="text-accent flex items-center gap-2 font-mono text-xs sm:text-sm">
            <span className="border-accent/60 inline-block h-3 w-3 rounded-sm border" aria-hidden="true" />
            {title}
          </span>
          <div className="flex items-center gap-1.5">
            <span
              aria-hidden="true"
              className="hidden h-5 w-5 items-center justify-center rounded border border-white/20 font-mono text-[10px] text-white/40 sm:flex"
            >
              _
            </span>
            <span
              aria-hidden="true"
              className="hidden h-5 w-5 items-center justify-center rounded border border-white/20 font-mono text-[10px] text-white/40 sm:flex"
            >
              □
            </span>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close window"
              className="hover:bg-construction hover:text-blueprint hover:border-construction flex h-5 w-5 items-center justify-center rounded border border-white/30 font-mono text-[10px] text-white/70 transition-colors"
            >
              ✕
            </button>
          </div>
        </div>

        {/* content */}
        <div className="grow overflow-y-auto px-5 py-5 sm:px-7 sm:py-6">{children}</div>

        {/* status bar */}
        <div className="border-accent/30 bg-blueprint/90 flex shrink-0 items-center justify-between border-t px-3 py-1.5 font-mono text-[10px] text-white/45 sm:text-xs">
          <span>{statusBar}</span>
          <span className="text-success">0 errors · 0 warnings ✓</span>
        </div>
      </div>
    </div>
  )
}

export function WindowLabel({ children }: { children: ReactNode }) {
  return (
    <h3 className="text-accent/70 mt-6 mb-2 font-mono text-xs tracking-[0.2em] uppercase first:mt-0">
      &gt; {children}
    </h3>
  )
}
