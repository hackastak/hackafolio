import type { MetadataRoute } from 'next'

/**
 * Single-page site, so the sitemap is just the apex.
 *
 * `/blog/[slug]` is deliberately EXCLUDED: those pages set
 * `rel="canonical"` → the original Medium URL (see Open_Questions #4), so
 * listing them here would ask Google to index pages that disclaim themselves.
 * If the canonical ever flips to this domain, add them here at the same time.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://hackastak.com',
      changeFrequency: 'weekly',
      priority: 1,
    },
  ]
}
