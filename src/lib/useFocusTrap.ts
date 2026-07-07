import { useEffect, type RefObject } from 'react'

const FOCUSABLE =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'

/**
 * Traps focus inside `ref` while active, closes on Escape, and restores
 * focus to the previously focused element (the triggering card) on close.
 */
export function useFocusTrap(
  ref: RefObject<HTMLElement | null>,
  active: boolean,
  onClose: () => void,
) {
  useEffect(() => {
    if (!active) return
    const container = ref.current
    if (!container) return

    const previouslyFocused = document.activeElement as HTMLElement | null
    const first = container.querySelector<HTMLElement>(FOCUSABLE)
    first?.focus()

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        e.preventDefault()
        onClose()
        return
      }
      if (e.key !== 'Tab' || !container) return
      const focusables = Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE))
      if (focusables.length === 0) return
      const firstEl = focusables[0]
      const lastEl = focusables[focusables.length - 1]
      if (e.shiftKey && document.activeElement === firstEl) {
        e.preventDefault()
        lastEl.focus()
      } else if (!e.shiftKey && document.activeElement === lastEl) {
        e.preventDefault()
        firstEl.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = ''
      previouslyFocused?.focus()
    }
  }, [ref, active, onClose])
}
