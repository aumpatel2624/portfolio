import type { CSSProperties } from 'react';
import styles from './Typewriter.module.css';

/** One line typed out once. Width and step count follow the text, so it cannot clip. */
export function Typewriter({ text }: { text: string }) {
  return (
    <span className={styles.type} style={{ '--chars': text.length } as CSSProperties}>
      {text}
    </span>
  );
}
