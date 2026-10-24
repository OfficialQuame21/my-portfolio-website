import { useEffect, useRef, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { features, navItems, profile } from '../data/profile'
import { useActiveSection } from '../hooks/useActiveSection'
import { useScrolled } from '../hooks/useScrolled'
import { cx, scrollToSection } from '../lib/utils'
import { Button } from './Button'
import { ThemeToggle } from './ThemeToggle'

const sectionIds = navItems.map((item) => item.id)

export function Navbar() {
  const [open, setOpen] = useState(false)
  const scrolled = useScrolled(12)
  const active = useActiveSection(sectionIds)
  const panelRef = useRef<HTMLDivElement>(null)
  const toggleRef = useRef<HTMLButtonElement>(null)

  // Lock background scrolling and wire up Escape while the mobile panel is open.
  useEffect(() => {
    if (!open) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false)
        toggleRef.current?.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  // Close the panel if the viewport grows past the mobile breakpoint.
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)')
    const onChange = () => mq.matches && setOpen(false)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  const go = (id: string) => {
    setOpen(false)
    // Let the panel unmount and scroll unlock before moving the page.
    requestAnimationFrame(() => scrollToSection(id))
  }

  return (
    <header
      className={cx(
        'fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,box-shadow,backdrop-filter] duration-300',
        scrolled || open
          ? 'border-b border-line bg-canvas/80 shadow-[0_1px_0_0_var(--c-line)] backdrop-blur-xl'
          : 'border-b border-transparent bg-transparent',
      )}
    >
      <nav aria-label="Primary" className="container-page flex h-16 items-center justify-between gap-4 sm:h-18">
        {/* Brand */}
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault()
            go('home')
          }}
          className="group flex shrink-0 items-center gap-2 rounded-lg font-display text-lg font-bold tracking-tight"
        >
          <span className="text-ink">{profile.monogram}</span>
          <span className="sr-only">{profile.name} — home</span>
          <span
            aria-hidden="true"
            className="h-1.5 w-1.5 rounded-full bg-accent transition-transform duration-300 group-hover:scale-150"
          />
        </a>

        {/* Desktop links */}
        <ul className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => {
            const isActive = active === item.id
            return (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  aria-current={isActive ? 'true' : undefined}
                  onClick={(e) => {
                    e.preventDefault()
                    go(item.id)
                  }}
                  className={cx(
                    'relative rounded-lg px-3 py-2 text-sm transition-colors duration-200',
                    isActive ? 'text-ink' : 'text-muted hover:text-ink',
                  )}
                >
                  {item.label}
                  <span
                    aria-hidden="true"
                    className={cx(
                      'absolute inset-x-3 -bottom-0.5 h-px origin-left bg-accent transition-transform duration-300',
                      isActive ? 'scale-x-100' : 'scale-x-0',
                    )}
                  />
                </a>
              </li>
            )
          })}
        </ul>

        {/* Actions */}
        <div className="flex items-center gap-2">
          {features.themeToggle ? <ThemeToggle /> : null}

          <Button
            size="sm"
            className="hidden lg:inline-flex"
            onClick={() => go('contact')}
          >
            Let&rsquo;s Connect
          </Button>

          <button
            ref={toggleRef}
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            className="inline-flex size-10 items-center justify-center rounded-full border border-line text-ink transition-colors hover:bg-accent-soft lg:hidden"
          >
            {open ? <X size={18} aria-hidden="true" /> : <Menu size={18} aria-hidden="true" />}
          </button>
        </div>
      </nav>

      {/* Mobile panel */}
      <div
        id="mobile-menu"
        ref={panelRef}
        hidden={!open}
        className="border-t border-line bg-canvas/95 backdrop-blur-xl lg:hidden"
      >
        <ul className="container-page flex max-h-[calc(100dvh-4rem)] flex-col gap-1 overflow-y-auto py-4">
          {navItems.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                onClick={(e) => {
                  e.preventDefault()
                  go(item.id)
                }}
                aria-current={active === item.id ? 'true' : undefined}
                className={cx(
                  'flex items-center justify-between rounded-xl px-4 py-3.5 text-base transition-colors',
                  active === item.id ? 'bg-accent-soft text-ink' : 'text-muted hover:bg-surface hover:text-ink',
                )}
              >
                {item.label}
                {active === item.id ? (
                  <span aria-hidden="true" className="size-1.5 rounded-full bg-accent" />
                ) : null}
              </a>
            </li>
          ))}
          <li className="mt-2 px-1 pb-2">
            <Button className="w-full" onClick={() => go('contact')}>
              Let&rsquo;s Connect
            </Button>
          </li>
        </ul>
      </div>
    </header>
  )
}
