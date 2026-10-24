/* ---------------------------------------------------------------------------
 * seo.ts — page metadata, in one place.
 *
 * Deliberately a standalone module with no imports: it is read both by the app
 * and by `vite-plugins/site-metadata.ts` at build time, and the build-time
 * config is type-checked under a Node tsconfig that knows nothing about Vite's
 * browser APIs. Keeping this file dependency-free stops the two worlds
 * colliding.
 *
 * Change `siteUrl` here and the canonical link, Open Graph tags, robots.txt
 * and sitemap.xml all follow.
 * ------------------------------------------------------------------------- */

export const seo = {
  title: 'Emmanuel Acquah | Software Developer, AI & Technology',
  description:
    'Portfolio of Emmanuel Acquah — a Computer Science graduate from Ghana working in web and mobile development, databases, AI and machine learning, with experience in technical tutoring and research interests in cybersecurity.',
  /** Shorter line for link previews, where long text gets truncated. */
  socialDescription:
    'Computer Science graduate from Ghana building web and mobile applications, working with data, and pursuing research in cybersecurity.',
  /** Set this once you know the final domain — no trailing slash. */
  siteUrl: 'https://example.com',
  /** Path under public/ to the social preview image. */
  ogImage: '/og-image.png',
} as const
