import { Section } from './Section'
import { about } from '../content/site'

export function About() {
  return (
    <Section id="about" drawingNo="drawing #01 — about.txt" title={about.headline}>
      <div className="grid gap-6 text-white/75 md:grid-cols-3">
        {about.paragraphs.map((paragraph, i) => (
          <p key={i} className="leading-relaxed">
            {paragraph}
          </p>
        ))}
      </div>
    </Section>
  )
}
