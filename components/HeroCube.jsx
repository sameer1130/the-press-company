'use client';

import { useEffect, useRef, useState } from 'react';

export default function HeroCube() {
  const containerRef = useRef(null);
  const innerRef = useRef(null);
  const [halfPx, setHalfPx] = useState(240);
  const phaseRef = useRef(0);
  const [ready, setReady] = useState(false);
  const rafRef = useRef(null);
  const startTime = useRef(null);
  const mouseTarget = useRef({ rx: 0, ry: 0 });
  const currentTilt = useRef({ rx: 0, ry: 0 });

  useEffect(() => {
    const measure = () => {
      if (containerRef.current) {
        const w = containerRef.current.offsetWidth;
        if (w > 0) setHalfPx(w / 2);
      }
    };
    measure();
    const t = setTimeout(measure, 100);
    window.addEventListener('resize', measure);
    return () => { window.removeEventListener('resize', measure); clearTimeout(t); };
  }, []);

  useEffect(() => {
    const onMove = (e) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const nx = (e.clientX - cx) / (window.innerWidth / 2);
      const ny = (e.clientY - cy) / (window.innerHeight / 2);
      mouseTarget.current = { rx: -ny * 15, ry: nx * 15 };
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  useEffect(() => {
    if (!ready) return;

    const SPIN_DURATION = 4500;
    const SPIN_ROTATIONS = 3;
    startTime.current = performance.now();

    const animate = (now) => {
      const elapsed = now - startTime.current;

      if (phaseRef.current === 0) {
        const t = Math.min(elapsed / SPIN_DURATION, 1);
        const ease = 1 - Math.pow(1 - t, 3);
        const ry = ease * SPIN_ROTATIONS * 360;
        const rx = Math.sin(t * Math.PI) * 18;
        const s = 0.7 + ease * 0.3;

        if (innerRef.current) {
          innerRef.current.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg) scale(${s})`;
        }

        if (t >= 1) {
          phaseRef.current = 1;
          window.dispatchEvent(new CustomEvent('cube-settled'));
        }
      } else {
        const lerp = 0.06;
        currentTilt.current.rx += (mouseTarget.current.rx - currentTilt.current.rx) * lerp;
        currentTilt.current.ry += (mouseTarget.current.ry - currentTilt.current.ry) * lerp;

        if (innerRef.current) {
          innerRef.current.style.transform = `rotateX(${currentTilt.current.rx}deg) rotateY(${currentTilt.current.ry}deg)`;
        }
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [ready]);

  useEffect(() => {
    const t = setTimeout(() => setReady(true), 3400);
    return () => clearTimeout(t);
  }, []);

  const h = halfPx;

  // Brand monogram (same masked mark as the header/footer logo), tintable
  // per face so it reads on either the dark or accent-coloured faces.
  const logoMark = (size, color) => ({
    width: size,
    height: size,
    backgroundColor: color,
    WebkitMask: "url('/logo-mask.png') center / contain no-repeat",
    mask: "url('/logo-mask.png') center / contain no-repeat",
  });

  const faceBase = {
    position: 'absolute',
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    backfaceVisibility: 'visible',
  };

  return (
    <div
      ref={containerRef}
      style={{
        position: 'relative',
        width: 'min(42vw, 480px)',
        height: 'min(42vw, 480px)',
        perspective: 1400,
        perspectiveOrigin: '50% 50%',
        margin: '0 auto',
        flexShrink: 0,
      }}
    >
      <div
        ref={innerRef}
        style={{
          width: '100%',
          height: '100%',
          position: 'relative',
          transformStyle: 'preserve-3d',
          opacity: ready ? 1 : 0,
          transition: 'opacity 0.4s',
        }}
      >
        <div style={{
          ...faceBase,
          background: 'var(--accent)',
          color: 'var(--ink)',
          transform: `translateZ(${h}px)`,
          gap: 12,
        }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 'clamp(10px, 1.2vw, 14px)', letterSpacing: '0.2em', opacity: 0.6, textTransform: 'uppercase' }}>The</div>
          <div style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 'clamp(60px, 10vw, 140px)', letterSpacing: '-0.05em', lineHeight: 0.85 }}>PRESS</div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 'clamp(10px, 1.2vw, 14px)', letterSpacing: '0.2em', opacity: 0.6, textTransform: 'uppercase' }}>Company</div>
        </div>

        <div style={{
          ...faceBase,
          background: 'var(--ink)',
          color: 'var(--paper-text)',
          transform: `rotateY(180deg) translateZ(${h}px)`,
          gap: 8,
          border: '1px solid rgba(242,238,229,0.15)',
        }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 'clamp(9px, 1vw, 12px)', letterSpacing: '0.22em', opacity: 0.5, textTransform: 'uppercase' }}>Strategy Studio</div>
          <div aria-hidden="true" style={logoMark('clamp(70px, 11vw, 140px)', 'var(--paper)')} />
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 'clamp(9px, 1vw, 12px)', letterSpacing: '0.22em', opacity: 0.5, textTransform: 'uppercase' }}>Est. 2024 · Bombay</div>
        </div>

        <div style={{
          ...faceBase,
          background: 'var(--paper)',
          color: 'var(--ink)',
          transform: `rotateY(90deg) translateZ(${h}px)`,
          padding: '10%',
          alignItems: 'flex-start',
          justifyContent: 'flex-end',
          gap: 16,
        }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 'clamp(8px, 0.9vw, 11px)', letterSpacing: '0.2em', textTransform: 'uppercase', opacity: 0.6 }}>
            <span style={{ display: 'inline-block', width: 8, height: 8, background: 'var(--accent)', borderRadius: '50%', marginRight: 8, verticalAlign: 'middle' }} />
            What we do
          </div>
          <div style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 'clamp(24px, 4vw, 52px)', letterSpacing: '-0.04em', lineHeight: 0.95 }}>
            Positioning.<br />Research.<br />Expression.<br />Storytelling.<br />Scale.
          </div>
        </div>

        <div style={{
          ...faceBase,
          background: 'var(--ink)',
          color: 'var(--paper-text)',
          transform: `rotateY(-90deg) translateZ(${h}px)`,
          padding: '10%',
          alignItems: 'flex-start',
          justifyContent: 'center',
          gap: 20,
          border: '1px solid rgba(242,238,229,0.12)',
        }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 'clamp(8px, 0.9vw, 11px)', letterSpacing: '0.2em', textTransform: 'uppercase', opacity: 0.5 }}>Who we are</div>
          <div style={{ fontFamily: 'Instrument Serif, serif', fontStyle: 'italic', fontSize: 'clamp(18px, 2.5vw, 30px)', lineHeight: 1.35, opacity: 0.9 }}>
            We find the one true sentence your brand can defend — then we build every decision around it.
          </div>
          <div style={{ width: 40, height: 1, background: 'var(--accent)' }} />
        </div>

        <div style={{
          ...faceBase,
          background: 'var(--accent)',
          color: 'var(--ink)',
          transform: `rotateX(90deg) translateZ(${h}px)`,
        }}>
          <div aria-hidden="true" style={logoMark('clamp(56px, 9vw, 120px)', 'var(--ink)')} />
        </div>

        <div style={{
          ...faceBase,
          background: 'var(--paper)',
          color: 'var(--ink)',
          transform: `rotateX(-90deg) translateZ(${h}px)`,
        }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 'clamp(8px, 1vw, 11px)', letterSpacing: '0.22em', textTransform: 'uppercase', opacity: 0.6 }}>
            Scroll to explore
          </div>
        </div>
      </div>
    </div>
  );
}
