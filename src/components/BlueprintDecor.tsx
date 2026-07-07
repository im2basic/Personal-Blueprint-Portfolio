/**
 * CAD-style drafting marks that draw themselves in (SVG stroke animation).
 * Purely decorative — hidden from assistive tech.
 */
export function BlueprintDecor() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* corner marks */}
      <svg className="draw absolute top-6 left-6 h-14 w-14" viewBox="0 0 56 56" fill="none">
        <path pathLength={1} d="M1 20 V1 H20" stroke="#69B8FF" strokeOpacity="0.6" />
        <circle cx="10" cy="10" r="2" fill="#69B8FF" fillOpacity="0.5" />
      </svg>
      <svg className="draw absolute top-6 right-6 h-14 w-14" viewBox="0 0 56 56" fill="none">
        <path pathLength={1} d="M36 1 H55 V20" stroke="#69B8FF" strokeOpacity="0.6" />
      </svg>
      <svg className="draw absolute bottom-6 left-6 h-14 w-14" viewBox="0 0 56 56" fill="none">
        <path pathLength={1} d="M1 36 V55 H20" stroke="#69B8FF" strokeOpacity="0.6" />
      </svg>
      <svg className="draw absolute right-6 bottom-6 h-14 w-14" viewBox="0 0 56 56" fill="none">
        <path pathLength={1} d="M36 55 H55 V36" stroke="#69B8FF" strokeOpacity="0.6" />
        <circle cx="46" cy="46" r="2" fill="#69B8FF" fillOpacity="0.5" />
      </svg>
      {/* dimension line, top center */}
      <svg
        className="draw absolute top-10 left-1/2 h-6 w-64 -translate-x-1/2"
        viewBox="0 0 256 24"
        fill="none"
      >
        <path pathLength={1} d="M4 12 H252" stroke="#69B8FF" strokeOpacity="0.35" />
        <path pathLength={1} d="M4 4 V20 M252 4 V20" stroke="#69B8FF" strokeOpacity="0.35" />
      </svg>
      {/* crosshair, off-center */}
      <svg
        className="draw absolute top-1/3 right-[12%] hidden h-16 w-16 lg:block"
        viewBox="0 0 64 64"
        fill="none"
      >
        <circle pathLength={1} cx="32" cy="32" r="18" stroke="#69B8FF" strokeOpacity="0.3" />
        <path pathLength={1} d="M32 4 V60 M4 32 H60" stroke="#69B8FF" strokeOpacity="0.25" />
      </svg>
    </div>
  )
}
