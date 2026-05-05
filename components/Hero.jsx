'use client';

import { useEffect, useState, Fragment } from 'react';
import HeroCube from './HeroCube';

export function Hero() {
  const [settled, setSettled] = useState(false);

  useEffect(() => {
    const onSettled = () => setSettled(true);
    window.addEventListener('cube-settled', onSettled);
    const t = setTimeout(() => setSettled(true), 9000);
    return () => { window.removeEventListener('cube-settled', onSettled); clearTimeout(t); };
  }, []);

  return (
    <section className="hero" id="top" style={{
      background: settled ? 'var(--ink)' : 'var(--paper)',
      color: settled ? 'var(--paper)' : 'var(--ink)',
      transition: 'background 1s ease, color 1s ease',
    }}>
      <div className="hero-meta" style={{
        opacity: settled ? 1 : 0,
        transition: 'opacity 0.8s ease 0.3s',
      }}>
        <div>VOL. I — ISSUE 01</div>
        <div className="divider" />
        <div>THE PRESS COMPANY · HOMEPAGE</div>
        <div className="divider" />
        <div>22.04.2026</div>
      </div>

      <div style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px 0',
        minHeight: 0,
      }}>
        <HeroCube />
      </div>

      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        gap: 40,
        borderTop: settled ? '1px solid rgba(242,238,229,0.15)' : '1px solid transparent',
        paddingTop: 24,
        opacity: settled ? 1 : 0,
        transform: settled ? 'translateY(0)' : 'translateY(20px)',
        transition: 'opacity 0.8s ease 0.3s, transform 0.8s ease 0.3s, border-color 1s ease',
      }}>
        <div style={{
          maxWidth: 400,
          fontSize: 15,
          lineHeight: 1.5,
          opacity: 0.7,
        }}>
          A strategy studio for marketing leaders who are tired of decks
          that read like mood boards. Five verticals. One strategic lens.
        </div>

        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 8,
        }}>
          <div style={{
            fontFamily: 'var(--font-mono)', fontSize: 10,
            letterSpacing: '0.2em', textTransform: 'uppercase', opacity: 0.6,
          }}>
            Scroll to explore
          </div>
          <div className="scroll-line" style={{ width: 1, height: 48 }} />
        </div>

        <div style={{
          textAlign: 'right',
          display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 6,
        }}>
          <div style={{
            fontFamily: 'var(--font-mono)', fontSize: 10,
            letterSpacing: '0.2em', textTransform: 'uppercase', opacity: 0.6,
          }}>
            Established 2024 — Bombay
          </div>
          <div style={{
            fontFamily: 'var(--font-display)', fontWeight: 900,
            fontSize: 56, letterSpacing: '-0.04em', lineHeight: 0.9,
          }}>
            12
          </div>
          <div style={{
            fontFamily: 'var(--font-mono)', fontSize: 10,
            letterSpacing: '0.2em', textTransform: 'uppercase', opacity: 0.6,
          }}>
            Brands in orbit
          </div>
        </div>
      </div>
    </section>
  );
}

export function Ticker() {
  const items = [
    'Strategy', 'Positioning', 'Narrative', 'Identity',
    'Go-to-market', 'Performance', 'Category design', 'Brand systems',
  ];
  const row = (
    <span>
      {items.map((t, i) => (
        <Fragment key={i}>
          <span>{t}</span>
          <span className="star" />
        </Fragment>
      ))}
    </span>
  );
  return (
    <div className="ticker" aria-hidden="true">
      <div className="ticker-track">
        {row}{row}{row}
      </div>
    </div>
  );
}
