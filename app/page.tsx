import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { Projects } from "@/components/projects"
import { Blog } from "@/components/blog"
import { Resume } from "@/components/resume"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <Hero />
      <Projects />
      <Blog />
      <Resume />
      <Footer />
    </main>
  )
}
