import type { ReactNode } from 'react'
import { cx } from '../lib/utils'

type Props = {
  id: string
  /** Accessible name for the landmark — usually the visible heading text. */
  label: string
  children: ReactNode
  className?: string
  /** Adds the subtle alternate background used to separate adjacent sections. */
  tone?: 'base' | 'raised'
}

export function Section({ id, label, children, className, tone = 'base' }: Props) {
  return (
    <section
      id={id}
      aria-label={label}
      className={cx(
        'relative scroll-mt-24 py-20 outline-none sm:py-24 lg:py-28',
        tone === 'raised' && 'bg-surface/35',
        className,
      )}
    >
      {tone === 'raised' ? (
        <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-px bg-line" />
      ) : null}
      <div className="container-page">{children}</div>
    </section>
  )
}
