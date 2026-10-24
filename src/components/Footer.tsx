import { ArrowUp } from 'lucide-react'
import { footerBlurb, footerTagline, navItems, profile } from '../data/profile'
import { prefersReducedMotion, scrollToSection } from '../lib/utils'
import { SocialLinks } from './SocialLinks'

/** Resolved once at load — the copyright year must not depend on a re-render. */
const year = new Date().getFullYear()

export function Footer() {
  return (
    <footer className="relative border-t border-line bg-canvas-deep/60">
      <div className="container-page py-14 sm:py-16">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_auto]">
          {/* Identity */}
          <div className="max-w-sm">
            <p className="font-display text-xl font-bold tracking-tight">{profile.name}</p>
            <p className="mt-3 text-sm leading-relaxed text-muted">{footerBlurb}</p>
            <SocialLinks className="mt-5" />
          </div>

          {/* Navigation */}
          <nav aria-label="Footer">
            <p className="font-mono text-[0.68rem] tracking-[0.18em] text-faint uppercase">Explore</p>
            <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2.5">
              {navItems.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    onClick={(e) => {
                      e.preventDefault()
                      scrollToSection(item.id)
                    }}
                    className="text-sm text-muted transition-colors hover:text-ink"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Back to top */}
          <div className="md:justify-self-end">
            <button
              type="button"
              onClick={() =>
                window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? 'auto' : 'smooth' })
              }
              className="inline-flex items-center gap-2 rounded-full border border-line px-4 py-2.5 text-sm text-muted transition-colors duration-200 hover:border-accent/50 hover:bg-accent-soft hover:text-ink"
            >
              <ArrowUp size={15} aria-hidden="true" />
              Back to top
            </button>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-line pt-7 text-sm text-faint sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {year} {profile.name}. All rights reserved.
          </p>
          <p className="text-balance sm:text-right">{footerTagline}</p>
        </div>
      </div>
    </footer>
  )
}
