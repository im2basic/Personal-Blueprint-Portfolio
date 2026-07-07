import type { Project } from '../content/projects'
import { WindowFrame, WindowLabel } from './WindowFrame'

export function ProjectWindow({ project, onClose }: { project: Project; onClose: () => void }) {
  return (
    <WindowFrame
      title={`${project.windowTitle}`}
      statusBar={`${project.platform} · shipped`}
      onClose={onClose}
    >
      <header className="mb-2">
        <h2 className="font-heading text-2xl font-bold">{project.name}</h2>
        <p className="text-accent mt-1 font-mono text-sm">{project.tagline}</p>
      </header>

      <WindowLabel>Overview</WindowLabel>
      <p className="text-sm leading-relaxed text-white/75">{project.overview}</p>

      <WindowLabel>Problem</WindowLabel>
      <p className="text-sm leading-relaxed text-white/75">{project.problem}</p>

      <WindowLabel>Solution</WindowLabel>
      <p className="text-sm leading-relaxed text-white/75">{project.solution}</p>

      <WindowLabel>Architecture</WindowLabel>
      <ul className="space-y-1.5">
        {project.architecture.map((item) => (
          <li key={item} className="flex gap-2 text-sm leading-relaxed text-white/75">
            <span className="text-accent shrink-0" aria-hidden="true">▪</span>
            {item}
          </li>
        ))}
      </ul>

      <WindowLabel>Tech Stack</WindowLabel>
      <div className="flex flex-wrap gap-1.5">
        {project.stack.map((tech) => (
          <span
            key={tech}
            className="rounded border border-white/15 px-2 py-0.5 font-mono text-xs text-white/70"
          >
            {tech}
          </span>
        ))}
      </div>

      {project.screenshots.length > 0 && (
        <>
          <WindowLabel>Screenshots</WindowLabel>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {project.screenshots.map((src) => (
              <img
                key={src}
                src={src}
                alt={`${project.name} screenshot`}
                loading="lazy"
                className="border-grid/70 rounded border"
              />
            ))}
          </div>
        </>
      )}

      {project.links.length > 0 && (
        <>
          <WindowLabel>Links</WindowLabel>
          <div className="flex flex-wrap gap-3">
            {project.links.map((link) => (
              <a
                key={link.url}
                href={link.url}
                target="_blank"
                rel="noreferrer"
                className="border-accent/60 text-accent hover:bg-accent hover:text-blueprint rounded border px-4 py-1.5 font-mono text-xs transition-colors"
              >
                {link.label} ↗
              </a>
            ))}
          </div>
        </>
      )}

      <WindowLabel>Lessons Learned</WindowLabel>
      <ul className="space-y-1.5">
        {project.lessons.map((lesson) => (
          <li key={lesson} className="flex gap-2 text-sm leading-relaxed text-white/75">
            <span className="text-success shrink-0" aria-hidden="true">✓</span>
            {lesson}
          </li>
        ))}
      </ul>
    </WindowFrame>
  )
}
