import { Brain, Database, LayoutGrid, Wrench } from 'lucide-react'
import type { SkillGroup } from '../data/skills'
import { levelMeta } from '../data/skills'
import { cx } from '../lib/utils'

const icons = {
  layout: LayoutGrid,
  database: Database,
  brain: Brain,
  wrench: Wrench,
} as const

const levelStyles = {
  applied: 'border-accent/30 bg-accent-soft text-accent-ink',
  working: 'border-line-strong bg-surface-2/70 text-muted',
  learning: 'border-amber-400/35 bg-amber-400/10 text-amber-300 light:text-amber-700',
} as const

export function SkillGroupCard({ group }: { group: SkillGroup }) {
  const Icon = icons[group.icon]

  return (
    <article className="surface-card h-full p-6 transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-1 hover:border-line-strong hover:shadow-lift">
      <div className="flex items-start gap-3.5">
        <span
          aria-hidden="true"
          className="grid size-10 shrink-0 place-items-center rounded-xl border border-line bg-accent-soft text-accent-ink"
        >
          <Icon size={18} />
        </span>
        <div className="min-w-0">
          <h3 className="text-lg leading-snug font-semibold">{group.title}</h3>
          <p className="mt-1.5 text-sm leading-relaxed text-muted">{group.blurb}</p>
        </div>
      </div>

      <ul className="mt-5 flex flex-wrap gap-2">
        {group.skills.map((skill) => (
          <li key={skill.name}>
            <span
              className={cx(
                'inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-[0.8rem] leading-none font-medium',
                levelStyles[skill.level],
              )}
            >
              {skill.name}
              {skill.level === 'learning' ? (
                <span className="text-[0.62rem] tracking-wide uppercase opacity-80">Learning</span>
              ) : null}
              <span className="sr-only"> — {levelMeta[skill.level].label}</span>
            </span>
          </li>
        ))}
      </ul>
    </article>
  )
}
