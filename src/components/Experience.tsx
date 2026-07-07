import { Section } from './Section'
import { experience } from '../content/site'
import { useAppStore } from '../stores/appStore'

export function Experience() {
  const openWindow = useAppStore((s) => s.openWindow)

  return (
    <Section id="experience" drawingNo="drawing #03 — experience.log" title="Experience">
      <ol className="border-grid/70 relative ml-2 space-y-10 border-l pl-8">
        {experience.map((job) => (
          <li key={job.company} className="relative">
            <span className="border-accent bg-blueprint absolute top-1.5 -left-[2.42rem] h-3 w-3 rounded-full border-2" />
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <h3 className="font-heading text-lg font-semibold">
                {job.title} — <span className="text-accent">{job.company}</span>
              </h3>
              <span className="font-mono text-xs text-white/50">
                {job.start} – {job.end}
              </span>
            </div>
            <p className="mt-2 max-w-3xl text-sm leading-relaxed text-white/65">
              {job.summary}
            </p>
          </li>
        ))}
      </ol>
      <button
        type="button"
        onClick={() => openWindow('experience')}
        className="border-accent/50 text-accent hover:bg-accent/10 mt-10 rounded-md border px-5 py-2.5 font-mono text-sm transition-colors"
      >
        ▸ open Experience.exe
      </button>
    </Section>
  )
}
