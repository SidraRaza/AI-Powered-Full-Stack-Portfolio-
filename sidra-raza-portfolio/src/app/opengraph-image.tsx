import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = 'Sidra Raza – Full Stack & Agentic AI Developer';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#0f172a',
          backgroundImage: 'radial-gradient(circle at 25% 25%, rgba(251, 113, 133, 0.15) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(225, 29, 72, 0.15) 0%, transparent 50%)',
          fontFamily: 'sans-serif',
          position: 'relative',
          padding: '60px',
        }}
      >
        {/* Glow border ring */}
        <div
          style={{
            position: 'absolute',
            inset: '30px',
            borderRadius: '24px',
            border: '1px solid rgba(251, 113, 133, 0.25)',
            boxShadow: 'inset 0 0 40px rgba(251, 113, 133, 0.08)',
          }}
        />

        {/* Header Logo Badge */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '20px',
            marginBottom: '32px',
          }}
        >
          {/* Emblem Icon */}
          <div
            style={{
              width: '80px',
              height: '80px',
              borderRadius: '20px',
              background: 'linear-gradient(135deg, rgba(251, 113, 133, 0.3) 0%, rgba(225, 29, 72, 0.15) 100%)',
              border: '2px solid rgba(251, 113, 133, 0.5)',
              boxShadow: '0 0 30px rgba(251, 113, 133, 0.4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fb7185',
              fontSize: '36px',
              fontWeight: 800,
              letterSpacing: '-1px',
            }}
          >
            SR
          </div>

          {/* Name Text */}
          <div
            style={{
              fontSize: '56px',
              fontWeight: 800,
              background: 'linear-gradient(to right, #fb7185, #fda4af, #f472b6)',
              backgroundClip: 'text',
              color: 'transparent',
              letterSpacing: '-1.5px',
            }}
          >
            Sidra Raza
          </div>
        </div>

        {/* Main Headline */}
        <div
          style={{
            fontSize: '38px',
            fontWeight: 700,
            color: '#f8fafc',
            textAlign: 'center',
            maxWidth: '900px',
            lineHeight: 1.3,
            marginBottom: '20px',
          }}
        >
          Full Stack & Agentic AI Developer
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: '22px',
            color: '#94a3b8',
            textAlign: 'center',
            maxWidth: '750px',
            marginBottom: '40px',
          }}
        >
          Building Intelligent AI Agents & Automated Business Workflows
        </div>

        {/* Footer Pill */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            padding: '10px 24px',
            borderRadius: '9999px',
            background: 'rgba(251, 113, 133, 0.12)',
            border: '1px solid rgba(251, 113, 133, 0.3)',
            color: '#fda4af',
            fontSize: '18px',
            fontWeight: 600,
          }}
        >
          <div
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: '#fb7185',
              boxShadow: '0 0 10px #fb7185',
            }}
          />
          sidraraza.xyz
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
