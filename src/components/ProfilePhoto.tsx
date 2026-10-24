import { ImagePlus } from 'lucide-react'
import { DevHint } from './DevHint'
import { photo, profile } from '../data/profile'
import { cx } from '../lib/utils'

/**
 * The hero portrait.
 *
 * With no photograph configured this renders a monogram panel — deliberately
 * not a stock face, and tasteful enough to ship as-is. In `npm run dev` an
 * amber hint names the exact file to drop in; that hint renders nothing in a
 * production build, so a visitor never sees scaffolding.
 *
 * The frame holds a fixed 4:5 aspect ratio whether or not an image has loaded,
 * so the hero never shifts as the photo arrives.
 */
export function ProfilePhoto({ className }: { className?: string }) {
  const src = photo.src.trim()

  return (
    <figure className={cx('mx-auto w-full max-w-[15rem] sm:max-w-[17rem] lg:mx-0 lg:max-w-[19rem]', className)}>
      <div className="ring-gradient relative aspect-[4/5] overflow-hidden rounded-2xl border border-line bg-surface shadow-lift">
        {src ? (
          <img
            src={src}
            alt={photo.alt}
            // Eagerly fetched and high priority: this is above the fold, and
            // lazy-loading it would delay the largest contentful paint.
            loading="eager"
            fetchPriority="high"
            decoding="async"
            className="h-full w-full object-cover"
            style={{ objectPosition: photo.position }}
          />
        ) : (
          <div className="grid h-full w-full place-items-center bg-gradient-to-br from-accent-soft via-surface to-violet-soft">
            <div className="flex flex-col items-center gap-3 px-6 text-center">
              <span
                aria-hidden="true"
                className="font-display text-5xl font-bold tracking-tight text-gradient sm:text-6xl"
              >
                {profile.monogram}
              </span>
              <span
                aria-hidden="true"
                className="inline-flex items-center gap-1.5 rounded-full border border-line bg-canvas/50 px-2.5 py-1 text-[0.68rem] text-faint backdrop-blur-sm"
              >
                <ImagePlus size={12} />
                Portrait
              </span>
            </div>
          </div>
        )}

        {/* Soft floor so a light photograph still meets the caption cleanly. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-canvas/70 to-transparent"
        />
      </div>

      {photo.caption ? (
        <figcaption className="mt-3 text-center text-xs text-faint lg:text-left">{photo.caption}</figcaption>
      ) : null}

      {!src ? (
        <div className="mt-3 flex justify-center lg:justify-start">
          <DevHint>Add your photo: public/images/profile/ → set `photo.src` in data/profile.ts</DevHint>
        </div>
      ) : null}
    </figure>
  )
}
