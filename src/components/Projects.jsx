import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ExternalLink } from 'lucide-react'
import { projects } from '../data/data'
import { GithubIcon } from './SocialIcons'

gsap.registerPlugin(ScrollTrigger)

const tagColorMap = {
  // Python family — amber
  Python:       'bg-amber-500/15 border-amber-500/30 text-amber-200',
  FastAPI:      'bg-amber-500/15 border-amber-500/30 text-amber-200',
  httpx:        'bg-amber-500/15 border-amber-500/30 text-amber-200',
  BeautifulSoup:'bg-amber-500/15 border-amber-500/30 text-amber-200',
  // Frontend — sky
  'Next.js':    'bg-sky-400/15 border-sky-400/30 text-sky-200',
  React:        'bg-sky-400/15 border-sky-400/30 text-sky-200',
  JavaScript:   'bg-sky-400/15 border-sky-400/30 text-sky-200',
  TypeScript:   'bg-sky-400/15 border-sky-400/30 text-sky-200',
  'Three.js':   'bg-sky-400/15 border-sky-400/30 text-sky-200',
  // Security tooling — rose
  dalfox:       'bg-rose-500/15 border-rose-500/30 text-rose-200',
  wafw00f:      'bg-rose-500/15 border-rose-500/30 text-rose-200',
  katana:       'bg-rose-500/15 border-rose-500/30 text-rose-200',
  // Data — emerald
  SQLite:       'bg-emerald-500/15 border-emerald-500/30 text-emerald-200',
  SQL:          'bg-emerald-500/15 border-emerald-500/30 text-emerald-200',
  // Web scraping — purple
  'Web Scraping':'bg-accent/15 border-accent/30 text-accent-light',
  // REST — default neutral
  'REST APIs':  'bg-white/10 border-white/20 text-white',
}

// Blue-family gradients that harmonize with the slate-blue identity
const thumbnailGradients = [
  'linear-gradient(135deg, #0e1f3a 0%, #2a5a9e 55%, #78aaec 100%)',
  'linear-gradient(135deg, #0a2230 0%, #1d6e8c 55%, #57c4e0 100%)',
  'linear-gradient(135deg, #141a3a 0%, #3a4f9e 55%, #8c9aec 100%)',
  'linear-gradient(135deg, #0b2530 0%, #1f7a78 55%, #5fd4c0 100%)',
]

const gridPattern = {
  backgroundImage:
    'linear-gradient(rgba(255,255,255,0.10) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.10) 1px, transparent 1px)',
  backgroundSize: '22px 22px',
}

const lastCardAlone = (projects.length - projects.filter((p) => p.featured).length) % 2 === 1

export default function Projects() {
  const sectionRef = useRef(null)
  const cardsRef = useRef([])
  const tiltsRef = useRef([])
  const thumbsRef = useRef([])

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const ctx = gsap.context(() => {
      cardsRef.current.forEach((card, i) => {
        if (!card) return
        const fromLeft = i % 2 === 0

        if (prefersReducedMotion) {
          gsap.set(card, { opacity: 1, y: 0, scale: 1, rotationX: 0, rotationY: 0 })
          return
        }

        // 3D entrance scrubbed to scroll (outer element)
        gsap.fromTo(
          card,
          {
            opacity: 0,
            y: 90,
            scale: 0.85,
            rotationX: 32,
            rotationY: fromLeft ? -20 : 20,
            transformPerspective: 1000,
            transformOrigin: 'center center',
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            rotationX: 0,
            rotationY: 0,
            ease: 'none',
            scrollTrigger: { trigger: card, start: 'top 95%', end: 'top 62%', scrub: 1 },
          }
        )

        // Thumbnail parallax
        const thumb = thumbsRef.current[i]
        if (thumb) {
          gsap.fromTo(
            thumb,
            { yPercent: -12 },
            {
              yPercent: 12,
              ease: 'none',
              scrollTrigger: { trigger: card, start: 'top bottom', end: 'bottom top', scrub: 1 },
            }
          )
        }
      })

      if (prefersReducedMotion) return

      // Cursor-tilt on hover (inner element, so it doesn't fight the entrance transform)
      const cleanups = []
      cardsRef.current.forEach((card, i) => {
        const inner = tiltsRef.current[i]
        if (!card || !inner) return
        gsap.set(inner, { transformPerspective: 800 })
        const rx = gsap.quickTo(inner, 'rotationX', { duration: 0.5, ease: 'power3' })
        const ry = gsap.quickTo(inner, 'rotationY', { duration: 0.5, ease: 'power3' })
        const max = 7

        const onMove = (e) => {
          const r = card.getBoundingClientRect()
          const px = (e.clientX - r.left) / r.width
          const py = (e.clientY - r.top) / r.height
          ry((px - 0.5) * max * 2)
          rx(-(py - 0.5) * max * 2)
        }
        const onLeave = () => {
          rx(0)
          ry(0)
        }

        card.addEventListener('pointermove', onMove)
        card.addEventListener('pointerleave', onLeave)
        cleanups.push(() => {
          card.removeEventListener('pointermove', onMove)
          card.removeEventListener('pointerleave', onLeave)
        })
      })

      return () => cleanups.forEach((fn) => fn())
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="projects" ref={sectionRef} className="relative section-padding">
      <div className="max-w-6xl mx-auto">
        <div className="mb-16 text-center">
          <p className="section-title inline-flex items-center gap-3 font-mono text-accent-light text-xs tracking-[0.3em] uppercase mb-4">
            <span className="w-9 h-px bg-accent" aria-hidden="true" />
            02 · Work
          </p>
          <h2 className="section-title font-orbitron text-3xl md:text-5xl font-bold text-white">
            Things I built, <span className="text-gradient">broke and fixed</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8" style={{ perspective: '1200px' }}>
          {projects.map((project, index) => {
            // Featured cards span the row; so does the last card when it would sit alone.
            const wide = project.featured || (lastCardAlone && index === projects.length - 1)
            return (
            <div
              key={project.id}
              ref={(el) => (cardsRef.current[index] = el)}
              className={`will-change-transform ${wide ? 'md:col-span-2' : ''}`}
            >
              <div
                ref={(el) => (tiltsRef.current[index] = el)}
                className="group relative glass rounded-2xl overflow-hidden hover:border-accent/40 transition-colors duration-500 h-full will-change-transform"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className={`relative p-8 h-full flex flex-col ${wide ? 'md:flex-row md:gap-8' : ''}`}>
                  {/* Thumbnail: real screenshot or gradient, with tech chips over a scrim */}
                  <div className={`mb-6 h-48 rounded-xl overflow-hidden relative ${wide ? 'md:mb-0 md:w-1/2 md:h-auto md:min-h-64 shrink-0' : ''}`}>
                    <div
                      ref={(el) => (thumbsRef.current[index] = el)}
                      className="absolute inset-x-0 -top-[15%] h-[130%]"
                      style={
                        project.image
                          ? undefined
                          : { background: thumbnailGradients[index % thumbnailGradients.length] }
                      }
                    >
                      {project.image ? (
                        <img
                          src={project.image}
                          alt={`${project.title} screenshot`}
                          loading="lazy"
                          className={`w-full h-full ${project.imageContain ? 'object-contain bg-navy' : 'object-cover object-top'}`}
                        />
                      ) : (
                        <div className="absolute inset-0" style={gridPattern} />
                      )}
                    </div>
                    <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-navy via-navy/40 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 flex flex-wrap gap-2 p-4">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className={`text-[11px] px-2.5 py-1 rounded-full backdrop-blur-sm border transition-colors duration-500 ${tagColorMap[tag] ?? 'bg-white/10 border-white/20 text-white'}`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col flex-grow">
                  <p className="font-mono text-[10px] tracking-[0.2em] text-grey mb-2">
                    P-{String(index + 1).padStart(3, '0')}
                    {project.featured && ' · FEATURED'}
                  </p>
                  <h3 className="font-orbitron text-xl font-bold text-white mb-3 group-hover:text-accent-light transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-grey mb-6 flex-grow leading-relaxed">{project.description}</p>

                  <div className="flex gap-4">
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm text-white hover:text-accent-light transition-colors"
                      >
                        <ExternalLink size={16} />
                        Live Demo
                      </a>
                    )}
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm text-grey hover:text-white transition-colors"
                      >
                        <GithubIcon className="w-4 h-4" />
                        Source
                      </a>
                    )}
                  </div>
                  </div>
                </div>
              </div>
            </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
