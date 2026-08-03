"use client"

import { Download, ExternalLink, Briefcase, Sparkles } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

/**
 * Periods/skills are accurate to the trajectory described in the brand notes:
 * non-dev start → self-taught → frontend → full-stack AI.
 */

// `public/resume.pdf` doesn't exist yet, and the download button would 404.
// Flip to true once the PDF is in place — that's the only change needed.
const RESUME_PDF_AVAILABLE = false

const experience = [
  {
    title: "Full-Stack AI Engineer",
    company: "SAP, Inc.", 
    companyUrl: "#",
    period: "2025 — Present",
    description:
      "Building production AI agent tooling, MCP integrations, and Claude SDK-powered workflows for enterprise teams. Day-job lessons feed The HackaStak's AI x developer pillar.",
    skills: ["TypeScript", "JavaScript", "Gremlin", "Claude SDK", "MCP", "Next.js", "Python", "Graph DBs"],
  },
  {
    title: "Full-Stack Engineer",
    company: "SAP, Inc.",
    companyUrl: "#",
    period: "2022 — 2025",
    description:
      "Owned the customer-facing application — design system, accessibility, and performance work. Mentored teammates and shipped the features that moved the metrics.",
    skills: ["Java", "Springboot", "SQL", "React", "TypeScript", "JavaScript", "Next.js", "Tailwind"],
  },
  {
    title: "Lead Frontend Engineer",
    company: "Smith & Nephew, Inc.",
    companyUrl: "#",
    period: "2020 — 2022",
    description:
      "Lead frontend engineer on a React app running on Kubernetes against multiple microservices, used by surgical imaging teams across 30,000+ cases a year. Mentored engineers and senior interns. This is where the pivot landed: the nights-and-weekends learning became the day job.",
    skills: ["React", "JavaScript", "Kubernetes", "Microservices", "HTML/CSS"],
  },
  {
    title: "Senior New Product Development Engineer",
    company: "Smith & Nephew, Inc.",
    companyUrl: "#",
    period: "2016 — 2020",
    description:
      "Led cross-functional product launches for medical devices that grew annual revenue by millions — mechanical engineering, not software. Taught myself to code on nights and weekends here, which is where the career change started.",
    skills: ["Product Development", "Cross-Functional Leadership", "Mechanical Design", "CAD"],
  },
]

// Keeps "Self-Taught" as the brand pillar, but anchors it to the engineering
// degree. The previous copy opened with "No CS degree" — leading with an
// absence let readers fill the gap with "no degree at all", which is both
// inaccurate (BS in Mechanical Engineering) and costly on the hiring side.
const selfTaught = {
  headline: "Self-Taught",
  blurb:
    "BS in Mechanical Engineering, then software on nights and weekends. Engineering fundamentals from the degree, the stack from side projects, OSS, and shipping in public. Bootcamp grads, juniors, and career-changers are exactly who The HackaStak is for.",
  highlights: [
    "Published CLIs to Homebrew",
    "Contributing to MCP / agent ecosystem",
    "Cross-posted essays on Medium, Dev.to, Hashnode",
  ],
}

function ExperienceItem({ item }: { item: typeof experience[0] }) {
  return (
    <div className="group relative pl-8 pb-12 last:pb-0">
      {/* Timeline line */}
      <div className="absolute left-0 top-2 bottom-0 w-px bg-border group-last:bg-transparent" />
      {/* Timeline dot */}
      <div className="absolute left-0 top-2 w-2 h-2 -translate-x-[3px] rounded-full bg-primary" />

      <div className="space-y-3">
        {/* Period */}
        <span className="text-xs font-mono text-muted-foreground">{item.period}</span>

        {/* Title & Company */}
        <div>
          <h3 className="text-lg font-semibold text-foreground">{item.title}</h3>
          <Link
            href={item.companyUrl}
            target={item.companyUrl !== "#" ? "_blank" : undefined}
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-primary hover:underline"
          >
            {item.company}
            {item.companyUrl !== "#" && <ExternalLink className="w-3 h-3" />}
          </Link>
        </div>

        {/* Description */}
        <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>

        {/* Skills */}
        <div className="flex flex-wrap gap-2">
          {item.skills.map((skill) => (
            <span
              key={skill}
              className="px-2 py-1 text-xs font-mono rounded-full border border-border text-muted-foreground"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

export function Resume() {
  return (
    <section id="resume" className="py-24">
      <div className="mx-auto max-w-6xl px-6">
        {/* Section Header */}
        <div className="mb-12">
          <div className="flex items-center gap-4 mb-4">
            <span className="font-mono text-primary text-sm">03.</span>
            <h2 className="text-3xl font-bold text-foreground">Experience</h2>
            <div className="flex-1 h-px bg-border" />
          </div>
          <p className="text-muted-foreground max-w-2xl">
            From a non-dev full-time job to full-stack engineering at a major AI software company —
            the timeline of the pivot, plus the side-project habit that came along for the ride.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Experience Timeline */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-8">
              <Briefcase className="w-5 h-5 text-primary" />
              <h3 className="text-lg font-semibold text-foreground">Work Experience</h3>
            </div>
            <div className="relative">
              {experience.map((item) => (
                <ExperienceItem key={item.period} item={item} />
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Self-Taught (replacing v0's "Education") */}
            <div className="bg-card rounded-lg border border-border p-6">
              <div className="flex items-center gap-2 mb-6">
                <Sparkles className="w-5 h-5 text-accent" />
                <h3 className="text-lg font-semibold text-foreground">{selfTaught.headline}</h3>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                {selfTaught.blurb}
              </p>
              <ul className="space-y-2">
                {selfTaught.highlights.map((h) => (
                  <li key={h} className="text-sm text-foreground flex gap-2">
                    <span className="text-accent font-mono">{">"}</span>
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Download Resume */}
            {RESUME_PDF_AVAILABLE && (
              <div className="bg-card rounded-lg border border-border p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">Full Resume</h3>
                <p className="text-sm text-muted-foreground mb-6">
                  Want the complete picture? Grab the PDF.
                </p>
                <Button asChild className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                  <Link href="/resume.pdf" target="_blank">
                    <Download className="w-4 h-4 mr-2" />
                    Download PDF
                  </Link>
                </Button>
              </div>
            )}

            {/* Skills Overview */}
            <div className="bg-card rounded-lg border border-border p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Core Skills</h3>
              <div className="space-y-3">
                {[
                  { name: "Frontend", skills: "React, Next.js, TypeScript, Tailwind" },
                  { name: "Backend", skills: "Node.js, Python, PostgreSQL" },
                  {
                    // A tooling list ("Claude SDK, MCP, prompting") reads as
                    // "has used the APIs". Naming eval / observability /
                    // reliability is the capability claim, and it discloses
                    // nothing about any employer's work.
                    name: "AI / Agents",
                    skills:
                      "Agent reliability, evals, observability, MCP, Claude SDK",
                  },
                  { name: "Infra", skills: "Docker, Kubernetes, CI/CD, Vercel" },
                ].map((category) => (
                  <div key={category.name}>
                    <span className="text-xs font-mono text-accent">{category.name}</span>
                    <p className="text-sm text-muted-foreground">{category.skills}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
