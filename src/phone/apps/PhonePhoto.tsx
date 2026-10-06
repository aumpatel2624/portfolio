import { useState } from 'react';
import { AsciiArt } from '../../ascii/AsciiArt';
import { avatarAscii } from '../../ascii/art.generated';
import styles from './PhonePhoto.module.css';

interface Props {
  src: string;
  alt: string;
  objectPosition: string;
}

/** The About photo with a small control that swaps it for its ASCII-art version. */
export function PhonePhoto({ src, alt, objectPosition }: Props) {
  const [ascii, setAscii] = useState(false);
  return (
    <>
      <img
        className={styles.img}
        src={src}
        alt={alt}
        width={358}
        height={300}
        decoding="async"
        style={{ objectPosition }}
      />
      <div className={styles.layer} data-on={ascii}>
        <AsciiArt art={avatarAscii} size="md" className={styles.art} />
      </div>
      <button
        type="button"
        className={styles.toggle}
        aria-pressed={ascii}
        aria-label={ascii ? 'Show the photo' : 'Show the ASCII art version of the photo'}
        onClick={() => setAscii((v) => !v)}
      >
        <span className={styles.pill}>{ascii ? 'photo' : 'ascii'}</span>
      </button>
    </>
  );
}
