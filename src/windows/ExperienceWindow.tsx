import { education, experience } from '../content/site'
import { WindowFrame, WindowLabel } from './WindowFrame'

export function ExperienceWindow({ onClose }: { onClose: () => void }) {
  return (
    <WindowFrame
      title="Experience.exe — career.log ✓"
      statusBar="2020 – present"
      onClose={onClose}
    >
      {experience.map((job) => (
        <div key={job.company} className="mb-8 last:mb-0">
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <h2 className="font-heading text-xl font-bold">
              {job.title} — <span className="text-accent">{job.company}</span>
            </h2>
            <span className="font-mono text-xs text-white/50">
              {job.start} – {job.end}
            </span>
          </div>
          <p className="mt-2 text-sm leading-relaxed text-white/75">{job.summary}</p>
          {job.highlights.length > 0 && (
            <ul className="mt-3 space-y-1.5">
              {job.highlights.map((highlight) => (
                <li key={highlight} className="flex gap-2 text-sm leading-relaxed text-white/70">
                  <span className="text-accent shrink-0" aria-hidden="true">▪</span>
                  {highlight}
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}

      <WindowLabel>Education</WindowLabel>
      <ul className="space-y-1.5">
        {education.map((entry) => (
          <li key={entry.school} className="flex flex-wrap gap-x-2 text-sm text-white/75">
            <span className="font-semibold text-white">{entry.school}</span>
            <span className="text-white/55">— {entry.credential}</span>
          </li>
        ))}
      </ul>
    </WindowFrame>
  )
}
