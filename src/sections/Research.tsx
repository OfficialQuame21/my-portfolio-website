import { ChartColumn, Cpu, Lock, MessageSquare, Network, Shield } from 'lucide-react'
import { Button } from '../components/Button'
import { Reveal } from '../components/Reveal'
import { Section } from '../components/Section'
import { SectionHeading } from '../components/SectionHeading'
import { projects } from '../data/projects'
import {
  researchIntro,
  researchInterests,
  researchNote,
  researchProjectId,
  researchProjectNote,
} from '../data/research'
import { scrollToSection } from '../lib/utils'

const icons = { shield: Shield, network: Network, lock: Lock, cpu: Cpu, chart: ChartColumn } as const

export function Research() {
  const evidence = projects.find((p) => p.id === researchProjectId)

  return (
    <Section id="research" label="Research Interests" tone="raised">
      <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
        {/* ------------------------------------------------------ left rail */}
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeading eyebrow="07 — Research" title="Research Interests" />

          <Reveal delay={80}>
            <p className="mt-5 text-base leading-[1.75] text-muted">{researchIntro}</p>
          </Reveal>

          {/* Academic project used as evidence of research experience. */}
          {evidence ? (
            <Reveal delay={160}>
              <article className="mt-8 rounded-2xl border border-line bg-canvas/50 p-5">
                <p className="font-mono text-[0.68rem] tracking-[0.18em] text-faint uppercase">
                  Academic project experience
                </p>
                <h3 className="mt-2.5 text-base leading-snug font-semibold text-balance">{evidence.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{researchProjectNote}</p>
                <button
                  type="button"
                  onClick={() => scrollToSection('projects')}
                  className="mt-3.5 inline-flex items-center gap-1.5 text-sm text-accent-ink underline-offset-4 transition-colors hover:underline"
                >
                  See the project details
                  <span aria-hidden="true">&rarr;</span>
                </button>
              </article>
            </Reveal>
          ) : null}

          <Reveal delay={220}>
            <div className="mt-8">
              <Button onClick={() => scrollToSection('contact')}>
                <MessageSquare size={16} aria-hidden="true" />
                Discuss Research Opportunities
              </Button>
            </div>
          </Reveal>
        </div>

        {/* --------------------------------------------------------- the list */}
        <div>
          <ol className="space-y-px overflow-hidden rounded-2xl border border-line">
            {researchInterests.map((interest, i) => {
              const Icon = icons[interest.icon]
              return (
                <li key={interest.title}>
                  <Reveal delay={i * 70}>
                    <article className="group flex gap-4 border-b border-line bg-surface/60 p-5 transition-colors duration-300 last:border-b-0 hover:bg-surface sm:gap-5 sm:p-6">
                      <span
                        aria-hidden="true"
                        className="grid size-10 shrink-0 place-items-center rounded-xl border border-line bg-canvas/60 text-accent-ink transition-colors duration-300 group-hover:border-accent/40 group-hover:bg-accent-soft"
                      >
                        <Icon size={18} />
                      </span>
                      <div className="min-w-0">
                        <h3 className="text-base font-semibold">{interest.title}</h3>
                        <p className="mt-1.5 text-sm leading-relaxed text-muted">{interest.body}</p>
                      </div>
                    </article>
                  </Reveal>
                </li>
              )
            })}
          </ol>

          <Reveal delay={200}>
            <p className="mt-5 flex items-start gap-2.5 text-[0.8rem] leading-relaxed text-faint">
              <span aria-hidden="true" className="mt-[0.45rem] h-px w-5 shrink-0 bg-line-strong" />
              {researchNote}
            </p>
          </Reveal>
        </div>
      </div>
    </Section>
  )
}
