import styles from './AsciiDivider.module.css';

interface Props {
  /** Glyph pattern that repeats across the width. */
  pattern?: string;
  className?: string;
}

/** A section divider drawn with characters. Decorative, so hidden from assistive tech. */
export function AsciiDivider({ pattern = '·-=-·', className }: Props) {
  return (
    <div className={`${styles.divider} ${className ?? ''}`} aria-hidden="true">
      {pattern.repeat(Math.ceil(400 / pattern.length))}
    </div>
  );
}
