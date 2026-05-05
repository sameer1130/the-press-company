'use client';

const PEOPLE = [
  { name: 'A. Mehra', role: 'Founder / Strategy', tx: '-20px', ty: '0', r: '-4deg' },
  { name: 'S. Iyer', role: 'Partner / Narrative', tx: '200px', ty: '40px', r: '3deg' },
  { name: 'R. Das', role: 'Creative Director', tx: '80px', ty: '180px', r: '-2deg' },
  { name: 'N. Kapoor', role: 'Research Lead', tx: '340px', ty: '160px', r: '5deg' },
];

export default function People() {
  return (
    <section className="people" id="people">
      <div className="section-head">
        <div className="section-num">
          <div className="dot" />
          <div>SECTION 06</div>
          <div>— OUR PEOPLE</div>
        </div>
        <div>
          <h2 className="section-title">
            Small team. <em>Senior</em> minds.
          </h2>
        </div>
      </div>

      <div className="people-grid">
        <div>
          <div className="people-lead">
            Four strategists, three researchers, one very opinionated founder.
            No juniors on the phone. No layered account teams. <em>You get the
              people who sold you the work</em>, actually doing the work.
          </div>
          <div style={{
            marginTop: 50, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 24, maxWidth: 620,
          }}>
            {[
              ['12', 'years average experience'],
              ['08', 'people, no more'],
              ['01', 'senior on every call'],
            ].map(([n, l], i) => (
              <div key={i} style={{ borderTop: '1px solid var(--rule)', paddingTop: 16 }}>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 48, letterSpacing: '-0.03em' }}>{n}</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase', opacity: 0.6, marginTop: 6 }}>
                  {l}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="polaroid-stack">
          {PEOPLE.map((p, i) => (
            <div
              key={i}
              className="polaroid"
              style={{
                '--tx': p.tx,
                '--ty': p.ty,
                '--r': p.r,
                left: p.tx,
                top: p.ty,
                transform: `rotate(${p.r})`,
                zIndex: i,
              }}
            >
              <div className="polaroid-frame">
                <span className="ph-label">[ PORTRAIT — {p.name.toUpperCase()} ]</span>
              </div>
              <div className="polaroid-caption">
                <span>{p.name}</span>
                <span className="role">{p.role}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
