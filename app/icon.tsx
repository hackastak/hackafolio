import { ImageResponse } from 'next/og'
import { readFile } from 'node:fs/promises'
import { join } from 'node:path'

// Generated favicon: the Hackastak mark on the Tokyo Night background, so it
// stays legible in both light and dark browser chrome (the raw logo PNG is
// transparent and 1866×2100 — too heavy and the wrong aspect for a favicon).
export const size = { width: 64, height: 64 }
export const contentType = 'image/png'

export default async function Icon() {
  const logo = await readFile(
    join(process.cwd(), 'public/logos/hackastak-green.png'),
  )
  const logoSrc = `data:image/png;base64,${logo.toString('base64')}`

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#1A1B26',
          borderRadius: 12,
        }}
      >
        <img src={logoSrc} width={44} height={44} alt="" />
      </div>
    ),
    size,
  )
}
