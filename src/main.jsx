import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

// Fade out the instant preloader. App calls window.__hidePreloader() on mount.
// A short minimum on-screen time avoids a flash; the safety timeout guarantees
// it clears even if the app never mounts.
const MIN_VISIBLE_MS = 600
const SAFETY_MS = 5000
const startedAt = performance.now()
let dismissed = false

function hidePreloader() {
  if (dismissed) return
  dismissed = true
  const el = document.getElementById('preloader')
  if (!el) return
  const wait = Math.max(0, MIN_VISIBLE_MS - (performance.now() - startedAt))
  setTimeout(() => {
    el.classList.add('is-hidden')
    const remove = () => el.remove()
    el.addEventListener('transitionend', remove, { once: true })
    setTimeout(remove, 800) // fallback if transitionend never fires
  }, wait)
}

window.__hidePreloader = hidePreloader
setTimeout(hidePreloader, SAFETY_MS)
