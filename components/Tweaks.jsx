'use client';

import { useEffect, useState } from 'react';

const THEMES = [
  { id: 'default', name: 'Ink / Paper', swatches: ['#0B0B0B', '#F2EEE5', '#FF4A1C'] },
  { id: 'midnight', name: 'Espresso', swatches: ['#0B0B0B', '#f4efe5', '#4e1e0b'] },
  { id: 'press', name: 'Press Red', swatches: ['#F2EEE5', '#C8351A', '#0B0B0B'] },
];

export default function Tweaks({ visible }) {
  const [theme, setTheme] = useState('default');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    try { localStorage.setItem('tpc-theme', theme); } catch (e) { /* ignore */ }
  }, [theme]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('tpc-theme');
      if (saved && THEMES.find((t) => t.id === saved)) setTheme(saved);
    } catch (e) { /* ignore */ }
  }, []);

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
              onClick={() => setTheme(t.id)}
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
