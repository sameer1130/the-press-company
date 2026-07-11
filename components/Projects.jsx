'use client';

import { useEffect, useRef, useState } from 'react';
import { getCase } from '@/lib/press-data';

// Section 04 — WORK. A horizontal deck of wide flip cards. The front is a
// studio idea (a headline we publish on); hovering flips it to the client
// engagement that proves that idea, with a link into the full case study.
// Desktop: the section pins and the deck slides across as you scroll.
// Mobile: a native swipeable carousel (tap a card to open its case).

// Each idea maps to the case that best demonstrates it (via `slug`).
const FEATURED = [
  { n: '01', category: 'Branding · Strategy', headline: 'The Difference Between Branding and Marketing (And Why Most Businesses Confuse Them)', slug: 'throve' },
  { n: '02', category: 'D2C · Growth', headline: 'Why Most D2C Brands Fail After Initial Growth', slug: 'daigo' },
  { n: '03', category: 'Brand Equity', headline: 'How to Build a Brand People Remember', slug: 'alignllife' },
  { n: '04', category: 'Consumer Psychology', headline: 'The Psychology Behind Why People Buy Brands', slug: 'janvi-chitalia' },
  { n: '05', category: 'Growth · Performance', headline: 'Performance Marketing vs Brand Marketing: What Actually Grows a Business?', slug: 'belief-salon' },
  { n: '06', category: 'Channel · Narrative', headline: 'Why Social Media Alone Cannot Build a Strong Brand', slug: 'furry-essentials' },
];

const TOTAL = String(FEATURED.length).padStart(2, '0');

const LOGOS = [
  'Furry Essentials', 'Alignllife', 'House of Emporia', 'Wise Wag',
  'Belief Salon', 'Prysm Dental', 'Throve', 'Unique Creation',
  'Forever Smiles', 'Janvi Chitalia', 'Dental Window', 'Furry Friends & Co.',
  'Pratap Steels', 'Flamemate', 'Irest', 'Daigo',
  'Trikaaya Care', 'Ornul', 'Aura Environmental', 'Safety Equipment Co-op',
  'Jewelure', 'Creatio', 'Nutriesaviour', 'Oxylife',
  'Rare Earth Cafe', 'Physic by Vinay', 'Name Place Animal Thing',
];

function ProofCard({ item, width }) {
  const c = getCase(item.slug);
  return (
    <a
      href={`/work/${item.slug}`}
      className="proof-card"
      style={{ width }}
      aria-label={`${item.headline} — read the ${c.client} case study`}
    >
      <div className="proof-flipper">
        {/* FRONT — the studio idea */}
        <div className="proof-face proof-front">
          <div className="proof-tags">
            <span>{item.n} / {TOTAL}</span>
            <span>{item.category}</span>
          </div>
          <div className="proof-front-bottom">
            <div className="proof-headline">{item.headline}</div>
            <div className="proof-foot">
              <span>Read the case →</span>
              <span>— 2025</span>
            </div>
          </div>
        </div>

        {/* BACK — the client engagement that proves it */}
        <div className="proof-face proof-back">
          <div className="proof-tags">
            <span>{item.n} / {TOTAL}</span>
            <span>{c.industry}</span>
          </div>
          <div className="proof-back-bottom">
            <div className="proof-back-eyebrow">The proof</div>
            <div className="proof-back-client">{c.client}</div>
            <div className="proof-back-sub">{c.result}</div>
            <span className="proof-readmore">
              Read more <span aria-hidden="true">→</span>
            </span>
          </div>
        </div>
      </div>
    </a>
  );
}

function SectionHead() {
  return (
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
        <div className="work-intro">
          The ideas we publish on — and the client behind each one. Hover a
          headline to see the proof; the rest lives under NDA.
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
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

  const isMobile = vw < 760;

  // ── Mobile — native swipe carousel ─────────────────────────────
  if (isMobile) {
    const cardWidth = Math.min(vw - 48, 420);
    return (
      <section className="projects" id="projects">
        <div style={{ padding: '72px 20px 0' }}>
          <SectionHead />
        </div>
        <div className="work-scroller">
          {FEATURED.map((item) => (
            <ProofCard key={item.slug} item={item} width={cardWidth} />
          ))}
        </div>
        <BrandsMarquee logos={LOGOS} />
      </section>
    );
  }

  // ── Desktop — pinned, scroll-driven deck ───────────────────────
  const cardWidth = Math.min(640, Math.max(460, vw - 300));
  const gap = 28;
  const totalTrackWidth = FEATURED.length * (cardWidth + gap) - gap;
  const maxTranslate = Math.max(0, totalTrackWidth - vw + 32 + 96);
  const translateX = -progress * maxTranslate;
  const triggerHeight = vh + maxTranslate + 200;

  return (
    <section className="projects" id="projects" style={{ overflow: 'visible' }}>
      <div ref={triggerRef} style={{ height: triggerHeight, position: 'relative' }}>
        <div style={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
        }}>
          <div style={{ padding: 'clamp(36px, 5vh, 68px) 32px 0' }}>
            <SectionHead />
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
                paddingRight: 96,
                transform: `translate3d(${translateX}px, 0, 0)`,
                willChange: 'transform',
              }}
            >
              {FEATURED.map((item) => (
                <ProofCard key={item.slug} item={item} width={cardWidth} />
              ))}
            </div>

            <div className="work-progress">
              <div className="work-progress-bar" style={{ width: `${progress * 100}%` }} />
            </div>
          </div>
        </div>
      </div>

      <BrandsMarquee logos={LOGOS} />
    </section>
  );
}

/* ── Brands in orbit — 4 rows, self-running marquee ───────────
   Rows alternate direction (rows 1,3 = L→R; rows 2,4 = R→L) and scroll
   continuously on their own via a CSS keyframe animation — independent
   of page scroll. Each track is duplicated 2× so the −50% loop is
   seamless. Direction, speed, and hover-pause all live in CSS
   (.logos-track in globals.css). */
function BrandsMarquee({ logos }) {
  const ROW_COUNT = 4;

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

  return (
    <div className="logos">
      <div className="logos-label">
        <span className="dot" />
        Brands in orbit
      </div>

      <div className="logos-marquee">
        {rows.map((row, idx) => (
          <div className="logos-row" key={idx}>
            {/* Duplicated 2× so the CSS keyframe loops seamlessly at −50%. */}
            <div className="logos-track">
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
