import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Hunter Wiginton — Full-Stack AI Engineer | Hackastak',
    short_name: 'Hackastak',
    description:
      'Self-taught full-stack engineer working in the AI space. Shipping side projects in public.',
    start_url: '/',
    display: 'standalone',
    background_color: '#1A1B26',
    theme_color: '#1A1B26',
    icons: [
      {
        src: '/icon',
        sizes: '64x64',
        type: 'image/png',
      },
      {
        src: '/apple-icon',
        sizes: '180x180',
        type: 'image/png',
      },
    ],
  }
}
