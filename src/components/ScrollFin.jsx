import { useEffect, useRef } from 'react'

// A shark fin mounted flat against the right edge, pointing into the screen.
// It glides down the edge with scroll progress and flips to face the scroll
// direction — diving (down) and surfacing (up). Scroll-driven, so it still
// works with reduced motion.
export default function ScrollFin() {
  const finRef = useRef(null)
  const bodyRef = useRef(null)
  const wakeRef = useRef(null)

  useEffect(() => {
    const fin = finRef.current
    const body = bodyRef.current
    if (!fin || !body) return

    let raf = null
    let hideTimer = null
    let lastY = window.scrollY
    let dir = 1 // 1 = scrolling down, -1 = scrolling up

    // Flip the fin vertically with scroll direction.
    const applyDir = (d) => {
      body.style.transform = `scaleY(${-d})`
    }
    applyDir(dir)

    const update = () => {
      const y = window.scrollY
      const max = document.documentElement.scrollHeight - window.innerHeight
      const p = max > 0 ? Math.min(1, Math.max(0, y / max)) : 0
      const travel = window.innerHeight - 72
      fin.style.transform = `translateY(${28 + p * (travel - 28)}px)`

      if (Math.abs(y - lastY) > 1) {
        const nd = y > lastY ? 1 : -1
        if (nd !== dir) {
          dir = nd
          applyDir(dir)
        }
        lastY = y
      }
      raf = null
    }

    const onScroll = () => {
      // show the wake while scrolling, hide it shortly after motion stops
      if (wakeRef.current) wakeRef.current.style.opacity = '1'
      clearTimeout(hideTimer)
      hideTimer = setTimeout(() => {
        if (wakeRef.current) wakeRef.current.style.opacity = '0'
      }, 180)
      if (!raf) raf = requestAnimationFrame(update)
    }

    // Drag the fin like a scrollbar thumb: fin travel maps linearly onto page scroll.
    let drag = null
    const onDown = (e) => {
      e.preventDefault()
      fin.setPointerCapture(e.pointerId)
      drag = { y: e.clientY, scroll: window.scrollY }
    }
    const onMove = (e) => {
      if (!drag) return
      const max = document.documentElement.scrollHeight - window.innerHeight
      const track = window.innerHeight - 72 - 28
      window.scrollTo(0, drag.scroll + ((e.clientY - drag.y) * max) / track)
    }
    const onUp = () => { drag = null }

    update()
    fin.addEventListener('pointerdown', onDown)
    fin.addEventListener('pointermove', onMove)
    fin.addEventListener('pointerup', onUp)
    fin.addEventListener('pointercancel', onUp)
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      fin.removeEventListener('pointerdown', onDown)
      fin.removeEventListener('pointermove', onMove)
      fin.removeEventListener('pointerup', onUp)
      fin.removeEventListener('pointercancel', onUp)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (raf) cancelAnimationFrame(raf)
      clearTimeout(hideTimer)
    }
  }, [])

  return (
    <div className="fixed right-0 top-0 z-50 pointer-events-none hidden md:block">
      <div
        ref={finRef}
        title="Drag to scroll"
        className="will-change-transform pointer-events-auto cursor-grab active:cursor-grabbing touch-none select-none"
      >
        <div
          ref={bodyRef}
          className="relative origin-center transition-transform duration-300 ease-out"
        >
          {/* wake ripples — only visible while scrolling */}
          <div ref={wakeRef} className="absolute inset-0 opacity-0 transition-opacity duration-200">
            <span className="absolute right-1 -top-1 w-7 h-px origin-right bg-gradient-to-l from-accent-light to-transparent animate-[fin-wake_1.6s_ease-out_infinite]" />
            <span className="absolute right-1 -top-2.5 w-6 h-px origin-right bg-gradient-to-l from-accent-light to-transparent animate-[fin-wake_1.6s_ease-out_infinite] [animation-delay:0.8s]" />

          </div>
          {/* fin pointing left (into screen), flat base on the right edge */}
          {/* dorsal-fin silhouette, rotated to point into the screen */}
          <svg width="44" height="44" viewBox="5 5 30 30" fill="none" aria-hidden="true">
            <g transform="rotate(-90 20 20)">
              <path
                d="M31 34 C34 22 32 10 27 5 C26 4 25 5 24.5 7 C24 14 16 27 9 34 Z"
                fill="#34d399"
                opacity="0.92"
              />
            </g>
          </svg>
        </div>
      </div>
    </div>
  )
}
