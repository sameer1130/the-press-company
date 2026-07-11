// Light header for interior pages (expertise / work). Ink-on-paper, no
// menu cube — just the mark home-link and the standing CTA.
export default function SubHeader({ crumb }) {
  return (
    <header className="subheader">
      <a href="/" className="logo subheader-logo" aria-label="The Press Company — home">
        <div className="logo-mark subheader-mark" />
        <div className="lockup lockup-oneline">
          <span className="press-word">PRESS</span>
          <span className="press-sep">·</span>
          <span className="press-est">EST. 2024</span>
        </div>
      </a>

      {crumb && <div className="subheader-crumb">{crumb}</div>}

      <div className="subheader-right">
        <a href="/#top" className="subheader-back">← Back home</a>
        <a href="/#contact" className="cta">
          <span className="cta-dot" />
          <span className="cta-label">Let&apos;s talk</span>
        </a>
      </div>
    </header>
  );
}
