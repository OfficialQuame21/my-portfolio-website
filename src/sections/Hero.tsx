import { ArrowDown, ArrowRight, FileText, Mail } from 'lucide-react'
import { Button } from '../components/Button'
import { CodeCard } from '../components/CodeCard'
import { ProfilePhoto } from '../components/ProfilePhoto'
import { Reveal } from '../components/Reveal'
import { features, profile } from '../data/profile'
import { scrollToSection } from '../lib/utils'

/** Factual credential line under the hero copy — no numbers, no claims. */
const credentials = [
  'B.Tech. Computer Science',
  'HND Computer Network Management',
  'Koforidua Technical University',
]

export function Hero() {
  return (
    <section
      id="home"
      aria-label="Introduction"
      className="relative scroll-mt-24 overflow-hidden pt-28 pb-20 outline-none sm:pt-32 lg:pt-36 lg:pb-28"
    >
      <div className="container-page">
        <div className="grid items-center gap-12 lg:grid-cols-[1.08fr_0.92fr] lg:gap-16">
          {/* ---------------------------------------------------------- copy */}
          <div className="min-w-0 max-w-2xl">
            <Reveal>
              <p className="flex items-center gap-3 font-mono text-[0.7rem] font-medium tracking-[0.2em] text-accent-ink uppercase">
                <span aria-hidden="true" className="h-px w-8 bg-accent/60" />
                {profile.eyebrow}
              </p>
            </Reveal>

            <Reveal delay={80}>
              <h1 className="mt-6 font-display text-[2.1rem] leading-[1.07] font-bold tracking-tight sm:text-[3.1rem] lg:text-[3.9rem]">
                {/* Trailing spaces separate the lines for screen readers; they
                    collapse visually because each span is a block. */}
                <span className="block">{profile.headline[0]} </span>
                <span className="block">{profile.headline[1]} </span>
                <span className="text-gradient block">{profile.headline[2]}</span>
              </h1>
            </Reveal>

            <Reveal delay={160}>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg">{profile.intro}</p>
            </Reveal>

            <Reveal delay={240}>
              <div className="mt-9 flex flex-wrap items-center gap-3">
                <Button onClick={() => scrollToSection('projects')}>
                  Explore My Work
                  <ArrowRight size={17} aria-hidden="true" />
                </Button>

                <Button variant="secondary" onClick={() => scrollToSection('contact')}>
                  <Mail size={16} aria-hidden="true" />
                  Get in Touch
                </Button>
              </div>
            </Reveal>

            {features.resume.enabled ? (
              <Reveal delay={300}>
                <a
                  href={features.resume.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="mt-5 inline-flex items-center gap-2 text-sm text-muted underline-offset-4 transition-colors hover:text-ink hover:underline"
                >
                  <FileText size={15} aria-hidden="true" />
                  {features.resume.label}
                  <span className="sr-only"> (PDF, opens in a new tab)</span>
                </a>
              </Reveal>
            ) : null}

            <Reveal delay={340}>
              <ul className="mt-10 flex flex-wrap items-center gap-x-3 gap-y-2 border-t border-line pt-6 text-xs text-faint">
                {credentials.map((item, i) => (
                  <li key={item} className="flex items-center gap-3">
                    <span>{item}</span>
                    {/* Separator trails its item, so a wrapped line never opens with a stray dot. */}
                    {i < credentials.length - 1 ? (
                      <span aria-hidden="true" className="size-1 rounded-full bg-line-strong" />
                    ) : null}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          {/* -------------------------------------------------------- visual */}
          <Reveal delay={200} className="min-w-0 lg:pl-4">
            {/* Portrait and code card: side by side once there is room for
                both, stacked below that so neither gets squeezed. */}
            <div className="flex flex-col items-center gap-8 sm:flex-row sm:items-start sm:gap-6 lg:flex-col lg:items-stretch lg:gap-7">
              <ProfilePhoto className="shrink-0 sm:mx-0 sm:w-[15rem] lg:w-full" />

              <div className="relative min-w-0 flex-1">
                {/* Offset accent plate behind the card, desktop only. */}
                <div
                  aria-hidden="true"
                  className="absolute -inset-3 hidden rounded-[1.5rem] border border-line opacity-60 lg:block"
                  style={{ transform: 'rotate(-1.4deg)' }}
                />
                <CodeCard />
              </div>
            </div>
          </Reveal>
        </div>

        {/* Scroll indicator */}
        <Reveal delay={420}>
          <div className="mt-16 hidden justify-center lg:flex">
            <a
              href="#about"
              onClick={(e) => {
                e.preventDefault()
                scrollToSection('about')
              }}
              className="group inline-flex flex-col items-center gap-2 rounded-lg px-3 py-2 text-[0.68rem] tracking-[0.18em] text-faint uppercase transition-colors hover:text-muted"
            >
              Scroll
              <ArrowDown
                size={14}
                aria-hidden="true"
                className="transition-transform duration-300 group-hover:translate-y-0.5"
              />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
