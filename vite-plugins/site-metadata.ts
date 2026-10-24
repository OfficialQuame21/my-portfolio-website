import type { Plugin } from 'vite'
import { seo } from '../src/data/seo'

/**
 * Keeps page metadata in one place.
 *
 * index.html, robots.txt and sitemap.xml all need the site's title,
 * description and canonical domain. Holding three copies meant they drifted —
 * and the domain had to be replaced in five places before publishing. This
 * substitutes them from `profile.seo` at build time instead.
 */
export function siteMetadata(): Plugin {
  const { title, description, socialDescription, siteUrl, ogImage } = seo
  const origin = siteUrl.replace(/\/+$/, '')

  const tokens: Record<string, string> = {
    '%EA_TITLE%': title,
    '%EA_DESCRIPTION%': description,
    '%EA_SOCIAL_DESCRIPTION%': socialDescription,
    '%EA_URL%': `${origin}/`,
    '%EA_ORIGIN%': origin,
    '%EA_OG_IMAGE%': `${origin}${ogImage}`,
  }

  const substitute = (input: string) =>
    Object.entries(tokens).reduce((acc, [token, value]) => acc.split(token).join(value), input)

  return {
    name: 'ea-site-metadata',

    transformIndexHtml: {
      order: 'pre',
      handler: (html) => substitute(html),
    },

    // robots.txt and sitemap.xml are generated rather than kept in public/, so
    // they cannot fall out of step with the canonical URL above.
    generateBundle() {
      this.emitFile({
        type: 'asset',
        fileName: 'robots.txt',
        source: [
          'User-agent: *',
          'Allow: /',
          '',
          '# The CMS editor is not content — keep it out of search results.',
          'Disallow: /admin/',
          '',
          `Sitemap: ${origin}/sitemap.xml`,
          '',
        ].join('\n'),
      })

      this.emitFile({
        type: 'asset',
        fileName: 'sitemap.xml',
        source: [
          '<?xml version="1.0" encoding="UTF-8"?>',
          '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
          '  <url>',
          `    <loc>${origin}/</loc>`,
          '    <changefreq>monthly</changefreq>',
          '    <priority>1.0</priority>',
          '  </url>',
          '</urlset>',
          '',
        ].join('\n'),
      })
    },
  }
}
