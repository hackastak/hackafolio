"use client"

import { ExternalLink, Github, Folder } from "lucide-react"
import Link from "next/link"

/**
 * Hunter's project lineup — featured at the top, "other noteworthy" below.
 * Array order drives display order within each group.
 *
 * Two copy rules, learned the hard way:
 *  - `description` (featured cards) leads with the *engineering decision*, not
 *    the product category. "What was hard about this" beats "what this is".
 *  - `summary` (compact rows) is a deliberate one-liner, NOT a truncation.
 *    Keep it a complete phrase under ~75 chars so it never needs an ellipsis.
 */
const projects = [
  {
    title: "Staksmith",
    description:
      "The agent harness I use every day, packaged so anyone else can: 155 skills, 21 agents, 53 slash commands. The hard part isn't the content, it's portability — one source of truth that installs cleanly into Claude Code, Cursor, Codex, and OpenCode, which all disagree on config format.",
    summary: "Portable agent harness: 155 skills, 21 agents, 4 runtimes.",
    tech: ["TypeScript", "Shell", "Python", "Go", "MCP"],
    github: "https://github.com/hackastak/staksmith",
    live: "",
    featured: true,
  },
  {
    title: "RepoG",
    description:
      "Semantic search and RAG across every repo you own or starred, without shipping your code to anyone. It all runs locally: a statically-linked Go binary embeds SQLite plus the sqlite-vec extension through CGO, and pointing embeddings at Ollama means zero network calls at all.",
    summary: "Local-first semantic search and RAG over your own repos.",
    tech: ["Go", "Cobra", "SQLite", "sqlite-vec", "CGO", "RAG"],
    github: "https://github.com/hackastak/repog",
    live: "",
    featured: true,
  },
  {
    title: "BillScribe",
    description:
      "A subscription SaaS end to end, not just invoice CRUD: Stripe Checkout for plans, a webhook route that reconciles subscription state server-side, Supabase SSR auth, and Drizzle-typed queries. Invoice PDFs are generated with jsPDF rather than by spinning up a headless browser.",
    summary: "Invoicing SaaS: Stripe subscriptions and PDF export.",
    tech: ["Next.js", "TypeScript", "Supabase", "Stripe", "Drizzle ORM", "jsPDF"],
    github: "https://github.com/hackastak/BillScribe",
    live: "https://bill-scribe.vercel.app",
    featured: true,
  },
  {
    // Deliberately not featured: the public repo is still an architecture
    // spike ("desktop skeleton (Spike B)" in its README), so the compact row
    // says so rather than implying a shipped app.
    title: "Waystone",
    description:
      "A PARA-method desktop notes app, currently proving out its riskiest seam: the JS ↔ Rust ↔ SQLite round-trip. Milkdown has to stay in the webview because it's ProseMirror, so search, indexing, and file I/O live in Rust behind a single Tauri invoke boundary.",
    summary: "PARA notes app for desktop — Tauri and Rust architecture spike.",
    tech: ["Tauri v2", "Rust", "React", "TypeScript", "Milkdown", "SQLite FTS5"],
    github: "https://github.com/hackastak/waystone",
    live: "",
    featured: false,
  },
  {
    title: "ProtoFlow",
    description:
      "Subscription-based 3D modeling, product design, and prototyping service. Tiered plans for design, printing, and shipping with request tracking, file storage, and Stripe billing.",
    summary: "Subscription 3D modeling service with request tracking.",
    tech: ["Next.js", "TypeScript", "Supabase", "Stripe", "Drizzle ORM"],
    github: "",
    live: "",
    featured: false,
  },
  {
    title: "Hackastak Homebrew Tap",
    description:
      "The Homebrew tap that distributes my CLIs, starting with RepoG. Install, upgrade, and uninstall flows that work for anyone on macOS in one command, with releases wired through GitHub Actions.",
    summary: "The tap that ships RepoG: install, upgrade, uninstall.",
    tech: ["Bash", "Homebrew", "GitHub Actions", "Ruby"],
    github: "https://github.com/hackastak/homebrew-tap",
    live: "",
    featured: false,
  },
]

function FeaturedProject({ project }: { project: typeof projects[0] }) {
  // Clicking anywhere on the card opens its primary link (live demo if it
  // exists, otherwise the repo). The top-right icons sit above this overlay
  // via z-index, so they still route to their own specific destinations.
  const primaryHref = project.live || project.github

  return (
    <div className="group relative bg-card rounded-lg border border-border p-6 hover:border-primary/50 transition-all duration-300">
      {/* Hover glow effect */}
      <div className="absolute inset-0 bg-primary/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity" />

      {/* Full-card click target */}
      {primaryHref && (
        <Link
          href={primaryHref}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute inset-0 z-10 rounded-lg"
          aria-label={`${project.title} — open ${project.live ? "live site" : "repository"}`}
        />
      )}

      <div className="relative">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <Folder className="w-10 h-10 text-primary" />
          <div className="relative z-20 flex items-center gap-3">
            {project.github && (
              <Link
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label={`${project.title} on GitHub`}
              >
                <Github className="w-5 h-5" />
              </Link>
            )}
            {project.live && (
              <Link
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label={`${project.title} — live`}
              >
                <ExternalLink className="w-5 h-5" />
              </Link>
            )}
          </div>
        </div>

        {/* Content */}
        <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
          {project.title}
        </h3>
        <p className="text-muted-foreground text-sm leading-relaxed mb-4">
          {project.description}
        </p>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2">
          {project.tech.map((tech) => (
            <span key={tech} className="text-xs font-mono text-accent">
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

function OtherProject({ project }: { project: typeof projects[0] }) {
  return (
    <div className="group flex items-center justify-between py-4 border-b border-border last:border-0 hover:bg-card/50 -mx-4 px-4 rounded transition-colors">
      <div className="flex items-center gap-4">
        <Folder className="w-5 h-5 text-primary" />
        <div>
          <h4 className="font-medium text-foreground group-hover:text-primary transition-colors">
            {project.title}
          </h4>
          <p className="text-sm text-muted-foreground hidden sm:block">
            {project.summary}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="hidden md:flex items-center gap-2">
          {project.tech.slice(0, 3).map((tech) => (
            <span key={tech} className="text-xs font-mono text-muted-foreground">
              {tech}
            </span>
          ))}
        </div>
        {project.github && (
          <Link
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transition-colors"
            aria-label={`${project.title} on GitHub`}
          >
            <Github className="w-4 h-4" />
          </Link>
        )}
        {project.live && !project.github && (
          <Link
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transition-colors"
            aria-label={`${project.title} — live`}
          >
            <ExternalLink className="w-4 h-4" />
          </Link>
        )}
      </div>
    </div>
  )
}

export function Projects() {
  const featuredProjects = projects.filter((p) => p.featured)
  const otherProjects = projects.filter((p) => !p.featured)

  return (
    <section id="projects" className="py-24">
      <div className="mx-auto max-w-6xl px-6">
        {/* Section Header */}
        <div className="mb-12">
          <div className="flex items-center gap-4 mb-4">
            <span className="font-mono text-primary text-sm">01.</span>
            <h2 className="text-3xl font-bold text-foreground">Featured Projects</h2>
            <div className="flex-1 h-px bg-border" />
          </div>
          <p className="text-muted-foreground max-w-2xl">
            Side projects under the Hackastak umbrella. Built in public, shipped on weekends, and
            paid for in coffee. Agent tooling and CLIs you can install today.
          </p>
        </div>

        {/* Featured Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {featuredProjects.map((project) => (
            <FeaturedProject key={project.title} project={project} />
          ))}
        </div>

        {/* Other Projects */}
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-6 font-mono">
            <span className="text-accent">{"// "}</span>
            Other Noteworthy Projects
          </h3>
          <div className="bg-card rounded-lg border border-border p-4">
            {otherProjects.map((project) => (
              <OtherProject key={project.title} project={project} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
