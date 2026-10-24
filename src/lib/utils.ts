/** Tiny class-name joiner — enough for this project without pulling in clsx. */
export function cx(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(' ')
}

/** True when the visitor has asked the OS to reduce motion. */
export function prefersReducedMotion(): boolean {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/**
 * Scrolls to a section by id, accounting for the sticky header, and moves
 * keyboard focus there so the jump works for screen-reader and keyboard users
 * rather than only visually.
 */
export function scrollToSection(id: string) {
  const el = document.getElementById(id)
  if (!el) return

  el.scrollIntoView({
    behavior: prefersReducedMotion() ? 'auto' : 'smooth',
    block: 'start',
  })

  // Focus without a second scroll jump.
  el.setAttribute('tabindex', '-1')
  el.focus({ preventScroll: true })
  el.addEventListener('blur', () => el.removeAttribute('tabindex'), { once: true })

  if (history.replaceState) history.replaceState(null, '', `#${id}`)
}
