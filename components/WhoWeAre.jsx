'use client';

import { useEffect, useRef, useState } from 'react';

export default function WhoWeAre() {
  const sectionRef = useRef(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      if (!sectionRef.current) return;
      const r = sectionRef.current.getBoundingClientRect();
      const total = r.height - window.innerHeight;
      const scrolled = Math.min(Math.max(-r.top, 0), total);
      setProgress(total > 0 ? scrolled / total : 0);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const line1 = "We build brands that don't rely on noise to grow.";
  const line2 = "Most brands don't struggle because they lack marketing — they struggle because there's no clarity behind it. We work with founders to align positioning, communication and growth systems into one cohesive direction, so the brand performs, scales and sustains momentum without relying on noise.";
  const allWords = (line1 + ' ' + line2).split(' ');
  const line1Count = line1.split(' ').length;

  const getWordStyle = (idx, total) => {
    const wordThreshold = (idx / total) * 0.98;
    const wordProgress = Math.max(0, Math.min(1, (progress - wordThreshold) / 0.02));
    return {
      display: 'inline-block',
      opacity: 0.15 + wordProgress * 0.85,
      transform: `translateY(${(1 - wordProgress) * 6}px)`,
      transition: 'none',
      marginRight: '0.3em',
    };
  };

  const bgOffset = progress * 600;

  return (
    <section ref={sectionRef} className="who" id="who" style={{ position: 'relative' }}>
      <div style={{ height: '130vh', position: 'relative' }}>
        <div style={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
        }}>
          <div style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            pointerEvents: 'none',
            overflow: 'hidden',
          }}>
            {[-1, 0, 1].map((row) => (
              <div key={row} style={{
                whiteSpace: 'nowrap',
                fontFamily: 'var(--font-display)',
                fontWeight: 900,
                fontSize: 'clamp(80px, 14vw, 200px)',
                letterSpacing: '-0.05em',
                lineHeight: 1.1,
                color: 'var(--ink)',
                opacity: 0.04,
                transform: `translateX(${(row % 2 === 0 ? -bgOffset : bgOffset) - 200}px)`,
              }}>
                CLARITY BUILDS BRANDS · CLARITY BUILDS BRANDS · CLARITY BUILDS BRANDS · CLARITY BUILDS BRANDS
              </div>
            ))}
          </div>

          <div style={{
            position: 'relative',
            zIndex: 2,
            maxWidth: 1000,
            padding: '0 40px',
          }}>
            <div style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 11,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              opacity: Math.min(1, progress * 4),
              marginBottom: 40,
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              color: 'var(--ink)',
            }}>
              <span style={{
                width: 8, height: 8,
                background: 'var(--accent)',
                borderRadius: '50%',
                display: 'inline-block',
              }} />
              Who we are
            </div>

            <div style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 900,
              fontSize: 'clamp(32px, 5vw, 72px)',
              lineHeight: 1.05,
              letterSpacing: '-0.035em',
              color: 'var(--ink)',
              marginBottom: 28,
            }}>
              {line1.split(' ').map((w, i) => (
                <span key={i} style={getWordStyle(i, allWords.length)}>{w}</span>
              ))}
            </div>

            <div style={{
              width: progress > 0.3 ? 60 : 0,
              height: 3,
              background: 'var(--accent)',
              transition: 'width 0.6s cubic-bezier(0.85, 0, 0.15, 1)',
              marginBottom: 28,
            }} />

            <div style={{
              fontFamily: 'Instrument Serif, serif',
              fontWeight: 400,
              fontSize: 'clamp(18px, 2vw, 26px)',
              lineHeight: 1.45,
              letterSpacing: '-0.005em',
              color: 'var(--ink)',
              maxWidth: 780,
            }}>
              {line2.split(' ').map((w, i) => (
                <span key={i} style={getWordStyle(i + line1Count, allWords.length)}>{w}</span>
              ))}
            </div>

            <div style={{
              marginTop: 60,
              display: 'flex',
              gap: 60,
              flexWrap: 'wrap',
              opacity: Math.max(0, (progress - 0.7) / 0.25),
              transform: `translateY(${Math.max(0, (1 - Math.max(0, (progress - 0.7) / 0.25))) * 20}px)`,
            }}>
              {[
                ['Strategy', 'Positioning that holds up in any room'],
                ['Plan', 'A roadmap aligned to how the brand will compete'],
                ['Execute', 'Systems shipped at the speed of the market'],
              ].map(([title, desc], i) => (
                <div key={i} style={{
                  borderTop: '1px solid var(--rule)',
                  paddingTop: 16,
                  minWidth: 180,
                  flex: 1,
                }}>
                  <div style={{
                    fontFamily: 'var(--font-display)',
                    fontWeight: 900,
                    fontSize: 20,
                    letterSpacing: '-0.02em',
                    marginBottom: 6,
                  }}>{title}</div>
                  <div style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 10,
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                    opacity: 0.6,
                    lineHeight: 1.5,
                  }}>{desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
