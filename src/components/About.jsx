import { personalData } from '../data/data'
import { Mail, Code2, Sparkles } from 'lucide-react'

const stats = [
  { label: 'Projects Built', value: '4+' },
  { label: 'Years Coding', value: '3+' },
  { label: 'Technologies', value: '12+' },
]

export default function About() {
  return (
    <section id="about" className="relative section-padding">
      <div className="max-w-6xl mx-auto">
        <div className="mb-16">
          <p className="section-title font-orbitron text-accent-light text-sm tracking-[0.3em] uppercase mb-4">
            About Me
          </p>
          <h2 className="section-title font-orbitron text-3xl md:text-5xl font-bold text-white">
            Building things <span className="text-gradient">that matter</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div className="reveal space-y-6">
            <p className="text-grey text-lg leading-relaxed">{personalData.about}</p>
            <p className="text-grey leading-relaxed">
              Beyond security tooling, I&apos;ve built a pipeline that scrapes and dedupes listings
              across five platforms daily (Hacklist). I move across the stack comfortably, React
              and TypeScript up front, FastAPI and PostgreSQL underneath. And I write accessible,
              cross-browser-safe markup by default, not as an afterthought.
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
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                  <Sparkles size={22} className="text-accent-light" />
                </div>
                <div>
                  <h3 className="font-orbitron text-lg font-semibold text-white mb-2">
                    Open to opportunities
                  </h3>
                  <p className="text-grey text-sm">
                    Available for full-stack roles, freelance projects, and collaborations.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
