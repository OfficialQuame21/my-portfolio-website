import { Reveal } from '../components/Reveal'
import { Section } from '../components/Section'
import { SectionHeading } from '../components/SectionHeading'
import { SkillGroupCard } from '../components/SkillGroupCard'
import { levelMeta, skillGroups } from '../data/skills'
import { cx } from '../lib/utils'

const legendStyles = {
  applied: 'border-accent/30 bg-accent-soft text-accent-ink',
  working: 'border-line-strong bg-surface-2/70 text-muted',
  learning: 'border-amber-400/35 bg-amber-400/10 text-amber-300 light:text-amber-700',
} as const

export function Skills() {
  return (
    <Section id="skills" label="Technical Skills">
      <SectionHeading
        eyebrow="02 — Skills"
        title="Technical Skills"
        description="Grouped by what I actually do with them. No percentages — just an honest note on how much mileage each one has."
      />

      {/* Legend: makes the labelling system explicit rather than decorative. */}
      <Reveal delay={60}>
        <ul className="mt-7 flex flex-wrap items-center gap-2.5">
          {(Object.keys(levelMeta) as Array<keyof typeof levelMeta>).map((level) => (
            <li key={level}>
              <span
                className={cx(
                  'inline-flex items-center gap-2 rounded-lg border px-2.5 py-1.5 text-xs font-medium',
                  legendStyles[level],
                )}
              >
                <span aria-hidden="true" className="size-1.5 rounded-full bg-current opacity-70" />
                {levelMeta[level].label}
              </span>
            </li>
          ))}
        </ul>
      </Reveal>

      <div className="mt-10 grid gap-5 sm:grid-cols-2">
        {skillGroups.map((group, i) => (
          <Reveal key={group.id} delay={i * 80}>
            <SkillGroupCard group={group} />
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
