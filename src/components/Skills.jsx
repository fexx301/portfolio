import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Shield, Brain, Database, Code2, Globe, Zap, GitBranch } from 'lucide-react'
import {
  SiJavascript, SiTypescript, SiRust,
  SiHtml5, SiCss,
  SiReact, SiNextdotjs, SiFastapi, SiDjango, SiTailwindcss,
  SiPostgresql, SiSqlite,
  SiGit, SiDocker,
} from 'react-icons/si'
import { skills } from '../data/data'

gsap.registerPlugin(ScrollTrigger)

const iconMap = {
  // Languages
  'JavaScript':   SiJavascript,
  'TypeScript':   SiTypescript,
  'Python':       null,
  'Rust':         SiRust,
  'HTML5':        SiHtml5,
  'CSS3':         SiCss,
  // Frameworks & Libraries
  'React':        SiReact,
  'Next.js':      SiNextdotjs,
  'FastAPI':      SiFastapi,
  'Django':       SiDjango,
  'Tailwind CSS': SiTailwindcss,
  // Databases
  'PostgreSQL':   SiPostgresql,
  'MongoDB':      null,
  'SQLite':       SiSqlite,
  'Redis':        null,
  // Tools
  'Git':          SiGit,
  'VS Code':      null,
  'Docker':       SiDocker,
  // Concepts — lucide icons
  'Web Security':             Shield,
  'Data Pipelines':           Database,
  'API Design':               Code2,
  'Web Scraping':             Globe,
  'Performance Optimization': Zap,
  'CI/CD':                    GitBranch,
  'AI Engineering':           Brain,
}

const brandColors = {
  // Languages
  'JavaScript':   '#F7DF1E',
  'TypeScript':   '#3178C6',
  'Python':       '#FFD43B',
  'Rust':         '#CE412B',
  'HTML5':        '#E34F26',
  'CSS3':         '#1572B6',
  // Frameworks & Libraries
  'React':        '#61DAFB',
  'Next.js':      '#FFFFFF',
  'FastAPI':      '#009688',
  'Django':       '#44B78B',
  'Tailwind CSS': '#06B6D4',
  'PostgreSQL':   '#4169E1',
  'MongoDB':      '#47A248',
  'SQLite':       '#0F80CC',
  'Redis':        '#DC382D',
  // Tools
  'Git':          '#F05032',
  'VS Code':      '#007ACC',
  'Docker':       '#2496ED',
  // Concepts
  'Web Security':             '#EF4444',
  'Data Pipelines':           '#A78BFA',
  'API Design':               '#06B6D4',
  'Web Scraping':             '#34D399',
  'Performance Optimization': '#F59E0B',
  'CI/CD':                    '#6366F1',
  'AI Engineering':           '#D97757',
}

const svgIconMap = {
  'Python':   'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg',
  'VS Code':  'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vscode/vscode-original.svg',
  'Redis':    'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/redis/redis-original.svg',
  'MongoDB':  'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg',
}

export default function Skills() {
  const sectionRef = useRef(null)
  const cardsRef   = useRef([])
  const groupsRef  = useRef([])

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const ctx = gsap.context(() => {
      groupsRef.current.forEach((group, i) => {
        if (!group) return
        const wraps = group.querySelectorAll('.pill-wrap')

        if (prefersReducedMotion) {
          gsap.set(wraps, { opacity: 1, y: 0, scale: 1 })
          return
        }

        gsap.fromTo(
          wraps,
          { opacity: 0, y: 24, scale: 0.8 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            ease: 'none',
            stagger: 0.06,
            scrollTrigger: {
              trigger: cardsRef.current[i],
              start: 'top 90%',
              end: 'top 45%',
              scrub: 1,
            },
          }
        )
      })

      if (prefersReducedMotion) return

      const cleanups = []
      groupsRef.current.forEach((group) => {
        if (!group) return
        const pills = [...group.querySelectorAll('.pill')]
        const setters = pills.map((pill) => ({
          x:     gsap.quickTo(pill, 'x',     { duration: 0.4, ease: 'power3' }),
          y:     gsap.quickTo(pill, 'y',     { duration: 0.4, ease: 'power3' }),
          scale: gsap.quickTo(pill, 'scale', { duration: 0.4, ease: 'power3' }),
        }))
        const radius = 130

        const onMove = (e) => {
          pills.forEach((pill, i) => {
            const r    = pill.getBoundingClientRect()
            const cx   = r.left + r.width  / 2
            const cy   = r.top  + r.height / 2
            const dx   = e.clientX - cx
            const dy   = e.clientY - cy
            const dist = Math.hypot(dx, dy)
            if (dist < radius) {
              const force = 1 - dist / radius
              setters[i].x(dx * 0.35 * force)
              setters[i].y(dy * 0.35 * force - 4 * force)
              setters[i].scale(1 + 0.12 * force)
            } else {
              setters[i].x(0)
              setters[i].y(0)
              setters[i].scale(1)
            }
          })
        }
        const onLeave = () => setters.forEach((s) => { s.x(0); s.y(0); s.scale(1) })

        group.addEventListener('pointermove',  onMove)
        group.addEventListener('pointerleave', onLeave)
        cleanups.push(() => {
          group.removeEventListener('pointermove',  onMove)
          group.removeEventListener('pointerleave', onLeave)
        })
      })

      return () => cleanups.forEach((fn) => fn())
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="skills" ref={sectionRef} className="relative section-padding">
      <div className="max-w-4xl mx-auto">
        <div className="mb-16 text-center">
          <p className="section-title font-orbitron text-accent-light text-sm tracking-[0.3em] uppercase mb-4">
            Expertise
          </p>
          <h2 className="section-title font-orbitron text-3xl md:text-5xl font-bold text-white">
            Skills & <span className="text-gradient">technologies</span>
          </h2>
        </div>

        <div className="space-y-6">
          {skills.map((group, i) => (
            <div
              key={group.category}
              ref={(el) => (cardsRef.current[i] = el)}
              className="glass rounded-2xl p-6 hover:border-accent/40 transition-colors duration-300"
            >
              <h3 className="font-orbitron text-xs text-accent-light tracking-[0.25em] uppercase mb-4">
                {group.category}
              </h3>
              <div ref={(el) => (groupsRef.current[i] = el)} className="flex flex-wrap gap-3">
                {group.items.map((item) => {
                  const Icon   = iconMap[item]
                  const svgSrc = svgIconMap[item]
                  const brand  = brandColors[item]
                  return (
                    <span key={item} className="pill-wrap inline-block will-change-transform">
                      <span
                        className="pill inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-white border border-accent/20 hover:border-accent/50 hover:bg-accent/20 transition-colors duration-300 text-sm will-change-transform cursor-default"
                        style={brand ? { '--pill-brand': brand } : undefined}
                      >
                        {svgSrc
                          ? <img src={svgSrc} alt="" aria-hidden="true" className="pill-svg-icon w-4 h-4 shrink-0" />
                          : Icon && <Icon className="pill-icon w-4 h-4 shrink-0" />
                        }
                        {item}
                      </span>
                    </span>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
