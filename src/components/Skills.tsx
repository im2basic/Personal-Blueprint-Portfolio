import { Section } from './Section'
import { skills } from '../content/site'
import { useAppStore } from '../stores/appStore'

const PREVIEW_COUNT = 5

export function Skills() {
  const openWindow = useAppStore((s) => s.openWindow)

  return (
    <Section id="skills" drawingNo="drawing #04 — techstack.json" title="Skills">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Object.entries(skills).map(([category, items]) => (
          <div key={category} className="border-grid/70 bg-blueprint/40 rounded-lg border p-4">
            <h3 className="text-accent font-mono text-xs tracking-wider uppercase">
              {category}
            </h3>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {items.slice(0, PREVIEW_COUNT).map((skill) => (
                <span
                  key={skill}
                  className="rounded border border-white/15 px-2 py-0.5 font-mono text-xs text-white/70"
                >
                  {skill}
                </span>
              ))}
              {items.length > PREVIEW_COUNT && (
                <span className="px-1 py-0.5 font-mono text-xs text-white/40">
                  +{items.length - PREVIEW_COUNT} more
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={() => openWindow('techstack')}
        className="border-accent/50 text-accent hover:bg-accent/10 mt-10 rounded-md border px-5 py-2.5 font-mono text-sm transition-colors"
      >
        ▸ open TechStack.exe
      </button>
    </Section>
  )
}
