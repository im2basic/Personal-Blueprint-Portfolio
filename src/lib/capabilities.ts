export type Mode = 'full' | 'lite'

/**
 * 'full'  — desktop, WebGL available, motion allowed: 3D blueprint scene + scroll-scrubbed camera.
 * 'lite'  — mobile/tablet, reduced motion, or no WebGL: CSS/SVG blueprint experience.
 * Decided once at load; a resize mid-session keeps the current mode.
 */
export function detectMode(): Mode {
  if (typeof window === 'undefined') return 'lite'
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const desktop = window.matchMedia('(min-width: 1024px)').matches
  return !reducedMotion && desktop && hasWebGL() ? 'full' : 'lite'
}

function hasWebGL(): boolean {
  try {
    const canvas = document.createElement('canvas')
    return !!(canvas.getContext('webgl2') ?? canvas.getContext('webgl'))
  } catch {
    return false
  }
}

export function prefersReducedMotion(): boolean {
  return (
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )
}
