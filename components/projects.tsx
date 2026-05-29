"use client"

import { ExternalLink, Github, Folder } from "lucide-react"
import Link from "next/link"

/**
 * Hunter's project lineup — featured at the top, "other noteworthy" below.
 * Swap GitHub/live URLs as repos go public.
 */
const projects = [
  {
    title: "MacroFlow",
    description:
      "TODO: Add description for MacroFlow.",
    tech: ["TODO"],
    github: "",
    live: "",
    featured: true,
  },
  {
    title: "RepoG",
    description:
      "TODO: Add description for RepoG.",
    tech: ["TODO"],
    github: "",
    live: "",
    featured: true,
  },
  {
    title: "BillScribe",
    description:
      "TODO: Add description for BillScribe.",
    tech: ["TODO"],
    github: "",
    live: "",
    featured: true,
  },
  {
    title: "Staksmith",
    description:
      "Custom Claude Code skills for AI agent debugging, MCP integrations, and Claude SDK workflows. Built to accelerate the AI x developer workflow.",
    tech: ["TypeScript", "Claude SDK", "MCP", "Node.js"],
    github: "https://github.com/hackastak/staksmith",
    featured: false,
  },
  {
    title: "ProtoFlow",
    description:
      "Subscription-based 3D modeling, product design, and prototyping service. Tiered plans for design, printing, and shipping with request tracking, file storage, and Stripe billing.",
    tech: ["Next.js", "TypeScript", "Supabase", "Stripe", "Drizzle ORM"],
    github: "",
    live: "",
    featured: false,
  },
  {
    title: "Hackastak Homebrew Tap",
    description:
      "A custom Homebrew tap publishing CLIs I build for my own dev workflow. End-to-end install, update, and uninstall flows shipped to anyone on macOS in one command.",
    tech: ["Bash", "Homebrew", "GitHub Actions", "Ruby"],
    github: "https://github.com/hackastak/homebrew-tap",
    live: "",
    featured: false,
  },
]

function FeaturedProject({ project }: { project: typeof projects[0] }) {
  return (
    <div className="group relative bg-card rounded-lg border border-border p-6 hover:border-primary/50 transition-all duration-300">
      {/* Hover glow effect */}
      <div className="absolute inset-0 bg-primary/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity" />

      <div className="relative">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <Folder className="w-10 h-10 text-primary" />
          <div className="flex items-center gap-3">
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
            {project.description.slice(0, 70)}...
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
            <span className="font-mono text-primary text-sm">02.</span>
            <h2 className="text-3xl font-bold text-foreground">Featured Projects</h2>
            <div className="flex-1 h-px bg-border" />
          </div>
          <p className="text-muted-foreground max-w-2xl">
            Side projects under the Hackastak umbrella. Built in public, shipped on weekends, and
            paid for in coffee. The CLI you can install today; the apparel you can wear tomorrow.
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
