import { useEffect, useRef } from 'react'
import Lenis from '@studio-freight/lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import ErrorBoundary from './components/ErrorBoundary'
import Scene3D from './components/Scene3D'
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

function App() {
  useScrollAnimation()
  const reduceMotion = useRef(window.matchMedia('(prefers-reduced-motion: reduce)').matches).current

  // With reduced motion the 3D scene never renders, so nothing signals the
  // preloader — dismiss it here once the app has mounted.
  useEffect(() => {
    if (reduceMotion) window.__hidePreloader?.()
  }, [reduceMotion])

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
        {!reduceMotion && <Scene3D />}
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
