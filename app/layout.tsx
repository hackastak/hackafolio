import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
})

export const metadata: Metadata = {
  title: 'Hunter Wiginton — Full-Stack AI Engineer | Hackastak',
  description:
    "Self-taught full-stack engineer working in the AI space. Shipping side projects in public — CLIs, AI agent tooling, DTC apparel, digital products. Writing at The HackaStak.",
  generator: 'Hackastak',
  metadataBase: new URL('https://hackastak.com'),
  openGraph: {
    title: 'Hunter Wiginton — Full-Stack AI Engineer',
    description:
      'Honest, no-BS recommendations on the tools and practices worth your time. Full-stack engineering, AI x developer workflow, side projects in public.',
    url: 'https://hackastak.com',
    siteName: 'Hackastak',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hunter Wiginton — Full-Stack AI Engineer',
    description:
      'Building, writing, and shipping under the Hackastak brand.',
    creator: '@hackastak',
  },
  icons: {
    icon: '/logos/hackastak-green.png',
    apple: '/logos/hackastak-green.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="bg-background">
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased`}
      >
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
