import { ArrowUpRight, Clock, Calendar } from "lucide-react"
import Link from "next/link"
import { getArticles, type Article } from "@/lib/medium"

/** How many of the latest posts to surface on the homepage. */
const HOMEPAGE_COUNT = 4

const MEDIUM_PROFILE = "https://medium.com/@hackastak"

function ArticleCard({ article }: { article: Article }) {
  const formattedDate = article.date
    ? new Date(article.date).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : ""

  return (
    <Link href={`/blog/${article.slug}`} className="group block">
      <article className="relative h-full bg-card rounded-lg border border-border p-6 hover:border-primary/50 transition-all duration-300">
        {/* Hover glow */}
        <div className="absolute inset-0 bg-primary/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity" />

        <div className="relative">
          {/* Meta */}
          <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
            {formattedDate && (
              <span className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {formattedDate}
              </span>
            )}
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {article.readTime}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors flex items-start gap-2">
            <span className="text-balance">{article.title}</span>
            <ArrowUpRight className="w-4 h-4 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
          </h3>

          {/* Excerpt */}
          <p className="text-sm text-muted-foreground leading-relaxed mb-4">
            {article.excerpt}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {article.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 text-xs font-mono rounded bg-secondary text-muted-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </article>
    </Link>
  )
}

export async function Blog() {
  const articles = (await getArticles()).slice(0, HOMEPAGE_COUNT)

  return (
    <section id="blog" className="py-24 bg-secondary/30">
      <div className="mx-auto max-w-6xl px-6">
        {/* Section Header */}
        <div className="mb-12">
          <div className="flex items-center gap-4 mb-4">
            <span className="font-mono text-primary text-sm">02.</span>
            <h2 className="text-3xl font-bold text-foreground">From The HackaStak</h2>
            <div className="flex-1 h-px bg-border" />
          </div>
          <p className="text-muted-foreground max-w-2xl">
            Honest, no-BS recommendations on the tools and practices worth your time. Developer
            tooling, AI x dev workflow, engineering best practices, and career notes from a
            self-taught dev still in the trenches.
          </p>
        </div>

        {articles.length > 0 ? (
          <>
            {/* Articles Grid */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {articles.map((article) => (
                <ArticleCard key={article.slug} article={article} />
              ))}
            </div>

            {/* View All Link */}
            <div className="text-center">
              <Link
                href={MEDIUM_PROFILE}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors font-mono"
              >
                Read everything on Medium
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </>
        ) : (
          /* Feed unreachable — fall back to the Medium profile rather than an empty grid. */
          <div className="text-center text-muted-foreground">
            <p className="mb-4">Latest posts are over on Medium right now.</p>
            <Link
              href={MEDIUM_PROFILE}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm hover:text-primary transition-colors font-mono"
            >
              Read The HackaStak on Medium
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}
