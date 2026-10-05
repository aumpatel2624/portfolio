import { useState } from 'react';
import { AsciiPhoto } from '../ascii/AsciiPhoto';
import { polaroidAscii } from '../ascii/art.generated';
import { profile } from '../data/profile';
import styles from './Polaroid.module.css';

export function Polaroid({ onOpen }: { onOpen: () => void }) {
  const [hover, setHover] = useState(false);
  const [focus, setFocus] = useState(false);
  return (
    <button
      type="button"
      className={styles.polaroid}
      aria-label="Open about.txt"
      onClick={onOpen}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onFocus={() => setFocus(true)}
      onBlur={() => setFocus(false)}
    >
      <span className={styles.photo}>
        <AsciiPhoto
          src="/images/aum-full.jpg"
          alt={profile.images.fullAlt}
          width={116}
          height={116}
          objectPosition="50% 34%"
          art={polaroidAscii}
          size="md"
          mode="hover"
          revealed={hover || focus}
        />
      </span>
      <span className={styles.caption}>hi, i'm aum</span>
    </button>
  );
}
