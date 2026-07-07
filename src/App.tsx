import { lazy, Suspense, useMemo } from 'react'
import { detectMode } from './lib/capabilities'
import { Nav } from './components/Nav'
import { IntroExperience } from './components/IntroExperience'
import { About } from './components/About'
import { Projects } from './components/Projects'
import { Experience } from './components/Experience'
import { Skills } from './components/Skills'
import { Contact } from './components/Contact'
import { WindowManager } from './windows/WindowManager'

// Three.js loads only on capable desktops — mobile/reduced-motion never pays for it.
const BlueprintScene = lazy(() => import('./scenes/BlueprintScene'))

function App() {
  const mode = useMemo(detectMode, [])

  return (
    <>
      {mode === 'full' ? (
        <Suspense fallback={null}>
          <BlueprintScene />
        </Suspense>
      ) : (
        <div className="bg-blueprint-grid fixed inset-0 -z-10" aria-hidden="true" />
      )}

      <Nav mode={mode} />
      <IntroExperience mode={mode} />

      <main>
        <About />
        <Projects />
        <Experience />
        <Skills />
        <Contact />
      </main>

      <WindowManager />
    </>
  )
}

export default App
