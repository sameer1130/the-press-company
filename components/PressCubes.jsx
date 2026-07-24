'use client';

// The five P.R.E.S.S. verticals — names and promises from the sitemap.
// Each cube links to its dedicated expertise page.
const PRESS_DATA = [
  { letter: 'P', word: 'Presence & Branding', desc: 'Build a brand people notice, trust, and remember.', num: '01', slug: 'presence' },
  { letter: 'R', word: 'Reach Engineering', desc: 'Get your brand in front of the right audience, consistently.', num: '02', slug: 'reach' },
  { letter: 'E', word: 'Experience & Engagement', desc: 'Create experiences that turn buyers into advocates.', num: '03', slug: 'experience' },
  { letter: 'S', word: 'Strategic Marketing Systems', desc: 'Marketing backed by data, not guesswork.', num: '04', slug: 'systems' },
  { letter: 'S', word: 'Storytelling & Social', desc: 'Content that captures attention and drives results.', num: '05', slug: 'storytelling' },
];

export default function PressCubes() {
  return (
    <section className="press-sec" id="press">
      <div className="section-head">
        <div className="section-num">
          <div className="dot" />
          <div>SECTION 03</div>
          <div>— EXPERTISE</div>
        </div>
        <div>
          <h2 className="section-title">
            Five letters.<br />
            Five <em>verticals.</em><br />
            One press.
          </h2>
          <div className="press-intro" style={{ marginTop: 30, color: 'var(--paper-text)', opacity: 0.7 }}>
            Hover a sort to turn the plate; click through for the full vertical —
            every service, and the client proof behind it.
          </div>
        </div>
      </div>

      <div className="press-grid">
        {PRESS_DATA.map((d, i) => (
          <a key={i} href={`/expertise/${d.slug}`} className="press-cube" aria-label={`${d.word} — explore the vertical`}>
            <div className="press-cube-inner">
              <div className="press-cube-face front">
                <div className="meta">
                  <span>{d.num}</span>
                  <span>— PRESS</span>
                </div>
                <div className="letter">{d.letter}</div>
                <div className="meta">
                  <span>SORT Nº</span>
                  <span>{d.num}/05</span>
                </div>
              </div>
              <div className="press-cube-face top">
                <div className="meta" style={{ color: 'var(--accent-ink)' }}>
                  <span>{d.num}</span>
                  <span>— {d.letter}</span>
                </div>
                <div>
                  <div className="word">{d.word}</div>
                  <div className="desc">{d.desc}</div>
                </div>
                <div className="arrow">
                  <span>Explore</span>
                  <span>→</span>
                </div>
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
