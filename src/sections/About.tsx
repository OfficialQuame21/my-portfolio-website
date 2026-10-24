import { Brain, CodeXml, Compass } from 'lucide-react'
import { Reveal } from '../components/Reveal'
import { Section } from '../components/Section'
import { SectionHeading } from '../components/SectionHeading'
import { aboutHeading, aboutParagraphs, highlights } from '../data/about'

const icons = { code: CodeXml, brain: Brain, compass: Compass } as const

export function About() {
  return (
    <Section id="about" label={aboutHeading} tone="raised">
      <SectionHeading
        eyebrow="01 — About"
        title={aboutHeading}
        description="Where I come from academically, what I build, and where I'm heading next."
      />

      <div className="mt-12 grid gap-12 lg:grid-cols-[1.25fr_1fr] lg:gap-16">
        {/* Narrative */}
        <div className="space-y-5">
          {aboutParagraphs.map((paragraph, i) => (
            <Reveal key={i} delay={i * 70}>
              <p className="text-base leading-[1.75] text-muted">{paragraph}</p>
            </Reveal>
          ))}
        </div>

        {/* Highlights */}
        <ul className="space-y-4">
          {highlights.map((item, i) => {
            const Icon = icons[item.icon]
            return (
              <li key={item.title}>
                <Reveal delay={120 + i * 90}>
                  <article className="surface-card group flex gap-4 p-5 transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-0.5 hover:border-line-strong hover:shadow-lift">
                    <span
                      aria-hidden="true"
                      className="grid size-11 shrink-0 place-items-center rounded-xl border border-line bg-accent-soft text-accent-ink transition-colors duration-300 group-hover:border-accent/40"
                    >
                      <Icon size={19} />
                    </span>
                    <div className="min-w-0">
                      <h3 className="text-base font-semibold">{item.title}</h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-muted">{item.body}</p>
                    </div>
                  </article>
                </Reveal>
              </li>
            )
          })}
        </ul>
      </div>
    </Section>
  )
}
