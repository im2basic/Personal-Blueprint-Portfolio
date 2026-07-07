import { useEffect, useRef } from 'react'
import { prefersReducedMotion } from './capabilities'

/**
 * Adds `is-built` to the element when it scrolls into view, driving the
 * wireframe → finished CSS transition (see `.reveal` in index.css).
 */
export function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (prefersReducedMotion()) {
      el.classList.add('is-built')
      return
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            el.classList.add('is-built')
            io.disconnect()
          }
        }
      },
      { threshold: 0.15 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return ref
}
