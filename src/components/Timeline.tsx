import type { ReactNode } from 'react'
import { cx } from '../lib/utils'
import { Chip } from './Chip'
import { Reveal } from './Reveal'

export type TimelineItem = {
  id: string
  /** Date range. Pass null when there is none — nothing is rendered in its place. */
  period: ReactNode
  title: string
  subtitle: string
  /** Secondary line under the subtitle, e.g. the event a role sat within. */
  context?: string
  body?: ReactNode
  points?: string[]
  /** Small labelled badge beside the period — how the role was undertaken. */
  badge?: { label: string; icon: ReactNode; tone: 'neutral' | 'violet' }
  /** Subject-area chips shown at the foot of the entry. */
  tags?: string[]
  current?: boolean
}

const badgeTones = {
  neutral: 'border-line-strong bg-surface-2/70 text-muted',
  violet: 'border-violet/30 bg-violet-soft text-violet-ink',
} as const

/**
 * A single vertical rail that collapses gracefully: on mobile the period sits
 * above the entry, on desktop it moves into its own column so the rail reads
 * as a proper chronology.
 */
export function Timeline({ items }: { items: TimelineItem[] }) {
  return (
    <ol className="relative mt-12 space-y-5">
      {/* The rail itself — hidden from assistive tech, it is pure decoration. */}
      <span
        aria-hidden="true"
        className="absolute top-2 bottom-2 left-[9px] w-px bg-gradient-to-b from-accent/45 via-line-strong to-transparent sm:left-[11px]"
      />

      {items.map((item, i) => (
        <li key={item.id} className="relative pl-9 sm:pl-12">
          {/* Node */}
          <span
            aria-hidden="true"
            className={cx(
              'absolute top-6 left-0 grid size-[19px] place-items-center rounded-full border bg-canvas sm:size-[23px]',
              item.current ? 'border-accent' : 'border-line-strong',
            )}
          >
            <span
              className={cx(
                'size-[7px] rounded-full transition-colors',
                item.current ? 'bg-accent' : 'bg-faint',
              )}
            />
            {item.current ? (
              <span className="absolute inset-0 animate-ping rounded-full border border-accent/40 [animation-duration:3s]" />
            ) : null}
          </span>

          <Reveal delay={i * 70}>
            <div className="surface-card p-5 transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-0.5 hover:border-line-strong hover:shadow-lift sm:p-6">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                {item.period ? (
                  <span className="font-mono text-[0.72rem] tracking-[0.14em] text-accent-ink uppercase">
                    {item.period}
                  </span>
                ) : null}

                {item.badge ? (
                  <span
                    className={cx(
                      'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[0.68rem] font-medium',
                      badgeTones[item.badge.tone],
                    )}
                  >
                    {item.badge.icon}
                    {item.badge.label}
                  </span>
                ) : null}

                {item.current ? (
                  <span className="rounded-full border border-accent/30 bg-accent-soft px-2 py-0.5 text-[0.68rem] font-medium text-accent-ink">
                    Current
                  </span>
                ) : null}
              </div>

              <h3 className="mt-2.5 text-lg leading-snug font-semibold text-balance">{item.title}</h3>
              <p className="mt-1 max-w-[78ch] text-sm text-muted">{item.subtitle}</p>
              {item.context ? <p className="mt-0.5 max-w-[78ch] text-sm text-faint">{item.context}</p> : null}

              {item.body ? <div className="mt-3 max-w-[78ch] text-sm leading-relaxed text-muted">{item.body}</div> : null}

              {item.points && item.points.length > 0 ? (
                <ul className="mt-3 space-y-1.5">
                  {item.points.map((point) => (
                    <li key={point} className="flex items-start gap-2.5 text-sm text-muted">
                      <span aria-hidden="true" className="mt-[0.5rem] size-1 shrink-0 rounded-full bg-accent/70" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              ) : null}

              {item.tags && item.tags.length > 0 ? (
                <ul className="mt-4 flex flex-wrap gap-2">
                  {item.tags.map((tag) => (
                    <li key={tag}>
                      <Chip>{tag}</Chip>
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          </Reveal>
        </li>
      ))}
    </ol>
  )
}
