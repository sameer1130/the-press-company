'use client';

import { useEffect, useRef, useState } from 'react';

const PROJECTS = [
  { client: 'Northbound Coffee', sector: 'F&B / DTC', title: 'Repositioning a third-wave roaster for grocery', year: '2025' },
  { client: 'Atlas Health', sector: 'Healthcare', title: 'Category design for preventive diagnostics', year: '2025' },
  { client: 'Kairo Finance', sector: 'Fintech', title: 'Narrative reset post Series-B', year: '2024' },
  { client: 'Studio Monsoon', sector: 'Hospitality', title: 'Brand system for a six-property group', year: '2024' },
  { client: 'Foundry 42', sector: 'B2B SaaS', title: 'From feature-sell to point-of-view', year: '2025' },
  { client: 'The Paper Lab', sector: 'Stationery', title: 'Launch campaign & retail identity', year: '2024' },
];

const LOGOS = ['Northbound', 'Atlas', 'Kairo', 'Monsoon', 'Foundry42', 'Paper Lab', 'Sine', 'Harbor', 'Meridian', 'Quill', 'Twelve', 'Wildroot'];

export default function Projects() {
  const sectionRef = useRef(null);
  const triggerRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [vw, setVw] = useState(1920);
  const [vh, setVh] = useState(1080);

  useEffect(() => {
    const measure = () => { setVw(window.innerWidth); setVh(window.innerHeight); };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      if (!triggerRef.current) return;
      const r = triggerRef.current.getBoundingClientRect();
      if (r.top > 0) { setProgress(0); return; }
      const total = r.height - window.innerHeight;
      const scrolled = Math.min(Math.max(-r.top, 0), total);
      setProgress(total > 0 ? scrolled / total : 0);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const cardWidth = 540;
  const gap = 24;
  const totalTrackWidth = PROJECTS.length * (cardWidth + gap) - gap;
  const maxTranslate = Math.max(0, totalTrackWidth - vw + 80);
  const translateX = -progress * maxTranslate;
  // Trigger tall enough that progress 0→1 covers the full horizontal travel
  // at roughly 1:1 scroll feel, plus a short "hold" at the end before release.
  const triggerHeight = vh + maxTranslate + 200;

  return (
    <section ref={sectionRef} className="projects" id="projects" style={{ overflow: 'visible' }}>
      <div ref={triggerRef} style={{ height: triggerHeight, position: 'relative' }}>
        <div style={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
        }}>
          <div style={{ padding: '60px 32px 0' }}>
            <div className="section-head">
              <div className="section-num">
                <div className="dot" />
                <div>SECTION 04</div>
                <div>— WORK</div>
              </div>
              <div>
                <h2 className="section-title">
                  Selected <em>proofs.</em>
                </h2>
                <div style={{ maxWidth: 520, fontSize: 15, lineHeight: 1.5, opacity: 0.7, marginTop: 20 }}>
                  A rotating edit of engagements we can talk about publicly. The rest
                  lives under NDA — ask us.
                </div>
              </div>
            </div>
          </div>

          <div style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            overflow: 'hidden',
            position: 'relative',
          }}>
            <div
              style={{
                display: 'flex',
                gap,
                paddingLeft: 32,
                paddingRight: 80,
                transform: `translateX(${translateX}px)`,
                willChange: 'transform',
              }}
            >
              {PROJECTS.map((p, i) => (
                <div key={i} className="proj-card" style={{ width: cardWidth, flexShrink: 0 }}>
                  <div className="placeholder-swatch" />
                  <div className="proj-card-inner">
                    <div className="tag-row">
                      <span>{String(i + 1).padStart(2, '0')} / {String(PROJECTS.length).padStart(2, '0')}</span>
                      <span>{p.sector}</span>
                    </div>
                    <div>
                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', opacity: 0.8, marginBottom: 10 }}>
                        — {p.client}
                      </div>
                      <div className="project-title">{p.title}</div>
                    </div>
                    <div className="project-meta">
                      <span>View case →</span>
                      <span>— {p.year}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div style={{
              position: 'absolute',
              bottom: 30,
              left: 32,
              right: 32,
              height: 2,
              background: 'var(--rule)',
            }}>
              <div style={{
                height: '100%',
                width: `${progress * 100}%`,
                background: 'var(--accent)',
                transition: 'width 0.05s',
              }} />
            </div>
          </div>
        </div>
      </div>

      <div className="logos">
        <div className="logos-label">
          <span className="dot" />
          Brands in orbit
        </div>
        <div className="logos-grid">
          {LOGOS.map((l, i) => (
            <div key={i} className="logo-cell">{l}</div>
          ))}
        </div>
      </div>
    </section>
  );
}
