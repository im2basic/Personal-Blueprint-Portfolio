import { Section } from './Section'
import { projects } from '../content/projects'
import { useAppStore } from '../stores/appStore'

export function Projects() {
  const openWindow = useAppStore((s) => s.openWindow)

  return (
    <Section id="projects" drawingNo="drawing #02 — projects/" title="Featured Projects">
      <p className="-mt-4 mb-8 font-mono text-sm text-white/50">
        5 products shipped end-to-end. Click any card to run it.
      </p>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <button
            key={project.slug}
            type="button"
            onClick={() => openWindow(project.slug)}
            className="group border-grid/70 bg-blueprint/40 hover:border-accent/70 focus-visible:border-accent relative rounded-lg border p-5 text-left transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_32px_rgba(105,184,255,0.12)] focus-visible:outline-none"
          >
            <div className="flex items-center justify-between">
              <span className="text-accent/60 group-hover:text-accent font-mono text-xs transition-colors">
                {project.slug}.exe
              </span>
              <span className="rounded border border-white/15 px-1.5 py-0.5 font-mono text-[10px] text-white/50">
                {project.platform}
              </span>
            </div>
            <h3 className="font-heading mt-3 text-xl font-semibold">{project.name}</h3>
            <p className="text-accent mt-0.5 font-mono text-xs">{project.tagline}</p>
            <p className="mt-3 text-sm leading-relaxed text-white/65">{project.cardBlurb}</p>
            <p className="text-success mt-4 font-mono text-xs opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100">
              ▸ run {project.slug}.exe
            </p>
          </button>
        ))}
      </div>
    </Section>
  )
}
