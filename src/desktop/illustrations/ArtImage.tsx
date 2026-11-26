import { asset } from '../../lib/asset';
import styles from './ArtImage.module.css';

/** A decorative photographic illustration that fills its framed panel. */
export function ArtImage({ name }: { name: string }) {
  return (
    <img
      className={styles.img}
      src={asset(`images/${name}.webp`)}
      alt=""
      width={1200}
      height={800}
      loading="lazy"
      decoding="async"
    />
  );
}
