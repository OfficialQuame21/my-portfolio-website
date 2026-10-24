import { useEffect, useRef, useState } from 'react'
import type { CSSProperties, ElementType, ReactNode } from 'react'
import { cx } from '../lib/utils'

type RevealProps = {
  children: ReactNode
  /** Stagger in milliseconds. */
  delay?: number
  className?: string
  as?: ElementType
}

/**
 * Fades + lifts its children into view once, the first time they are scrolled
 * near. Uses IntersectionObserver and a CSS transition rather than an
 * animation library — a handful of lines instead of a runtime dependency.
 *
 * The reduced-motion block in index.css neutralises the transition entirely,
 * so content is simply present for anyone who has asked for less movement.
 */
export function Reveal({ children, delay = 0, className, as: Tag = 'div' }: RevealProps) {
  const ref = useRef<HTMLElement>(null)
  // Without IntersectionObserver there is nothing to wait for — start visible.
  const [visible, setVisible] = useState(() => typeof IntersectionObserver === 'undefined')

  useEffect(() => {
    const el = ref.current
    if (!el) return

    if (typeof IntersectionObserver === 'undefined') return

    const observer = new IntersectionObserver(
      ([entry]) => {
        // `isIntersecting` alone is not enough: a jump-scroll (an anchor link,
        // a restored scroll position) can move an element from below the fold
        // to above it between two observation frames, so it would never be
        // seen as intersecting and would stay invisible forever. Treat
        // "already scrolled past" as revealed too.
        const scrolledPast = entry.boundingClientRect.bottom <= 0

        if (entry.isIntersecting || scrolledPast) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.06 },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <Tag
      ref={ref}
      className={cx('reveal', className)}
      data-visible={visible}
      style={delay ? ({ '--reveal-delay': `${delay}ms` } as CSSProperties) : undefined}
    >
      {children}
    </Tag>
  )
}
