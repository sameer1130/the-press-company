'use client';

const PRESS_DATA = [
  { letter: 'P', word: 'Position', desc: 'Build how the world sees you.', num: '01' },
  { letter: 'R', word: 'Relevance', desc: 'Helping brands stay culturally and digitally relevant.', num: '02' },
  { letter: 'E', word: 'Engagement', desc: 'How people interact and connect with your brand.', num: '03' },
  { letter: 'S', word: 'Scale', desc: 'Turn visibility into business growth.', num: '04' },
  { letter: 'S', word: 'Systems', desc: 'Build marketing that runs with consistency.', num: '05' },
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
          <div className="press-intro" style={{ marginTop: 30, color: 'var(--paper)', opacity: 0.7 }}>
            Hover a sort to turn the plate. Each vertical is a standalone engagement —
            or a piece of a fuller brand reset.
          </div>
        </div>
      </div>

      <div className="press-grid">
        {PRESS_DATA.map((d, i) => (
          <div key={i} className="press-cube" role="button" tabIndex={0}>
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
                <div className="meta" style={{ color: 'var(--ink)' }}>
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
          </div>
        ))}
      </div>
    </section>
  );
}
