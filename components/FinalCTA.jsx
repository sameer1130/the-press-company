'use client';

import { useEffect, useRef, useState } from 'react';

export default function FinalCTA() {
  const [data, setData] = useState({ name: '', email: '', brief: '' });
  const [sent, setSent] = useState(false);
  const starsRef = useRef(null);

  const submit = (e) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 3500);
  };

  useEffect(() => {
    const canvas = starsRef.current;
    if (!canvas) return;
    const draw = () => {
      const rect = canvas.parentElement.getBoundingClientRect();
      canvas.width = rect.width * window.devicePixelRatio;
      canvas.height = rect.height * window.devicePixelRatio;
      const ctx = canvas.getContext('2d');
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
      ctx.clearRect(0, 0, rect.width, rect.height);
      for (let i = 0; i < 500; i++) {
        const x = Math.random() * rect.width;
        const y = Math.random() * rect.height;
        const r = Math.random() * 2;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${0.3 + Math.random() * 0.7})`;
        ctx.fill();
      }
      for (let i = 0; i < 10; i++) {
        const x = Math.random() * rect.width;
        const y = Math.random() * rect.height;
        const r = 1.5 + Math.random() * 2;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,74,28,${0.5 + Math.random() * 0.5})`;
        ctx.fill();
        const grad = ctx.createRadialGradient(x, y, 0, x, y, r * 6);
        grad.addColorStop(0, 'rgba(255,74,28,0.25)');
        grad.addColorStop(1, 'transparent');
        ctx.beginPath();
        ctx.arc(x, y, r * 6, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();
      }
      for (let i = 0; i < 15; i++) {
        const x = Math.random() * rect.width;
        const y = Math.random() * rect.height;
        const r = 2 + Math.random() * 1.5;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255,255,255,0.95)';
        ctx.fill();
        const grad = ctx.createRadialGradient(x, y, 0, x, y, r * 5);
        grad.addColorStop(0, 'rgba(255,255,255,0.3)');
        grad.addColorStop(1, 'transparent');
        ctx.beginPath();
        ctx.arc(x, y, r * 5, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();
      }
    };
    draw();
    window.addEventListener('resize', draw);
    return () => window.removeEventListener('resize', draw);
  }, []);

  return (
    <>
      <section className="final" id="contact" style={{ position: 'relative' }}>
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: `
            radial-gradient(ellipse at 30% 40%, rgba(78,30,11,0.12), transparent 50%),
            radial-gradient(ellipse at 70% 60%, rgba(255,74,28,0.06), transparent 40%),
            radial-gradient(ellipse at 50% 20%, rgba(100,50,20,0.08), transparent 50%)
          `,
        }} />
        <canvas ref={starsRef} style={{
          position: 'absolute', inset: 0, width: '100%', height: '100%',
          pointerEvents: 'none', opacity: 0.85,
        }} />
        <div className="final-eyebrow">— Section 07 — Enquire</div>
        <h2>
          Let&apos;s <em>press</em><br />
          something good.
        </h2>

        {sent ? (
          <div style={{
            maxWidth: 520, margin: '0 auto',
            fontFamily: 'Instrument Serif, serif', fontSize: 22, fontStyle: 'italic',
            padding: 40, border: '1px solid rgba(242,238,229,0.2)',
          }}>
            Thanks, {data.name || 'friend'}. We&apos;ll be back in your inbox within
            two working days.
          </div>
        ) : (
          <form className="final-form" onSubmit={submit}>
            <input
              className="final-input"
              placeholder="Your name"
              value={data.name}
              onChange={(e) => setData({ ...data, name: e.target.value })}
            />
            <input
              className="final-input"
              placeholder="Your email"
              type="email"
              value={data.email}
              onChange={(e) => setData({ ...data, email: e.target.value })}
            />
            <input
              className="final-input"
              placeholder="The problem, in a sentence"
              value={data.brief}
              onChange={(e) => setData({ ...data, brief: e.target.value })}
            />
            <button type="submit" className="final-cta-big">
              Send it in
              <span className="arrow-big">→</span>
            </button>
          </form>
        )}

        <div style={{
          marginTop: 80, display: 'flex', justifyContent: 'center', gap: 60, flexWrap: 'wrap',
          fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.2em',
          textTransform: 'uppercase', opacity: 0.6,
        }}>
          <div>hello@thepress.co</div>
          <div>+91 22 3555 7788</div>
          <div>— Mumbai · Remote</div>
        </div>
      </section>

      <footer className="footer">
        <div className="footer-top">
          <div>
            <div className="footer-brand">
              {'{ Press }'}<br />
              <em>Company.</em>
            </div>
            <div style={{ marginTop: 30, fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', opacity: 0.5 }}>
              A strategy studio · since 2024
            </div>
          </div>
          <div className="footer-col">
            <h5>Sitemap</h5>
            <a href="#top">Home</a>
            <a href="#who">About</a>
            <a href="#press">Expertise</a>
            <a href="#projects">Case Studies</a>
            <a href="#contact">Enquire</a>
          </div>
          <div className="footer-col">
            <h5>Elsewhere</h5>
            <a href="#">LinkedIn</a>
            <a href="#">Instagram</a>
            <a href="#">Medium</a>
            <a href="#">Are.na</a>
          </div>
          <div className="footer-col">
            <h5>Legal</h5>
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
            <a href="#">Careers</a>
            <a href="#">Media kit</a>
          </div>
        </div>
        <div className="footer-bottom">
          <div>© MMXXVI — The Press Company Pvt. Ltd.</div>
          <div>— Pressed in Bombay —</div>
          <div>VOL. I · ISSUE 01</div>
        </div>
      </footer>
    </>
  );
}
