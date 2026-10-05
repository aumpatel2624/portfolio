import type { CSSProperties } from 'react';
import type { AsciiWordmark as WordmarkData } from './types';
import styles from './AsciiWordmark.module.css';

interface Props {
  mark: WordmarkData;
  /** Accessible name for the text the art spells out. */
  label: string;
  /** Column index from which glyphs take the accent colour (used to tint the final "."). */
  accentFrom?: number;
  className?: string;
}

/** Block-letter text. Scales to its container; the label carries the real meaning. */
export function AsciiWordmark({ mark, label, accentFrom, className }: Props) {
  const style = { '--cols': mark.cols, '--rows': mark.lines.length } as CSSProperties;
  return (
    <div
      className={`${styles.frame} ${className ?? ''}`}
      style={style}
      role="img"
      aria-label={label}
    >
      <pre className={styles.pre} aria-hidden="true">
        {accentFrom === undefined
          ? mark.lines.join('\n')
          : mark.lines.map((line, i) => (
              <span key={i}>
                {line.slice(0, accentFrom)}
                <span className={styles.accent}>{line.slice(accentFrom)}</span>
                {i < mark.lines.length - 1 ? '\n' : ''}
              </span>
            ))}
      </pre>
    </div>
  );
}
