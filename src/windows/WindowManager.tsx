import { useAppStore } from '../stores/appStore'
import { projects } from '../content/projects'
import { ProjectWindow } from './ProjectWindow'
import { ExperienceWindow } from './ExperienceWindow'
import { TechStackWindow } from './TechStackWindow'
import { ResumeWindow } from './ResumeWindow'

export function WindowManager() {
  const activeWindow = useAppStore((s) => s.activeWindow)
  const closeWindow = useAppStore((s) => s.closeWindow)

  if (!activeWindow) return null
  if (activeWindow === 'experience') return <ExperienceWindow onClose={closeWindow} />
  if (activeWindow === 'techstack') return <TechStackWindow onClose={closeWindow} />
  if (activeWindow === 'resume') return <ResumeWindow onClose={closeWindow} />

  const project = projects.find((p) => p.slug === activeWindow)
  if (!project) return null
  return <ProjectWindow project={project} onClose={closeWindow} />
}
