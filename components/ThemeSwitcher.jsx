'use client';

import { useEffect, useRef, useState } from 'react';

// Brand palette from "tpc colours.pdf" — the last 4 shades of each colour
// family (Platinum and Ivory intentionally excluded). Any pick replaces the
// site accent (the orange). "Original" restores it.
const ORIGINAL = '#FF4A1C';
const GROUPS = [
  {
    family: 'Olive',
    shades: [
      { name: 'Olive 200', hex: '#8A8B62' },
      { name: 'Olive 300', hex: '#46462A' },
      { name: 'Olive 400', hex: '#31311D' },
      { name: 'Olive 500', hex: '#1A1A10' },
    ],
  },
  {
    family: 'Burgundy',
    shades: [
      { name: 'Burgundy 200', hex: '#A54E5B' },
      { name: 'Burgundy 300', hex: '#660810' },
      { name: 'Burgundy 400', hex: '#46050B' },
      { name: 'Burgundy 500', hex: '#260205' },
    ],
  },
  {
    family: 'Butter',
    shades: [
      { name: 'Butter 200', hex: '#FFF3B0' },
      { name: 'Butter 300', hex: '#E8D46D' },
      { name: 'Butter 400', hex: '#C4A83A' },
      { name: 'Butter 500', hex: '#8A6D16' },
    ],
  },
];
const ALL = GROUPS.flatMap((g) => g.shades);

const STORAGE_KEY = 'tpc-accent';

// Perceived luminance → pick black/white so text ON the accent stays legible.
function accentInk(hex) {
  const n = hex.replace('#', '');
  const r = parseInt(n.slice(0, 2), 16);
  const g = parseInt(n.slice(2, 4), 16);
  const b = parseInt(n.slice(4, 6), 16);
  const lum = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return lum > 0.5 ? '#0B0B0B' : '#F8F6F1';
}

function applyAccent(hex) {
  const root = document.documentElement;
  if (!hex) {
    root.style.removeProperty('--accent');
    root.style.removeProperty('--accent-ink');
  } else {
    root.style.setProperty('--accent', hex);
    root.style.setProperty('--accent-ink', accentInk(hex));
  }
}

export default function ThemeSwitcher() {
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState(ORIGINAL); // hex string; ORIGINAL = default
  const rootRef = useRef(null);

  // Restore a saved pick on mount.
  useEffect(() => {
    let saved = null;
    try {
      saved = localStorage.getItem(STORAGE_KEY);
    } catch (e) {}
    if (saved && ALL.some((c) => c.hex === saved)) {
      applyAccent(saved);
      setCurrent(saved);
    }
  }, []);

  // Close on outside click / Escape.
  useEffect(() => {
    if (!open) return;
    const onDown = (e) => {
      if (rootRef.current && !rootRef.current.contains(e.target)) setOpen(false);
    };
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const pick = (hex) => {
    applyAccent(hex);
    setCurrent(hex || ORIGINAL);
    try {
      if (hex) localStorage.setItem(STORAGE_KEY, hex);
      else localStorage.removeItem(STORAGE_KEY);
    } catch (e) {}
  };

  const isOriginal = current === ORIGINAL;

  return (
    <div className="theme-switch" ref={rootRef}>
      <button
        type="button"
        className="theme-switch-btn"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span className="theme-switch-dot" style={{ background: current }} />
        Themes
        <span className="theme-switch-caret" aria-hidden="true">{open ? '▴' : '▾'}</span>
      </button>

      {open && (
        <div className="theme-switch-menu" role="listbox" aria-label="Accent colour">
          <button
            type="button"
            role="option"
            aria-selected={isOriginal}
            className={`theme-opt${isOriginal ? ' active' : ''}`}
            onClick={() => pick(null)}
          >
            <span className="theme-opt-swatch" style={{ background: ORIGINAL }} />
            <span className="theme-opt-name">Original</span>
            <span className="theme-opt-hex">Orange</span>
          </button>

          {GROUPS.map((g) => (
            <div className="theme-group" key={g.family}>
              <div className="theme-group-label">{g.family}</div>
              {g.shades.map((c) => {
                const active = current === c.hex;
                return (
                  <button
                    type="button"
                    role="option"
                    aria-selected={active}
                    key={c.hex}
                    className={`theme-opt${active ? ' active' : ''}`}
                    onClick={() => pick(c.hex)}
                  >
                    <span className="theme-opt-swatch" style={{ background: c.hex }} />
                    <span className="theme-opt-name">{c.name}</span>
                    <span className="theme-opt-hex">{c.hex}</span>
                  </button>
                );
              })}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
