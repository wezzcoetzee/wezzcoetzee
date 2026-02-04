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
    (
      <div
        style={{
          fontSize: 60,
          background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
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
            opacity: 0.1,
            background:
              'radial-gradient(circle at 20% 50%, rgba(203, 213, 225, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(148, 163, 184, 0.3) 0%, transparent 50%)',
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
              background: 'linear-gradient(135deg, #e2e8f0 0%, #cbd5e1 50%, #94a3b8 100%)',
              backgroundClip: 'text',
              color: 'transparent',
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
                  color: '#cbd5e1',
                  padding: '12px 24px',
                  border: '2px solid rgba(203, 213, 225, 0.3)',
                  borderRadius: 8,
                  background: 'rgba(203, 213, 225, 0.1)',
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
              color: '#94a3b8',
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
              color: '#64748b',
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
            color: '#475569',
          }}
        >
          <div
            style={{
              width: 40,
              height: 2,
              background: 'rgba(148, 163, 184, 0.4)',
            }}
          />
          <span>wezzcoetzee.com</span>
          <div
            style={{
              width: 40,
              height: 2,
              background: 'rgba(148, 163, 184, 0.4)',
            }}
          />
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
