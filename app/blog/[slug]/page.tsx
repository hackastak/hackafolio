import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import { ArrowLeft, ArrowUpRight, Calendar, Clock } from "lucide-react"
import { Footer } from "@/components/footer"
import { getArticle, getArticles } from "@/lib/medium"

/** Match the feed's hourly refresh so newly published posts get their own page. */
export const revalidate = 3600

function formatDate(iso: string): string {
  if (!iso) return ""
  return new Date(iso).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  })
}

export async function generateStaticParams() {
  const articles = await getArticles()
  return articles.map((article) => ({ slug: article.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const article = await getArticle(slug)

  if (!article) {
    return { title: "Article not found — The HackaStak" }
  }

  return {
    title: `${article.title} — The HackaStak`,
    description: article.excerpt,
    // Medium is the canonical source of truth — point search engines there so the
    // on-site copy isn't treated as duplicate content.
    alternates: { canonical: article.mediumUrl },
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: "article",
      publishedTime: article.date || undefined,
      url: article.mediumUrl,
    },
  }
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const article = await getArticle(slug)

  if (!article) notFound()

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Slim article header — the homepage header uses on-page hash anchors that
          don't resolve here, so we render a minimal bar instead. */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <nav className="mx-auto max-w-3xl px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group" aria-label="Hackastak — home">
            <span className="flex items-center justify-center w-8 h-8 rounded-md bg-primary/10 group-hover:bg-primary/20 transition-colors overflow-hidden">
              <Image
                src="/logos/hackastak-green.png"
                alt=""
                width={20}
                height={20}
                className="w-5 h-5 object-contain"
              />
            </span>
            <span className="font-mono text-sm text-foreground">
              <span className="text-primary">~/</span>hackastak
            </span>
          </Link>
          <Link
            href="/#blog"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors font-mono"
          >
            <ArrowLeft className="w-4 h-4" />
            Writing
          </Link>
        </nav>
      </header>

      <main className="flex-1">
        <article className="mx-auto max-w-3xl px-6 py-16">
          {/* Title + meta */}
          <header className="mb-10">
            <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground mb-4 font-mono">
              {article.date && (
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {formatDate(article.date)}
                </span>
              )}
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {article.readTime}
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-foreground text-balance mb-6">
              {article.title}
            </h1>

            {article.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {article.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 text-xs font-mono rounded bg-secondary text-muted-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Canonical attribution — Medium is the original home of this post. */}
            <p className="text-sm text-muted-foreground border-l-2 border-accent pl-3">
              Originally published on{" "}
              <Link
                href={article.mediumUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline inline-flex items-center gap-0.5"
              >
                Medium
                <ArrowUpRight className="w-3 h-3" />
              </Link>
              . Read here free — no account needed.
            </p>
          </header>

          {/* Body — sanitized in lib/medium.ts before it reaches the DOM. */}
          <div
            className="prose prose-hackastak max-w-none"
            dangerouslySetInnerHTML={{ __html: article.contentHtml }}
          />

          {/* Read-on-Medium footer link */}
          <div className="mt-12 pt-8 border-t border-border">
            <Link
              href={article.mediumUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors font-mono"
            >
              Read this on Medium
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  )
}
