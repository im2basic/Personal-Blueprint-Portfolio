import { Section } from './Section'
import { site } from '../content/site'
import { useAppStore } from '../stores/appStore'

export function Contact() {
  const openWindow = useAppStore((s) => s.openWindow)

  return (
    <Section id="contact" drawingNo="drawing #05 — contact.sh" title="Let's build something.">
      <div className="border-grid/80 bg-blueprint/60 max-w-2xl rounded-md border font-mono text-sm shadow-[0_0_32px_rgba(9,29,59,0.6)]">
        <div className="border-grid/80 flex items-center gap-1.5 border-b px-3 py-2">
          <span className="bg-construction/80 h-2 w-2 rounded-full" />
          <span className="bg-success/80 h-2 w-2 rounded-full" />
          <span className="bg-accent/80 h-2 w-2 rounded-full" />
          <span className="text-accent/60 ml-2 text-xs">terminal</span>
        </div>
        <div className="space-y-1 px-4 py-4">
          <p className="text-white/60">$ portfolio build --production</p>
          <p className="text-success">✓ Build Successful — 5 projects shipped</p>
          <p className="pt-2 text-white/60">$ contact --anisong</p>
        </div>
        <div className="flex flex-wrap gap-3 px-4 pb-5">
          <a
            href={`mailto:${site.email}`}
            className="border-accent/60 text-accent hover:bg-accent hover:text-blueprint rounded border px-4 py-2 text-xs transition-colors"
          >
            Email
          </a>
          <a
            href={site.github}
            target="_blank"
            rel="noreferrer"
            className="rounded border border-white/25 px-4 py-2 text-xs text-white/80 transition-colors hover:border-white/60 hover:text-white"
          >
            GitHub
          </a>
          <a
            href={site.linkedin}
            target="_blank"
            rel="noreferrer"
            className="rounded border border-white/25 px-4 py-2 text-xs text-white/80 transition-colors hover:border-white/60 hover:text-white"
          >
            LinkedIn
          </a>
          <button
            type="button"
            onClick={() => openWindow('resume')}
            className="rounded border border-white/25 px-4 py-2 text-xs text-white/80 transition-colors hover:border-white/60 hover:text-white"
          >
            Resume.pdf
          </button>
        </div>
      </div>
      <footer className="mt-16 flex flex-wrap items-center justify-between gap-2 font-mono text-xs text-white/35">
        <span>© {new Date().getFullYear()} {site.name}</span>
        <span>designed &amp; built from a blueprint — React · Three.js · GSAP</span>
      </footer>
    </Section>
  )
}
