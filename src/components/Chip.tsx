import type { ReactNode } from 'react'
import { cx } from '../lib/utils'

type Props = {
  children: ReactNode
  tone?: 'neutral' | 'accent' | 'violet' | 'cyan' | 'learning'
  /** 'md' is for a chip that acts as a card's label, not just metadata. */
  size?: 'sm' | 'md'
  className?: string
  title?: string
}

const sizes = {
  sm: 'px-2.5 py-1 text-xs',
  md: 'px-3 py-1.5 text-sm',
} as const

const tones = {
  neutral: 'border-line bg-surface-2/70 text-muted',
  accent: 'border-accent/30 bg-accent-soft text-accent-ink',
  violet: 'border-violet/30 bg-violet-soft text-violet-ink',
  cyan: 'border-cyan/30 bg-cyan-soft text-cyan',
  learning: 'border-amber-400/30 bg-amber-400/10 text-amber-300 light:text-amber-700',
} as const

export function Chip({ children, tone = 'neutral', size = 'sm', className, title }: Props) {
  return (
    <span
      title={title}
      className={cx(
        'inline-flex items-center gap-1.5 rounded-full border leading-none font-medium',
        sizes[size],
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  )
}
