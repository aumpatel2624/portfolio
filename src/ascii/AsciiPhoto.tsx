import { useState } from 'react';
import type { AsciiArt as AsciiArtData, AsciiSize } from './types';
import { AsciiArt } from './AsciiArt';
import styles from './AsciiPhoto.module.css';

interface Props {
  src: string;
  alt: string;
  width: number;
  height: number;
  objectPosition?: string;
  art: AsciiArtData;
  size: AsciiSize;
  /**
   * `toggle`: real photo first, with a button that swaps to the ASCII version.
   * `hover`: ASCII first, the real photo shows on hover or keyboard focus of the parent.
   */
  mode: 'toggle' | 'hover';
  className?: string;
  /** Eagerly load the photo (above the fold). */
  priority?: boolean;
  /** hover mode: set by the parent control on hover or focus to show the real photo. */
  revealed?: boolean;
}

export function AsciiPhoto({
  src,
  alt,
  width,
  height,
  objectPosition,
  art,
  size,
  mode,
  className,
  priority,
  revealed,
}: Props) {
  const [ascii, setAscii] = useState(false);
  const showAscii = mode === 'hover' || ascii;
  return (
    <div
      className={`${styles.box} ${mode === 'hover' ? styles.hoverMode : ''} ${className ?? ''}`}
      data-ascii={showAscii ? 'on' : 'off'}
      data-revealed={revealed ? 'true' : 'false'}
    >
      <img
        className={styles.img}
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        style={{ objectPosition }}
      />
      <div className={styles.layer}>
        <AsciiArt art={art} size={size} className={styles.art} />
      </div>
      {mode === 'toggle' && (
        <button
          type="button"
          className={styles.toggle}
          aria-pressed={ascii}
          aria-label={ascii ? 'Show the photo' : 'Show the ASCII art version of the photo'}
          onClick={() => setAscii((v) => !v)}
        >
          {ascii ? 'photo' : 'ascii'}
        </button>
      )}
    </div>
  );
}
