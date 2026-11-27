import type { CSSProperties } from 'react';

interface PlaceholderCompositionProps {
  composition: 'hero' | 'collection-hero' | 'product-hero' | 'editorial' | 'atelier' | 'detail';
  className?: string;
  alt?: string;
  style?: CSSProperties;
}

const compositions: Record<string, (style?: CSSProperties) => React.JSX.Element> = {
  hero: (style) => (
    <div
      style={style}
      className="relative flex items-center justify-center"
      aria-hidden="true"
    >
      {/* Monolith atmospheric gradient */}
      <div className="absolute inset-0" style={{
        background: 'radial-gradient(ellipse 80% 60% at 50% 40%, rgba(190,45,28,0.12) 0%, transparent 70%), radial-gradient(ellipse 60% 80% at 20% 80%, rgba(56,61,65,0.08) 0%, transparent 60%), linear-gradient(180deg, #0d0c0b 0%, #1a1816 50%, #24211e 100%)'
      }} />
      {/* Geometric forms */}
      <div className="absolute inset-0 flex items-center justify-center" style={{ pointerEvents: 'none' }}>
        <svg viewBox="0 0 1920 1080" className="w-full h-full" style={{ opacity: 0.08 }} aria-hidden="true">
          <defs>
            <linearGradient id="heroGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#be2d1c" stopOpacity="0.3"/>
              <stop offset="100%" stopColor="#9a281b" stopOpacity="0"/>
            </linearGradient>
            <linearGradient id="heroGrad2" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#f4f1eb" stopOpacity="0.15"/>
              <stop offset="100%" stopColor="#b8a893" stopOpacity="0"/>
            </linearGradient>
          </defs>
          {/* Architectural monolith forms */}
          <rect x="640" y="280" width="640" height="720" rx="4" fill="url(#heroGrad1)" transform="rotate(-2 960 640)"/>
          <rect x="800" y="200" width="320" height="880" rx="4" fill="url(#heroGrad2)" transform="rotate(1.5 960 640)"/>
          <path d="M 480 800 L 960 280 L 1440 800" stroke="#f4f1eb" strokeWidth="1" fill="none" opacity="0.15"/>
          <circle cx="960" cy="540" r="180" stroke="#be2d1c" strokeWidth="0.5" fill="none" opacity="0.2"/>
          <circle cx="960" cy="540" r="280" stroke="#f4f1eb" strokeWidth="0.3" fill="none" opacity="0.1"/>
        </svg>
      </div>
      {/* Brand mark */}
      <div className="absolute bottom-16 left-1/2 -translate-x-1/2 text-center" style={{ pointerEvents: 'none' }}>
        <div className="font-display text-4xl md:text-6xl font-medium tracking-tight text-white/30" style={{ letterSpacing: '-0.03em' }}>SOLUN</div>
        <div className="font-mono text-xs tracking-widest uppercase text-white/15 mt-2" style={{ letterSpacing: '0.3em' }}>ARCHITECTURAL SWIMWEAR</div>
      </div>
    </div>
  ),

  'collection-hero': (style) => (
    <div
      style={style}
      className="relative"
      aria-hidden="true"
    >
      {/* Dynamic based on collection context via CSS variables */}
      <div className="absolute inset-0" style={{
        background: 'var(--collection-bg)',
        backgroundImage: `
          radial-gradient(ellipse 100% 80% at 50% 30%, var(--collection-glow) 0%, transparent 60%),
          radial-gradient(circle 40% 40% at 80% 20%, var(--collection-accent-subtle) 0%, transparent 50%),
          radial-gradient(circle 30% 30% at 20% 80%, var(--collection-accent-subtle) 0%, transparent 40%),
          linear-gradient(135deg, var(--collection-surface) 0%, var(--collection-bg) 100%)
        `
      }} />
      <div className="absolute inset-0 flex items-center justify-center" style={{ pointerEvents: 'none' }}>
        <svg viewBox="0 0 1920 1080" className="w-full h-full" style={{ opacity: 0.12 }} aria-hidden="true">
          <defs>
            <linearGradient id="colGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="currentColor" stopOpacity="0.4"/>
              <stop offset="100%" stopColor="currentColor" stopOpacity="0"/>
            </linearGradient>
          </defs>
          {/* Sedimentary layers / volcanic strata */}
          <g fill="none" stroke="currentColor" strokeWidth="0.8">
            <path d="M 0 680 Q 480 520 960 680 Q 1440 840 1920 680" opacity="0.3"/>
            <path d="M 0 780 Q 480 620 960 780 Q 1440 940 1920 780" opacity="0.2"/>
            <path d="M 0 880 Q 480 720 960 880 Q 1440 1040 1920 880" opacity="0.15"/>
          </g>
          {/* Geometric accent */}
          <rect x="760" y="340" width="400" height="400" rx="2" fill="url(#colGrad)" transform="rotate(-5 960 540)" opacity="0.2"/>
        </svg>
      </div>
      {/* Collection name area */}
      <div className="absolute bottom-20 left-20 right-20 md:left-32 md:bottom-24" style={{ pointerEvents: 'none' }}>
        <div className="font-mono text-xs tracking-widest uppercase text-collection-muted mb-3" style={{ letterSpacing: '0.3em' }}>COLLECTION</div>
      </div>
    </div>
  ),

  'product-hero': (style) => (
    <div
      style={style}
      className="relative flex items-center justify-center"
      aria-hidden="true"
    >
      <div className="absolute inset-0" style={{
        background: 'var(--collection-bg)',
        backgroundImage: `
          radial-gradient(ellipse 60% 60% at 50% 50%, var(--collection-glow) 0%, transparent 70%),
          linear-gradient(180deg, var(--collection-surface) 0%, var(--collection-bg) 100%)
        `
      }} />
      <div className="absolute inset-0 flex items-center justify-center" style={{ pointerEvents: 'none' }}>
        <svg viewBox="0 0 800 1000" className="w-3/4 h-3/4 max-w-[400px] max-h-[500px]" style={{ opacity: 0.15 }} aria-hidden="true">
          <defs>
            <linearGradient id="prodGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="currentColor" stopOpacity="0.5"/>
              <stop offset="100%" stopColor="currentColor" stopOpacity="0"/>
            </linearGradient>
          </defs>
          {/* Swimwear silhouette abstraction */}
          <path d="M 400 150 C 550 150 650 250 650 400 C 650 550 550 650 400 650 C 250 650 150 550 150 400 C 150 250 250 150 400 150 Z" fill="url(#prodGrad)"/>
          {/* Internal architecture lines */}
          <g stroke="currentColor" strokeWidth="0.8" fill="none" opacity="0.4">
            <path d="M 400 200 L 400 600"/>
            <path d="M 250 400 L 550 400"/>
            <ellipse cx="400" cy="320" rx="80" ry="40"/>
            <ellipse cx="400" cy="480" rx="100" ry="30"/>
          </g>
        </svg>
      </div>
    </div>
  ),

  editorial: (style) => (
    <div
      style={style}
      className="relative"
      aria-hidden="true"
    >
      <div className="absolute inset-0" style={{
        background: 'var(--collection-bg)',
        backgroundImage: `
          linear-gradient(135deg, var(--collection-surface) 0%, var(--collection-bg) 50%, var(--collection-surface) 100%),
          repeating-linear-gradient(
            0deg,
            transparent,
            transparent 4px,
            var(--collection-border) 4px,
            var(--collection-border) 8px
          )
        `
      }} />
      <div className="absolute inset-0 flex items-center justify-center" style={{ pointerEvents: 'none' }}>
        <svg viewBox="0 0 1920 1080" className="w-full h-full" style={{ opacity: 0.08 }} aria-hidden="true">
          {/* Editorial grid system */}
          <g stroke="currentColor" strokeWidth="0.4" fill="none" opacity="0.5">
            {/* Baseline grid */}
            {Array.from({length: 18}, (_, i) => (
              <line key={i} x1="0" y1={60 * i} x2="1920" y2={60 * i} />
            ))}
            {/* Column grid */}
            {Array.from({length: 12}, (_, i) => (
              <line key={i} x1={160 * i} y1="0" x2={160 * i} y2="1080" />
            ))}
            {/* Golden ratio lines */}
            <line x1="720" y1="0" x2="720" y2="1080" strokeWidth="0.8" opacity="0.3"/>
            <line x1="1200" y1="0" x2="1200" y2="1080" strokeWidth="0.8" opacity="0.3"/>
          </g>
        </svg>
      </div>
      {/* Typography specimen */}
      <div className="absolute inset-0 flex items-center justify-center p-20" style={{ pointerEvents: 'none' }}>
        <div className="text-center" style={{ maxWidth: '600px' }}>
          <div className="font-display text-5xl md:text-7xl font-medium tracking-tight text-collection-primary/20 leading-[1.02]">
            FORM FOLLOWS REGENERATION
          </div>
          <div className="font-mono text-sm tracking-widest uppercase text-collection-muted/50 mt-6" style={{ letterSpacing: '0.25em' }}>
            THE SOLUN JOURNAL
          </div>
        </div>
      </div>
    </div>
  ),

  atelier: (style) => (
    <div
      style={style}
      className="relative flex items-center justify-center"
      aria-hidden="true"
    >
      <div className="absolute inset-0" style={{
        background: 'var(--collection-bg)',
        backgroundImage: `
          radial-gradient(ellipse 70% 70% at 50% 50%, var(--collection-glow) 0%, transparent 60%),
          linear-gradient(180deg, var(--collection-surface) 0%, var(--collection-bg) 100%)
        `
      }} />
      <div className="absolute inset-0 flex items-center justify-center" style={{ pointerEvents: 'none' }}>
        <svg viewBox="0 0 800 800" className="w-1/2 h-1/2 max-w-[300px] max-h-[300px]" style={{ opacity: 0.18 }} aria-hidden="true">
          <defs>
            <linearGradient id="atelierGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="currentColor" stopOpacity="0.5"/>
              <stop offset="100%" stopColor="currentColor" stopOpacity="0"/>
            </linearGradient>
          </defs>
          {/* Hands/tools abstraction */}
          <g stroke="currentColor" strokeWidth="1.2" fill="none" strokeLinecap="round" strokeLinejoin="round">
            {/* Sewing needle */}
            <path d="M 400 200 L 400 600" strokeWidth="0.8"/>
            <ellipse cx="400" cy="200" rx="30" ry="8" fill="url(#atelierGrad)"/>
            {/* Scissors */}
            <g transform="translate(280, 480) rotate(-30)">
              <path d="M -40 0 L 40 0 M -40 0 L -20 -20 M 40 0 L 20 -20" strokeWidth="1.5"/>
              <circle cx="-25" cy="0" r="12" fill="url(#atelierGrad)"/>
              <circle cx="25" cy="0" r="12" fill="url(#atelierGrad)"/>
            </g>
            {/* Measuring tape */}
            <g transform="translate(520, 520) rotate(45)">
              <circle cx="0" cy="0" r="50" fill="url(#atelierGrad)"/>
              <g strokeWidth="0.6" fill="none">
                {Array.from({length: 8}, (_, i) => (
                  <line key={i} x1="0" y1={-50 + i * 12} x2="0" y2={-40 + i * 12} />
                ))}
              </g>
            </g>
            {/* Pattern piece */}
            <path d="M 300 300 L 500 250 L 550 450 L 350 500 Z" fill="url(#atelierGrad)" opacity="0.3"/>
          </g>
        </svg>
      </div>
    </div>
  ),

  detail: (style) => (
    <div
      style={style}
      className="relative flex items-center justify-center"
      aria-hidden="true"
    >
      <div className="absolute inset-0" style={{
        background: 'var(--collection-bg)',
        backgroundImage: `
          radial-gradient(circle 30% 30% at 50% 50%, var(--collection-glow) 0%, transparent 70%),
          linear-gradient(180deg, var(--collection-surface) 0%, var(--collection-bg) 100%)
        `
      }} />
      <div className="absolute inset-0 flex items-center justify-center" style={{ pointerEvents: 'none' }}>
        <svg viewBox="0 0 600 600" className="w-1/3 h-1/3 max-w-[200px] max-h-[200px]" style={{ opacity: 0.2 }} aria-hidden="true">
          <defs>
            <linearGradient id="detailGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="currentColor" stopOpacity="0.6"/>
              <stop offset="100%" stopColor="currentColor" stopOpacity="0"/>
            </linearGradient>
          </defs>
          {/* Fabric texture abstraction */}
          <g stroke="currentColor" strokeWidth="0.5" fill="none">
            {/* Weave pattern */}
            {Array.from({length: 12}, (_, i) => (
              <g key={i} opacity="0.3">
                <line x1="0" y1={i * 50} x2="600" y2={i * 50} />
                <line x1={i * 50} y1="0" x2={i * 50} y2="600" />
              </g>
            ))}
            {/* Bonded seam */}
            <path d="M 150 300 L 450 300" strokeWidth="2" fill="url(#detailGrad)" opacity="0.8"/>
            {/* Hardware detail */}
            <g transform="translate(300, 300)">
              <circle cx="0" cy="0" r="40" strokeWidth="1.5" fill="none" opacity="0.5"/>
              <circle cx="0" cy="0" r="20" fill="url(#detailGrad)" opacity="0.6"/>
              <circle cx="0" cy="0" r="8" fill="currentColor" opacity="0.8"/>
            </g>
          </g>
        </svg>
      </div>
    </div>
  ),
};

export function PlaceholderComposition({
  composition = 'hero',
  className = '',
  alt,
  style
}: PlaceholderCompositionProps) {
  const Composition = compositions[composition] || compositions.hero;

  return (
    <div
      className={className}
      style={style}
      role={alt ? 'img' : 'presentation'}
      aria-label={alt}
    >
      {Composition(style)}
    </div>
  );
}