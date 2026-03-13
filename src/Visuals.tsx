import React from 'react';

type VisualProps = {
  variant?: 'simple' | 'complex';
};

const frameClass = 'w-full h-full';

function makeVisual(paths: React.ReactNode) {
  return function Visual({ variant = 'simple' }: VisualProps) {
    return (
      <svg
        viewBox="0 0 64 64"
        className={frameClass}
        fill="none"
        stroke="currentColor"
        strokeWidth={variant === 'complex' ? 1.5 : 2}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {paths}
      </svg>
    );
  };
}

export const VISUAL_MAP = {
  meaning: makeVisual(
    <>
      <rect x="10" y="10" width="44" height="44" rx="10" />
      <circle cx="32" cy="32" r="8" />
      <path d="M32 18v6M32 40v6M18 32h6M40 32h6" />
    </>,
  ),
  factory: makeVisual(
    <>
      <path d="M10 48V20l12 8v-8l14 8v20Z" />
      <path d="M18 48V34M28 48V38M38 48V32M48 48V28" />
    </>,
  ),
  network: makeVisual(
    <>
      <circle cx="32" cy="14" r="4" />
      <circle cx="14" cy="32" r="4" />
      <circle cx="50" cy="32" r="4" />
      <circle cx="22" cy="50" r="4" />
      <circle cx="42" cy="50" r="4" />
      <path d="M32 18 14 28M32 18l18 10M14 36l8 10M50 36 42 46M22 50h20" />
    </>,
  ),
  bottleneck: makeVisual(
    <>
      <path d="M8 16h18M8 32h18M8 48h18" />
      <path d="M38 12v40" />
      <rect x="44" y="24" width="12" height="16" />
    </>,
  ),
  alignment: makeVisual(
    <>
      <path d="M12 18h16M36 46h16" />
      <path d="M32 8v48" strokeDasharray="4 4" />
      <rect x="24" y="24" width="16" height="16" />
    </>,
  ),
  audit: makeVisual(
    <>
      <path d="M16 48 32 16l16 32" />
      <circle cx="32" cy="16" r="4" />
      <circle cx="16" cy="48" r="4" />
      <circle cx="48" cy="48" r="4" />
    </>,
  ),
  balance: makeVisual(
    <>
      <path d="M32 10v40" />
      <path d="M18 20h28" />
      <path d="M18 20 10 34h16ZM46 20l-8 14h16Z" />
    </>,
  ),
  pen: makeVisual(
    <>
      <path d="M14 44 44 14l6 6-30 30-10 2Z" />
      <path d="M40 18l6 6" />
    </>,
  ),
  velocity: makeVisual(
    <>
      <path d="M12 32h22" />
      <path d="M34 24l14 8-14 8" />
      <path d="M10 24h10M10 40h10" strokeDasharray="3 4" />
    </>,
  ),
  whisper: makeVisual(
    <>
      <circle cx="24" cy="32" r="4" />
      <path d="M28 32c10 0 12-10 22-10" />
      <path d="M28 32c10 0 12 10 22 10" />
      <path d="M34 32h10" strokeDasharray="2 4" />
    </>,
  ),
} as const;
