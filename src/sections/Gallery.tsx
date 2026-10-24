import { useMemo, useState } from 'react'
import { Expand, Images } from 'lucide-react'
import { Lightbox } from '../components/Lightbox'
import { Reveal } from '../components/Reveal'
import { Section } from '../components/Section'
import { SectionHeading } from '../components/SectionHeading'
import { galleryCategories, galleryItems } from '../data/gallery'
import type { GalleryCategoryId } from '../data/gallery'
import { cx } from '../lib/utils'

type Filter = 'all' | GalleryCategoryId

export function Gallery() {
  const [filter, setFilter] = useState<Filter>('all')
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  // Only offer filters for categories that actually have images in them.
  const availableCategories = useMemo(
    () => galleryCategories.filter((category) => galleryItems.some((item) => item.category === category.id)),
    [],
  )

  const visible = useMemo(
    () => (filter === 'all' ? galleryItems : galleryItems.filter((item) => item.category === filter)),
    [filter],
  )

  // Empty gallery: skip the section in production rather than ship a shell.
  // In dev it stays visible with instructions.
  if (galleryItems.length === 0 && !import.meta.env.DEV) return null

  return (
    <Section id="gallery" label="Gallery" tone="raised">
      <SectionHeading
        eyebrow="09 — Gallery"
        title="Gallery"
        description="Screenshots of what I've built, certificates, and photographs from events and training sessions."
      />

      {galleryItems.length === 0 ? (
        <div className="mt-10 rounded-2xl border border-dashed border-line-strong p-8 text-center sm:p-12">
          <span
            aria-hidden="true"
            className="mx-auto grid size-12 place-items-center rounded-xl border border-line bg-accent-soft text-accent-ink"
          >
            <Images size={22} />
          </span>
          <p className="mt-4 font-display text-lg font-semibold">No images yet</p>
          <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-muted">
            Drop files into <code className="font-mono text-xs">public/images/</code> and add an entry to{' '}
            <code className="font-mono text-xs">src/data/gallery.ts</code>. This section — and its nav link — appear
            automatically once there is something to show, and stay hidden in production until then.
          </p>
        </div>
      ) : (
        <>
          {/* Category filters */}
          {availableCategories.length > 1 ? (
            <Reveal delay={60}>
              <div role="group" aria-label="Filter gallery by category" className="mt-8 flex flex-wrap gap-2">
                {[{ id: 'all' as const, short: 'All' }, ...availableCategories].map((category) => {
                  const active = filter === category.id
                  return (
                    <button
                      key={category.id}
                      type="button"
                      onClick={() => setFilter(category.id as Filter)}
                      aria-pressed={active}
                      className={cx(
                        'rounded-full border px-3.5 py-2 text-sm font-medium transition-colors duration-200',
                        active
                          ? 'border-accent/45 bg-accent-soft text-accent-ink'
                          : 'border-line text-muted hover:border-line-strong hover:text-ink',
                      )}
                    >
                      {category.short}
                    </button>
                  )
                })}
              </div>
            </Reveal>
          ) : null}

          {/* Grid */}
          <ul className="mt-8 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
            {visible.map((item, i) => (
              <li key={item.id}>
                <Reveal delay={Math.min(i, 7) * 50}>
                  <button
                    type="button"
                    onClick={() => setOpenIndex(i)}
                    className="group surface-card relative block w-full overflow-hidden p-0 text-left transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-1 hover:border-line-strong hover:shadow-lift"
                  >
                    {/* Fixed ratio box: the grid never reflows as images load. */}
                    <span className="block aspect-[4/3] overflow-hidden bg-surface-2/60">
                      <img
                        src={item.src}
                        alt={item.alt}
                        width={item.width}
                        height={item.height}
                        loading="lazy"
                        decoding="async"
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </span>

                    {/* Hover scrim with the title */}
                    <span className="pointer-events-none absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-canvas via-canvas/40 to-transparent p-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
                      <span className="flex items-center gap-1.5 text-xs font-medium text-ink">
                        <Expand size={12} aria-hidden="true" />
                        {item.title}
                      </span>
                      {item.date ? <span className="mt-0.5 font-mono text-[0.65rem] text-muted">{item.date}</span> : null}
                    </span>

                    <span className="sr-only">View {item.title} larger</span>
                  </button>
                </Reveal>
              </li>
            ))}
          </ul>

          {visible.length === 0 ? (
            <p className="mt-8 rounded-2xl border border-dashed border-line-strong p-8 text-center text-sm text-muted">
              Nothing in this category yet.
            </p>
          ) : null}

          <Lightbox items={visible} index={openIndex} onClose={() => setOpenIndex(null)} onNavigate={setOpenIndex} />
        </>
      )}
    </Section>
  )
}
