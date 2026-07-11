'use client';

// The core team. Photos live in /public/team (sourced from the studio deck);
// swap in updated headshots by replacing the file.
const PEOPLE = [
  { name: 'Shruti Veer',     role: 'Founder · Strategy',    photo: '/team/shruti-veer.jpg' },
  { name: 'Palomi Kasliwal', role: 'Brand Creative Lead',   photo: '/team/palomi-kasliwal.jpg' },
  { name: 'Kunjan Bapna',    role: 'Creative Head',         photo: '/team/kunjan-bapna.jpg' },
  { name: 'Tirth Mangukiya', role: 'AI Specialist',         photo: '/team/tirth-mangukiya.jpg' },
];

const STATS = [
  ['05', 'People across the studio'],
  ['100%', 'Senior on every call'],
  ['01', 'Very opinionated founder'],
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
          A five-person studio — a founder and a tight core team. No juniors on
          the phone. No layered account teams.{' '}
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
