import { useState } from 'react'
import { Send, Mail, CheckCircle } from 'lucide-react'
import { personalData } from '../data/data'
import { GithubIcon, LinkedinIcon, TwitterIcon } from './SocialIcons'

// Web3Forms access key — set VITE_WEB3FORMS_ACCESS_KEY in your .env / host env.
// Get a free key at https://web3forms.com (it's frontend-safe to expose).
const ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState('idle') // 'idle' | 'submitting' | 'success' | 'error'

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('submitting')
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: ACCESS_KEY,
          subject: `Portfolio message from ${formData.name}`,
          name: formData.name,
          email: formData.email,
          message: formData.message,
        }),
      })
      const data = await res.json()
      if (data.success) {
        setStatus('success')
        setFormData({ name: '', email: '', message: '' })
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <section id="contact" className="relative section-padding">
      <div className="max-w-4xl mx-auto">
        <div className="mb-16 text-center">
          <p className="section-title inline-flex items-center gap-3 font-mono text-accent-light text-xs tracking-[0.3em] uppercase mb-4">
            <span className="w-9 h-px bg-accent" aria-hidden="true" />
            06 · Reach
          </p>
          <h2 className="section-title font-orbitron text-3xl md:text-5xl font-bold text-white">
            Let&apos;s build <span className="text-gradient">something useful</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-5 gap-12">
          <div className="md:col-span-2 reveal space-y-8">
            <p className="text-grey leading-relaxed">
              Have a project in mind or just want to say hello? I&apos;m always open to discussing
              new opportunities and creative ideas.
            </p>

            <div className="space-y-4">
              <a
                href={`mailto:${personalData.email}`}
                className="flex items-center gap-4 text-grey hover:text-white transition-colors group"
              >
                <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                  <Mail size={18} className="text-accent-light" />
                </div>
                <span>{personalData.email}</span>
              </a>

              <div className="flex gap-4 pt-4">
                <a
                  href={personalData.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center text-grey hover:text-white hover:bg-accent/20 transition-[color,background-color] duration-150"
                  aria-label="GitHub"
                >
                  <GithubIcon className="w-[18px] h-[18px]" />
                </a>
                <a
                  href={personalData.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center text-grey hover:text-white hover:bg-accent/20 transition-[color,background-color] duration-150"
                  aria-label="LinkedIn"
                >
                  <LinkedinIcon className="w-[18px] h-[18px]" />
                </a>
                <a
                  href={personalData.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center text-grey hover:text-white hover:bg-accent/20 transition-[color,background-color] duration-150"
                  aria-label="Twitter / X"
                >
                  <TwitterIcon className="w-[18px] h-[18px]" />
                </a>
              </div>
            </div>
          </div>

          <div className="md:col-span-3 reveal">
            {status === 'success' ? (
              <div className="glass rounded-2xl p-10 text-center h-full flex flex-col items-center justify-center gap-4">
                <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center">
                  <CheckCircle size={32} className="text-accent-light" />
                </div>
                <h3 className="font-orbitron text-xl font-bold text-white">Message received!</h3>
                <p className="text-grey max-w-xs">
                  Thanks for reaching out. I&apos;ll get back to you as soon as possible.
                </p>
                <button
                  onClick={() => setStatus('idle')}
                  className="mt-2 text-sm text-accent-light hover:text-white transition-colors underline underline-offset-4"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm text-grey mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl bg-navy-light border border-accent/20 text-white placeholder-grey/50 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-[border-color,box-shadow] duration-150"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm text-grey mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl bg-navy-light border border-accent/20 text-white placeholder-grey/50 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-[border-color,box-shadow] duration-150"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm text-grey mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 rounded-xl bg-navy-light border border-accent/20 text-white placeholder-grey/50 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-[border-color,box-shadow] duration-150 resize-none"
                    placeholder="Tell me about your project..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="w-full sm:w-auto px-8 py-3 bg-accent hover:bg-accent-dark text-white font-medium rounded-full transition-[background-color,box-shadow] duration-150 ease-out glow-accent flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {status === 'submitting' ? 'Sending…' : 'Send Message'}
                  <Send size={18} />
                </button>

                {status === 'error' && (
                  <p className="text-rose-400 text-sm" role="alert">
                    Something went wrong. Please email me directly at{' '}
                    <a href={`mailto:${personalData.email}`} className="underline underline-offset-4">
                      {personalData.email}
                    </a>
                    .
                  </p>
                )}
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
