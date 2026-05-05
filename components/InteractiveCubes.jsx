'use client';

import { useEffect, useRef } from 'react';

const PARTICLE_COUNT = 200;
const HOVER_RADIUS = 120;

export default function InteractiveCubes() {
  const containerRef = useRef(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const cubesRef = useRef([]);
  const centralRef = useRef(null);
  const centralTiltRef = useRef({ rx: 0, ry: 0 });
  const rafRef = useRef(null);
  const starsCanvasRef = useRef(null);

  useEffect(() => {
    const canvas = starsCanvasRef.current;
    if (!canvas) return;
    const resize = () => {
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
        ctx.fillStyle = `rgba(255, 255, 255, ${0.3 + Math.random() * 0.7})`;
        ctx.fill();
      }

      for (let i = 0; i < 10; i++) {
        const x = Math.random() * rect.width;
        const y = Math.random() * rect.height;
        const r = 1.5 + Math.random() * 2;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 74, 28, ${0.5 + Math.random() * 0.5})`;
        ctx.fill();
        const grad = ctx.createRadialGradient(x, y, 0, x, y, r * 6);
        grad.addColorStop(0, 'rgba(255, 74, 28, 0.25)');
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
    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const w = container.offsetWidth;
    const h = container.offsetHeight;

    cubesRef.current = Array.from({ length: PARTICLE_COUNT }, () => {
      const size = 4 + Math.random() * 12;
      return {
        x: Math.random() * w,
        y: Math.random() * h,
        homeX: 0,
        homeY: 0,
        vx: 0,
        vy: 0,
        size,
        rx: Math.random() * 360,
        ry: Math.random() * 360,
        spinSpeed: 0.3 + Math.random() * 0.8,
        type: Math.random(),
      };
    });
    cubesRef.current.forEach((c) => { c.homeX = c.x; c.homeY = c.y; });
  }, []);

  useEffect(() => {
    const onMove = (e) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };
    const onLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 };
    };
    const el = containerRef.current;
    if (el) {
      el.addEventListener('mousemove', onMove);
      el.addEventListener('mouseleave', onLeave);
    }
    return () => {
      if (el) {
        el.removeEventListener('mousemove', onMove);
        el.removeEventListener('mouseleave', onLeave);
      }
    };
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const particleEls = container.querySelectorAll('.ic-particle');
    const centralEl = centralRef.current;

    const animate = () => {
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      const w = container.offsetWidth;
      const h = container.offsetHeight;

      if (centralEl) {
        const cx = w / 2;
        const cy = h / 2;
        const targetRy = ((mx - cx) / w) * 25;
        const targetRx = -((my - cy) / h) * 25;
        centralTiltRef.current.rx += (targetRx - centralTiltRef.current.rx) * 0.05;
        centralTiltRef.current.ry += (targetRy - centralTiltRef.current.ry) * 0.05;
        const inner = centralEl.querySelector('.ic-central-inner');
        if (inner) {
          inner.style.transform = `rotateX(${centralTiltRef.current.rx}deg) rotateY(${centralTiltRef.current.ry}deg)`;
        }
      }

      cubesRef.current.forEach((c, i) => {
        const dx = c.x - mx;
        const dy = c.y - my;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < HOVER_RADIUS && dist > 1) {
          const force = (HOVER_RADIUS - dist) / HOVER_RADIUS;
          const angle = Math.atan2(dy, dx);
          c.vx += Math.cos(angle) * force * 6;
          c.vy += Math.sin(angle) * force * 6;
        }

        c.vx += (c.homeX - c.x) * 0.01;
        c.vy += (c.homeY - c.y) * 0.01;
        c.vx *= 0.92;
        c.vy *= 0.92;
        c.x += c.vx;
        c.y += c.vy;

        const spinMult = dist < HOVER_RADIUS ? 1 + (HOVER_RADIUS - dist) / HOVER_RADIUS * 4 : 1;
        c.rx += c.spinSpeed * spinMult;
        c.ry += c.spinSpeed * spinMult * 1.3;

        if (particleEls[i]) {
          particleEls[i].style.transform = `translate3d(${c.x}px, ${c.y}px, 0) rotateX(${c.rx}deg) rotateY(${c.ry}deg)`;
        }
      });

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, []);

  const cubeSize = 100;
  const ch = cubeSize / 2;

  const centralFaceStyle = (bg) => ({
    position: 'absolute',
    width: cubeSize,
    height: cubeSize,
    background: bg,
    display: 'grid',
    placeItems: 'center',
    backfaceVisibility: 'visible',
    fontFamily: 'var(--font-display)',
    fontWeight: 900,
    letterSpacing: '-0.03em',
  });

  return (
    <section style={{
      position: 'relative',
      background: 'var(--ink)',
      borderTop: '1px solid rgba(242,238,229,0.08)',
      overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute',
        inset: 0,
        background: `
          radial-gradient(ellipse at 20% 50%, rgba(78, 30, 11, 0.15), transparent 50%),
          radial-gradient(ellipse at 80% 30%, rgba(255, 74, 28, 0.08), transparent 40%),
          radial-gradient(ellipse at 50% 80%, rgba(100, 50, 20, 0.1), transparent 50%),
          var(--ink)
        `,
        pointerEvents: 'none',
      }} />
      <canvas ref={starsCanvasRef} style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        opacity: 0.9,
      }} />
      <div
        ref={containerRef}
        style={{
          position: 'relative',
          width: '100%',
          height: '55vh',
          minHeight: 420,
          cursor: 'default',
        }}
      >
        {Array.from({ length: PARTICLE_COUNT }, (_, i) => {
          const size = 4 + (i * 7 % 12);
          const isAccent = i % 5 === 0;
          const isPaper = i % 5 === 1;
          const bg = isAccent ? 'var(--accent)' : isPaper ? 'rgba(242,238,229,0.9)' : 'rgba(242,238,229,0.15)';
          return (
            <div
              key={i}
              className="ic-particle"
              style={{
                position: 'absolute',
                left: 0, top: 0,
                width: size,
                height: size,
                transformStyle: 'preserve-3d',
                willChange: 'transform',
              }}
            >
              <div style={{
                position: 'absolute', inset: 0,
                background: bg,
                transform: `translateZ(${size / 2}px)`,
                backfaceVisibility: 'visible',
              }} />
              <div style={{
                position: 'absolute', inset: 0,
                background: isAccent ? 'var(--ink)' : 'var(--accent)',
                transform: `rotateY(90deg) translateZ(${size / 2}px)`,
                backfaceVisibility: 'visible',
              }} />
              <div style={{
                position: 'absolute', inset: 0,
                background: isPaper ? 'var(--accent)' : 'rgba(242,238,229,0.2)',
                transform: `rotateY(180deg) translateZ(${size / 2}px)`,
                backfaceVisibility: 'visible',
              }} />
              <div style={{
                position: 'absolute', inset: 0,
                background: isAccent ? 'rgba(242,238,229,0.8)' : 'var(--ink)',
                border: '1px solid rgba(242,238,229,0.1)',
                transform: `rotateY(-90deg) translateZ(${size / 2}px)`,
                backfaceVisibility: 'visible',
              }} />
            </div>
          );
        })}

        <div
          ref={centralRef}
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            marginLeft: -ch,
            marginTop: -ch,
            width: cubeSize,
            height: cubeSize,
            perspective: 600,
            zIndex: 5,
          }}
        >
          <div
            className="ic-central-inner"
            style={{
              width: '100%',
              height: '100%',
              position: 'relative',
              transformStyle: 'preserve-3d',
            }}
          >
            <div style={{ ...centralFaceStyle('var(--accent)'), color: 'var(--ink)', transform: `translateZ(${ch}px)`, fontSize: 24 }}>
              {'{ P }'}
            </div>
            <div style={{ ...centralFaceStyle('var(--ink)'), color: 'var(--paper)', border: '1px solid rgba(242,238,229,0.2)', transform: `rotateY(180deg) translateZ(${ch}px)`, fontSize: 14, fontFamily: 'var(--font-mono)', fontWeight: 500, letterSpacing: '0.18em' }}>
              EST. 2024
            </div>
            <div style={{ ...centralFaceStyle('var(--paper)'), color: 'var(--ink)', transform: `rotateY(90deg) translateZ(${ch}px)`, fontSize: 18 }}>
              PRESS
            </div>
            <div style={{ ...centralFaceStyle('var(--ink)'), color: 'var(--accent)', border: '1px solid rgba(242,238,229,0.15)', transform: `rotateY(-90deg) translateZ(${ch}px)`, fontSize: 18 }}>
              CO.
            </div>
            <div style={{ ...centralFaceStyle('var(--accent)'), color: 'var(--ink)', transform: `rotateX(90deg) translateZ(${ch}px)`, fontSize: 28 }}>
              P
            </div>
            <div style={{ ...centralFaceStyle('var(--paper)'), color: 'var(--ink)', transform: `rotateX(-90deg) translateZ(${ch}px)`, fontSize: 10, fontFamily: 'var(--font-mono)', letterSpacing: '0.2em', fontWeight: 400 }}>
              BOMBAY
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
