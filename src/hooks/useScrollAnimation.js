import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function useScrollAnimation() {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        gsap.utils.toArray('.section-title, .reveal').forEach((el) => {
          gsap.set(el, { opacity: 1, y: 0, x: 0 })
        })
        gsap.utils.toArray('.skill-bar').forEach((bar) => {
          gsap.set(bar, { width: `${bar.dataset.width}%` })
        })
        gsap.utils.toArray('.timeline-item').forEach((el) => {
          gsap.set(el, { opacity: 1, x: 0 })
        })
        return
      }

      gsap.utils.toArray('.section-title').forEach((title) => {
        gsap.fromTo(
          title,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: title,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        )
      })

      gsap.utils.toArray('.reveal').forEach((el, i) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        )
      })

      gsap.utils.toArray('.timeline-item').forEach((item, i) => {
        gsap.fromTo(
          item,
          { opacity: 0, x: i % 2 === 0 ? -50 : 50 },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        )
      })
    })

    return () => ctx.revert()
  }, [])
}
