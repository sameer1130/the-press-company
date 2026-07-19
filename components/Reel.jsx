'use client';

import { useEffect, useRef, useState } from 'react';

export default function Reel() {
  const triggerRef = useRef(null);
  const [p, setP] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      if (!triggerRef.current) return;
      const r = triggerRef.current.getBoundingClientRect();
      if (r.top > 0) { setP(0); return; }
      const total = r.height - window.innerHeight;
      const scrolled = Math.min(Math.max(-r.top, 0), total);
      setP(total > 0 ? scrolled / total : 0);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const spinP = Math.min(1, p / 0.35);
  const expandP = Math.max(0, Math.min(1, (p - 0.35) / 0.30));
  const contentP = Math.max(0, Math.min(1, (p - 0.55) / 0.15));

  const easeOut = (t) => 1 - Math.pow(1 - t, 3);
  const easeInOut = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

  const rotY = easeInOut(spinP) * 90;
  const rotX = Math.sin(spinP * Math.PI) * 10;
  const expandEased = easeOut(expandP);

  const cubeSize = 340;
  const half = cubeSize / 2;

  const showCube = expandEased < 0.98;
  const showPanel = expandEased > 0.02;

  const faceBase = {
    position: 'absolute',
    width: cubeSize, height: cubeSize,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    flexDirection: 'column',
    backfaceVisibility: 'visible',
  };

  return (
    <section id="reel" style={{ position: 'relative', background: 'var(--accent)' }}>
      <div ref={triggerRef} style={{ height: '200vh', position: 'relative' }}>
        <div style={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          background: expandEased > 0.4 ? 'var(--ink)' : 'var(--accent)',
          transition: 'background 0.5s',
        }}>
          {/* Title — top left, fades during spin */}
          <div style={{
            position: 'absolute', top: 32, left: 32, zIndex: 5,
            opacity: Math.max(0, 1 - spinP * 2.5),
            color: 'var(--ink)',
          }}>
            <div style={{
              fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.2em',
              textTransform: 'uppercase',
              display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20,
            }}>
              <span style={{ width: 8, height: 8, background: 'var(--ink)', borderRadius: '50%', display: 'inline-block' }} />
              The Reel
            </div>
            <div style={{
              fontFamily: 'var(--font-display)', fontWeight: 900,
              fontSize: 'clamp(32px, 4vw, 64px)',
              lineHeight: 0.9, letterSpacing: '-0.04em',
            }}>
              60 sec<br />of <span style={{ fontFamily: 'Instrument Serif,serif', fontWeight: 400, fontStyle: 'italic' }}>proof.</span>
            </div>
          </div>

          {/* 3D cube — only while not fully expanded */}
          {showCube && (
            <div style={{
              perspective: 1000,
              opacity: 1 - expandEased,
              transform: `scale(${1 + expandEased * 0.4})`,
              transition: 'opacity 0.05s linear',
              position: 'relative',
              zIndex: 2,
            }}>
              <div style={{
                width: cubeSize, height: cubeSize,
                position: 'relative',
                transformStyle: 'preserve-3d',
                transform: `rotateX(${rotX}deg) rotateY(${rotY}deg)`,
              }}>
                {/* FRONT */}
                <div style={{
                  ...faceBase,
                  background: 'var(--ink)', color: 'var(--paper-text)',
                  transform: `translateZ(${half}px)`,
                  borderRadius: 6, gap: 6,
                }}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.22em', textTransform: 'uppercase', opacity: 0.5 }}>Showreel</div>
                  <div style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 80, letterSpacing: '-0.04em' }}>REEL</div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.22em', textTransform: 'uppercase', opacity: 0.5 }}>2026</div>
                </div>

                {/* RIGHT — preview of video face */}
                <div style={{
                  ...faceBase,
                  background: 'var(--ink)', color: 'var(--paper-text)',
                  transform: `rotateY(90deg) translateZ(${half}px)`,
                  borderRadius: 6,
                  overflow: 'hidden',
                }}>
                  <div style={{
                    position: 'absolute', inset: 0,
                    background: 'repeating-linear-gradient(45deg,rgba(255,255,255,0.02) 0 2px,transparent 2px 8px),radial-gradient(ellipse at 30% 40%,rgba(255,74,28,0.12),transparent 60%)',
                    pointerEvents: 'none',
                  }} />
                  <div style={{
                    width: 110, height: 110, borderRadius: '50%',
                    background: 'var(--accent)', color: 'var(--ink)',
                    display: 'grid', placeItems: 'center',
                    boxShadow: '0 8px 30px rgba(255,74,28,0.3)',
                  }}>
                    <svg width="26" height="26" viewBox="0 0 28 28" fill="none" style={{ marginLeft: 4 }}>
                      <path d="M6 3L24 14L6 25V3Z" fill="var(--ink)" />
                    </svg>
                  </div>
                </div>

                {/* BACK */}
                <div style={{
                  ...faceBase,
                  background: 'var(--accent)', color: 'var(--ink)',
                  transform: `rotateY(180deg) translateZ(${half}px)`,
                  borderRadius: 6, border: '1px solid rgba(11,11,11,0.15)',
                }}>
                  <div style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 72, letterSpacing: '-0.04em' }}>{'{ P }'}</div>
                </div>

                {/* LEFT */}
                <div style={{
                  ...faceBase,
                  background: 'var(--paper)', color: 'var(--ink)',
                  transform: `rotateY(-90deg) translateZ(${half}px)`,
                  borderRadius: 6, gap: 6, padding: '10%',
                }}>
                  <div style={{ fontFamily: 'Instrument Serif,serif', fontStyle: 'italic', fontSize: 22, lineHeight: 1.35, textAlign: 'center', opacity: 0.9 }}>
                    Strategy for brands worth building.
                  </div>
                </div>

                {/* TOP */}
                <div style={{
                  ...faceBase,
                  background: 'var(--accent)', color: 'var(--ink)',
                  transform: `rotateX(90deg) translateZ(${half}px)`,
                  borderRadius: 6,
                }}>
                  <div style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 64, letterSpacing: '-0.04em' }}>▶</div>
                </div>

                {/* BOTTOM */}
                <div style={{
                  ...faceBase,
                  background: 'var(--ink)', color: 'var(--paper-text)',
                  transform: `rotateX(-90deg) translateZ(${half}px)`,
                  borderRadius: 6,
                }}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.22em', textTransform: 'uppercase', opacity: 0.6 }}>00:60</div>
                </div>
              </div>
            </div>
          )}

          {/* Full-viewport video panel — flat, fades in as cube fades out */}
          {showPanel && (
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'var(--ink)',
              color: 'var(--paper-text)',
              opacity: expandEased,
              overflow: 'hidden',
              zIndex: 1,
            }}>
              <div style={{
                position: 'absolute', inset: 0,
                background:
                  'repeating-linear-gradient(45deg,rgba(255,255,255,0.02) 0 2px,transparent 2px 8px),' +
                  'radial-gradient(ellipse at 30% 40%,rgba(255,74,28,0.18),transparent 60%)',
                pointerEvents: 'none',
              }} />

              {/* Top-left placeholder label */}
              <div style={{
                position: 'absolute', top: 32, left: 32,
                fontFamily: 'var(--font-mono)', fontSize: 11,
                letterSpacing: '0.2em', textTransform: 'uppercase',
                opacity: contentP * 0.7,
              }}>
                [ PLACEHOLDER — SHOWREEL.MP4 ]
              </div>

              {/* Top-right timecode */}
              <div style={{
                position: 'absolute', top: 32, right: 32,
                fontFamily: 'var(--font-mono)', fontSize: 11,
                letterSpacing: '0.2em',
                opacity: contentP * 0.7,
              }}>
                00:01:00:00
              </div>

              {/* Bottom row of meta */}
              <div style={{
                position: 'absolute', bottom: 32, left: 32, right: 32,
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                fontFamily: 'var(--font-mono)', fontSize: 11,
                letterSpacing: '0.2em', textTransform: 'uppercase',
                opacity: contentP * 0.7,
                gap: 20, flexWrap: 'wrap',
              }}>
                <div>REC · CAM 01</div>
                <div>— STANDBY —</div>
                <div>ISO 400 · F2.8</div>
              </div>

              {/* Play button — anchored center of viewport */}
              <div style={{
                position: 'absolute',
                top: '50%', left: '50%',
                transform: `translate(-50%, -50%) scale(${0.5 + contentP * 0.5})`,
                width: 'clamp(120px, 16vmin, 200px)',
                height: 'clamp(120px, 16vmin, 200px)',
                borderRadius: '50%',
                background: 'var(--accent)', color: 'var(--ink)',
                display: 'grid', placeItems: 'center',
                opacity: contentP,
                cursor: 'pointer',
                boxShadow: '0 8px 30px rgba(255,74,28,0.3)',
              }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                  <svg width="34" height="34" viewBox="0 0 28 28" fill="none" style={{ marginLeft: 4 }}>
                    <path d="M6 3L24 14L6 25V3Z" fill="var(--ink)" />
                  </svg>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 500 }}>
                    Play reel
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
