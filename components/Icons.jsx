'use client';

export function RegMark({ size = 28, color }) {
  const c = color || 'currentColor';
  return (
    <svg width={size} height={size} viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block' }}>
      <circle cx="14" cy="14" r="9" stroke={c} strokeWidth="1" />
      <line x1="14" y1="0" x2="14" y2="28" stroke={c} strokeWidth="1" />
      <line x1="0" y1="14" x2="28" y2="14" stroke={c} strokeWidth="1" />
    </svg>
  );
}

export function PlusMark({ size = 16, color }) {
  const c = color || 'currentColor';
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      <line x1="8" y1="0" x2="8" y2="16" stroke={c} strokeWidth="1" />
      <line x1="0" y1="8" x2="16" y2="8" stroke={c} strokeWidth="1" />
    </svg>
  );
}

export function Arrow({ size = 20, color }) {
  const c = color || 'currentColor';
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none">
      <path d="M3 10 H16 M11 5 L16 10 L11 15" stroke={c} strokeWidth="1.3" fill="none" />
    </svg>
  );
}
