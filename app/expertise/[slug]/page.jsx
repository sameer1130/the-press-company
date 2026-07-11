import { notFound } from 'next/navigation';
import { PILLARS, ROADMAP, getPillar, getCase } from '@/lib/press-data';
import SubHeader from '@/components/SubHeader';
import EnquiryPanel from '@/components/EnquiryPanel';

export function generateStaticParams() {
  return PILLARS.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }) {
  const pillar = getPillar(params.slug);
  if (!pillar) return {};
  return {
    title: `${pillar.name} — The Press Company`,
    description: pillar.promise,
  };
}

export default function ExpertisePage({ params }) {
  const pillar = getPillar(params.slug);
  if (!pillar) notFound();

  const related = pillar.cases.map(getCase).filter(Boolean);
  const idx = PILLARS.findIndex((p) => p.slug === pillar.slug);
  const next = PILLARS[(idx + 1) % PILLARS.length];

  return (
    <main className="subpage">
      <SubHeader crumb={`Expertise — ${pillar.num}/05`} />

      {/* ── Hero — the sort, set large ─────────────────────────── */}
      <section className="xp-hero">
        <div className="xp-hero-letter" aria-hidden="true">{pillar.letter}</div>
        <div className="xp-hero-body">
          <div className="xp-eyebrow">
            <span className="dot" />
            P.R.E.S.S. — Vertical {pillar.num} of 05
          </div>
          <h1 className="xp-title">{pillar.name}</h1>
          <p className="xp-promise"><em>{pillar.promise}</em></p>
          <p className="xp-intro">{pillar.intro}</p>
        </div>
      </section>

      {/* ── Services — the specimen sheet ──────────────────────── */}
      <section className="xp-services">
        <div className="xp-section-head">
          <div className="xp-section-label">What we take on</div>
          <div className="xp-section-note">
            {pillar.services.length} services · each a standalone engagement or a
            piece of a fuller brand reset
          </div>
        </div>
        <div className="xp-service-grid">
          {pillar.services.map((s, i) => (
            <div className="xp-service" key={i}>
              <div className="xp-service-ref">
                {pillar.letter}·{String(i + 1).padStart(2, '0')}
              </div>
              <div>
                <div className="xp-service-title">{s.t}</div>
                <div className="xp-service-desc">{s.d}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Proof — set in practice ────────────────────────────── */}
      {related.length > 0 && (
        <section className="xp-proof">
          <div className="xp-section-head">
            <div className="xp-section-label">Proof, from the press</div>
            <div className="xp-section-note">
              Client engagements where this vertical did the heavy lifting
            </div>
          </div>
          <div className="xp-proof-grid">
            {related.map((c) => (
              <a href={`/work/${c.slug}`} className="xp-proof-card" key={c.slug}>
                <div className="xp-proof-img">
                  <img
                    src={c.exhibits[0].src}
                    alt={`${c.client} — ${c.exhibits[0].cap}`}
                    loading="lazy"
                  />
                </div>
                <div className="xp-proof-meta">
                  <span>{c.client}</span>
                  <span>{c.industry}</span>
                </div>
                <div className="xp-proof-result">{c.result}</div>
                <div className="xp-proof-link">Read the case →</div>
              </a>
            ))}
          </div>
        </section>
      )}

      {/* ── How the press runs ─────────────────────────────────── */}
      <section className="xp-roadmap">
        <div className="xp-section-head">
          <div className="xp-section-label">How the press runs</div>
          <div className="xp-section-note">The same four passes, every engagement</div>
        </div>
        <div className="xp-roadmap-grid">
          {ROADMAP.map((r, i) => (
            <div className="xp-step" key={i}>
              <div className="xp-step-num">{String(i + 1).padStart(2, '0')}</div>
              <div className="xp-step-title">{r.t}</div>
              <div className="xp-step-desc">{r.d}</div>
            </div>
          ))}
        </div>
      </section>

      <EnquiryPanel context={pillar.name.toLowerCase()} />

      {/* ── Next vertical ──────────────────────────────────────── */}
      <a href={`/expertise/${next.slug}`} className="xp-next">
        <div className="xp-next-label">Next vertical — {next.num}/05</div>
        <div className="xp-next-name">
          {next.name} <span className="arrow-big">→</span>
        </div>
      </a>

      <footer className="subfooter">
        <span>© MMXXVI — The Press Company</span>
        <a href="/#top">Back to the homepage ↑</a>
      </footer>
    </main>
  );
}
