/** Simple line illustrations (Onyx palette) for Running, AI use cases and Sports and esports. Shared by the desktop and phone Hobbies views. */

interface Props {
  className?: string;
}

const svgProps = {
  width: 280,
  height: 120,
  viewBox: '0 0 280 120',
  fill: 'none',
  stroke: 'var(--acc)',
  strokeWidth: 2,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  style: { maxWidth: '100%', height: 'auto' },
};

/** A road with lane dashes, and a pair of running shoes. */
export function RunningArt({ className }: Props) {
  return (
    <div className={className} aria-hidden="true">
      <svg {...svgProps}>
        <path d="M10 98 H270" stroke="var(--border)" strokeWidth="6" />
        <path
          d="M20 98 H50 M90 98 H120 M160 98 H190 M230 98 H260"
          stroke="var(--muted)"
          strokeWidth="2"
        />
        <path d="M70 80 V58 H96 L108 70 L134 76 V80 Z" />
        <path d="M70 80 H134 M82 58 V66 M90 62 V70" />
        <path d="M150 80 V58 H176 L188 70 L214 76 V80 Z" />
        <path d="M150 80 H214 M162 58 V66 M170 62 V70" />
        <path d="M232 36 H264 M222 48 H254 M240 24 H262" stroke="var(--muted)" />
      </svg>
    </div>
  );
}

/** A chip with a few connected nodes, for AI beyond code. */
export function AiArt({ className }: Props) {
  const nodes: [number, number][] = [
    [60, 30],
    [60, 90],
    [220, 30],
    [220, 90],
  ];
  return (
    <div className={className} aria-hidden="true">
      <svg {...svgProps}>
        {nodes.map(([x, y]) => (
          <path key={`${x}-${y}`} d={`M${x} ${y} L140 60`} stroke="var(--border)" />
        ))}
        {nodes.map(([x, y]) => (
          <circle key={`n${x}-${y}`} cx={x} cy={y} r="9" fill="var(--sunken)" />
        ))}
        <rect x="112" y="32" width="56" height="56" rx="8" fill="var(--sunken)" />
        <rect x="126" y="46" width="28" height="28" rx="4" />
        <path d="M122 32 V24 M140 32 V24 M158 32 V24 M122 88 V96 M140 88 V96 M158 88 V96" />
        <path d="M133 60 H147 M140 53 V67" stroke="var(--text)" />
      </svg>
    </div>
  );
}

/** A football and a crosshair, for watching sports and esports. */
export function SportsArt({ className }: Props) {
  return (
    <div className={className} aria-hidden="true">
      <svg {...svgProps}>
        <circle cx="86" cy="60" r="34" fill="var(--sunken)" />
        <path d="M86 46 L99 55 L94 70 H78 L73 55 Z" />
        <path d="M86 46 V26 M99 55 L118 49 M94 70 L106 86 M78 70 L66 86 M73 55 L54 49" />
        <circle cx="194" cy="60" r="34" fill="var(--sunken)" />
        <circle cx="194" cy="60" r="14" />
        <path d="M194 18 V40 M194 80 V102 M152 60 H174 M214 60 H236" />
        <circle cx="194" cy="60" r="2" fill="var(--danger)" stroke="var(--danger)" />
      </svg>
    </div>
  );
}
