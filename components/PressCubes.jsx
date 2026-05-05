'use client';

const PRESS_DATA = [
  { letter: 'P', word: 'Positioning', desc: 'The one true sentence your brand can defend in any room.', num: '01' },
  { letter: 'R', word: 'Research', desc: 'Category mapping, audience immersion, competitive teardown.', num: '02' },
  { letter: 'E', word: 'Expression', desc: 'Identity, verbal system, visual language — built around the strategy.', num: '03' },
  { letter: 'S', word: 'Storytelling', desc: 'Narrative architecture, content, the arc of a launch.', num: '04' },
  { letter: 'S', word: 'Scale', desc: 'Go-to-market, performance loops, the mechanics of growth.', num: '05' },
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
