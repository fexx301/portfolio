import { personalData, profile } from '../data/data'
import { Mail, Code2 } from 'lucide-react'

const stats = [
  { label: 'Confirmed XSS on a live bug bounty target', value: '12' },
  { label: 'Solana programs measured for upgrade risk', value: '117' },
  { label: 'Public repos on GitHub', value: '30' },
]

export default function About() {
  return (
    <section id="about" className="relative section-padding">
      <div className="max-w-6xl mx-auto">
        <div className="mb-16">
          <p className="section-title inline-flex items-center gap-3 font-mono text-accent-light text-xs tracking-[0.3em] uppercase mb-4">
            <span className="w-9 h-px bg-accent" aria-hidden="true" />
            01 · About
          </p>
          <h2 className="section-title font-orbitron text-3xl md:text-5xl font-bold text-white">
            AI engineering, <span className="text-gradient">built like security tooling</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div className="reveal space-y-6">
            <p className="text-grey text-lg leading-relaxed">{personalData.about}</p>
            <p className="text-grey leading-relaxed">
              Lately most of my work is AI engineering, built with a security mindset: Veto pins
              the exact code an agent&apos;s wallet may call, Witness sorts out disputes over
              purchases an AI agent made, and Fūin makes private benchmark scores verifiable. I
              move across the stack, TypeScript and React up front, Python, FastAPI and Rust
              underneath.
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
              <div className="flex items-center gap-2 text-grey">
                <Mail size={18} className="text-accent-light" />
                <span>{personalData.email}</span>
              </div>
            </div>
          </div>

          <div className="grid gap-6">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="reveal glass rounded-2xl p-6 hover:border-accent/40 transition-[border-color] duration-300 group"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-orbitron text-3xl md:text-4xl font-bold text-white group-hover:text-accent-light transition-colors">
                      {stat.value}
                    </p>
                    <p className="text-grey mt-1">{stat.label}</p>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                    <Code2 size={22} className="text-accent-light" />
                  </div>
                </div>
              </div>
            ))}

            <div className="reveal glass rounded-2xl p-6 border-accent/30">
              <h3 className="font-mono text-[11px] tracking-[0.3em] uppercase text-grey mb-4">
                At a glance
              </h3>
              <dl className="grid grid-cols-[max-content_1fr] gap-x-6 gap-y-3 text-sm">
                {profile.map(([term, value]) => (
                  <div key={term} className="contents">
                    <dt className="font-mono text-[11px] tracking-[0.15em] uppercase text-grey self-center">
                      {term}
                    </dt>
                    <dd className="text-white">{value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
