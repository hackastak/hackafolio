import { XMLParser } from "fast-xml-parser"
import sanitizeHtml from "sanitize-html"

/**
 * Medium RSS integration — pulls Hunter's posts from The HackaStak and exposes
 * them as on-site articles. Medium stays the canonical source (see each
 * article page's `alternates.canonical`); the on-site copy is a free, no-account
 * read that bypasses Medium's metered wall.
 *
 * Decisions / scope live in `~/Developer/My_Notes/1. Projects/Hackafolio/Backlog.md`
 * under "Feature — Medium RSS integration".
 */

const FEED_URL = "https://medium.com/feed/@hackastak"

/** Re-fetch the feed at most once an hour so new Medium posts appear without a redeploy. */
const REVALIDATE_SECONDS = 60 * 60

const WORDS_PER_MINUTE = 200

export interface Article {
  /** On-site slug — the `[slug]` in `/blog/[slug]`. */
  slug: string
  title: string
  /** Plain-text summary derived from the post body. */
  excerpt: string
  /** ISO date string (post publish date). */
  date: string
  /** e.g. "8 min read" — estimated from word count. */
  readTime: string
  tags: string[]
  /** Canonical original URL on Medium. */
  mediumUrl: string
  /** Sanitized full article HTML, ready to render. */
  contentHtml: string
}

interface RawItem {
  title?: string
  link?: string
  guid?: string | { "#text"?: string }
  pubDate?: string
  category?: string | string[]
  "content:encoded"?: string
  "dc:creator"?: string
  description?: string
}

const parser = new XMLParser({
  ignoreAttributes: true,
  // Medium can return a single <item>/<category>; force arrays so mapping is uniform.
  isArray: (name) => name === "item" || name === "category",
})

/** Tags Medium's HTML uses that we want to keep, beyond sanitize-html's defaults. */
const sanitizeOptions: sanitizeHtml.IOptions = {
  allowedTags: sanitizeHtml.defaults.allowedTags.concat([
    "img",
    "figure",
    "figcaption",
    "h1",
    "h2",
  ]),
  allowedAttributes: {
    ...sanitizeHtml.defaults.allowedAttributes,
    img: ["src", "srcset", "alt", "title", "width", "height", "loading"],
    a: ["href", "name", "target", "rel"],
  },
  // Medium embeds external images; allow https sources.
  allowedSchemesByTag: { img: ["https", "http"] },
  transformTags: {
    // Open any in-content links safely in a new tab.
    a: sanitizeHtml.simpleTransform("a", { rel: "noopener noreferrer", target: "_blank" }),
  },
}

function stripHtml(html: string): string {
  // Insert a space at block boundaries so adjacent blocks' text doesn't mash
  // together (e.g. a subtitle running straight into the first paragraph).
  const spaced = html
    .replace(/<br\s*\/?>/gi, " ")
    .replace(/<\/(p|h[1-6]|li|div|figcaption|blockquote)>/gi, " ")
  return sanitizeHtml(spaced, { allowedTags: [], allowedAttributes: {} })
    .replace(/\s+/g, " ")
    .trim()
}

/** Strip Medium's `?source=rss-…` tracking query so the canonical URL is clean. */
function cleanUrl(url: string): string {
  const q = url.indexOf("?")
  return q === -1 ? url : url.slice(0, q)
}

/** Decode the handful of HTML entities Medium leaves in titles/excerpts. */
function decodeEntities(text: string): string {
  return text
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&rsquo;|&#x27;/g, "'")
    .replace(/&nbsp;/g, " ")
}

function slugify(input: string): string {
  return decodeEntities(input)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80)
}

function toExcerpt(contentHtml: string, max = 180): string {
  const text = stripHtml(contentHtml)
  if (text.length <= max) return text
  return text.slice(0, text.lastIndexOf(" ", max)).trimEnd() + "…"
}

function estimateReadTime(contentHtml: string): string {
  const words = stripHtml(contentHtml).split(/\s+/).filter(Boolean).length
  const minutes = Math.max(1, Math.round(words / WORDS_PER_MINUTE))
  return `${minutes} min read`
}

function getGuid(guid: RawItem["guid"]): string {
  if (!guid) return ""
  return typeof guid === "string" ? guid : guid["#text"] ?? ""
}

function mapItem(item: RawItem): Article | null {
  const title = item.title ? decodeEntities(item.title) : ""
  const mediumUrl = cleanUrl((item.link ?? getGuid(item.guid) ?? "").trim())
  const rawContent = item["content:encoded"] ?? item.description ?? ""

  if (!title || !mediumUrl || !rawContent) return null

  const contentHtml = sanitizeHtml(rawContent, sanitizeOptions)

  return {
    slug: slugify(title),
    title,
    excerpt: toExcerpt(contentHtml),
    date: item.pubDate ? new Date(item.pubDate).toISOString() : "",
    readTime: estimateReadTime(contentHtml),
    tags: (Array.isArray(item.category) ? item.category : item.category ? [item.category] : []).map(
      decodeEntities,
    ),
    mediumUrl,
    contentHtml,
  }
}

/**
 * Fetch and parse the Medium feed. Returns an empty array on any failure so the
 * UI can degrade gracefully (show the "read on Medium" link instead of crashing).
 */
export async function getArticles(): Promise<Article[]> {
  let xml: string
  try {
    const res = await fetch(FEED_URL, {
      next: { revalidate: REVALIDATE_SECONDS },
      headers: { Accept: "application/rss+xml, application/xml, text/xml" },
    })
    if (!res.ok) {
      console.error(`[medium] feed responded ${res.status}`)
      return []
    }
    xml = await res.text()
  } catch (err) {
    console.error("[medium] feed fetch failed:", err)
    return []
  }

  try {
    const parsed = parser.parse(xml)
    const items: RawItem[] = parsed?.rss?.channel?.item ?? []
    const articles = items.map(mapItem).filter((a): a is Article => a !== null)

    // De-dupe slug collisions (e.g. two posts that slugify identically).
    const seen = new Set<string>()
    for (const article of articles) {
      let slug = article.slug
      let n = 2
      while (seen.has(slug)) slug = `${article.slug}-${n++}`
      article.slug = slug
      seen.add(slug)
    }

    return articles
  } catch (err) {
    console.error("[medium] feed parse failed:", err)
    return []
  }
}

export async function getArticle(slug: string): Promise<Article | null> {
  const articles = await getArticles()
  return articles.find((a) => a.slug === slug) ?? null
}
