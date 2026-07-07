import type { ReactNode } from 'react'
import { useReveal } from '../lib/useReveal'

interface SectionProps {
  id: string
  /** CAD-style annotation, e.g. "component #02" */
  drawingNo: string
  title: string
  children: ReactNode
}

export function Section({ id, drawingNo, title, children }: SectionProps) {
  const ref = useReveal<HTMLElement>()
  return (
    <section id={id} ref={ref} className="reveal mx-auto max-w-5xl scroll-mt-24 px-4 py-20 sm:px-6 sm:py-24">
      <p className="text-accent/60 font-mono text-xs tracking-[0.25em] uppercase">
        {drawingNo}
      </p>
      <h2 className="font-heading mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
        {title}
      </h2>
      <div className="via-accent/40 mt-4 h-px bg-gradient-to-r from-transparent to-transparent" />
      <div className="mt-8">{children}</div>
    </section>
  )
}
