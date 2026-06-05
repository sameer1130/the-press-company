'use client';

import { useEffect, useRef, useState } from 'react';

// Field guides — the studio's published thinking. Each card flips on hover
// to reveal the essay's framing (why it works + the angle), so a founder can
// self-qualify before they ever click into the full piece.
const PROJECTS = [
  {
    client: 'Field guide № 01',
    sector: 'Branding · Strategy',
    title: 'The difference between branding and marketing — and why most businesses confuse them.',
    year: '2025',
    why: 'One of the most searched and misunderstood topics in the studio briefing room.',
    seo: '"branding vs marketing" · "difference between branding and marketing"',
    angle: 'Branding builds perception. Marketing drives visibility and conversions. The two are not interchangeable, and treating them as such is what makes most growth flatten.',
  },
  {
    client: 'Field guide № 02',
    sector: 'D2C · Growth',
    title: 'Why most D2C brands fail after initial growth.',
    year: '2025',
    why: 'Founder-focused and psychologically compelling — speaks to a quiet fear most operators hold.',
    angle: 'Five failure modes show up again and again:',
    points: [
      'Overdependence on ads',
      'No brand recall',
      'Weak retention',
      'Lack of positioning',
      'Commodity trap',
    ],
    note: 'Positions us as a strategic consultant, not just a marketing vendor.',
  },
  {
    client: 'Field guide № 03',
    sector: 'Brand equity',
    title: 'How to build a brand people remember.',
    year: '2025',
    why: 'Evergreen branding education — the piece a marketing lead forwards to their CEO.',
    angle: 'The six layers we work through with founders:',
    points: [
      'Brand identity',
      'Emotional association',
      'Visual consistency',
      'Tone of voice',
      'Positioning',
      'Repetition psychology',
    ],
  },
  {
    client: 'Field guide № 04',
    sector: 'Consumer psychology',
    title: 'The psychology behind why people buy brands.',
    year: '2025',
    why: 'Premium positioning + consumer behavior — highly engaging combination for senior readers.',
    angle: 'Six drivers behind every buying decision worth pricing for:',
    points: [
      'Status',
      'Trust',
      'Familiarity bias',
      'Social proof',
      'Emotional buying',
      'Identity signaling',
    ],
  },
  {
    client: 'Field guide № 05',
    sector: 'Growth · Performance',
    title: 'Performance vs brand marketing: what actually grows a business.',
    year: '2025',
    why: 'Very strong SEO + founder interest — the question every Series-A operator is asking.',
    angle: 'Short-term performance buys you growth. Long-term brand buys you equity. This piece is how we tell startups when to spend on which.',
  },
  {
    client: 'Field guide № 06',
    sector: 'Channel · Narrative',
    title: 'Why social media alone cannot build a strong brand.',
    year: '2025',
    why: 'Contrarian read — highly shareable, especially with senior marketers tired of "post more" advice.',
    angle: 'Five missing pieces when social is the whole strategy:',
    points: [
      'Weak positioning',
      'No ecosystem',
      'Lack of community',
      'Missing retention systems',
      'No narrative',
    ],
  },
];

const LOGOS = [
  'Furry Essentials',
  'Alignllife',
  'House of Emporia',
  'Wise Wag',
  'Belief Salon',
  'Prysm Dental',
  'Throve',
  'Unique Creation',
  'Forever Smiles',
  'Janvi Chitalia',
  'Dental Window',
  'Furry Friends & Co.',
  'Pratap Steels',
  'Flamemate',
  'Irest',
  'Daigo',
  'Trikaaya Care',
  'Ornul',
  'Aura Environmental',
  'Safety Equipment Co-op',
  'Jewelure',
  'Creatio',
  'Nutriesaviour',
  'Oxylife',
  'Rare Earth Cafe',
  'Physic by Vinay',
  'Name Place Animal Thing',
];

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
                <div style={{ maxWidth: 560, fontSize: 15, lineHeight: 1.5, opacity: 0.7, marginTop: 20 }}>
                  Field guides from the studio — the position papers behind
                  the work. Read them if you recognise the problem; talk to us
                  if you want to fix it.
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
                  <div className="proj-flipper">
                    {/* FRONT — the teaser */}
                    <div className="proj-face proj-face-front">
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
                          <span>Hover to read →</span>
                          <span>— {p.year}</span>
                        </div>
                      </div>
                    </div>

                    {/* BACK — the essay framing */}
                    <div className="proj-face proj-face-back">
                      <div className="proj-back-inner">
                        <div className="tag-row">
                          <span>{String(i + 1).padStart(2, '0')} / {String(PROJECTS.length).padStart(2, '0')}</span>
                          <span>{p.sector}</span>
                        </div>

                        <div className="proj-back-body">
                          <div className="proj-back-block">
                            <div className="proj-back-label">Why it works</div>
                            <div className="proj-back-text">{p.why}</div>
                          </div>

                          {p.seo && (
                            <div className="proj-back-block">
                              <div className="proj-back-label">SEO potential</div>
                              <div className="proj-back-text proj-back-mono">{p.seo}</div>
                            </div>
                          )}

                          <div className="proj-back-block">
                            <div className="proj-back-label">Angle</div>
                            <div className="proj-back-text">{p.angle}</div>
                            {p.points && (
                              <ul className="proj-back-list">
                                {p.points.map((pt, j) => (
                                  <li key={j}>{pt}</li>
                                ))}
                              </ul>
                            )}
                            {p.note && (
                              <div className="proj-back-note">{p.note}</div>
                            )}
                          </div>
                        </div>

                        <div className="project-meta">
                          <span>Read full essay →</span>
                          <span>— {p.year}</span>
                        </div>
                      </div>
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

      <BrandsMarquee logos={LOGOS} />
    </section>
  );
}

/* ── Brands in orbit — 4 rows, scroll-driven ──────────────────
   Rows alternate direction (row 0,2 = L→R; row 1,3 = R→L). The
   translation is driven by window.scrollY (not by a CSS keyframe),
   so the marquee only moves while the user is scrolling the page.
   The track is duplicated 2× so wrapping at half-width is seamless.
   A small rAF easer smooths the scroll signal so motion feels physical
   rather than discrete-jumpy. */
function BrandsMarquee({ logos }) {
  const ROW_COUNT = 4;
  const SCROLL_SPEED = 0.7; // px-of-track per px-of-scroll. Higher = more visible motion.

  // Split brands into ROW_COUNT roughly-equal slices.
  const rows = (() => {
    const base = Math.floor(logos.length / ROW_COUNT);
    const extra = logos.length % ROW_COUNT;
    const sizes = Array.from({ length: ROW_COUNT }, (_, i) => base + (i < extra ? 1 : 0));
    const out = [];
    let c = 0;
    for (let i = 0; i < ROW_COUNT; i++) {
      out.push(logos.slice(c, c + sizes[i]));
      c += sizes[i];
    }
    return out;
  })();

  const trackRefs = useRef([]);
  const [halfWidths, setHalfWidths] = useState(() => Array(ROW_COUNT).fill(1500));
  const [smoothedScroll, setSmoothedScroll] = useState(0);
  const targetScroll = useRef(0);

  // Measure each track's natural width (sum of chips + gaps) ÷ 2 — that's
  // one set's width, which is also the wrap distance.
  useEffect(() => {
    const measure = () => {
      const next = trackRefs.current.map((el) =>
        el && el.scrollWidth > 0 ? el.scrollWidth / 2 : 1500
      );
      setHalfWidths(next);
    };
    measure();
    window.addEventListener('resize', measure);
    // Re-measure after fonts settle (chips can change width when
    // Inter Tight finishes loading).
    const t1 = setTimeout(measure, 250);
    const t2 = setTimeout(measure, 1200);
    return () => {
      window.removeEventListener('resize', measure);
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [logos]);

  // Always-on rAF loop. Scroll listener writes to a ref; rAF reads it and
  // lerps state toward target. No scheduling tricks, no stalled flags —
  // motion can never get "stuck" because the loop never stops.
  useEffect(() => {
    targetScroll.current = window.scrollY;
    let last = window.scrollY;
    setSmoothedScroll(window.scrollY);

    const onScroll = () => {
      targetScroll.current = window.scrollY;
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    let rafId;
    const tick = () => {
      const t = targetScroll.current;
      const next = last + (t - last) * 0.18;
      // Only commit state when we've actually moved — avoids re-rendering
      // on every frame while the page is idle.
      if (Math.abs(t - next) < 0.15) {
        if (last !== t) {
          setSmoothedScroll(t);
          last = t;
        }
      } else {
        setSmoothedScroll(next);
        last = next;
      }
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  // For each row, compute a translateX that wraps in [−half, 0].
  // LTR rows: dx − half  (negative → 0, snaps back to −half = seamless)
  // RTL rows:    −dx     (0 → −half, snaps back to 0)
  const offsetFor = (idx) => {
    const half = halfWidths[idx] || 1500;
    const raw = smoothedScroll * SCROLL_SPEED;
    const dx = ((raw % half) + half) % half;
    const ltr = idx % 2 === 0;
    return ltr ? dx - half : -dx;
  };

  return (
    <div className="logos">
      <div className="logos-label">
        <span className="dot" />
        Brands in orbit
      </div>

      <div className="logos-marquee">
        {rows.map((row, idx) => (
          <div className="logos-row" key={idx}>
            <div
              ref={(el) => { trackRefs.current[idx] = el; }}
              className="logos-track"
              style={{ transform: `translate3d(${offsetFor(idx)}px, 0, 0)` }}
            >
              {[...row, ...row].map((l, i) => (
                <div key={`${idx}-${i}`} className="logo-cell">{l}</div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
