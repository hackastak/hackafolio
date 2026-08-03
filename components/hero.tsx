"use client"

import { useEffect, useState } from "react"
import { ArrowDown } from "lucide-react"
import Link from "next/link"

const ROLE = "Full-Stack AI Engineer"

export function Hero() {
  const [typedText, setTypedText] = useState("")

  useEffect(() => {
    let index = 0
    const timer = setInterval(() => {
      if (index <= ROLE.length) {
        setTypedText(ROLE.slice(0, index))
        index++
      } else {
        clearInterval(timer)
      }
    }, 80)
    return () => clearInterval(timer)
  }, [])

  return (
    // `min-h-screen` + `pt-20` made the hero 100vh *plus* the 80px fixed
    // header, and the inner `py-20` then fought `items-center` — together they
    // left a large empty gap before the next section. Subtracting the header
    // from the min-height makes this exactly one viewport tall.
    <section
      id="about"
      className="min-h-[calc(100svh-5rem)] flex items-center justify-center pt-20"
    >
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column — Text Content */}
          <div className="space-y-8">
            {/* Terminal-style greeting */}
            <div className="font-mono text-sm text-muted-foreground">
              <span className="text-accent">const</span>{" "}
              <span className="text-primary">greeting</span>{" "}
              <span className="text-destructive">=</span>{" "}
              <span className="text-foreground">{'"'}Hey, I&apos;m Hunter.{'"'}</span>
            </div>

            {/* Name */}
            <div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-foreground tracking-tight text-balance">
                Hunter Wiginton
              </h1>
              <div className="mt-4 flex items-center gap-2">
                <span className="text-2xl md:text-3xl text-primary font-mono">
                  {typedText}
                  <span className="animate-pulse">|</span>
                </span>
              </div>
            </div>

            {/* Bio */}
            <p className="text-lg text-muted-foreground leading-relaxed max-w-xl">
              I started in a full-time non-dev job, taught myself to
              code, became a frontend dev, now full-stack in the AI space at one of the largest
              software companies in the world. I ship side projects in public under the{" "}
              <span className="text-primary">Hackastak</span> umbrella: CLIs, AI agent tooling,
              workflow automations, and digital products on Gumroad.
            </p>

            {/* Tech Stack Pills */}
            <div className="flex flex-wrap gap-2">
              {["TypeScript", "Next.js", "Python", "AI Agents", "MCP", "Neovim"].map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 text-xs font-mono rounded-full bg-card border border-border text-muted-foreground hover:border-primary hover:text-primary transition-colors cursor-default"
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* CTA Links */}
            <div className="flex flex-wrap gap-4 pt-4">
              <Link
                href="#projects"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-medium rounded-md hover:bg-primary/90 transition-colors"
              >
                View My Work
                <ArrowDown className="w-4 h-4" />
              </Link>
              <Link
                href="https://medium.com/@hackastak"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 border border-border text-foreground font-medium rounded-md hover:border-primary hover:text-primary transition-colors"
              >
                Read The HackaStak
              </Link>
            </div>
          </div>

          {/* Right Column — Code Block Visual */}
          {/* Decorative duplicate of the bio; hidden from assistive tech so a
              screen reader doesn't read out a meaningless code dump. */}
          <div className="relative hidden lg:block" aria-hidden="true">
            <div className="bg-card rounded-lg border border-border overflow-hidden shadow-2xl">
              {/* Window Controls */}
              <div className="flex items-center gap-2 px-4 py-3 bg-secondary/50 border-b border-border">
                <div className="w-3 h-3 rounded-full bg-destructive/80" />
                <div className="w-3 h-3 rounded-full bg-accent/80" />
                <div className="w-3 h-3 rounded-full bg-primary/80" />
                <span className="ml-4 text-xs text-muted-foreground font-mono">about.ts</span>
              </div>
              {/* Code Content */}
              <div className="p-6 font-mono text-sm leading-relaxed">
                <div>
                  <span className="text-accent">interface</span>{" "}
                  <span className="text-primary">Engineer</span>{" "}
                  <span className="text-foreground">{"{"}</span>
                </div>
                <div className="pl-4">
                  <span className="text-muted-foreground">name:</span>{" "}
                  <span className="text-accent">string</span>;
                </div>
                <div className="pl-4">
                  <span className="text-muted-foreground">role:</span>{" "}
                  <span className="text-accent">string</span>;
                </div>
                <div className="pl-4">
                  <span className="text-muted-foreground">stack:</span>{" "}
                  <span className="text-accent">string</span>[];
                </div>
                <div className="pl-4">
                  <span className="text-muted-foreground">shipsInPublic:</span>{" "}
                  <span className="text-accent">boolean</span>;
                </div>
                <div className="text-foreground">{"}"}</div>
                <div className="mt-4">
                  <span className="text-accent">const</span>{" "}
                  <span className="text-primary">hunter</span>:{" "}
                  <span className="text-primary">Engineer</span>{" "}
                  <span className="text-destructive">=</span>{" "}
                  <span className="text-foreground">{"{"}</span>
                </div>
                <div className="pl-4">
                  <span className="text-muted-foreground">name:</span>{" "}
                  <span className="text-accent">{'"'}Hunter Wiginton{'"'}</span>,
                </div>
                <div className="pl-4">
                  <span className="text-muted-foreground">role:</span>{" "}
                  <span className="text-accent">{'"'}Full-Stack AI Engineer{'"'}</span>,
                </div>
                <div className="pl-4">
                  <span className="text-muted-foreground">stack:</span>{" "}
                  <span className="text-foreground">[</span>
                  <span className="text-accent">{'"'}TS{'"'}</span>,{" "}
                  <span className="text-accent">{'"'}Next.js{'"'}</span>,{" "}
                  <span className="text-accent">{'"'}Agents{'"'}</span>
                  <span className="text-foreground">]</span>,
                </div>
                <div className="pl-4">
                  <span className="text-muted-foreground">shipsInPublic:</span>{" "}
                  <span className="text-destructive">true</span>
                </div>
                <div className="text-foreground">{"}"};</div>
              </div>
            </div>
            {/* Decorative glows */}
            <div className="absolute -z-10 top-8 -right-8 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
            <div className="absolute -z-10 -bottom-8 -left-8 w-72 h-72 bg-accent/5 rounded-full blur-3xl" />
          </div>
        </div>
      </div>
    </section>
  )
}
