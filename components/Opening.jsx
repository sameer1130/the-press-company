'use client';

import { useEffect, useState } from 'react';

const IMAGES = [
  'https://picsum.photos/seed/tpc-press-1/1400/1800',
  'https://picsum.photos/seed/tpc-press-2/1400/1800',
  'https://picsum.photos/seed/tpc-press-3/1400/1800',
  'https://picsum.photos/seed/tpc-press-4/1400/1800',
  'https://picsum.photos/seed/tpc-press-5/1400/1800',
];

const GRADIENTS = [
  'linear-gradient(135deg, #FF4A1C 0%, #0B0B0B 100%)',
  'linear-gradient(135deg, #0B0B0B 0%, #4e1e0b 100%)',
  'linear-gradient(135deg, #C8351A 0%, #F2EEE5 100%)',
  'linear-gradient(135deg, #4e1e0b 0%, #FF4A1C 100%)',
  'linear-gradient(135deg, #0B0B0B 0%, #FF4A1C 100%)',
];

const SWAP_MS = 320;
const CYCLE_COUNT = 6;
// The "wordmark P" is at 14vh / 13vw font-size. The "alone P" is BIG_SCALE×
// that, large enough to feel like the omc giant letter on a 1440×900 viewport.
const BIG_SCALE = 4.4;

const T_FADE_IN     = 150;
const T_CYCLE_START = 450;
const T_CYCLE_END   = T_CYCLE_START + SWAP_MS * CYCLE_COUNT;   // ~2370
const T_SOLID       = T_CYCLE_END + 250;                       // P solid hold
const T_WORDMARK    = T_SOLID + 350;                           // P shrinks + RESS COMPANY expands
const T_HOLD        = T_WORDMARK + 1300;                       // hold full wordmark
const T_SLIDE       = T_HOLD;                                  // slide up
const T_DONE        = T_SLIDE + 1000;

export default function Opening({ onDone }) {
  const [imgIdx, setImgIdx] = useState(0);
  const [phase, setPhase] = useState(0);
  // 0 idle, 1 P appears, 2 cycling, 3 solid P, 4 wordmark expand, 5 slide up

  useEffect(() => {
    IMAGES.forEach((src) => { const i = new window.Image(); i.src = src; });
  }, []);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), T_FADE_IN),
      setTimeout(() => setPhase(2), T_CYCLE_START),
      setTimeout(() => setPhase(3), T_CYCLE_END),
      setTimeout(() => setPhase(4), T_WORDMARK),
      setTimeout(() => setPhase(5), T_SLIDE),
      setTimeout(() => onDone && onDone(), T_DONE),
    ];
    return () => timers.forEach(clearTimeout);
  }, [onDone]);

  useEffect(() => {
    if (phase !== 2) return;
    const id = setInterval(() => setImgIdx((i) => i + 1), SWAP_MS);
    return () => clearInterval(id);
  }, [phase]);

  const cycling = phase === 2;
  const idx = imgIdx % IMAGES.length;
  const currentImg = IMAGES[idx];
  const currentGrad = GRADIENTS[idx];

  // Both <span>s share the same wordmark font-size. The P is scaled UP via
  // transform when it's alone (phase 1–3). Once phase 4 fires, scale → 1 while
  // the sibling's max-width opens from 0 → enough to fit "RESS COMPANY". The
  // flex container's `justify-content: center` then naturally slides the P
  // left as the sibling occupies space — the omc continuity, no crossfade.

  const wordmarkFontStyle = {
    fontFamily: 'var(--font-display)',
    fontWeight: 900,
    fontSize: 'min(14vh, 13vw)',
    letterSpacing: '-0.045em',
    lineHeight: 1,
  };

  // Visibility of the giant P:
  //   phase 0:    invisible (just spawned, no fade-in yet)
  //   phase 1–4:  visible (transitions through cycling → solid → shrink)
  //   phase 5:    fades out as the splash slides up
  const pVisible = phase >= 1;

  const pTransform = phase >= 4 ? 'scale(1)' : `scale(${BIG_SCALE})`;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: 'var(--paper)',
        overflow: 'hidden',
        transform: phase >= 5 ? 'translateY(-100%)' : 'translateY(0)',
        transition: phase >= 5 ? 'transform 1s cubic-bezier(0.85, 0, 0.15, 1)' : 'none',
        pointerEvents: phase >= 5 ? 'none' : 'auto',
      }}
    >
      {/* Top meta */}
      <div
        style={{
          position: 'absolute',
          top: 36,
          left: '50%',
          transform: 'translateX(-50%)',
          fontFamily: 'var(--font-mono)',
          fontSize: 11,
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: 'var(--ink)',
          opacity: phase >= 1 && phase < 5 ? 0.45 : 0,
          transition: 'opacity 0.5s ease',
        }}
      >
        VOL. I · ISSUE 01 · EST. MMXXIV
      </div>

      {/* Bottom meta — only visible during cycling */}
      <div
        style={{
          position: 'absolute',
          bottom: 36,
          left: '50%',
          transform: 'translateX(-50%)',
          fontFamily: 'var(--font-mono)',
          fontSize: 11,
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: 'var(--ink)',
          opacity: phase === 2 ? 0.5 : 0,
          transition: 'opacity 0.4s ease',
          display: 'flex',
          alignItems: 'center',
          gap: 10,
        }}
      >
        <span
          style={{
            display: 'inline-block',
            width: 8,
            height: 8,
            borderRadius: '50%',
            background: 'var(--accent)',
          }}
        />
        Setting the plate · {String(idx + 1).padStart(2, '0')} / {String(IMAGES.length).padStart(2, '0')}
      </div>

      {/* Wordmark line — P + " RESS COMPANY" in one flex line */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: 0,
          right: 0,
          transform: 'translateY(-50%)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'baseline',
          whiteSpace: 'nowrap',
          opacity: pVisible ? 1 : 0,
          transition: 'opacity 0.4s ease',
        }}
        aria-hidden="true"
      >
        <span
          style={{
            ...wordmarkFontStyle,
            display: 'inline-block',
            transform: pTransform,
            transformOrigin: '50% 60%',
            transition: 'transform 0.85s cubic-bezier(0.85, 0, 0.15, 1)',
            ...(cycling
              ? {
                  // Three layers (top → bottom):
                  //   1. dark wash: keeps P readable against cream paper
                  //      regardless of the image's brightness
                  //   2. the image itself
                  //   3. brand gradient: fallback if the image fails to load
                  backgroundImage: `linear-gradient(rgba(11,11,11,0.55), rgba(11,11,11,0.55)), url(${currentImg}), ${currentGrad}`,
                  backgroundSize: 'cover, cover, cover',
                  backgroundPosition: 'center, center, center',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  color: 'transparent',
                }
              : {
                  color: 'var(--ink)',
                  WebkitTextFillColor: 'var(--ink)',
                }),
          }}
        >
          P
        </span>
        <span
          style={{
            ...wordmarkFontStyle,
            color: 'var(--ink)',
            display: 'inline-block',
            overflow: 'hidden',
            // Open up enough to fit "RESS COMPANY" — capped so it never
            // pushes past the viewport on narrow screens.
            maxWidth: phase >= 4 ? '90vw' : 0,
            opacity: phase >= 4 ? 1 : 0,
            // Letters slide in from the right; small clip-path reveals them
            // in step with the P shrinking.
            transition:
              'max-width 0.85s cubic-bezier(0.85, 0, 0.15, 1), opacity 0.4s 0.2s ease',
          }}
        >
          RESS COMPANY
        </span>
      </div>

      {/* Subtitle below wordmark */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: 'calc(50% + min(11vh, 10vw))',
          left: 0,
          right: 0,
          textAlign: 'center',
          fontFamily: 'var(--font-mono)',
          fontSize: 11,
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          color: 'var(--ink)',
          opacity: phase >= 4 && phase < 5 ? 0.55 : 0,
          transform: phase >= 4 ? 'translateY(0)' : 'translateY(8px)',
          transition: 'opacity 0.45s 0.35s ease, transform 0.5s 0.35s ease',
        }}
      >
        Strategy studio · Bombay
      </div>
    </div>
  );
}
