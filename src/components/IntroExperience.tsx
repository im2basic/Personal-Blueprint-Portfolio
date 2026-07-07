import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import type { Mode } from '../lib/capabilities'
import { scrollState } from '../lib/scrollState'
import { site } from '../content/site'
import { Terminal } from './Terminal'
import { BlueprintDecor } from './BlueprintDecor'

gsap.registerPlugin(ScrollTrigger)

const INTRO_SEEN_KEY = 'portfolio-intro-seen'

/**
 * Scene 1 + 2: the blueprint landing and the scroll-scrubbed transition.
 * Full mode: a 250vh scroll region with a sticky hero; GSAP scrubs a timeline
 * that drives both the 3D camera (via scrollState) and the DOM materialization.
 * Lite mode: a single-screen hero with CSS entrance animations only.
 */
export function IntroExperience({ mode }: { mode: Mode }) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const [skipVisible, setSkipVisible] = useState(false)

  useLayoutEffect(() => {
    if (mode !== 'full') {
      scrollState.progress = 1
      scrollState.notify()
      return
    }
    const ctx = gsap.context(() => {
      const proxy = { p: 0 }
      const tl = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: wrapRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.5,
        },
      })
      tl.to(
        proxy,
        {
          p: 1,
          duration: 1,
          onUpdate: () => {
            scrollState.progress = proxy.p
            scrollState.notify()
          },
        },
        0,
      )
      // drafted outline fades out as the filled version materializes
      tl.to('.js-draft', { autoAlpha: 0, duration: 0.3 }, 0.35)
      // opacity only (not autoAlpha) so the real heading stays in the a11y tree
      tl.fromTo('.js-built', { opacity: 0 }, { opacity: 1, duration: 0.35 }, 0.4)
      // CTAs gain color
      tl.to(
        '.js-cta-primary',
        { backgroundColor: '#69B8FF', color: '#091D3B', duration: 0.3 },
        0.5,
      )
      // drafting furniture recedes
      tl.to('.js-terminal', { autoAlpha: 0, y: -24, duration: 0.25 }, 0.45)
      tl.to('.js-decor', { autoAlpha: 0, duration: 0.3 }, 0.5)
      tl.to('.js-scrollhint', { autoAlpha: 0, duration: 0.15 }, 0.1)
      tl.to('.js-eyebrow-draft', { autoAlpha: 0, duration: 0.2 }, 0.35)
      tl.fromTo(
        '.js-eyebrow-built',
        { autoAlpha: 0 },
        { autoAlpha: 1, duration: 0.25 },
        0.45,
      )
      // sticky nav materializes at the end of the transition
      // (nav lives outside this component, so pass the element — context
      // selectors are scoped to wrapRef and would not find it)
      const nav = document.querySelector('.js-nav')
      if (nav) tl.fromTo(nav, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.15 }, 0.85)
    }, wrapRef)
    return () => ctx.revert()
  }, [mode])

  // repeat visitors skip straight past the intro this session
  useEffect(() => {
    if (mode !== 'full') return
    if (sessionStorage.getItem(INTRO_SEEN_KEY)) {
      requestAnimationFrame(() => {
        const wrap = wrapRef.current
        if (wrap) window.scrollTo({ top: wrap.offsetHeight - window.innerHeight })
      })
    } else {
      sessionStorage.setItem(INTRO_SEEN_KEY, '1')
    }
    const timer = setTimeout(() => setSkipVisible(true), 1000)
    return () => clearTimeout(timer)
  }, [mode])

  function skipIntro() {
    const wrap = wrapRef.current
    if (wrap) {
      window.scrollTo({ top: wrap.offsetHeight - window.innerHeight, behavior: 'smooth' })
    }
  }

  const full = mode === 'full'

  return (
    <div ref={wrapRef} id="top" className={full ? 'relative h-[250vh]' : 'relative'}>
      <section
        className={
        full
          ? 'sticky top-0 flex h-screen flex-col items-center justify-center overflow-hidden px-6'
          : 'relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6'
        }
      >
        <div className="js-decor">
          <BlueprintDecor />
        </div>

        <div className="relative mx-auto w-full max-w-4xl text-center">
          <p className="js-eyebrow-draft text-accent/70 font-mono text-xs tracking-[0.3em] uppercase">
            blueprint #001 — portfolio.dwg
          </p>
          {full && (
            <p
              className="js-eyebrow-built text-success absolute top-0 right-0 left-0 font-mono text-xs tracking-[0.3em] uppercase opacity-0"
              aria-hidden="true"
            >
              build successful ✓
            </p>
          )}

          <div className="relative mt-6">
            {/* drafted outline layer */}
            {full && (
              <h1
                className="js-draft font-heading text-outline text-5xl font-bold tracking-tight text-balance sm:text-6xl lg:text-7xl"
                aria-hidden="true"
              >
                Hi, I'm {site.shortName}.
              </h1>
            )}
            {/* built layer */}
            <h1
              className={`font-heading text-5xl font-bold tracking-tight text-balance sm:text-6xl lg:text-7xl ${
                full ? 'js-built absolute inset-0 opacity-0' : ''
              }`}
            >
              Hi, I'm {site.shortName}.
            </h1>
          </div>

          <p className="text-accent mt-5 font-mono text-sm sm:text-base">{site.role}</p>
          <p className="mx-auto mt-3 max-w-xl text-base text-balance text-white/70 sm:text-lg">
            {site.tagline}
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a
              href="#projects"
              className="js-cta-primary border-accent text-accent hover:bg-accent hover:text-blueprint rounded-md border px-6 py-3 font-mono text-sm font-semibold transition-colors duration-150"
            >
              View Projects
            </a>
            <a
              href={site.resumeUrl}
              download="Anisong-Chanthalalay-Resume.pdf"
              className="rounded-md border border-white/25 px-6 py-3 font-mono text-sm text-white/80 transition-colors duration-150 hover:border-white/60 hover:text-white"
            >
              Download Resume
            </a>
          </div>

          <div className="js-terminal mx-auto mt-10 flex justify-center">
            <Terminal />
          </div>
        </div>

        {full && (
          <>
            <p className="js-scrollhint text-accent/60 absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce font-mono text-xs tracking-widest">
              ▼ scroll to construct
            </p>
            {skipVisible && (
              <button
                type="button"
                onClick={skipIntro}
                className="text-accent/50 hover:text-accent absolute right-6 bottom-6 font-mono text-xs transition-colors"
              >
                [ skip intro ]
              </button>
            )}
          </>
        )}
      </section>
    </div>
  )
}
