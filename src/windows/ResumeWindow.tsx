import { site } from '../content/site'
import { WindowFrame } from './WindowFrame'

export function ResumeWindow({ onClose }: { onClose: () => void }) {
  return (
    <WindowFrame title="Resume.pdf — 1 page ✓" statusBar="application/pdf" onClose={onClose}>
      <div className="flex flex-col items-center gap-5">
        <object
          data={site.resumeUrl}
          type="application/pdf"
          className="border-grid/70 hidden h-[60vh] w-full rounded border sm:block"
        >
          <p className="p-6 text-center text-sm text-white/60">
            Your browser can't preview PDFs — use the download button below.
          </p>
        </object>
        <a
          href={site.resumeUrl}
          download="Anisong-Chanthalalay-Resume.pdf"
          className="border-accent/60 text-accent hover:bg-accent hover:text-blueprint rounded border px-6 py-2.5 font-mono text-sm transition-colors"
        >
          ⬇ Download Resume.pdf
        </a>
      </div>
    </WindowFrame>
  )
}
