/* ---------------------------------------------------------------------------
 * gallery.ts — screenshots, certificates and professional photographs.
 *
 * The entries themselves are NOT in this file. Each image is one JSON file in
 * `content/gallery/`, because that is a format the CMS at /admin can write;
 * it cannot edit TypeScript. This file supplies the types, the category list,
 * and the glob that collects those JSON files at build time.
 *
 * TO ADD AN IMAGE
 *   - Easiest: go to /admin on the published site, open Gallery, click New,
 *     drag the file in and publish.
 *   - By hand: drop the file in `public/images/...`, then create
 *     `content/gallery/my-image.json`:
 *
 *       {
 *         "src": "/images/gallery/src-week-training.webp",
 *         "alt": "Leading a Microsoft Office session for students at SRC Week",
 *         "title": "Digital skills training",
 *         "category": "events",
 *         "date": "2026",
 *         "caption": "GNUT training program, Koforidua Technical University",
 *         "order": 1
 *       }
 *
 * `alt` is the sentence a screen-reader user hears instead of the image —
 * describe what is actually in the picture.
 *
 * Only add images that are genuinely yours: real screenshots, real
 * certificates, real photographs.
 * ------------------------------------------------------------------------- */

export type GalleryCategoryId = 'projects' | 'certificates' | 'events' | 'professional'

export const galleryCategories: { id: GalleryCategoryId; label: string; short: string }[] = [
  { id: 'projects', label: 'Projects and Applications', short: 'Projects' },
  { id: 'certificates', label: 'Certificates and Achievements', short: 'Certificates' },
  { id: 'events', label: 'Technology and Events', short: 'Events' },
  { id: 'professional', label: 'Professional Activities', short: 'Professional' },
]

export type GalleryItem = {
  id: string
  /** Path under `public/`, e.g. '/images/gallery/demo-day.webp'. */
  src: string
  /** What is in the picture. Read aloud in place of the image. */
  alt: string
  title: string
  caption?: string
  /** Free text — '2026', 'March 2026', or omitted. Never guess one. */
  date?: string
  category: GalleryCategoryId
  /** Lower numbers appear first. Ties fall back to filename. */
  order?: number
  /** Real pixel dimensions, so the lightbox reserves space before loading. */
  width?: number
  height?: number
}

/** Shape of one `content/gallery/*.json` file, before validation. */
type RawEntry = Partial<Omit<GalleryItem, 'id'>>

const validCategories = new Set<string>(galleryCategories.map((c) => c.id))

/**
 * Collected at build time — Vite inlines the JSON, so there is no runtime
 * fetch and no loading state. Adding a file to `content/gallery/` is all it
 * takes for it to appear here.
 */
const files = import.meta.glob<RawEntry>('../../content/gallery/*.json', {
  eager: true,
  import: 'default',
})

export const galleryItems: GalleryItem[] = Object.entries(files)
  .map(([path, raw]) => {
    const id = path.split('/').pop()?.replace(/\.json$/, '') ?? path
    return { id, path, raw }
  })
  // An entry with no image or an unknown category is skipped rather than
  // rendered broken — a half-filled CMS draft must not break the grid.
  .filter(({ id, raw }) => {
    const src = raw.src?.trim()
    if (!src) return false

    // `public/` is the folder on disk, not part of the served URL. Writing
    // 'public/images/x.jpg' instead of '/images/x.jpg' is the easiest mistake
    // to make here and produces a silently broken image, so say so loudly.
    if (src.startsWith('public/') || src.startsWith('/public/')) {
      console.error(
        `[gallery] "${id}" has src "${src}". Drop the "public/" prefix — use "${src.replace(/^\/?public/, '')}".`,
      )
      return false
    }

    if (!validCategories.has(String(raw.category))) {
      console.error(`[gallery] "${id}" has unknown category "${raw.category}" — entry skipped.`)
      return false
    }

    return true
  })
  .map(({ id, raw }) => ({
    id,
    src: raw.src as string,
    alt: raw.alt?.trim() || raw.title?.trim() || 'Gallery image',
    title: raw.title?.trim() || 'Untitled',
    caption: raw.caption?.trim() || undefined,
    date: raw.date?.trim() || undefined,
    category: raw.category as GalleryCategoryId,
    order: typeof raw.order === 'number' ? raw.order : 0,
    width: typeof raw.width === 'number' ? raw.width : undefined,
    height: typeof raw.height === 'number' ? raw.height : undefined,
  }))
  .sort((a, b) => (a.order ?? 0) - (b.order ?? 0) || a.id.localeCompare(b.id))
