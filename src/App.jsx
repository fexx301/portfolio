import { lazy, Suspense, useEffect, useRef } from 'react'
import Lenis from '@studio-freight/lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import ErrorBoundary from './components/ErrorBoundary'
import ScrollFin from './components/ScrollFin'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Projects from './components/Projects'
import Skills from './components/Skills'
import Experience from './components/Experience'
import Contact from './components/Contact'
import Footer from './components/Footer'

import { useScrollAnimation } from './hooks/useScrollAnimation'

gsap.registerPlugin(ScrollTrigger)

// three.js + postprocessing are most of the bundle; load them after the content paints.
const Scene3D = lazy(() => import('./components/Scene3D'))

function App() {
  useScrollAnimation()
  const reduceMotion = useRef(window.matchMedia('(prefers-reduced-motion: reduce)').matches).current

  // Dismiss the preloader once the content has mounted; the 3D background loads in behind it.
  useEffect(() => {
    window.__hidePreloader?.()
  }, [])

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: !reduceMotion,
    })

    lenis.on('scroll', ScrollTrigger.update)

    const lenisRaf = (time) => {
      lenis.raf(time * 1000)
    }

    gsap.ticker.add(lenisRaf)
    gsap.ticker.lagSmoothing(0)

    return () => {
      lenis.destroy()
      gsap.ticker.remove(lenisRaf)
    }
  }, [])

  return (
    <div className="relative min-h-screen">
      <ErrorBoundary>
        {!reduceMotion && (
          <Suspense fallback={null}>
            <Scene3D />
          </Suspense>
        )}
      </ErrorBoundary>
      <ScrollFin />
      <div className="relative z-10">
        <Navbar />
        <main>
          <Hero />
          <About />
          <Projects />
          <Skills />
          <Experience />
          <Contact />
        </main>
        <Footer />
      </div>
    </div>
  )
}

export default App
