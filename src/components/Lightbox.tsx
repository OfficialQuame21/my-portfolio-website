import { useCallback, useEffect, useRef } from 'react'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import type { GalleryItem } from '../data/gallery'
import { galleryCategories } from '../data/gallery'

type Props = {
  items: GalleryItem[]
  /** Index into `items`, or null when closed. */
  index: number | null
  onClose: () => void
  onNavigate: (nextIndex: number) => void
}

/**
 * Full-size image viewer.
 *
 * Built on the native <dialog> element, which gives us the modal behaviour for
 * free and correct: focus is trapped inside, the rest of the page is inert to
 * assistive tech, Escape closes, and focus returns to the thumbnail that
 * opened it. Re-implementing that by hand is where accessible modals usually
 * go wrong, so we don't.
 *
 * Arrow keys move between images; clicking the backdrop closes.
 */
export function Lightbox({ items, index, onClose, onNavigate }: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const open = index !== null
  const item = open ? items[index] : undefined

  // Drive the native dialog from the `index` prop.
  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return

    if (open && !dialog.open) dialog.showModal()
    else if (!open && dialog.open) dialog.close()
  }, [open])

  // Stop the page behind the dialog from scrolling.
  useEffect(() => {
    if (!open) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previous
    }
  }, [open])

  const go = useCallback(
    (delta: number) => {
      if (index === null || items.length < 2) return
      onNavigate((index + delta + items.length) % items.length)
    },
    [index, items.length, onNavigate],
  )

  useEffect(() => {
    if (!open) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowRight') {
        event.preventDefault()
        go(1)
      } else if (event.key === 'ArrowLeft') {
        event.preventDefault()
        go(-1)
      }
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [open, go])

  const categoryLabel = item ? galleryCategories.find((c) => c.id === item.category)?.short : undefined

  return (
    <dialog
      ref={dialogRef}
      // Escape fires `cancel`; the backdrop and close button fire `close`.
      onCancel={(event) => {
        event.preventDefault()
        onClose()
      }}
      onClose={onClose}
      // A click that lands on the dialog itself (not its content) is a
      // backdrop click.
      onClick={(event) => {
        if (event.target === dialogRef.current) onClose()
      }}
      aria-label={item ? `${item.title} — enlarged view` : 'Image viewer'}
      className="m-auto max-h-[100dvh] max-w-[100vw] bg-transparent p-0 text-ink backdrop:bg-black/80 backdrop:backdrop-blur-sm"
    >
      {item ? (
        <div className="flex max-h-[100dvh] w-[100vw] flex-col gap-3 p-3 sm:w-[92vw] sm:max-w-5xl sm:gap-4 sm:p-5">
          {/* Controls */}
          <div className="flex items-center justify-between gap-3">
            <p className="font-mono text-[0.7rem] tracking-[0.16em] text-white/55 uppercase">
              {index !== null ? `${index + 1} / ${items.length}` : null}
              {categoryLabel ? ` · ${categoryLabel}` : null}
            </p>

            <button
              type="button"
              onClick={onClose}
              aria-label="Close image viewer"
              className="grid size-10 place-items-center rounded-full border border-white/15 bg-white/5 text-white transition-colors hover:bg-white/15 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              <X size={18} aria-hidden="true" />
            </button>
          </div>

          {/* Image */}
          <div className="relative flex min-h-0 flex-1 items-center justify-center">
            <img
              key={item.src}
              src={item.src}
              alt={item.alt}
              width={item.width}
              height={item.height}
              decoding="async"
              className="max-h-[70dvh] w-auto max-w-full rounded-xl object-contain shadow-lift"
            />

            {items.length > 1 ? (
              <>
                <button
                  type="button"
                  onClick={() => go(-1)}
                  aria-label="Previous image"
                  className="absolute left-0 grid size-11 place-items-center rounded-full border border-white/15 bg-black/55 text-white backdrop-blur-sm transition-colors hover:bg-black/80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:-left-4"
                >
                  <ChevronLeft size={20} aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={() => go(1)}
                  aria-label="Next image"
                  className="absolute right-0 grid size-11 place-items-center rounded-full border border-white/15 bg-black/55 text-white backdrop-blur-sm transition-colors hover:bg-black/80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:-right-4"
                >
                  <ChevronRight size={20} aria-hidden="true" />
                </button>
              </>
            ) : null}
          </div>

          {/* Caption */}
          <div className="shrink-0 text-center">
            <h2 className="font-display text-base font-semibold text-white sm:text-lg">{item.title}</h2>
            {item.caption ? <p className="mt-1 text-sm text-white/65">{item.caption}</p> : null}
            {item.date ? <p className="mt-1 font-mono text-xs text-white/45">{item.date}</p> : null}
          </div>
        </div>
      ) : null}
    </dialog>
  )
}
