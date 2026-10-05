import type { CSSProperties } from 'react';
import type { AsciiArt as AsciiArtData, AsciiSize } from './types';
import styles from './AsciiArt.module.css';

interface Props {
  art: AsciiArtData;
  size: AsciiSize;
  className?: string;
}

/**
 * Pre-rendered ASCII art. The grid is scaled to its container with container-query units, so
 * the glyphs stay crisp at any width and nothing is measured or converted at runtime.
 * Decorative: the real information lives in the alt text of the photo it accompanies.
 */
export function AsciiArt({ art, size, className }: Props) {
  const { cols, rows, lines } = art.variants[size];
  const style = { '--cols': cols, '--rows': rows } as CSSProperties;
  return (
    <div className={`${styles.frame} ${className ?? ''}`} style={style} aria-hidden="true">
      <pre className={styles.pre}>{lines.join('\n')}</pre>
    </div>
  );
}
