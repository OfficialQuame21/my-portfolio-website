import type { ReactNode } from 'react'
import { cx } from '../lib/utils'
import { Reveal } from './Reveal'

type Props = {
  /** Small all-caps label above the title, e.g. "02 — Skills". */
  eyebrow: string
  title: ReactNode
  description?: ReactNode
  align?: 'left' | 'center'
  className?: string
}

export function SectionHeading({ eyebrow, title, description, align = 'left', className }: Props) {
  const centered = align === 'center'

  return (
    <Reveal className={cx('max-w-3xl', centered && 'mx-auto text-center', className)}>
      <p
        className={cx(
          'flex items-center gap-3 font-mono text-[0.7rem] font-medium tracking-[0.22em] text-accent-ink uppercase',
          centered && 'justify-center',
        )}
      >
        <span aria-hidden="true" className="h-px w-6 bg-accent/60" />
        {eyebrow}
      </p>

      <h2 className="mt-4 text-3xl leading-[1.12] font-semibold sm:text-4xl lg:text-[2.75rem]">{title}</h2>

      {description ? (
        <p className={cx('mt-4 text-base leading-relaxed text-muted sm:text-lg', centered && 'mx-auto')}>
          {description}
        </p>
      ) : null}
    </Reveal>
  )
}
