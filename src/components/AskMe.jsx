import { useRef, useState } from 'react'
import { personalData, profile, projects } from '../data/data'

const suggestions = [
  { label: 'veto', q: 'What is Veto and why did you build it?' },
  { label: 'xss scan', q: 'How did XSS Scan find 12 bugs?' },
  { label: 'hiring?', q: 'Are you open to work?' },
]

// Used when /api/ask is unreachable (local `npm run dev`, missing key, outage).
// Built only from the site's own data so it can never say anything the page doesn't.
function offlineAnswer(q) {
  const lower = q.toLowerCase()
  const project = projects.find((p) => lower.includes(p.title.toLowerCase()))
  if (project) return project.description
  if (/open to|hire|hiring|available|work with/.test(lower)) {
    const openTo = profile.find(([k]) => k === 'Open to')?.[1]
    return `Yes. I'm open to ${openTo.toLowerCase()}. The fastest way to reach me is ${personalData.email}.`
  }
  return `The live answers aren't available right now. Email me at ${personalData.email} and I'll reply directly.`
}

export default function AskMe() {
  const [question, setQuestion] = useState('')
  const [answer, setAnswer] = useState('')
  const [status, setStatus] = useState('idle') // idle | streaming | done
  const abortRef = useRef(null)

  const ask = async (q) => {
    q = q.trim()
    if (!q || status === 'streaming') return
    setQuestion(q)
    setAnswer('')
    setStatus('streaming')
    const controller = new AbortController()
    abortRef.current = controller
    let text = ''
    try {
      const res = await fetch('/api/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: q }),
        signal: controller.signal,
      })
      if (res.status === 400 || res.status === 429) {
        text = await res.text()
      } else if (!res.ok || !res.body) {
        throw new Error(`ask failed: ${res.status}`)
      } else {
        const reader = res.body.getReader()
        const decoder = new TextDecoder()
        for (;;) {
          const { value, done } = await reader.read()
          if (done) break
          text += decoder.decode(value, { stream: true })
          setAnswer(text)
        }
      }
    } catch (err) {
      if (err.name === 'AbortError') {
        setStatus('done')
        return
      }
      if (!text) text = offlineAnswer(q)
    }
    setAnswer(text)
    setStatus('done')
  }

  const onSubmit = (e) => {
    e.preventDefault()
    ask(question)
  }

  return (
    <div className="w-full max-w-xl mx-auto text-left font-mono">
      <form
        onSubmit={onSubmit}
        className="flex items-center gap-2 rounded-full border border-accent/25 bg-navy/60 backdrop-blur-sm pl-5 pr-1.5 py-1.5 focus-within:border-accent transition-[border-color] duration-150"
      >
        <label htmlFor="ask-input" className="text-accent-light text-xs tracking-widest shrink-0">
          ask ▸
        </label>
        <input
          id="ask-input"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          maxLength={300}
          placeholder="what are you building right now?"
          autoComplete="off"
          className="flex-1 min-w-0 bg-transparent text-white text-sm placeholder-grey/60 outline-none py-2"
        />
        {status === 'streaming' ? (
          <button
            type="button"
            onClick={() => abortRef.current?.abort()}
            className="px-4 py-2 rounded-full border border-white/15 text-grey hover:text-white text-xs tracking-widest"
          >
            stop
          </button>
        ) : (
          <button
            type="submit"
            className="px-4 py-2 rounded-full bg-accent hover:bg-accent-dark text-white text-xs tracking-widest transition-[background-color] duration-150"
          >
            send
          </button>
        )}
      </form>

      <div className="flex flex-wrap items-center gap-2 mt-3 px-2 text-[11px] text-grey">
        <span>try:</span>
        {suggestions.map((s) => (
          <button
            key={s.label}
            type="button"
            onClick={() => ask(s.q)}
            disabled={status === 'streaming'}
            className="px-2.5 py-1 rounded-full border border-white/10 hover:border-accent hover:text-accent-light transition-colors disabled:opacity-50"
          >
            {s.label}
          </button>
        ))}
      </div>

      {status !== 'idle' && (
        <div
          className="mt-4 border-l-2 border-accent bg-accent/[0.04] px-4 py-3 rounded-r-lg"
          aria-live="polite"
          aria-busy={status === 'streaming'}
        >
          <p className="text-[10px] uppercase tracking-[0.22em] text-grey mb-2">
            {status === 'streaming' ? 'answering…' : 'AI answer from my project notes'}
          </p>
          <p className="text-sm leading-relaxed text-white/90 whitespace-pre-wrap">
            {answer}
            {status === 'streaming' && (
              <span className="inline-block w-[0.55ch] h-[1em] ml-0.5 align-[-0.12em] bg-accent-light animate-pulse" />
            )}
          </p>
        </div>
      )}
    </div>
  )
}
