'use client';

// The core team. Photos live in /public/team (sourced from the studio deck);
// swap in updated headshots by replacing the file.
const PEOPLE = [
  { name: 'Shruti Veer',     role: 'Founder · Strategy',    photo: '/team/shruti-veer.jpg' },
  { name: 'Palomi Kasliwal', role: 'Brand Creative Lead',   photo: '/team/palomi-kasliwal.jpg' },
  { name: 'Kunjan Bapna',    role: 'Creative Head',         photo: '/team/kunjan-bapna.jpg' },
  { name: 'Tirth Mangukiya', role: 'AI Specialist',         photo: '/team/tirth-mangukiya.jpg' },
];

// Affiliated members — associates and partners who collaborate with the studio
// on engagements. Same shape as PEOPLE; `photo` is optional and falls back to
// initials. Drop headshots into /public/team (or /public/partners) and add an
// entry below. The "Collaborators & Partners" sub-group only renders when this
// array is non-empty.
// TODO: PLACEHOLDERS — replace name/role with the real affiliated members and
// add a `photo: '/team/<file>.jpg'` per person (falls back to initials for now).
const PARTNERS = [
  { name: 'Affiliate A', role: 'Content & Copy' },
  { name: 'Affiliate B', role: 'Performance Marketing' },
  { name: 'Affiliate C', role: 'Photography & Film' },
  { name: 'Affiliate D', role: 'Web & Development' },
  { name: 'Affiliate E', role: 'PR & Outreach' },
];

const STATS = [
  ['04', 'People across the studio'],
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
          A four-person studio — a founder and a tight core team. No juniors on
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

      {PARTNERS.length > 0 && (
        <div className="people-partners">
          <div className="people-subhead">
            <span className="people-subhead-line" />
            <span className="people-subhead-label">Collaborators &amp; Partners</span>
            <span className="people-subhead-line" />
          </div>
          <div className="people-grid people-grid--partners">
            {PARTNERS.map((p, i) => (
              <div key={i} className="person-card person-card--partner">
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
        </div>
      )}
    </section>
  );
}
