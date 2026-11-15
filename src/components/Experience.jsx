import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { experiences } from '../data/data'

gsap.registerPlugin(ScrollTrigger)

export default function Experience() {
  const sectionRef = useRef(null)
  const cardsRef = useRef([])

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        gsap.set(cardsRef.current, { opacity: 1, rotationY: 0 })
        return
      }

      cardsRef.current.forEach((card, i) => {
        if (!card) return
        const even = i % 2 === 0

        // Page-opening flip: hinged on the edge nearest the timeline spine,
        // scrubbed to scroll so it closes again on the way back up.
        gsap.fromTo(
          card,
          {
            opacity: 0.15,
            rotationY: even ? 98 : -98,
            transformOrigin: even ? 'left center' : 'right center',
            transformPerspective: 1300,
          },
          {
            opacity: 1,
            rotationY: 0,
            ease: 'none',
            scrollTrigger: {
              trigger: card,
              start: 'top 88%',
              end: 'top 48%',
              scrub: 1,
            },
          }
        )
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="experience" ref={sectionRef} className="relative section-padding">
      <div className="max-w-4xl mx-auto">
        <div className="mb-16 text-center">
          <p className="section-title inline-flex items-center gap-3 font-mono text-accent-light text-xs tracking-[0.3em] uppercase mb-4">
            <span className="w-9 h-px bg-accent" aria-hidden="true" />
            04 · Background
          </p>
          <h2 className="section-title font-orbitron text-3xl md:text-5xl font-bold text-white">
            Experience & <span className="text-gradient">background</span>
          </h2>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-accent via-accent-light to-transparent" />

          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <div
                key={exp.id}
                className={`relative flex flex-col md:flex-row gap-8 ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Dot */}
                <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-accent border-4 border-navy shadow-[0_0_15px_rgba(16,185,129,0.5)] z-10" />

                {/* Date - desktop only */}
                <div
                  className={`hidden md:flex md:w-1/2 ${
                    index % 2 === 0 ? 'justify-end pr-12' : 'justify-start pl-12'
                  }`}
                >
                  <span className="font-orbitron text-accent-light text-sm tracking-wider pt-2">
                    {exp.period}
                  </span>
                </div>

                {/* Content */}
                <div
                  className={`pl-12 md:pl-0 md:w-1/2 ${
                    index % 2 === 0 ? 'md:pl-12' : 'md:pr-12 md:text-right'
                  }`}
                >
                  <div
                    ref={(el) => (cardsRef.current[index] = el)}
                    className="glass rounded-2xl p-6 hover:border-accent/40 transition-colors duration-300 will-change-transform"
                  >
                    <span className="md:hidden font-orbitron text-accent-light text-sm tracking-wider">
                      {exp.period}
                    </span>
                    <h3 className="font-orbitron text-lg font-bold text-white mt-1 mb-1">
                      {exp.role}
                    </h3>
                    <p className="text-grey text-sm mb-3">{exp.company}</p>
                    <p className="text-grey text-sm leading-relaxed">{exp.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
