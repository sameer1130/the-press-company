'use client';

import { useEffect, useState } from 'react';

// Saved palettes. OG is the canonical fallback.
// Letterhead / Stamp / Foil are derived from the actual logo colors
// (#F4EFE5 cream + #4E1E0B brown).
const THEMES = [
  { id: 'og',         name: 'OG — Ink & Signal', swatches: ['#0B0B0B', '#F4EFE5', '#FF4A1C'] },
  { id: 'letterhead', name: 'Letterhead',        swatches: ['#0B0B0B', '#F4EFE5', '#4E1E0B'] },
  { id: 'stamp',      name: 'Stamp',             swatches: ['#2A1308', '#F4EFE5', '#6B2A12'] },
  { id: 'foil',       name: 'Foil',              swatches: ['#F4EFE5', '#4E1E0B', '#E8C792'] },
  { id: 'risograph',  name: 'Risograph',         swatches: ['#14133F', '#F0EBE0', '#FF5E5E'] },
  { id: 'regalia',    name: 'Regalia',           swatches: ['#F4EFE5', '#2A1A4A', '#D4A537'] },
];

export default function Tweaks({ visible }) {
  const [theme, setTheme] = useState('og');

  // On mount, hydrate from whatever App.jsx already applied to <html>,
  // falling back to localStorage, falling back to OG.
  useEffect(() => {
    let next = document.documentElement.getAttribute('data-theme') || 'og';
    try {
      const saved = localStorage.getItem('tpc-theme');
      if (saved) next = saved;
    } catch (e) { /* ignore */ }
    if (!THEMES.find((t) => t.id === next)) next = 'og';
    setTheme(next);
  }, []);

  const pick = (id) => {
    setTheme(id);
    document.documentElement.setAttribute('data-theme', id);
    try { localStorage.setItem('tpc-theme', id); } catch (e) { /* ignore */ }
  };

  if (!visible) return null;

  return (
    <div className="tweaks-panel">
      <h4>Tweaks</h4>
      <div className="tweaks-row">
        <div className="tweaks-label">Palette</div>
        <div className="tweaks-themes">
          {THEMES.map((t) => (
            <button
              key={t.id}
              className={`theme-chip ${theme === t.id ? 'active' : ''}`}
              onClick={() => pick(t.id)}
            >
              <div className="swatches">
                {t.swatches.map((s, i) => (
                  <span key={i} className="swatch" style={{ background: s }} />
                ))}
              </div>
              <div>{t.name}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
