'use client';

import { useEffect, useState } from 'react';

export function Header({ onOpenMenu, menuOpen }) {
  const [clock, setClock] = useState('');

  useEffect(() => {
    const update = () => {
      const d = new Date();
      const h = String(d.getHours()).padStart(2, '0');
      const m = String(d.getMinutes()).padStart(2, '0');
      setClock(`${h}:${m} IST`);
    };
    update();
    const id = setInterval(update, 10000);
    return () => clearInterval(id);
  }, []);

  return (
    <header className="header">
      <a href="#top" className="logo" aria-label="The Press Company">
        <div className="logo-mark">
          <div className="logo-mark-circle" />
        </div>
        <div className="lockup lockup-oneline">
          <span className="press-word">PRESS</span>
          <span className="press-sep">·</span>
          <span className="press-est">EST. 2024</span>
        </div>
      </a>

      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <div style={{
          fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.2em',
          color: 'var(--paper)', opacity: 0.7, textTransform: 'uppercase',
        }}>
          {clock} · MUMBAI
        </div>

        <a href="#contact" className="cta">
          <span className="cta-dot" />
          <span className="cta-label">Let&apos;s talk</span>
        </a>

        <div
          className={`nav-cube ${menuOpen ? 'open' : ''}`}
          onClick={onOpenMenu}
          role="button"
          aria-label="Open menu"
        >
          <div className="nav-cube-inner">
            <div className="nav-cube-face front">
              <div className="nav-cube-lines"><span /><span /><span /></div>
            </div>
            <div className="nav-cube-face top">
              <div className="nav-cube-lines"><span /><span /><span /></div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export function SideMenu({ open, onClose }) {
  const items = [
    { n: '01', label: 'Home', href: '#top' },
    { n: '02', label: 'About', href: '#who' },
    { n: '03', label: 'Expertise', href: '#press' },
    { n: '04', label: 'Case Studies', href: '#projects' },
    { n: '05', label: 'Enquire', href: '#contact' },
  ];
  return (
    <nav className={`sidemenu ${open ? 'open' : ''}`} aria-hidden={!open}>
      <div className="sidemenu-meta">
        <div>
          <h4>The Press Company</h4>
          <p>
            A strategy studio for brands worth building. We work with founders and
            marketing leaders to find the sharp edge of a brand — and press it.
          </p>
          <div className="contact-block">
            <a href="mailto:hello@thepress.co">hello@thepress.co</a>
            <a href="tel:+912235557788">+91 22 3555 7788</a>
          </div>
        </div>
        <div className="foot">© MMXXVI — Bombay / Remote</div>
      </div>

      <div className="sidemenu-nav">
        <div
          className="sidemenu-close cta"
          onClick={onClose}
          style={{ cursor: 'pointer', background: 'transparent', color: 'var(--paper)', border: '1px solid rgba(242,238,229,0.3)' }}
        >
          <span className="cta-dot" />
          <span className="cta-label">Close</span>
        </div>
        {items.map((it) => (
          <a key={it.n} href={it.href} onClick={onClose}>
            <span className="num">{it.n}</span>
            <span className="label">{it.label}</span>
          </a>
        ))}
      </div>
    </nav>
  );
}
