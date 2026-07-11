import { notFound } from 'next/navigation';
import { CASES, getCase } from '@/lib/press-data';
import SubHeader from '@/components/SubHeader';

export function generateStaticParams() {
  return CASES.map((c) => ({ slug: c.slug }));
}

export function generateMetadata({ params }) {
  const c = getCase(params.slug);
  if (!c) return {};
  return {
    title: `${c.client} — Case study — The Press Company`,
    description: c.result,
  };
}

export default function CasePage({ params }) {
  const c = getCase(params.slug);
  if (!c) notFound();

  const idx = CASES.findIndex((x) => x.slug === c.slug);
  const total = CASES.length;
  const next = CASES[(idx + 1) % total];

  return (
    <main className="subpage case">
      <SubHeader crumb={`Case — ${String(idx + 1).padStart(2, '0')}/${String(total).padStart(2, '0')}`} />

      {/* ── Hero — pill, title, intro ──────────────────────────── */}
      <section className="case-hero">
        <span className="case-pill">Case study</span>
        <div className="case-hero-grid">
          <div className="case-hero-lead">
            <div className="case-kicker">{c.engagement}</div>
            <h1 className="case-h1">{c.client}</h1>
          </div>
          <div className="case-hero-aside">
            <p className="case-lead">{c.result}</p>
            <div className="case-tags">
              <span className="case-tag">{c.industry}</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Headline metrics ───────────────────────────────────── */}
      {c.metrics.length > 0 && (
        <section className="case-metrics">
          {c.metrics.map((m, i) => (
            <div className="case-metric" key={i}>
              <div className="case-metric-v">{m.v}</div>
              <div className="case-metric-l">{m.l}</div>
            </div>
          ))}
        </section>
      )}

      {/* ── The work — overview, scope, outcomes ───────────────── */}
      <section className="case-content">
        <div className="case-block case-overview">
          <h2 className="case-h2">Overview</h2>
          <p className="case-p">{c.summary}</p>
        </div>

        <div className="case-cols">
          <div className="case-block">
            <h2 className="case-h2">Scope of work</h2>
            <ul className="case-scope">
              {c.scope.map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ul>
          </div>
          <div className="case-block">
            <h2 className="case-h2">What came off the press</h2>
            <ul className="case-outcomes">
              {c.outcomes.map((o, i) => (
                <li key={i}>{o}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── Exhibits — aligned, framed proof ───────────────────── */}
      <section className="case-exhibits">
        <div className="case-exhibits-head">
          <span className="case-eyebrow">Exhibits</span>
          <span className="case-eyebrow-note">Proof, straight from the engagement</span>
        </div>
        <div className="case-gallery">
          {c.exhibits.map((ex, i) => (
            <figure className="case-shot" key={i}>
              <div className="case-shot-frame">
                <img
                  src={ex.src}
                  alt={`${c.client} — ${ex.cap}`}
                  width={ex.w}
                  height={ex.h}
                  loading="lazy"
                />
              </div>
              <figcaption>
                <span className="case-shot-num">{String(i + 1).padStart(2, '0')}</span>
                <span>{ex.cap}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* ── CTA band ───────────────────────────────────────────── */}
      <section className="case-cta">
        <div className="case-cta-text">Want a run like this for your brand?</div>
        <a href="/#contact" className="cta">
          <span className="cta-dot" />
          <span className="cta-label">Let&apos;s talk</span>
        </a>
      </section>

      {/* ── Next case ──────────────────────────────────────────── */}
      <a href={`/work/${next.slug}`} className="xp-next">
        <div className="xp-next-label">
          Next case — {String(((idx + 1) % total) + 1).padStart(2, '0')}/{String(total).padStart(2, '0')}
        </div>
        <div className="xp-next-name">
          {next.client} <span className="arrow-big">→</span>
        </div>
      </a>

      <footer className="subfooter">
        <span>© MMXXVI — The Press Company</span>
        <a href="/#top">Back to the homepage ↑</a>
      </footer>
    </main>
  );
}
