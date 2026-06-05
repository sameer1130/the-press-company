'use client';

// 12 members — matches the section narrative ("Small team. Senior minds.")
// and the 6×2 layout from the reference image. Each `photo` is a stable
// Pravatar URL (seeded by `u`); swap for real headshots when ready by
// replacing the URL — the markup and styling don't change.
const PEOPLE = [
  { name: 'A. Mehra',    role: 'Founder · Strategy',     photo: 'https://i.pravatar.cc/240?u=tpc-am-2026' },
  { name: 'S. Iyer',     role: 'Partner · Narrative',    photo: 'https://i.pravatar.cc/240?u=tpc-si-2026' },
  { name: 'R. Das',      role: 'Creative Director',      photo: 'https://i.pravatar.cc/240?u=tpc-rd-2026' },
  { name: 'N. Kapoor',   role: 'Research Lead',          photo: 'https://i.pravatar.cc/240?u=tpc-nk-2026' },
  { name: 'K. Shah',     role: 'Brand Strategist',       photo: 'https://i.pravatar.cc/240?u=tpc-ks-2026' },
  { name: 'V. Joshi',    role: 'Senior Strategist',      photo: 'https://i.pravatar.cc/240?u=tpc-vj-2026' },
  { name: 'P. Rao',      role: 'Content Lead',           photo: 'https://i.pravatar.cc/240?u=tpc-pr-2026' },
  { name: 'M. Banerjee', role: 'Identity Designer',      photo: 'https://i.pravatar.cc/240?u=tpc-mb-2026' },
  { name: 'A. Khanna',   role: 'Verbal Director',        photo: 'https://i.pravatar.cc/240?u=tpc-ak-2026' },
  { name: 'T. Menon',    role: 'Senior Researcher',      photo: 'https://i.pravatar.cc/240?u=tpc-tm-2026' },
  { name: 'D. Pillai',   role: 'Performance Lead',       photo: 'https://i.pravatar.cc/240?u=tpc-dp-2026' },
  { name: 'R. Singh',    role: 'Brand Engineer',         photo: 'https://i.pravatar.cc/240?u=tpc-rs-2026' },
];

const STATS = [
  ['12', 'Years average experience'],
  ['12', 'People across the studio'],
  ['01', 'Senior on every call'],
];

function initials(name) {
  return name
    .split(/[\s.]+/)
    .filter(Boolean)
    .map((p) => p[0].toUpperCase())
    .slice(0, 2)
    .join('');
}

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

      <div className="people-intro">
        <div className="people-lead">
          Four strategists, three researchers, one very opinionated founder.
          No juniors on the phone. No layered account teams.{' '}
          <em>You get the people who sold you the work</em>, actually doing
          the work.
        </div>
        <div className="people-stats">
          {STATS.map(([n, l], i) => (
            <div key={i} className="people-stat">
              <div className="people-stat-num">{n}</div>
              <div className="people-stat-label">{l}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="people-grid">
        {PEOPLE.map((p, i) => (
          <div key={i} className="person-card">
            <div className="person-avatar">
              {p.photo ? (
                <img src={p.photo} alt={p.name} loading="lazy" />
              ) : (
                <span>{initials(p.name)}</span>
              )}
            </div>
            <div className="person-name">{p.name}</div>
            <div className="person-role">{p.role}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
