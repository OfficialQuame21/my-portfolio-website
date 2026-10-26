import { ArrowUpRight, Check, Globe, Info, Trophy } from 'lucide-react'
import { AppStoreIcon, GithubIcon, PlayStoreIcon } from './BrandIcons'
import type { Project, ProjectLink } from '../data/projects'
import { cx } from '../lib/utils'
import { Chip } from './Chip'
import { DevHint } from './DevHint'
import { ProjectMotif } from './ProjectMotif'

const linkIcons = {
  github: GithubIcon,
  demo: ArrowUpRight,
  appstore: AppStoreIcon,
  playstore: PlayStoreIcon,
  site: Globe,
} as const

const accentChip = { blue: 'accent', violet: 'violet', cyan: 'cyan' } as const

function ProjectLinks({ links, title }: { links: ProjectLink[]; title: string }) {
  const available = links.filter((link) => link.href.trim() !== '')
  const missing = links.filter((link) => link.href.trim() === '')

  return (
    <div className="flex flex-wrap items-center gap-2.5">
      {available.map((link) => {
        const Icon = linkIcons[link.kind]
        return (
          <a
            key={link.kind}
            href={link.href}
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex items-center gap-2 rounded-full border border-line-strong px-4 py-2 text-sm text-ink transition-colors duration-200 hover:border-accent/55 hover:bg-accent-soft"
          >
            <Icon size={15} aria-hidden="true" />
            {link.label}
            <span className="sr-only"> — {title} (opens in a new tab)</span>
          </a>
        )
      })}

      {missing.length > 0 ? <DevHint>{`Add link: ${missing.map((l) => l.kind).join(', ')}`}</DevHint> : null}
    </div>
  )
}

export function ProjectCard({ project, index }: { project: Project; index: number }) {
  const featured = project.featured === true
  const hasInProgress = (project.inProgress?.length ?? 0) > 0
  const tone = accentChip[project.accent]

  return (
    <article
      className={cx(
        'group surface-card relative overflow-hidden transition-[transform,box-shadow,border-color] duration-300',
        'hover:-translate-y-1 hover:border-line-strong hover:shadow-lift',
        featured && 'ring-gradient',
      )}
    >
      {/* Header band: screenshot when supplied, abstract motif otherwise. */}
      <div className="relative h-28 overflow-hidden border-b border-line bg-surface-2/60 sm:h-32">
        {project.image ? (
          <img
            src={project.image}
            alt={project.imageAlt ?? `${project.title} screenshot`}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover"
          />
        ) : (
          <ProjectMotif
            accent={project.accent}
            variant={project.motif ?? 'route'}
            className="transition-transform duration-700 group-hover:scale-[1.04]"
          />
        )}

        <div className="absolute top-4 left-5 flex flex-wrap items-center gap-2">
          <Chip tone={tone} size="md">
            {project.category}
          </Chip>
          {project.period ? <Chip>{project.period}</Chip> : null}
          {project.award ? (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-400/35 bg-amber-400/12 px-2.5 py-1 text-xs leading-none font-semibold text-amber-300 backdrop-blur-sm light:text-amber-700">
              <Trophy size={12} aria-hidden="true" />
              {project.award.label}
            </span>
          ) : null}
        </div>

        <span
          aria-hidden="true"
          className="absolute top-4 right-5 font-mono text-xs tracking-[0.2em] text-faint"
        >
          {String(index + 1).padStart(2, '0')}
        </span>
      </div>

      <div className="p-5 sm:p-7">
        <h3 className="text-[1.35rem] leading-snug font-semibold text-balance sm:text-[1.55rem]">{project.title}</h3>

        {project.context ? <p className="mt-1.5 text-sm text-faint">{project.context}</p> : null}

        <p className="mt-3 max-w-[70ch] leading-relaxed text-muted">{project.description}</p>

        {/* Problem / contribution */}
        <dl className="mt-6 grid gap-5 sm:grid-cols-2">
          <div className="rounded-xl border border-line bg-canvas/40 p-4">
            <dt className="font-mono text-[0.68rem] tracking-[0.18em] text-faint uppercase">The problem</dt>
            <dd className="mt-2 text-sm leading-relaxed text-muted">{project.problem}</dd>
          </div>
          <div className="rounded-xl border border-line bg-canvas/40 p-4">
            <dt className="font-mono text-[0.68rem] tracking-[0.18em] text-faint uppercase">My contribution</dt>
            <dd className="mt-2 text-sm leading-relaxed text-muted">{project.contribution}</dd>
          </div>
        </dl>

        {/* Shipped vs in development — never merged. */}
        <div className={cx('mt-6 grid gap-6', hasInProgress && 'sm:grid-cols-2')}>
          <div>
            <h4 className="font-mono text-[0.68rem] tracking-[0.18em] text-faint uppercase">Key features</h4>
            {/* With no second column to fill, the list spreads instead of leaving a gap. */}
            <ul className={cx('mt-3 space-y-2', !hasInProgress && 'sm:columns-2 sm:gap-8 sm:space-y-0')}>
              {project.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2.5 py-1 text-sm text-muted sm:break-inside-avoid">
                  <Check size={15} className="mt-0.5 shrink-0 text-accent" aria-hidden="true" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {hasInProgress ? (
            <div>
              <h4 className="font-mono text-[0.68rem] tracking-[0.18em] text-faint uppercase">
                In development
                <span className="sr-only"> — not yet publicly available</span>
              </h4>
              <ul className="mt-3 space-y-2">
                {project.inProgress?.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5 text-sm text-faint">
                    <span
                      aria-hidden="true"
                      className="mt-[0.45rem] size-1.5 shrink-0 rounded-full border border-dashed border-current"
                    />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>

        {/* Tech */}
        {project.tech.length > 0 ? (
          <div className="mt-6">
            <h4 className="sr-only">Technologies used</h4>
            <ul className="flex flex-wrap gap-2">
              {project.tech.map((tech) => (
                <li key={tech}>
                  <Chip className="font-mono">{tech}</Chip>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div className="mt-6">
            <DevHint>Add the technology stack for this project</DevHint>
          </div>
        )}

        {/* Interface screenshots. Empty until real ones are supplied — no
            stand-in image is ever shown as though it were the application. */}
        {project.screenshots && project.screenshots.length > 0 ? (
          <div className="mt-6">
            <h4 className="font-mono text-[0.68rem] tracking-[0.18em] text-faint uppercase">Interface</h4>
            <ul className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {project.screenshots.map((shot) => (
                <li key={shot.src}>
                  <img
                    src={shot.src}
                    alt={shot.alt}
                    loading="lazy"
                    decoding="async"
                    className="aspect-[4/3] w-full rounded-lg border border-line object-cover transition-colors duration-300 hover:border-line-strong"
                  />
                </li>
              ))}
            </ul>
          </div>
        ) : project.screenshots ? (
          <div className="mt-6">
            <DevHint>Add interface screenshots (public/projects/, then `screenshots` in projects.ts)</DevHint>
          </div>
        ) : null}

        {/* Honest scope notes */}
        {project.notes && project.notes.length > 0 ? (
          <ul className="mt-6 space-y-1.5 border-t border-line pt-5">
            {project.notes.map((note) => (
              <li key={note} className="flex items-start gap-2 text-[0.8rem] leading-relaxed text-faint">
                <Info size={13} className="mt-0.5 shrink-0" aria-hidden="true" />
                <span>{note}</span>
              </li>
            ))}
          </ul>
        ) : null}

        <div className="mt-6">
          <ProjectLinks links={project.links} title={project.title} />
        </div>
      </div>
    </article>
  )
}
