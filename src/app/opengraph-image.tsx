import { ImageResponse } from 'next/og';

export const dynamic = 'force-static';

const HEADLINE = 'Building AI agents and the tools they run on';

export const alt = `Wesley Coetzee: ${HEADLINE}`;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

/** Satori can't read next/font, so pull the exact Geist Mono subset from Google Fonts at build time. */
async function geistMono(weight: 500 | 700, text: string) {
  const css = await fetch(
    `https://fonts.googleapis.com/css2?family=Geist+Mono:wght@${weight}&text=${encodeURIComponent(text)}`
  ).then((res) => res.text());
  const url = css.match(/src: url\((.+?)\) format/)?.[1];
  if (!url) throw new Error(`Geist Mono ${weight} not found in Google Fonts response`);
  return fetch(url).then((res) => res.arrayBuffer());
}

const NAME = 'Wesley Coetzee';
const DOMAIN = '# wezzcoetzee.com';

/** Mirrors the home page: true black, name, the h1, the domain. No decoration. */
export default async function Image() {
  const [medium, bold] = await Promise.all([
    geistMono(500, NAME + DOMAIN),
    geistMono(700, HEADLINE),
  ]);

  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '80px 96px',
        background: '#000000',
        fontFamily: 'Geist Mono',
      }}
    >
      <div style={{ fontSize: 32, fontWeight: 500, color: '#fafafa' }}>{NAME}</div>
      <div
        style={{
          fontSize: 68,
          fontWeight: 700,
          lineHeight: 1.15,
          letterSpacing: '-0.02em',
          color: '#fafafa',
          maxWidth: 960,
        }}
      >
        {HEADLINE}
      </div>
      <div style={{ display: 'flex', gap: 16, fontSize: 28, fontWeight: 500, color: '#7a7a7a' }}>
        <span style={{ color: '#7a96d6' }}>#</span>
        <span>wezzcoetzee.com</span>
      </div>
    </div>,
    {
      ...size,
      fonts: [
        { name: 'Geist Mono', data: medium, weight: 500, style: 'normal' },
        { name: 'Geist Mono', data: bold, weight: 700, style: 'normal' },
      ],
    }
  );
}
