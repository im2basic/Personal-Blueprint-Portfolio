import { skills } from '../content/site'
import { WindowFrame, WindowLabel } from './WindowFrame'

export function TechStackWindow({ onClose }: { onClose: () => void }) {
  return (
    <WindowFrame
      title="TechStack.exe — dependencies ✓"
      statusBar={`${Object.values(skills).flat().length} packages installed`}
      onClose={onClose}
    >
      {Object.entries(skills).map(([category, items]) => (
        <div key={category}>
          <WindowLabel>{category}</WindowLabel>
          <div className="flex flex-wrap gap-1.5">
            {items.map((skill) => (
              <span
                key={skill}
                className="rounded border border-white/15 px-2 py-1 font-mono text-xs text-white/75"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      ))}
    </WindowFrame>
  )
}
