import { ImageResponse } from 'next/og'
import { readFile } from 'node:fs/promises'
import { join } from 'node:path'

/**
 * Social share card. Generated rather than hand-designed so it can't drift out
 * of sync with the theme — colors below are the Tokyo Night tokens from
 * `app/globals.css` (background / foreground / primary / accent / border).
 *
 * `app/twitter-image.tsx` re-exports this so both cards stay identical.
 */
export const alt = 'Hunter Wiginton — Full-Stack AI Engineer | Hackastak'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function OpengraphImage() {
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
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#1A1B26',
          padding: '64px 72px',
          // Soft primary-blue glow bleeding in from the top right.
          backgroundImage:
            'radial-gradient(circle at 88% 8%, rgba(122,162,247,0.22) 0%, rgba(26,27,38,0) 55%)',
        }}
      >
        {/* Brand lockup */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
          <img src={logoSrc} width={52} height={52} alt="" />
          <div style={{ display: 'flex', fontSize: 30, letterSpacing: -0.5 }}>
            <span style={{ color: '#9ECE6A' }}>~/</span>
            <span style={{ color: '#C0CAF5' }}>hackastak</span>
          </div>
        </div>

        {/* Headline */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              display: 'flex',
              fontSize: 88,
              fontWeight: 700,
              color: '#C0CAF5',
              letterSpacing: -3,
              lineHeight: 1.05,
            }}
          >
            Hunter Wiginton
          </div>
          <div
            style={{
              display: 'flex',
              marginTop: 20,
              fontSize: 40,
              color: '#7AA2F7',
              letterSpacing: -1,
            }}
          >
            Full-Stack AI Engineer
          </div>
          <div
            style={{
              display: 'flex',
              marginTop: 26,
              fontSize: 26,
              color: '#565f89',
              letterSpacing: -0.3,
            }}
          >
            Self-taught. Shipping side projects in public.
          </div>
        </div>

        {/* Footer rule + domain */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderTop: '1px solid #3b4261',
            paddingTop: 28,
          }}
        >
          <div style={{ display: 'flex', fontSize: 24, color: '#565f89' }}>
            hackastak.com
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            {['#9ECE6A', '#7AA2F7', '#3b4261'].map((color) => (
              <div
                key={color}
                style={{
                  width: 44,
                  height: 6,
                  borderRadius: 3,
                  background: color,
                }}
              />
            ))}
          </div>
        </div>
      </div>
    ),
    size,
  )
}
