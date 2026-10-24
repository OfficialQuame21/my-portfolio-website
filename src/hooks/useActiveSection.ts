import { useEffect, useState } from 'react'

/**
 * Tracks which section is currently in view so the navbar can highlight it.
 *
 * Uses a single IntersectionObserver with a band near the top of the viewport,
 * which is far cheaper than a scroll listener and matches what a reader
 * actually perceives as "the section I'm on".
 */
export function useActiveSection(ids: string[]): string {
  const [active, setActive] = useState(ids[0] ?? '')

  useEffect(() => {
    const elements = ids.map((id) => document.getElementById(id)).filter((el): el is HTMLElement => el !== null)
    if (elements.length === 0) return

    const visible = new Map<string, number>()

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.set(entry.target.id, entry.intersectionRatio)
          else visible.delete(entry.target.id)
        }

        if (visible.size > 0) {
          // Pick the section highest on the page among those currently in the band.
          const best = ids.find((id) => visible.has(id))
          if (best) setActive(best)
        }
      },
      { rootMargin: '-96px 0px -55% 0px', threshold: [0, 0.01, 0.25] },
    )

    elements.forEach((el) => observer.observe(el))

    // At the very bottom of the page the last section may never win the band,
    // so settle on it explicitly.
    const onScroll = () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 2) {
        setActive(ids[ids.length - 1])
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })

    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', onScroll)
    }
  }, [ids])

  return active
}
