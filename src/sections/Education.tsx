import { Award, GraduationCap, MapPin } from 'lucide-react'
import { Chip } from '../components/Chip'
import { DevHint } from '../components/DevHint'
import { Reveal } from '../components/Reveal'
import { Section } from '../components/Section'
import { SectionHeading } from '../components/SectionHeading'
import { education } from '../data/education'

export function Education() {
  return (
    <Section id="education" label="Education">
      <SectionHeading
        eyebrow="06 — Education"
        title="Education"
        description="A deliberate progression: networks and systems first, then the full Computer Science degree built on top of it."
      />

      <div className="mt-12 space-y-5">
        {education.map((entry, i) => {
          const honours = entry.record?.honours
          const showHonours = honours?.verified === true

          return (
            <Reveal key={entry.id} delay={i * 90}>
              <article className="surface-card relative overflow-hidden p-6 transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-0.5 hover:border-line-strong hover:shadow-lift sm:p-8">
                <div className="grid gap-6 sm:grid-cols-[auto_1fr] sm:gap-7">
                  <span
                    aria-hidden="true"
                    className="grid size-12 place-items-center rounded-xl border border-line bg-accent-soft text-accent-ink"
                  >
                    <GraduationCap size={21} />
                  </span>

                  <div className="min-w-0">
                    <p className="font-mono text-[0.72rem] tracking-[0.16em] text-accent-ink uppercase">
                      {entry.period}
                    </p>

                    <h3 className="mt-2.5 text-[1.35rem] leading-snug font-semibold text-balance sm:text-[1.55rem]">{entry.qualification}</h3>

                    <p className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-muted">
                      <span>{entry.institution}</span>
                      <span aria-hidden="true" className="size-1 rounded-full bg-line-strong" />
                      <span className="inline-flex items-center gap-1 text-faint">
                        <MapPin size={12} aria-hidden="true" />
                        {entry.location}
                      </span>
                    </p>

                    <p className="mt-4 max-w-[78ch] text-sm leading-relaxed text-muted">{entry.summary}</p>

                    {/* Academic record */}
                    {entry.record ? (
                      <div className="mt-5 flex flex-wrap items-center gap-2.5">
                        {entry.record.cgpa ? (
                          <span className="inline-flex items-baseline gap-2 rounded-xl border border-line bg-canvas/50 px-3.5 py-2">
                            <span className="font-mono text-[0.68rem] tracking-[0.14em] text-faint uppercase">
                              Final CGPA
                            </span>
                            <span className="font-display text-base font-semibold text-ink">{entry.record.cgpa}</span>
                          </span>
                        ) : null}

                        {showHonours && honours?.classification ? (
                          <Chip tone="accent">{honours.classification}</Chip>
                        ) : null}

                        {showHonours && honours?.highlight ? (
                          <span className="inline-flex items-center gap-2 rounded-xl border border-violet/30 bg-violet-soft px-3.5 py-2 text-sm font-medium text-violet-ink">
                            <Award size={15} aria-hidden="true" />
                            {honours.highlight}
                          </span>
                        ) : null}

                        {honours && !showHonours ? (
                          <DevHint>
                            Hidden until verified: classification &amp; departmental award (education.ts)
                          </DevHint>
                        ) : null}
                      </div>
                    ) : null}

                    {/* Focus areas */}
                    {entry.focus && entry.focus.length > 0 ? (
                      <ul className="mt-5 flex flex-wrap gap-2">
                        {entry.focus.map((area) => (
                          <li key={area}>
                            <Chip>{area}</Chip>
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </div>
                </div>
              </article>
            </Reveal>
          )
        })}
      </div>
    </Section>
  )
}
