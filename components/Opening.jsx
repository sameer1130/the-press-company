'use client';

import { useEffect, useState } from 'react';
import { RegMark } from './Icons';

export default function Opening({ onDone }) {
  const [phase, setPhase] = useState(0);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 200),
      setTimeout(() => setPhase(2), 1400),
      setTimeout(() => setPhase(3), 2800),
      setTimeout(() => { setGone(true); onDone && onDone(); }, 3800),
    ];
    return () => timers.forEach(clearTimeout);
  }, [onDone]);

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 9999,
      background: 'var(--ink)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      overflow: 'hidden',
      transform: phase >= 3 ? 'translateY(-100%)' : 'translateY(0)',
      transition: phase >= 3 ? 'transform 1s cubic-bezier(0.85, 0, 0.15, 1)' : 'none',
      pointerEvents: gone ? 'none' : 'auto',
      opacity: gone ? 0 : 1,
    }}>
      <div style={{ position: 'absolute', top: 40, left: 40, opacity: phase >= 1 ? 1 : 0, transition: 'opacity 0.4s' }}>
        <RegMark size={28} color="var(--paper)" />
      </div>
      <div style={{ position: 'absolute', top: 40, right: 40, opacity: phase >= 1 ? 1 : 0, transition: 'opacity 0.4s 0.1s' }}>
        <RegMark size={28} color="var(--paper)" />
      </div>
      <div style={{ position: 'absolute', bottom: 40, left: 40, opacity: phase >= 1 ? 1 : 0, transition: 'opacity 0.4s 0.2s' }}>
        <RegMark size={28} color="var(--paper)" />
      </div>
      <div style={{ position: 'absolute', bottom: 40, right: 40, opacity: phase >= 1 ? 1 : 0, transition: 'opacity 0.4s 0.3s' }}>
        <RegMark size={28} color="var(--paper)" />
      </div>

      <div style={{
        position: 'absolute', top: 48, left: '50%', transform: 'translateX(-50%)',
        fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.16em',
        color: 'var(--paper)', opacity: phase >= 1 ? 0.5 : 0,
        transition: 'opacity 0.4s 0.2s', textTransform: 'uppercase',
      }}>
        VOL. I · ISSUE 01 · EST. MMXXIV
      </div>

      <div style={{
        position: 'absolute', bottom: 48, left: '50%', transform: 'translateX(-50%)',
        fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.16em',
        color: 'var(--paper)', opacity: phase >= 1 ? 0.4 : 0,
        transition: 'opacity 0.5s 0.4s', textTransform: 'uppercase',
      }}>
        — LOADING THE PLATE —
      </div>

      <div style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 0,
      }}>
        <div style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 900,
          fontSize: 'clamp(200px, 45vw, 600px)',
          lineHeight: 0.82,
          letterSpacing: '-0.05em',
          color: 'var(--paper)',
          transform: phase === 0
            ? 'translateY(-120vh) scaleY(1.4)'
            : phase === 1
              ? 'translateY(0) scaleY(1)'
              : 'translateY(0) scaleY(1) scale(0.35)',
          transformOrigin: 'center center',
          transition: phase === 1
            ? 'transform 0.7s cubic-bezier(0.22, 1, 0.36, 1)'
            : phase >= 2
              ? 'transform 0.8s cubic-bezier(0.85, 0, 0.15, 1)'
              : 'none',
          position: 'relative',
          zIndex: 2,
        }}>
          P
        </div>

        <div style={{
          position: 'absolute',
          top: '50%', left: '50%',
          width: phase >= 1 ? '120%' : '0%',
          height: phase >= 1 ? '120%' : '0%',
          transform: 'translate(-50%, -50%)',
          border: '2px solid var(--accent)',
          borderRadius: '50%',
          opacity: phase === 1 ? 0.6 : 0,
          transition: phase === 1
            ? 'width 0.5s 0.5s, height 0.5s 0.5s, opacity 0.6s 0.8s'
            : 'opacity 0.3s',
          pointerEvents: 'none',
        }} />

        <div style={{
          width: phase >= 2 ? '340px' : '0px',
          height: 1,
          background: 'var(--accent)',
          transition: 'width 0.5s 0.2s cubic-bezier(0.85, 0, 0.15, 1)',
          marginTop: phase >= 2 ? -20 : 0,
          position: 'relative',
          zIndex: 3,
        }} />

        <div style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 900,
          fontSize: 'clamp(28px, 4vw, 56px)',
          letterSpacing: '-0.03em',
          color: 'var(--paper)',
          opacity: phase >= 2 ? 1 : 0,
          transform: phase >= 2 ? 'translateY(0)' : 'translateY(30px)',
          transition: 'opacity 0.6s 0.4s, transform 0.6s 0.4s cubic-bezier(0.22, 1, 0.36, 1)',
          marginTop: 12,
          position: 'relative',
          zIndex: 3,
          whiteSpace: 'nowrap',
        }}>
          <span style={{ color: 'var(--accent)' }}>{'{'}</span>
          {' '}Press Company{' '}
          <span style={{ color: 'var(--accent)' }}>{'}'}</span>
        </div>

        <div style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 10,
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          color: 'var(--paper)',
          opacity: phase >= 2 ? 0.5 : 0,
          transform: phase >= 2 ? 'translateY(0)' : 'translateY(20px)',
          transition: 'opacity 0.5s 0.6s, transform 0.5s 0.6s',
          marginTop: 10,
          position: 'relative',
          zIndex: 3,
        }}>
          Strategy studio · Bombay
        </div>
      </div>

      <div style={{
        position: 'absolute',
        left: 0, right: 0,
        height: 2,
        background: 'var(--accent)',
        top: phase === 0 ? '-4px' : phase === 1 ? '50%' : '100%',
        transition: phase === 1
          ? 'top 0.6s 0.1s cubic-bezier(0.22, 1, 0.36, 1)'
          : phase >= 2
            ? 'top 0.8s cubic-bezier(0.85, 0, 0.15, 1)'
            : 'none',
        opacity: phase >= 3 ? 0 : 0.8,
      }} />
    </div>
  );
}
