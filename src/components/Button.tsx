import type { ComponentPropsWithoutRef, ReactNode } from 'react'
import { cx } from '../lib/utils'

type Variant = 'primary' | 'secondary' | 'ghost'
type Size = 'md' | 'sm'

const base =
  'inline-flex items-center justify-center gap-2 rounded-full font-medium whitespace-nowrap ' +
  'transition-[transform,background-color,border-color,box-shadow,color] duration-200 ' +
  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ' +
  'active:translate-y-px disabled:pointer-events-none disabled:opacity-55'

const variants: Record<Variant, string> = {
  primary:
    'bg-accent text-on-accent shadow-[0_8px_24px_-10px_var(--c-accent)] ' +
    'hover:brightness-110 hover:shadow-[0_14px_34px_-12px_var(--c-accent)] hover:-translate-y-0.5',
  secondary:
    'border border-line-strong bg-surface/70 text-ink backdrop-blur-sm ' +
    'hover:border-accent/55 hover:bg-surface hover:-translate-y-0.5',
  ghost: 'text-muted hover:text-ink hover:bg-accent-soft',
}

const sizes: Record<Size, string> = {
  md: 'h-12 px-6 text-[0.95rem]',
  sm: 'h-10 px-4 text-sm',
}

type CommonProps = {
  variant?: Variant
  size?: Size
  className?: string
  children: ReactNode
}

type ButtonProps = CommonProps & ComponentPropsWithoutRef<'button'> & { as?: 'button' }
type AnchorProps = CommonProps & ComponentPropsWithoutRef<'a'> & { as: 'a' }

export function Button(props: ButtonProps | AnchorProps) {
  const { variant = 'primary', size = 'md', className, children, ...rest } = props
  const classes = cx(base, variants[variant], sizes[size], className)

  if (rest.as === 'a') {
    const { as: _as, ...anchorProps } = rest as AnchorProps
    void _as
    return (
      <a className={classes} {...anchorProps}>
        {children}
      </a>
    )
  }

  const { as: _as, ...buttonProps } = rest as ButtonProps
  void _as
  return (
    <button type="button" className={classes} {...buttonProps}>
      {children}
    </button>
  )
}
