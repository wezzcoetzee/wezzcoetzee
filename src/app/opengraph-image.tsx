import { ImageResponse } from 'next/og';

// Route segment config
export const dynamic = 'force-static';

// Image metadata
export const alt = 'Wesley Coetzee - Tech Lead, & Principal Software Engineer';
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

// Image generation
export default async function Image() {
  return new ImageResponse(
    <div
      style={{
        fontSize: 60,
        background: '#000000',
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '80px',
        position: 'relative',
      }}
    >
      {/* Decorative elements */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background:
            'radial-gradient(circle at 20% 50%, rgba(122, 150, 214, 0.14) 0%, transparent 55%), radial-gradient(circle at 80% 80%, rgba(122, 150, 214, 0.08) 0%, transparent 55%)',
        }}
      />

      {/* Content */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          position: 'relative',
        }}
      >
        {/* Name */}
        <div
          style={{
            fontSize: 72,
            fontWeight: 900,
            color: '#fafafa',
            marginBottom: 20,
            letterSpacing: '-0.02em',
          }}
        >
          Wesley Coetzee
        </div>

        {/* Roles */}
        <div
          style={{
            display: 'flex',
            gap: 16,
            marginBottom: 40,
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}
        >
          {['Tech Lead', 'Principal Software Engineer'].map((role) => (
            <div
              key={role}
              style={{
                fontSize: 24,
                fontWeight: 500,
                color: '#7a96d6',
                padding: '12px 24px',
                border: '1px solid #262626',
                borderRadius: 8,
                background: 'rgba(122, 150, 214, 0.08)',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
              }}
            >
              {role}
            </div>
          ))}
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: 32,
            color: '#ededed',
            maxWidth: 900,
            lineHeight: 1.4,
          }}
        >
          Building scalable solutions & leading engineering teams
        </div>

        {/* Location */}
        <div
          style={{
            fontSize: 24,
            color: '#7a7a7a',
            marginTop: 30,
            display: 'flex',
            alignItems: 'center',
            gap: 10,
          }}
        >
          📍 Auckland, New Zealand
        </div>
      </div>

      {/* Bottom accent */}
      <div
        style={{
          position: 'absolute',
          bottom: 40,
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          fontSize: 20,
          color: '#7a7a7a',
        }}
      >
        <div
          style={{
            width: 40,
            height: 1,
            background: '#262626',
          }}
        />
        <span>wezzcoetzee.com</span>
        <div
          style={{
            width: 40,
            height: 1,
            background: '#262626',
          }}
        />
      </div>
    </div>,
    {
      ...size,
    }
  );
}
