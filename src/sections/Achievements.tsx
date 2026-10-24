import { Award, Trophy } from 'lucide-react'
import type { Achievement } from '../data/achievements'
import { DevHint } from '../components/DevHint'
import { Reveal } from '../components/Reveal'
import { Section } from '../components/Section'
import { SectionHeading } from '../components/SectionHeading'
import { achievements } from '../data/achievements'
import { features } from '../data/profile'
import { scrollToSection } from '../lib/utils'
import { cx } from '../lib/utils'

const icons = { award: Award, trophy: Trophy } as const

const accents = {
  violet: {
    badge: 'border-violet/30 bg-violet-soft text-violet-ink',
    rail: 'from-violet/70 to-violet/0',
    marker: 'bg-violet/70',
    crest: 'var(--c-violet)',
  },
  blue: {
    badge: 'border-accent/30 bg-accent-soft text-accent-ink',
    rail: 'from-accent/70 to-accent/0',
    marker: 'bg-accent/70',
    crest: 'var(--c-accent)',
  },
} as const

/**
 * Stands in for a certificate photo until a real one is supplied. Abstract on
 * purpose — a generated image of an award would be a fabricated document.
 */
function Crest({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 320 120" role="presentation" aria-hidden="true" className="h-full w-full" preserveAspectRatio="xMidYMid slice">
      <g fill="none" stroke={color} strokeWidth="1.1" opacity="0.5">
        {[0, 1, 2, 3].map((i) => (
          <circle key={i} cx={160} cy={60} r={22 + i * 20} strokeOpacity={0.5 - i * 0.1} strokeDasharray={i % 2 ? '3 7' : undefined} />
        ))}
        <path d="M0 60 h110 M210 60 h110" strokeOpacity="0.2" strokeLinecap="round" />
      </g>
    </svg>
  )
}

function AchievementCard({ item, index }: { item: Achievement; index: number }) {
  const Icon = icons[item.icon]
  const accent = accents[item.accent]

  return (
    <article className="group surface-card relative flex flex-col overflow-hidden transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-1 hover:border-line-strong hover:shadow-lift">
      {/* Accent rail along the top edge. */}
      <span aria-hidden="true" className={cx('absolute inset-x-0 top-0 h-px bg-gradient-to-r', accent.rail)} />

      {/* A real photograph or certificate when one is supplied; a quiet crest otherwise. */}
      <div className="relative h-28 overflow-hidden border-b border-line bg-surface-2/50 sm:h-32">
        {item.image ? (
          <img
            src={item.image}
            alt={item.imageAlt ?? `${item.title} — ${item.organization}`}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover"
          />
        ) : (
          <Crest color={accent.crest} />
        )}

        {item.year ? (
          <span className="absolute top-4 right-5 rounded-full border border-line bg-canvas/70 px-2.5 py-1 font-mono text-[0.68rem] tracking-[0.14em] text-muted backdrop-blur-sm">
            {item.year}
          </span>
        ) : null}
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-7">
        <div className="flex items-start gap-4">
          <span
            aria-hidden="true"
            className={cx(
              'grid size-11 shrink-0 place-items-center rounded-xl border transition-transform duration-300 group-hover:scale-105',
              accent.badge,
            )}
          >
            <Icon size={19} />
          </span>

          <div className="min-w-0">
            <h3 className="text-lg leading-snug font-semibold text-balance">{item.title}</h3>
            <p className="mt-1.5 text-sm text-muted">{item.organization}</p>
            {item.context ? <p className="mt-0.5 text-sm text-faint">{item.context}</p> : null}
          </div>
        </div>

        <p className="mt-5 leading-relaxed text-muted">{item.description}</p>

        {/* The work behind the award, where there was a build. */}
        {item.project ? (
          <div className="mt-6 rounded-xl border border-line bg-canvas/40 p-4 sm:p-5">
            <p className="font-mono text-[0.68rem] tracking-[0.18em] text-faint uppercase">The project</p>
            <h4 className="mt-2 text-base leading-snug font-semibold text-balance">{item.project.name}</h4>

            {/* The full write-up lives in the Projects section — link to it
                rather than repeating the same paragraph here. */}
            {item.project.ref ? (
              <button
                type="button"
                onClick={() => scrollToSection('projects')}
                className="mt-2.5 inline-flex items-center gap-1.5 text-sm text-accent-ink underline-offset-4 transition-colors hover:underline"
              >
                See the project in detail
                <span aria-hidden="true">&rarr;</span>
              </button>
            ) : null}

            <h4 className="mt-5 font-mono text-[0.68rem] tracking-[0.18em] text-faint uppercase">
              What it demonstrates
            </h4>
            <ul className="mt-3 grid gap-2 sm:grid-cols-2 sm:gap-x-6">
              {item.project.demonstrates.map((point) => (
                <li key={point} className="flex items-start gap-2.5 text-sm leading-relaxed text-muted">
                  <span aria-hidden="true" className={cx('mt-[0.45rem] h-px w-3 shrink-0', accent.marker)} />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        {!item.image ? (
          <div className="mt-6">
            <DevHint>{`Optional: add a photo or certificate for "${item.id}" (public/achievements/)`}</DevHint>
          </div>
        ) : null}

      </div>

      {/* Decorative index, matching the project cards. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute bottom-4 right-6 font-mono text-xs tracking-[0.2em] text-faint/50"
      >
        {String(index + 1).padStart(2, '0')}
      </span>
    </article>
  )
}

export function Achievements() {
  if (!features.achievements) return null

  const verified = achievements.filter((a) => a.verified)
  const pending = achievements.filter((a) => !a.verified)

  // Nothing confirmed yet and nothing to flag in dev — skip the section entirely
  // rather than render an empty shell.
  if (verified.length === 0 && !import.meta.env.DEV) return null

  return (
    <Section id="achievements" label="Achievements">
      <SectionHeading
        eyebrow="08 — Achievements"
        title="Achievements"
        description="Recognition I can evidence — an academic distinction and a technical competition result. Anything awaiting official confirmation stays off this page."
      />

      {/* lg:items-start — these two cards carry different amounts of detail, so
          stretching the shorter one to match would leave a block of dead space. */}
      {verified.length > 0 ? (
        <ul className="mt-12 grid gap-5 lg:grid-cols-2 lg:items-start">
          {verified.map((item, i) => (
            <li key={item.id}>
              <Reveal delay={i * 90}>
                <AchievementCard item={item} index={i} />
              </Reveal>
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-10 rounded-2xl border border-dashed border-line-strong p-8 text-center text-sm text-muted">
          No achievements are published yet. Set <code className="font-mono">verified: true</code> in{' '}
          <code className="font-mono">src/data/achievements.ts</code> once you have the certificate or official
          confirmation.
        </p>
      )}

      {pending.length > 0 ? (
        <div className="mt-6 flex flex-wrap gap-2">
          {pending.map((item) => (
            <DevHint key={item.id}>{`Awaiting verification: ${item.title}`}</DevHint>
          ))}
        </div>
      ) : null}
    </Section>
  )
}
