import { now } from '../data/data'

const columns = [
  { key: 'building', title: 'Building' },
  { key: 'reading', title: 'Reading' },
].filter((c) => now[c.key]?.length)

export default function Now() {
  if (!columns.length) return null

  return (
    <section id="now" className="relative section-padding">
      <div className="max-w-4xl mx-auto">
        <div className="mb-12">
          <p className="section-title inline-flex items-center gap-3 font-mono text-accent-light text-xs tracking-[0.3em] uppercase mb-4">
            <span className="w-9 h-px bg-accent" aria-hidden="true" />
            05 · Now
          </p>
          <h2 className="section-title font-orbitron text-3xl md:text-5xl font-bold text-white">
            What I&apos;m <span className="text-gradient">on right now</span>
          </h2>
        </div>

        <div className={`reveal grid gap-10 ${columns.length > 1 ? 'md:grid-cols-2' : ''}`}>
          {columns.map(({ key, title }) => (
            <div key={key}>
              <h3 className="font-mono text-[11px] tracking-[0.3em] uppercase text-grey mb-4">{title}</h3>
              <ul className="space-y-3">
                {now[key].map((item) => (
                  <li key={item.text} className="flex gap-3 text-white/90 leading-relaxed">
                    <span className="text-accent-light" aria-hidden="true">—</span>
                    {item.link ? (
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-accent-light underline decoration-white/20 underline-offset-4 transition-colors"
                      >
                        {item.text}
                      </a>
                    ) : (
                      <span>{item.text}</span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
