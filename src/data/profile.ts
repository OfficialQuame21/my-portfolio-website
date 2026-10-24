import { galleryItems } from './gallery'
import { seo } from './seo'
import photoData from '../../content/settings/profile-photo.json'
import contactData from '../../content/settings/contact.json'

/* ---------------------------------------------------------------------------
 * profile.ts — the one file to edit for identity, links and feature switches.
 *
 * Anything left as an empty string is treated as "not configured yet": the UI
 * hides the control rather than rendering a dead link. In `npm run dev` an
 * amber hint appears instead, so you can see what is still missing without it
 * ever showing up in production.
 * ------------------------------------------------------------------------- */

export const profile = {
  name: 'Emmanuel Acquah',
  /** Shown in the navbar. Swap for 'Emmanuel Acquah' if you prefer the full name. */
  monogram: 'EA.',
  role: 'Software Developer',
  location: 'Ghana',
  eyebrow: 'Software Developer | Ghana',

  headline: ['Building Software.', 'Exploring AI.', 'Advancing Through Research.'],

  intro:
    "I'm Emmanuel Acquah, a software developer with a background in Computer Science and Computer Network Management. I build web and mobile applications with modern JavaScript, design and administer the databases behind them, and am developing my skills in AI model training with Python. I tutor other students, help run a digital product, and am working towards research in cybersecurity.",

  /** Page metadata. Lives in `seo.ts` so the build plugin can read it too. */
  seo,
} as const

/* ---------------------------------------------------------------------------
 * Profile photograph
 *
 * Managed from the CMS at /admin (Profile → Photo), which uploads the file and
 * writes `content/settings/profile-photo.json`. You can also edit that JSON by
 * hand, or drop a file in `public/images/profile/` and point `src` at it.
 *
 * While `src` is empty the hero shows a monogram panel. No stand-in face is
 * ever used.
 * ------------------------------------------------------------------------- */

export type Photo = {
  /** Path under `public/`, e.g. '/images/profile/me.webp'. '' hides the image. */
  src: string
  /** Read aloud in place of the image. */
  alt: string
  /** CSS object-position, for nudging the crop. 'center 20%' sits higher. */
  position: string
  /** Caption under the frame. '' hides it. */
  caption: string
}

export const photo: Photo = {
  src: (photoData.src ?? '').trim(),
  alt: (photoData.alt ?? '').trim() || 'Emmanuel Acquah',
  position: (photoData.position ?? '').trim() || 'center 30%',
  caption: (photoData.caption ?? '').trim(),
}

/* ---------------------------------------------------------------------------
 * Contact + social links
 *
 * Managed from the CMS at /admin (Settings → Contact and social links), which
 * writes `content/settings/contact.json`. You can edit that file by hand too.
 *
 * A link left empty is HIDDEN rather than rendered dead — so an unset GitHub
 * URL means no GitHub button anywhere, not a broken one. Paste the full URL,
 * including https://.
 * ------------------------------------------------------------------------- */

export type Contact = {
  email: string
  /** Full URL, e.g. 'https://github.com/your-username'. '' hides the link. */
  github: string
  /** Full URL, e.g. 'https://www.linkedin.com/in/your-handle'. */
  linkedin: string
  /** Full URL, e.g. 'https://x.com/your-handle'. */
  x: string
  /** Free text shown beside the email, e.g. 'Koforidua, Ghana'. */
  locationLine: string
}

/** Trimmed on the way in, so a stray space never counts as "configured". */
export const contact: Contact = {
  email: (contactData.email ?? '').trim(),
  github: (contactData.github ?? '').trim(),
  linkedin: (contactData.linkedin ?? '').trim(),
  x: (contactData.x ?? '').trim(),
  locationLine: (contactData.locationLine ?? '').trim(),
}

/* ---------------------------------------------------------------------------
 * Feature switches — turn parts of the site on or off without touching JSX.
 * ------------------------------------------------------------------------- */

export const features = {
  /** Shows the "Open to opportunities" pill in the hero. Set to false any time. */
  openToOpportunities: true,
  openToOpportunitiesLabel: 'Open to opportunities',

  /**
   * Résumé download. Drop the PDF at `public/emmanuel-acquah-resume.pdf`, then
   * set `enabled: true`. Until then the link is hidden everywhere.
   */
  resume: {
    enabled: false,
    href: '/emmanuel-acquah-resume.pdf',
    label: 'View My Résumé',
  },

  /** Achievements section. Each entry has its own `verified` flag too. */
  achievements: true,

  /** Light/dark toggle in the navbar. Dark remains the default either way. */
  themeToggle: true,
} as const

/* ---------------------------------------------------------------------------
 * Navigation — order here is the order on the page and in the navbar.
 * ------------------------------------------------------------------------- */

export type NavItem = { id: string; label: string }

/**
 * Gallery is conditional: the section hides itself when there are no images,
 * so linking to it unconditionally would leave a nav item pointing at nothing.
 * Add your first image to `src/data/gallery.ts` and the link appears.
 */
export const navItems: NavItem[] = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'education', label: 'Education' },
  { id: 'research', label: 'Research' },
  ...(galleryItems.length > 0 ? [{ id: 'gallery', label: 'Gallery' }] : []),
  { id: 'contact', label: 'Contact' },
]

export const footerTagline = 'Designed and developed with curiosity, purpose, and a passion for technology.'

export const footerBlurb =
  'Software developer from Ghana building web and mobile products, working with data, tutoring other students, and pursuing research in cybersecurity.'
