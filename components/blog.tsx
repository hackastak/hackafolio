"use client"

import { ArrowUpRight, Clock, Calendar } from "lucide-react"
import Link from "next/link"

/**
 * Top performers from The HackaStak — Hunter's voice references.
 * `slug` should be swapped to the canonical Medium URL once each post is live.
 * Right now they all point to the @hackastak profile.
 */
const articles = [
  {
    title: "9 Things I Wish I Knew as a Junior Engineer",
    excerpt:
      "The career advice I'd hand my past self — the stuff bootcamps and CS programs don't cover. Behaviors over technical skills.",
    date: "2026-03-15",
    readTime: "10 min read",
    tags: ["Career", "Software Engineering"],
    slug: "https://medium.com/@hackastak",
  },
  {
    title: "AI Coding Assistants: Which One Actually Saves You Time?",
    excerpt:
      "I switched from Cursor to OpenCode mid-year. Here's the honest comparison — what each tool does well, where they fall short, and which one earns the spot in my daily flow.",
    date: "2026-04-02",
    readTime: "11 min read",
    tags: ["AI x Dev", "Tooling"],
    slug: "https://medium.com/@hackastak",
  },
  {
    title: "My 2026 Dev Stack: The 10 Tools I Actually Use Every Day",
    excerpt:
      "No paid promo, no hype. The terminal, editor, AI assistants, and habits that actually shipped me side projects this year while holding down a full-time engineering role.",
    date: "2026-04-22",
    readTime: "9 min read",
    tags: ["Tooling", "Workflow"],
    slug: "https://medium.com/@hackastak",
  },
  {
    title: "Debugging AI Agent Hallucinations: A Systematic Checklist",
    excerpt:
      "Production agents lie to you in five distinct ways. Here's the post-mortem playbook I wish I had when I was chasing my first hallucinated tool params at 11pm.",
    date: "2026-05-13",
    readTime: "8 min read",
    tags: ["AI x Dev", "Best Practices"],
    slug: "https://medium.com/@hackastak",
  },
]

function ArticleCard({ article }: { article: typeof articles[0] }) {
  const formattedDate = new Date(article.date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  })

  return (
    <Link href={article.slug} target="_blank" rel="noopener noreferrer" className="group block">
      <article className="relative h-full bg-card rounded-lg border border-border p-6 hover:border-primary/50 transition-all duration-300">
        {/* Hover glow */}
        <div className="absolute inset-0 bg-primary/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity" />

        <div className="relative">
          {/* Meta */}
          <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {formattedDate}
            </span>
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

export function Blog() {
  return (
    <section id="blog" className="py-24 bg-secondary/30">
      <div className="mx-auto max-w-6xl px-6">
        {/* Section Header */}
        <div className="mb-12">
          <div className="flex items-center gap-4 mb-4">
            <span className="font-mono text-primary text-sm">03.</span>
            <h2 className="text-3xl font-bold text-foreground">From The HackaStak</h2>
            <div className="flex-1 h-px bg-border" />
          </div>
          <p className="text-muted-foreground max-w-2xl">
            Honest, no-BS recommendations on the tools and practices worth your time. Developer
            tooling, AI x dev workflow, engineering best practices, and career notes from a
            self-taught dev still in the trenches.
          </p>
        </div>

        {/* Articles Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {articles.map((article) => (
            <ArticleCard key={article.title} article={article} />
          ))}
        </div>

        {/* View All Link */}
        <div className="text-center">
          <Link
            href="https://medium.com/@hackastak"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors font-mono"
          >
            Read everything on Medium
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
